const http = require('http');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const { createWorker } = require('tesseract.js');
const { spawn } = require('child_process');
const https = require('https');
const { JSDOM } = require('jsdom');
const DOMPurify = require('dompurify');
const TurndownService = require('turndown');
const ytdl = require('@distube/ytdl-core');
const YtDlpWrap = require('yt-dlp-wrap').default;
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
let YoutubeTranscript = null;
let youtubeTranscriptLoadTried = false;
let ytDlpClient = null;
let ytDlpReadyPromise = null;

const PORT = Number(process.env.AIOX_PORT || 4000);
const ROOT_DIR = path.join(__dirname, '..');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const CONTROL_DIR = path.join(DOCS_DIR, 'control');
const MEMORY_DIR = path.join(DOCS_DIR, 'memory');
const SESSIONS_DIR = path.join(CONTROL_DIR, 'sessions');
const MEMORY_EXTRA_DIR = path.join(CONTROL_DIR, 'memory_extra');
const TASK_PATH = path.join(ROOT_DIR, 'task.md');

const FILES = {
    session: 'session_state.json',
    logs: 'execution_log.json',
    snapshots: 'context_snapshots.json',
    memoryMutations: 'memory_mutations.json',
    memoryState: 'memory_current_state.json',
    memoryLoops: 'memory_open_loops.json',
    memoryCheckpoints: 'memory_checkpoints.json',
    memoryDecisions: 'memory_decision_log.json',
    memoryRuns: 'memory_execution_journal.json',
    memoryArtifacts: 'memory_artifact_index.json',
    memoryRegistry: 'memory_registry.json',
    cloudSync: 'cloud_sync_state.json',
    personaMaterials: 'persona_materials.json',
    projectFlows: 'project_flows.json'
};

const PERSONA_CLONE_DEFAULTS = {
    'prs-alan-nicolas': 'knowledge/clones/alan_nicolas_clone.md',
    'prs-elisa-clark': 'knowledge/clones/elisa_clark.md',
    'prs-joao-vturb': 'knowledge/clones/joao_vturb_clone.md',
    'prs-pedro-valerio': 'knowledge/clones/pedro_valerio_clone.md',
    'prs-tiago-finch': 'knowledge/clones/tiago_finch_clone.md'
};

const CONTINUITY_LOOKBACK_DAYS = 7;

const DEFAULT_BRUNSON_BOOK_FILES = [
    'knowledge/clones/books/Dotcom Secrets - Russel Brunson.pdf',
    'knowledge/clones/books/Expert Secrets - Russell Brunson.pdf',
    'knowledge/clones/books/Traffic Secrets - Russel Brunson.pdf'
];

const DEFAULT_TRANSCRIPT_FILES = [
    'knowledge/clones/transcripts/alan_nicolas_aluno_negocio_inteiro.md',
    'knowledge/clones/transcripts/elida_dias_vturb.md',
    'knowledge/clones/transcripts/iox_squad_masterclass_1.md'
];

const SESSION_PULSE_LOG_INTERVAL_MS = 10 * 60 * 1000;
const CONTINUITY_LOOKBACK_SESSIONS = 3;
const STARTUP_CONTEXT_REL_PATH = 'docs/memory/startup_context_latest.md';
const STARTUP_CONTEXT_PATH = path.join(ROOT_DIR, STARTUP_CONTEXT_REL_PATH);
const GEMINI_DEFAULT_MODEL = asTrimmedText(process.env.GEMINI_MODEL) || 'gemini-2.5-flash';
const GEMINI_EXTRACT_MODEL = asTrimmedText(process.env.GEMINI_EXTRACT_MODEL) || GEMINI_DEFAULT_MODEL;
const GEMINI_HARMONIZE_MODEL = asTrimmedText(process.env.GEMINI_HARMONIZE_MODEL) || GEMINI_DEFAULT_MODEL;
const GEMINI_TRANSCRIBE_MODEL = asTrimmedText(process.env.GEMINI_TRANSCRIBE_MODEL) || GEMINI_DEFAULT_MODEL;
const YOUTUBE_AUDIO_FALLBACK_ENABLED = !/^(0|false|off|no)$/i.test(asTrimmedText(process.env.YOUTUBE_AUDIO_FALLBACK_ENABLED || 'true'));
const YT_DLP_BIN_DIR = path.join(ROOT_DIR, '.cache', 'yt-dlp');
const YT_DLP_BIN_PATH = path.join(YT_DLP_BIN_DIR, process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp');

const GENERIC_NEXT_ACTION_PATTERNS = [
    /rodar startup oracle/i,
    /retomar a partir do ultimo checkpoint automatico/i,
    /^\(nao informada\)$/i,
    /^next$/i
];

const AUTO_CLOSE_SUMMARY_PATTERNS = [
    /encerramento automatico/i,
    /fechamento de aba\/janela/i,
    /sessao anterior encerrada automaticamente/i
];

function nowIso() {
    const d = new Date();
    const z = -d.getTimezoneOffset();
    const sign = z >= 0 ? '+' : '-';
    const abs = Math.abs(z);
    const zh = String(Math.floor(abs / 60)).padStart(2, '0');
    const zm = String(abs % 60).padStart(2, '0');
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}${sign}${zh}:${zm}`;
}

function dayKey() {
    const d = new Date();
    return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
}

function asArray(v) {
    return Array.isArray(v) ? v : [];
}

function asTrimmedText(v) {
    return String(v || '').trim();
}

function parseTimestampMs(value) {
    const raw = asTrimmedText(value);
    if (!raw) return Number.NaN;
    const ms = new Date(raw).getTime();
    return Number.isFinite(ms) ? ms : Number.NaN;
}

function resolveGeminiApiConfig({ required = false, model = GEMINI_DEFAULT_MODEL } = {}) {
    const creditsKey = asTrimmedText(process.env.GEMINI_CREDITS_API_KEY);
    const fallbackKey = asTrimmedText(process.env.GEMINI_API_KEY);
    const apiKey = creditsKey || fallbackKey || '';
    const apiKeySource = creditsKey ? 'GEMINI_CREDITS_API_KEY' : (fallbackKey ? 'GEMINI_API_KEY' : null);
    if (required && !apiKey) {
        throw new Error('Nenhuma chave Gemini encontrada. Configure GEMINI_CREDITS_API_KEY (preferencial) ou GEMINI_API_KEY no .env.');
    }
    return {
        apiKey,
        apiKeySource,
        model: asTrimmedText(model) || GEMINI_DEFAULT_MODEL
    };
}

function isYouTubeHost(hostname) {
    const host = String(hostname || '').toLowerCase();
    return host === 'youtube.com'
        || host === 'www.youtube.com'
        || host === 'm.youtube.com'
        || host === 'youtu.be'
        || host.endsWith('.youtube.com');
}

function extractYouTubeVideoId(urlLike) {
    try {
        const parsed = new URL(String(urlLike || '').trim());
        const host = String(parsed.hostname || '').toLowerCase();
        if (!isYouTubeHost(host)) return null;

        if (host === 'youtu.be') {
            const parts = parsed.pathname.split('/').filter(Boolean);
            return parts[0] || null;
        }

        const v = parsed.searchParams.get('v');
        if (v) return v;

        const parts = parsed.pathname.split('/').filter(Boolean);
        const marker = parts.findIndex(part => part === 'shorts' || part === 'live' || part === 'embed');
        if (marker >= 0 && parts[marker + 1]) return parts[marker + 1];
        return null;
    } catch (_) {
        return null;
    }
}

function mojibakeScore(value) {
    const text = String(value || '');
    if (!text) return 0;
    const matches = text.match(/[ÃÂâ€œâ€â€˜â€™â€“â€”�]/g);
    return matches ? matches.length : 0;
}

function maybeFixUtf8Mojibake(value) {
    const original = String(value || '');
    if (!original) return '';
    let candidate = '';
    try {
        candidate = Buffer.from(original, 'latin1').toString('utf8');
    } catch (_) {
        return original;
    }
    if (!candidate) return original;
    return mojibakeScore(candidate) < mojibakeScore(original) ? candidate : original;
}

function normalizeYouTubeTranscriptLine(value) {
    const raw = String(value || '').replace(/\u00a0/g, ' ');
    const repaired = maybeFixUtf8Mojibake(raw);
    return repaired.replace(/\s+/g, ' ').trim();
}

async function ensureYoutubeTranscriptClient() {
    if (YoutubeTranscript && typeof YoutubeTranscript.fetchTranscript === 'function') {
        return YoutubeTranscript;
    }
    if (youtubeTranscriptLoadTried) return null;
    youtubeTranscriptLoadTried = true;

    const coerceTranscriptClient = (rawModule) => {
        if (!rawModule) return null;
        const candidate = rawModule.YoutubeTranscript
            || (rawModule.default && rawModule.default.YoutubeTranscript)
            || null;
        if (candidate && typeof candidate.fetchTranscript === 'function') return candidate;

        const fetchTranscript = rawModule.fetchTranscript
            || (rawModule.default && rawModule.default.fetchTranscript)
            || null;
        if (typeof fetchTranscript === 'function') {
            return { fetchTranscript: (videoId, opts) => fetchTranscript(videoId, opts) };
        }
        return null;
    };

    try {
        const esmModule = await import('youtube-transcript');
        const candidate = coerceTranscriptClient(esmModule);
        if (candidate) {
            YoutubeTranscript = candidate;
            return YoutubeTranscript;
        }
    } catch (_) {
        // noop: fallback to explicit module path below
    }

    try {
        // Some builds expose an empty namespace at package root in CJS projects.
        const esmModule = await import('youtube-transcript/dist/youtube-transcript.esm.js');
        const candidate = coerceTranscriptClient(esmModule);
        if (candidate) {
            YoutubeTranscript = candidate;
            return YoutubeTranscript;
        }
    } catch (_) {
        // noop: fallback to require below
    }

    try {
        const cjsModule = require('youtube-transcript');
        const candidate = coerceTranscriptClient(cjsModule);
        if (candidate) {
            YoutubeTranscript = candidate;
            return YoutubeTranscript;
        }
    } catch (_) {
        // noop
    }

    try {
        const cjsModule = require('youtube-transcript/dist/youtube-transcript.common.js');
        const candidate = coerceTranscriptClient(cjsModule);
        if (candidate) {
            YoutubeTranscript = candidate;
            return YoutubeTranscript;
        }
    } catch (_) {
        // noop
    }

    return null;
}

function removeFileQuietly(filePath) {
    try {
        if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (_) {
        // no-op
    }
}

function stripMarkdownCodeFence(rawText) {
    let text = String(rawText || '').trim();
    if (!text) return '';
    if (/^```/m.test(text)) {
        text = text.replace(/^```[a-zA-Z0-9_-]*\s*/m, '');
        text = text.replace(/\s*```$/, '');
    }
    return text.trim();
}

function extractGeminiText(payload) {
    const candidates = asArray(payload && payload.candidates);
    for (const candidate of candidates) {
        const parts = asArray(candidate && candidate.content && candidate.content.parts);
        const text = parts
            .map(part => (part && typeof part.text === 'string') ? part.text : '')
            .filter(Boolean)
            .join('\n')
            .trim();
        if (text) return text;
    }
    return '';
}

function guessMimeTypeByExt(extension) {
    const ext = String(extension || '').toLowerCase().replace(/^\./, '');
    if (ext === 'm4a') return 'audio/mp4';
    if (ext === 'mp3') return 'audio/mpeg';
    if (ext === 'ogg' || ext === 'opus') return 'audio/ogg';
    if (ext === 'wav') return 'audio/wav';
    return 'audio/webm';
}

function pickYouTubeAudioFormat(formats) {
    return asArray(formats)
        .filter(format => format && format.url)
        .sort((a, b) => {
            const bitrateA = Number(a.audioBitrate || a.bitrate || 0);
            const bitrateB = Number(b.audioBitrate || b.bitrate || 0);
            if (bitrateA !== bitrateB) return bitrateA - bitrateB;
            const itagA = Number(a.itag || 0);
            const itagB = Number(b.itag || 0);
            return itagA - itagB;
        })[0] || null;
}

async function ensureYtDlpClient() {
    if (ytDlpClient) return ytDlpClient;
    if (!ytDlpReadyPromise) {
        ytDlpReadyPromise = (async () => {
            ensureDir(YT_DLP_BIN_DIR);
            if (!fs.existsSync(YT_DLP_BIN_PATH)) {
                await YtDlpWrap.downloadFromGithub(YT_DLP_BIN_PATH);
            }
            ytDlpClient = new YtDlpWrap(YT_DLP_BIN_PATH);
            return ytDlpClient;
        })();
    }
    return ytDlpReadyPromise;
}

async function downloadYouTubeAudioToTempViaYtdl(urlLike, videoId) {
    const info = await ytdl.getInfo(urlLike);
    const audioFormats = ytdl.filterFormats(info.formats || [], 'audioonly');
    const selected = pickYouTubeAudioFormat(audioFormats);
    if (!selected) throw new Error('Nao foi possivel localizar um stream de audio para transcricao via API.');

    const ext = String(selected.container || 'webm').toLowerCase().replace(/[^a-z0-9]/g, '') || 'webm';
    const tempDir = path.join(CONTROL_DIR, 'tmp_audio');
    ensureDir(tempDir);
    const tempPath = path.join(tempDir, `yt_audio_${videoId}_${Date.now()}.${ext}`);

    await new Promise((resolve, reject) => {
        const downloadStream = ytdl.downloadFromInfo(info, { quality: selected.itag, filter: 'audioonly' });
        const writeStream = fs.createWriteStream(tempPath);
        const fail = (error) => {
            removeFileQuietly(tempPath);
            reject(error);
        };
        downloadStream.on('error', fail);
        writeStream.on('error', fail);
        writeStream.on('finish', resolve);
        downloadStream.pipe(writeStream);
    });

    const bytes = fs.statSync(tempPath).size;
    const mimeType = String(selected.mimeType || '').split(';')[0] || guessMimeTypeByExt(ext);
    return { filePath: tempPath, bytes, mimeType };
}

async function downloadYouTubeAudioToTempViaYtDlp(urlLike, videoId) {
    const ytDlp = await ensureYtDlpClient();
    const tempDir = path.join(CONTROL_DIR, 'tmp_audio');
    ensureDir(tempDir);
    const token = `yt_audio_${videoId}_${Date.now()}`;
    const outputTemplate = path.join(tempDir, `${token}.%(ext)s`);

    const stdOut = await ytDlp.execPromise([
        '--no-playlist',
        '--no-warnings',
        '-f',
        'bestaudio/best',
        '--print',
        'after_move:filepath',
        '-o',
        outputTemplate,
        String(urlLike || '').trim()
    ]);

    let resolvedPath = String(stdOut || '')
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(Boolean)
        .pop() || '';
    if (resolvedPath) {
        resolvedPath = resolvedPath.replace(/^"+|"+$/g, '');
    }

    if (!resolvedPath || !fs.existsSync(resolvedPath)) {
        const candidates = fs.readdirSync(tempDir)
            .filter(name => name.startsWith(token))
            .map(name => path.join(tempDir, name));
        if (candidates.length) {
            resolvedPath = candidates.sort((a, b) => {
                const aSize = fs.statSync(a).size;
                const bSize = fs.statSync(b).size;
                return bSize - aSize;
            })[0];
        }
    }

    if (!resolvedPath || !fs.existsSync(resolvedPath)) {
        throw new Error('yt-dlp nao retornou um arquivo de audio baixado.');
    }
    const ext = path.extname(resolvedPath).toLowerCase().replace(/^\./, '');
    const bytes = fs.statSync(resolvedPath).size;
    const mimeType = guessMimeTypeByExt(ext);
    return { filePath: resolvedPath, bytes, mimeType };
}

async function downloadYouTubeAudioToTemp(urlLike, videoId) {
    let firstError = null;
    try {
        return await downloadYouTubeAudioToTempViaYtdl(urlLike, videoId);
    } catch (error) {
        firstError = error;
    }
    try {
        return await downloadYouTubeAudioToTempViaYtDlp(urlLike, videoId);
    } catch (fallbackError) {
        const message = [
            'Nao foi possivel baixar audio do YouTube para transcricao via API.',
            `ytdl: ${firstError ? firstError.message : 'sem detalhes'}`,
            `yt-dlp: ${fallbackError ? fallbackError.message : 'sem detalhes'}`
        ].join(' ');
        throw new Error(message);
    }
}

async function uploadGeminiFile({ apiKey, filePath, mimeType, displayName }) {
    const fileBuffer = fs.readFileSync(filePath);
    const startRes = await fetch(`https://generativelanguage.googleapis.com/upload/v1beta/files?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'X-Goog-Upload-Protocol': 'resumable',
            'X-Goog-Upload-Command': 'start',
            'X-Goog-Upload-Header-Content-Length': String(fileBuffer.length),
            'X-Goog-Upload-Header-Content-Type': mimeType,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ file: { display_name: displayName || path.basename(filePath) } })
    });
    if (!startRes.ok) {
        const startBody = await startRes.text().catch(() => '');
        throw new Error(`Falha ao iniciar upload Gemini Files API (${startRes.status}): ${startBody || 'sem detalhes'}`);
    }
    const uploadUrl = startRes.headers.get('x-goog-upload-url');
    if (!uploadUrl) throw new Error('Gemini Files API nao retornou URL de upload.');

    const uploadRes = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
            'Content-Type': mimeType,
            'X-Goog-Upload-Offset': '0',
            'X-Goog-Upload-Command': 'upload, finalize'
        },
        body: fileBuffer
    });
    const uploadData = await uploadRes.json().catch(() => ({}));
    if (!uploadRes.ok) {
        throw new Error(uploadData.error?.message || `Falha ao enviar audio para Gemini Files API (${uploadRes.status}).`);
    }

    const fileMeta = uploadData.file || uploadData;
    const uri = fileMeta.uri || fileMeta.file_uri || null;
    const name = fileMeta.name || null;
    const resolvedMimeType = fileMeta.mimeType || fileMeta.mime_type || mimeType;
    if (!uri || !name) throw new Error('Gemini Files API nao retornou metadados validos do arquivo enviado.');
    return { uri, name, mimeType: resolvedMimeType };
}

async function deleteGeminiFile({ apiKey, fileName }) {
    const name = String(fileName || '').trim();
    if (!apiKey || !name) return;
    const resource = name.startsWith('files/') ? name : `files/${name.replace(/^\/+/, '')}`;
    try {
        await fetch(`https://generativelanguage.googleapis.com/v1beta/${resource}?key=${apiKey}`, { method: 'DELETE' });
    } catch (_) {
        // no-op
    }
}

async function transcribeYouTubeAudioWithGemini(urlLike, videoId) {
    const config = resolveGeminiApiConfig({ required: true, model: GEMINI_TRANSCRIBE_MODEL });
    const downloadedAudio = await downloadYouTubeAudioToTemp(urlLike, videoId);
    let uploaded = null;
    try {
        uploaded = await uploadGeminiFile({
            apiKey: config.apiKey,
            filePath: downloadedAudio.filePath,
            mimeType: downloadedAudio.mimeType,
            displayName: `yt_audio_${videoId}_${Date.now()}`
        });

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(config.model)}:generateContent?key=${config.apiKey}`;
        const prompt = [
            'Transcreva TODO o audio com fidelidade.',
            'Regras obrigatorias:',
            '- Nao resuma, nao explique, nao analise.',
            '- Retorne apenas a transcricao linear, em texto puro.',
            '- Preserve a ordem cronologica das falas.'
        ].join('\n');

        const geminiRes = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: prompt },
                        {
                            file_data: {
                                mime_type: uploaded.mimeType,
                                file_uri: uploaded.uri
                            }
                        }
                    ]
                }],
                generationConfig: { temperature: 0 }
            })
        });

        const geminiData = await geminiRes.json().catch(() => ({}));
        if (!geminiRes.ok) {
            throw new Error(geminiData.error?.message || `Falha na transcricao de audio via Gemini (${geminiRes.status}).`);
        }

        let transcriptText = extractGeminiText(geminiData);
        transcriptText = stripMarkdownCodeFence(transcriptText);
        transcriptText = maybeFixUtf8Mojibake(transcriptText);
        transcriptText = transcriptText.replace(/\r\n/g, '\n').trim();
        if (!transcriptText) throw new Error('A API Gemini retornou audio sem transcricao utilizavel.');

        const lines = transcriptText
            .split(/\n+/)
            .map(normalizeYouTubeTranscriptLine)
            .filter(Boolean);
        if (!lines.length) throw new Error('A transcricao de audio retornou sem linhas validas.');

        return {
            lines,
            model: config.model,
            api_key_source: config.apiKeySource,
            audio_bytes: downloadedAudio.bytes
        };
    } finally {
        await deleteGeminiFile({ apiKey: config.apiKey, fileName: uploaded && uploaded.name });
        removeFileQuietly(downloadedAudio.filePath);
    }
}

function buildYouTubeTranscriptMarkdown({ urlLike, videoId, lines, mode, model = null }) {
    const body = asArray(lines).join('\n').replace(/\n{3,}/g, '\n\n').trim();
    if (!body) throw new Error('Transcricao retornou sem conteudo util.');
    const metadataRows = [
        `- source_url: ${String(urlLike || '').trim()}`,
        `- video_id: ${videoId}`,
        `- extracted_at: ${nowIso()}`,
        `- mode: ${mode || 'youtube_transcript'}`
    ];
    if (model) metadataRows.push(`- model: ${model}`);
    return [
        '# Transcricao YouTube',
        '',
        ...metadataRows,
        '',
        '## Conteudo',
        body,
        ''
    ].join('\n');
}

async function fetchYouTubeTranscriptMarkdown(urlLike, options = {}) {
    const videoId = extractYouTubeVideoId(urlLike);
    if (!videoId) throw new Error('Nao foi possivel identificar o ID do video YouTube.');

    const forceAudioApi = Boolean(options && options.forceAudioApi);
    const allowAudioFallback = (options && options.allowAudioFallback !== false) && YOUTUBE_AUDIO_FALLBACK_ENABLED;
    let lastCaptionError = null;

    if (!forceAudioApi) {
        const transcriptClient = await ensureYoutubeTranscriptClient();
        if (transcriptClient && typeof transcriptClient.fetchTranscript === 'function') {
            const languageOrder = ['pt', 'pt-BR', 'en'];
            let transcriptItems = [];

            for (const lang of languageOrder) {
                try {
                    const fetched = await transcriptClient.fetchTranscript(videoId, { lang });
                    if (Array.isArray(fetched) && fetched.length) {
                        transcriptItems = fetched;
                        break;
                    }
                } catch (error) {
                    lastCaptionError = error;
                }
            }

            if (!transcriptItems.length) {
                try {
                    const fetched = await transcriptClient.fetchTranscript(videoId);
                    if (Array.isArray(fetched) && fetched.length) transcriptItems = fetched;
                } catch (error) {
                    lastCaptionError = error;
                }
            }

            if (transcriptItems.length) {
                const lines = transcriptItems
                    .map(item => normalizeYouTubeTranscriptLine(item && item.text))
                    .filter(Boolean);
                return {
                    mode: 'youtube_transcript',
                    video_id: videoId,
                    markdown: buildYouTubeTranscriptMarkdown({
                        urlLike,
                        videoId,
                        lines,
                        mode: 'youtube_transcript'
                    })
                };
            }
        } else {
            lastCaptionError = new Error('Dependencia youtube-transcript indisponivel no servidor.');
        }
    }

    if (!allowAudioFallback) {
        throw new Error(lastCaptionError ? lastCaptionError.message : 'Transcricao nao encontrada para este video.');
    }

    const audioApiResult = await transcribeYouTubeAudioWithGemini(urlLike, videoId);
    return {
        mode: 'youtube_audio_api',
        video_id: videoId,
        model: audioApiResult.model,
        api_key_source: audioApiResult.api_key_source,
        markdown: buildYouTubeTranscriptMarkdown({
            urlLike,
            videoId,
            lines: audioApiResult.lines,
            mode: 'youtube_audio_api',
            model: audioApiResult.model
        })
    };
}

function resolvePersonaSourceAsset(personaId, sourcePath) {
    const normalizedPath = normalizePathForJson(sourcePath);
    if (!normalizedPath) return null;
    const { entry } = findPersonaMaterialEntry(personaId, false);
    if (!entry) return null;

    if (normalizePathForJson(entry.clone_file || '') === normalizedPath) {
        return { kind: 'clone', path: normalizedPath };
    }
    if (asArray(entry.transcript_files).map(normalizePathForJson).includes(normalizedPath)) {
        return { kind: 'transcript', path: normalizedPath };
    }
    if (asArray(entry.full_transcript_files).map(normalizePathForJson).includes(normalizedPath)) {
        return { kind: 'full_transcript', path: normalizedPath };
    }
    if (asArray(entry.support_files).map(normalizePathForJson).includes(normalizedPath)) {
        return { kind: 'support', path: normalizedPath };
    }
    return null;
}

function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function readControlJson(filename, defaultValue = {}) {
    const filePath = path.join(CONTROL_DIR, filename);
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`[WARN] File not found: ${filename}. Returning default.`);
            return defaultValue;
        }
        const data = fs.readFileSync(filePath, 'utf8');
        if (!data || data.trim() === '') return defaultValue;
        return JSON.parse(data);
    } catch (err) {
        console.error(`[ERROR] Failed to read/parse ${filename}:`, err.message);
        // Important fallbacks for critical structures
        if (filename === 'registry.json') return { squads: [], agents: [], checkpoints: [], alerts: [], personas: [], tracked_files: [] };
        if (filename === 'build_state.json') return { phases: [] };
        return defaultValue;
    }
}

function writeControlJson(filename, data) {
    ensureDir(CONTROL_DIR);
    writeJsonAtomic(path.join(CONTROL_DIR, filename), data, 2);
}

function writeFileAtomic(fullPath, content) {
    ensureDir(path.dirname(fullPath));
    const tempPath = path.join(
        path.dirname(fullPath),
        `.${path.basename(fullPath)}.${process.pid}.${Date.now()}.tmp`
    );
    let fd = null;
    try {
        fd = fs.openSync(tempPath, 'w');
        fs.writeFileSync(fd, content, 'utf8');
        fs.fsyncSync(fd);
        fs.closeSync(fd);
        fd = null;
        fs.renameSync(tempPath, fullPath);
    } catch (error) {
        if (fd !== null) {
            try { fs.closeSync(fd); } catch (_) { /* ignore */ }
        }
        try {
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        } catch (_) { /* ignore */ }
        throw error;
    }
}

function writeJsonAtomic(fullPath, data, spaces = 2) {
    const content = `${JSON.stringify(data, null, spaces)}\n`;
    JSON.parse(content);
    writeFileAtomic(fullPath, content);
}

// â”€â”€ JSON Rotation (P1 audit fix) â”€â”€
const ARCHIVE_DIR = path.join(CONTROL_DIR, 'archive');
const ROTATION_CONFIG = {
    [FILES.logs]: { key: 'entries', maxEntries: 500 },
    [FILES.memoryMutations]: { key: 'mutations', maxEntries: 300 },
    [FILES.snapshots]: { key: 'snapshots', maxEntries: 200 },
    [FILES.memoryRuns]: { key: 'items', maxEntries: 400 },
    [FILES.session]: { key: 'history', maxEntries: 100 }
};

function rotateControlJsonArray(filename) {
    const config = ROTATION_CONFIG[filename];
    if (!config) return;
    const data = readControlJson(filename, {});
    const items = asArray(data[config.key]);
    if (items.length <= config.maxEntries) return;
    const keep = items.slice(-config.maxEntries);
    const archived = items.slice(0, items.length - config.maxEntries);
    ensureDir(ARCHIVE_DIR);
    const ts = dayKey();
    const baseName = filename.replace('.json', '');
    const archivePath = path.join(ARCHIVE_DIR, `${baseName}_archive_${ts}.json`);
    let existing = [];
    try {
        if (fs.existsSync(archivePath)) {
            const prev = JSON.parse(fs.readFileSync(archivePath, 'utf8'));
            existing = asArray(prev[config.key] || prev.items || prev.entries || prev.mutations || prev.snapshots);
        }
    } catch (_) { /* ignore */ }
    const merged = existing.concat(archived);
    writeJsonAtomic(archivePath, { [config.key]: merged, rotated_at: nowIso() }, 2);
    data[config.key] = keep;
    writeControlJson(filename, data);
    console.log(`[ROTATION] ${filename}: archived ${archived.length} entries, kept ${keep.length}`);
}

function ensureControlJson(filename, fallback) {
    const data = readControlJson(filename, null);
    if (data !== null) return data;
    writeControlJson(filename, fallback);
    return fallback;
}

function readText(fullPath, fallback = '') {
    try {
        if (!fs.existsSync(fullPath)) return fallback;
        return fs.readFileSync(fullPath, 'utf8');
    } catch (_) {
        return fallback;
    }
}

function writeText(fullPath, content) {
    const text = String(content ?? '');
    if (path.extname(fullPath).toLowerCase() === '.json') {
        JSON.parse(text || '{}');
    }
    writeFileAtomic(fullPath, text);
}

function workspaceRelativePath(fullPath) {
    return normalizePathForJson(path.relative(ROOT_DIR, fullPath));
}

function timestampForFile() {
    return nowIso().replace(/[:.]/g, '-');
}

function appendHarmonizationLedger(content, entry) {
    const start = '<!-- AIOX-HARMONIZATION-LOG:START -->';
    const end = '<!-- AIOX-HARMONIZATION-LOG:END -->';
    const line = `- ${entry.at} | source: \`${entry.source_path}\` | staging: \`${entry.staging_path}\` | candidate: \`${entry.candidate_path}\``;
    const blockPattern = new RegExp(`\\n?${start}[\\s\\S]*?${end}\\n?`, 'm');
    const existingMatch = content.match(blockPattern);
    let previousLines = [];

    if (existingMatch) {
        previousLines = existingMatch[0]
            .split(/\r?\n/)
            .map(item => item.trim())
            .filter(item => item.startsWith('- ') && item !== line);
        content = content.replace(blockPattern, '').trimEnd();
    }

    const ledger = [
        start,
        '## Fontes Harmonizadas',
        ...previousLines,
        line,
        end
    ].join('\n');

    return `${content.trimEnd()}\n\n${ledger}\n`;
}

function normalizeAuditDecision(value) {
    const raw = String(value || '').toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (raw.includes('ANEXAR_APENAS') || raw.includes('ANEXAR APENAS')) return 'ANEXAR_APENAS';
    if (raw.includes('REJEITAR')) return 'REJEITAR';
    if (raw.includes('REVISAR')) return 'REVISAR';
    if (raw.includes('APROVAR')) return 'APROVAR';
    return 'REVISAR';
}

function parseNectarAuditDecision(markdown) {
    const text = String(markdown || '');
    const decisionMatch = text.match(/##\s*Decis[aã]o\s*\n+([A-Z_ ]+)/i);
    const scoreMatch = text.match(/##\s*Nota Geral\s*\n+(\d{1,3})/i);
    const riskMatch = text.match(/##\s*Risco de Dilu[ií]c[aã]o\s*\n+([^\n]+)/i);
    return {
        decision: normalizeAuditDecision(decisionMatch ? decisionMatch[1] : text.slice(0, 500)),
        score: scoreMatch ? Math.max(0, Math.min(100, Number(scoreMatch[1]))) : null,
        dilution_risk: riskMatch ? riskMatch[1].trim() : ''
    };
}

async function runNectarAudit({ personaId, linkedAsset, cloneRelPath, cloneContent, stagingFullPath, nectarData, geminiConfig }) {
    const sourceContent = readText(safeWorkspacePath(linkedAsset.path), '').slice(0, 90000);
    const baseFilename = path.basename(linkedAsset.path).replace(/\.[^/.]+$/, '');
    const reviewDir = path.join(ROOT_DIR, 'knowledge', 'clones', 'reviews');
    ensureDir(reviewDir);
    const reviewFileName = `${personaId}_${slugifySegment(baseFilename) || 'source'}_review_${timestampForFile()}.md`;
    const reviewFullPath = path.join(reviewDir, reviewFileName);
    const reviewRelPath = workspaceRelativePath(reviewFullPath);
    const stagingRelPath = workspaceRelativePath(stagingFullPath);

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(geminiConfig.model)}:generateContent?key=${geminiConfig.apiKey}`;
    const prompt = `Voce e o Nectar Auditor (AGT-QRO-03), auditor premium de qualidade de clones.
Sua funcao e decidir se o nectar pode influenciar a Base do Clone.

Decisoes permitidas:
- APROVAR: material excelente, compativel, novo e com baixo risco.
- REVISAR: ha valor, mas o payload precisa poda/edicao antes.
- REJEITAR: material fraco, contraditorio, ruidoso ou perigoso.
- ANEXAR_APENAS: manter como arquivo de referencia, sem alterar a base.

Use as skills:
1. NectarSourceQuality
2. CloneCompatibilityAudit
3. RedundancyNoveltyScan
4. DilutionRiskGate
5. PremiumHeuristicExtraction
6. HarmonizationDecisionBrief

Regras de gate:
- Se houver risco alto de diluicao, nao aprove.
- Se a fonte for generica ou repetitiva, prefira ANEXAR_APENAS.
- Se houver material bom mas baguncado, prefira REVISAR.
- Aprove somente quando o material melhora claramente o clone.

Retorne apenas Markdown neste formato:
# Parecer de Nectar

## Decisao
APROVAR | REVISAR | REJEITAR | ANEXAR_APENAS

## Nota Geral
0-100

## Risco de Diluicao
Baixo | Medio | Alto | Critico

## Evidencias
- ...

## O Que Pode Entrar
- ...

## O Que Deve Ficar Fora
- ...

## Conflitos com a Base Atual
- ...

## Recomendacao Final
...

[METADADOS]
persona_id: ${personaId}
clone_path: ${cloneRelPath}
source_path: ${linkedAsset.path}
staging_path: ${stagingRelPath}
[/METADADOS]

[BASE_ATUAL_DO_CLONE]
${String(cloneContent || '').slice(0, 90000)}
[/BASE_ATUAL_DO_CLONE]

[NECTAR_EXTRAIDO]
${String(nectarData || '').slice(0, 60000)}
[/NECTAR_EXTRAIDO]

[FONTE_ORIGINAL]
${sourceContent}
[/FONTE_ORIGINAL]`;

    const auditRes = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const auditData = await auditRes.json();
    if (!auditRes.ok) throw new Error(auditData.error?.message || 'Falha na API Gemini durante auditoria de nectar.');

    let reviewMarkdown = stripMarkdownCodeFence(extractGeminiText(auditData)).trim();
    if (!reviewMarkdown) throw new Error('A auditoria de nectar nao retornou parecer utilizavel.');
    const parsed = parseNectarAuditDecision(reviewMarkdown);
    const header = [
        '<!-- AIOX-NECTAR-AUDIT:START -->',
        `- persona_id: ${personaId}`,
        `- source_path: ${linkedAsset.path}`,
        `- clone_path: ${cloneRelPath}`,
        `- staging_path: ${stagingRelPath}`,
        `- audited_at: ${nowIso()}`,
        `- decision: ${parsed.decision}`,
        `- score: ${parsed.score ?? '-'}`,
        `- dilution_risk: ${parsed.dilution_risk || '-'}`,
        '<!-- AIOX-NECTAR-AUDIT:END -->',
        ''
    ].join('\n');
    reviewMarkdown = `${header}${reviewMarkdown.trim()}\n`;
    writeText(reviewFullPath, reviewMarkdown);

    const trackingFile = path.join(CONTROL_DIR, 'extracted_assets.json');
    const trackingData = ensureControlJson('extracted_assets.json', { extractions: {} });
    const previous = trackingData.extractions[linkedAsset.path] || {};
    trackingData.extractions[linkedAsset.path] = {
        ...previous,
        date: nowIso(),
        persona_id: personaId,
        extracted: previous.extracted !== false,
        audit_status: parsed.decision,
        audit_score: parsed.score,
        audit_risk: parsed.dilution_risk,
        audit_path: reviewRelPath,
        last_audited_at: nowIso(),
        audit_count: Number(previous.audit_count || 0) + 1
    };
    writeJsonAtomic(trackingFile, trackingData, 4);

    appendExecutionLog('persona_asset_audit', personaId, `Nectar audit ${parsed.decision}: ${linkedAsset.path}`, 'nectar-auditor', null, null);
    return { ...parsed, review_path: reviewRelPath, model: geminiConfig.model, api_key_source: geminiConfig.apiKeySource };
}

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let raw = '';
        req.on('data', chunk => { raw += chunk.toString(); });
        req.on('end', () => {
            if (!raw.trim()) return resolve({});
            try {
                resolve(JSON.parse(raw));
            } catch (error) {
                reject(error);
            }
        });
    });
}

function sendJson(res, data, code = 200) {
    res.writeHead(code, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(data));
}

function sendText(res, data, contentType = 'text/plain', code = 200) {
    res.writeHead(code, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
}

function safeWorkspacePath(relativePath) {
    const cleaned = String(relativePath || '').replace(/^[/\\]+/, '');
    const absolute = path.resolve(ROOT_DIR, cleaned);
    if (!absolute.toLowerCase().startsWith(ROOT_DIR.toLowerCase())) {
        throw new Error('Path outside workspace is not allowed');
    }
    return absolute;
}

function normalizePathForJson(inputPath) {
    return String(inputPath || '').trim().replace(/\\/g, '/').replace(/^\/+/, '');
}

const MEMORY_SYNC_EXACT_FILES = new Set([
    'task.md',
    'docs/control/session_state.json',
    'docs/control/context_snapshots.json',
    'docs/control/execution_log.json'
]);

const MEMORY_SYNC_PREFIXES = [
    'docs/memory/',
    'docs/control/memory_',
    'docs/control/sessions/'
];

function cloudSyncDefaultState() {
    return {
        auto_sync_memory: false,
        in_progress: false,
        pending_trigger: null,
        last_sync_id: null,
        last_status: 'idle',
        last_summary: 'Nenhuma sincronizacao executada.',
        last_trigger: null,
        last_scope: null,
        last_target: null,
        last_started_at: null,
        last_completed_at: null,
        github: {},
        firebase: {}
    };
}

function loadCloudSyncState() {
    const merged = Object.assign(
        cloudSyncDefaultState(),
        ensureControlJson(FILES.cloudSync, cloudSyncDefaultState()) || {}
    );
    if (typeof merged.auto_sync_memory !== 'boolean') merged.auto_sync_memory = true;
    if (typeof merged.in_progress !== 'boolean') merged.in_progress = false;
    if (!merged.github || typeof merged.github !== 'object') merged.github = {};
    if (!merged.firebase || typeof merged.firebase !== 'object') merged.firebase = {};
    return merged;
}

function writeCloudSyncState(state) {
    writeControlJson(FILES.cloudSync, state);
}

function isMemorySyncPath(relativePath) {
    const normalized = normalizePathForJson(relativePath);
    if (!normalized) return false;
    if (MEMORY_SYNC_EXACT_FILES.has(normalized)) return true;
    return MEMORY_SYNC_PREFIXES.some(prefix => normalized.startsWith(prefix));
}

function runCommand(command, args, options = {}) {
    return new Promise((resolve) => {
        const startedAt = Date.now();
        const useWindowsCmd = process.platform === 'win32' && command === 'firebase';
        const executable = useWindowsCmd ? 'cmd.exe' : command;
        const finalArgs = useWindowsCmd ? ['/d', '/s', '/c', 'firebase'].concat(args || []) : (args || []);
        const child = spawn(executable, finalArgs, {
            cwd: options.cwd || ROOT_DIR,
            shell: false,
            windowsHide: true
        });

        let stdout = '';
        let stderr = '';

        child.stdout.on('data', chunk => { stdout += chunk.toString(); });
        child.stderr.on('data', chunk => { stderr += chunk.toString(); });

        child.on('error', (error) => {
            resolve({
                ok: false,
                code: -1,
                stdout: stdout.trim(),
                stderr: `${stderr}\n${error.message}`.trim(),
                duration_ms: Date.now() - startedAt,
                command: [executable].concat(finalArgs || []).join(' ')
            });
        });

        child.on('close', (code) => {
            resolve({
                ok: code === 0,
                code,
                stdout: stdout.trim(),
                stderr: stderr.trim(),
                duration_ms: Date.now() - startedAt,
                command: [executable].concat(finalArgs || []).join(' ')
            });
        });
    });
}

function parsePorcelainPath(line) {
    const raw = String(line || '');
    if (raw.length < 4) return null;
    const payload = raw.slice(3).trim();
    if (!payload) return null;
    const arrow = ' -> ';
    if (payload.includes(arrow)) {
        const parts = payload.split(arrow);
        return normalizePathForJson(parts[parts.length - 1]);
    }
    return normalizePathForJson(payload);
}

async function listGitChangedPaths() {
    const status = await runCommand('git', ['status', '--porcelain']);
    if (!status.ok) return [];
    return status.stdout
        .split(/\r?\n/)
        .map(parsePorcelainPath)
        .filter(Boolean);
}

function cloudCommitMessage(scope, trigger) {
    const stamp = nowIso().replace('T', ' ').slice(0, 19);
    const label = scope === 'memory' ? 'memory' : 'workspace';
    const reason = trigger ? ` (${trigger})` : '';
    return `chore(${label}): cloud sync ${stamp}${reason}`;
}

async function runGitHubSync(scope, commitMessage) {
    const result = {
        status: 'skipped',
        note: 'Nao executado.',
        scope,
        changed_files: 0,
        commit_message: null,
        branch: null
    };

    const inside = await runCommand('git', ['rev-parse', '--is-inside-work-tree']);
    if (!inside.ok || inside.stdout !== 'true') {
        result.status = 'error';
        result.note = 'Repositorio Git nao encontrado.';
        result.error = inside.stderr || inside.stdout || 'git rev-parse falhou';
        return result;
    }

    let targetFiles = [];
    if (scope === 'memory') {
        const changed = await listGitChangedPaths();
        targetFiles = changed.filter(isMemorySyncPath);
        result.changed_files = targetFiles.length;
        if (!targetFiles.length) {
            result.status = 'skipped';
            result.note = 'Sem alteracoes de memoria para commit.';
            return result;
        }
        const addResult = await runCommand('git', ['add', '--'].concat(targetFiles));
        if (!addResult.ok) {
            result.status = 'error';
            result.note = 'Falha ao preparar arquivos de memoria para commit.';
            result.error = addResult.stderr || addResult.stdout || 'git add falhou';
            return result;
        }
    } else {
        const addResult = await runCommand('git', ['add', '-A']);
        if (!addResult.ok) {
            result.status = 'error';
            result.note = 'Falha ao preparar workspace para commit.';
            result.error = addResult.stderr || addResult.stdout || 'git add -A falhou';
            return result;
        }
    }

    const staged = await runCommand('git', ['diff', '--cached', '--quiet']);
    if (staged.code === 0) {
        result.status = 'skipped';
        result.note = 'Nao ha alteracoes em stage para commit.';
        return result;
    }
    if (staged.code !== 1) {
        result.status = 'error';
        result.note = 'Nao foi possivel validar alteracoes staged.';
        result.error = staged.stderr || staged.stdout || 'git diff --cached --quiet falhou';
        return result;
    }

    const finalCommitMessage = commitMessage || cloudCommitMessage(scope, 'manual');
    const commit = await runCommand('git', ['commit', '-m', finalCommitMessage]);
    if (!commit.ok) {
        result.status = 'error';
        result.note = 'Falha no commit.';
        result.error = commit.stderr || commit.stdout || 'git commit falhou';
        return result;
    }
    result.commit_message = finalCommitMessage;

    const branchRes = await runCommand('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
    const branch = branchRes.ok ? branchRes.stdout : 'master';
    result.branch = branch;

    const remotes = await runCommand('git', ['remote']);
    const remoteList = (remotes.stdout || '').split(/\r?\n/).map(v => v.trim()).filter(Boolean);
    if (!remoteList.length) {
        result.status = 'partial';
        result.note = 'Commit criado, mas sem remote configurado para push.';
        return result;
    }

    // Garante que objetos LFS sejam enviados antes do push regular
    const lfsCheck = await runCommand('git', ['lfs', 'status']);
    if (lfsCheck.ok && (lfsCheck.stdout || '').includes('Objects to be pushed')) {
        await runCommand('git', ['lfs', 'push', '--all', 'origin']);
    }

    const upstream = await runCommand('git', ['rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}']);
    const push = upstream.ok
        ? await runCommand('git', ['push'])
        : await runCommand('git', ['push', '-u', (remoteList.includes('origin') ? 'origin' : remoteList[0]), branch]);

    if (!push.ok) {
        result.status = 'partial';
        result.note = 'Commit criado, mas push falhou.';
        result.error = push.stderr || push.stdout || 'git push falhou';
        return result;
    }

    result.status = 'success';
    result.note = 'Commit e push enviados ao GitHub.';
    return result;
}

async function runFirebaseSync() {
    const deploy = await runCommand('firebase', ['deploy', '--only', 'hosting', '--non-interactive']);
    if (deploy.ok) {
        return {
            status: 'success',
            note: 'Deploy Firebase Hosting concluido.',
            duration_ms: deploy.duration_ms
        };
    }
    return {
        status: 'error',
        note: 'Falha no deploy Firebase Hosting.',
        error: deploy.stderr || deploy.stdout || 'firebase deploy falhou',
        duration_ms: deploy.duration_ms
    };
}

let cloudSyncBusy = false;
let cloudSyncQueuedPayload = null;
let cloudAutoSyncTimer = null;

async function runCloudSyncJob(payload = {}) {
    const request = {
        target: (payload.target || 'all'),
        scope: (payload.scope || 'memory'),
        trigger: payload.trigger || 'manual',
        initiated_by: payload.initiated_by || 'human',
        project_id: normalizeProjectId(payload.project_id || null),
        commit_message: payload.commit_message || null
    };

    if (cloudSyncBusy) {
        cloudSyncQueuedPayload = request;
        const state = loadCloudSyncState();
        state.pending_trigger = request.trigger;
        writeCloudSyncState(state);
        return { queued: true, in_progress: true, message: 'Sincronizacao ja em execucao. Novo pedido entrou na fila.' };
    }

    cloudSyncBusy = true;
    const syncId = `SYNC-${dayKey()}-${Date.now()}`;
    const state = loadCloudSyncState();
    state.in_progress = true;
    state.pending_trigger = null;
    state.last_sync_id = syncId;
    state.last_status = 'running';
    state.last_summary = 'Sincronizacao em andamento...';
    state.last_trigger = request.trigger;
    state.last_scope = request.scope;
    state.last_target = request.target;
    state.last_started_at = nowIso();
    writeCloudSyncState(state);

    let github = { status: 'skipped', note: 'Nao solicitado.' };
    let firebase = { status: 'skipped', note: 'Nao solicitado.' };

    try {
        if (request.target === 'all' || request.target === 'github') {
            github = await runGitHubSync(request.scope, request.commit_message || cloudCommitMessage(request.scope, request.trigger));
        }
        if (request.target === 'all' || request.target === 'firebase') {
            const shouldSkipFirebaseForMemoryNoChanges = request.target === 'all'
                && request.scope === 'memory'
                && github.status === 'skipped';
            if (shouldSkipFirebaseForMemoryNoChanges) {
                firebase = {
                    status: 'skipped',
                    note: 'Sem mudancas de memoria no GitHub; deploy Firebase ignorado.'
                };
            } else {
                firebase = await runFirebaseSync();
            }
        }

        const outcome = [github, firebase]
            .filter(item => item.status !== 'skipped')
            .map(item => item.status);

        const hasError = outcome.includes('error');
        const hasPartial = outcome.includes('partial');
        const status = hasError ? 'error' : (hasPartial ? 'partial' : 'success');
        const summary = [
            `Cloud sync ${syncId}: ${status.toUpperCase()}.`,
            `GitHub: ${github.status || 'skipped'} (${github.note || '-'})`,
            `Firebase: ${firebase.status || 'skipped'} (${firebase.note || '-'})`
        ].join(' ');

        const doneState = loadCloudSyncState();
        doneState.in_progress = false;
        doneState.pending_trigger = null;
        doneState.last_status = status;
        doneState.last_summary = summary;
        doneState.last_completed_at = nowIso();
        doneState.github = github;
        doneState.firebase = firebase;
        writeCloudSyncState(doneState);

        appendExecutionLog(
            'cloud_sync',
            syncId,
            summary,
            request.initiated_by,
            `target=${request.target}; scope=${request.scope}; trigger=${request.trigger}`,
            request.project_id
        );
        appendMemoryMutation('cloud_sync', summary, request.initiated_by);

        return {
            queued: false,
            in_progress: false,
            sync_id: syncId,
            status,
            summary,
            github,
            firebase
        };
    } finally {
        cloudSyncBusy = false;
        const queued = cloudSyncQueuedPayload;
        cloudSyncQueuedPayload = null;
        if (queued) {
            setTimeout(() => {
                runCloudSyncJob({
                    target: queued.target,
                    scope: queued.scope,
                    trigger: `queued:${queued.trigger}`,
                    initiated_by: queued.initiated_by,
                    project_id: queued.project_id,
                    commit_message: queued.commit_message
                }).catch(err => console.error('Queued cloud sync error:', err.message));
            }, 500);
        }
    }
}

function scheduleAutoCloudSync(trigger, projectId = null) {
    return { scheduled: false, reason: 'manual_only_mode' };
}

function coreMemoryFiles() {
    return [
        STARTUP_CONTEXT_REL_PATH,
        'docs/control/memory_current_state.json',
        'docs/control/memory_checkpoints.json',
        'docs/control/memory_decision_log.json',
        'docs/control/memory_execution_journal.json',
        'docs/control/memory_mutations.json',
        'docs/control/memory_open_loops.json'
    ];
}

function uniquePaths(paths) {
    return [...new Set(asArray(paths).map(normalizePathForJson).filter(Boolean))];
}

const MARKDOWN_BASE64_MIN_LENGTH = 600;

function isMarkdownAssetPath(relativePath) {
    const rel = normalizePathForJson(relativePath);
    return /\.(md|markdown|txt)$/i.test(rel);
}

function sanitizeMarkdownContent(rawContent) {
    const original = String(rawContent || '');
    let cleaned = original;
    const stats = {
        changed: false,
        original_bytes: Buffer.byteLength(original, 'utf8'),
        cleaned_bytes: 0,
        removed_markdown_images: 0,
        removed_html_images: 0,
        removed_data_uri_refs: 0,
        removed_base64_chunks: 0,
        removed_base64_chars: 0
    };

    cleaned = cleaned.replace(/!\[[^\]]*]\(([^)]+)\)/g, (_match, target) => {
        stats.removed_markdown_images += 1;
        return '';
    });

    cleaned = cleaned.replace(/<img\b[^>]*>/gi, () => {
        stats.removed_html_images += 1;
        return '';
    });

    cleaned = cleaned.replace(/^\s*\[[^\]]+]\s*:\s*<?\s*data:image\/[^\n>]+>?\s*$/gim, match => {
        stats.removed_data_uri_refs += 1;
        stats.removed_base64_chars += match.length;
        return '';
    });

    const base64ChunkPattern = new RegExp(`[A-Za-z0-9+/=]{${MARKDOWN_BASE64_MIN_LENGTH},}`, 'g');
    cleaned = cleaned.replace(base64ChunkPattern, chunk => {
        stats.removed_base64_chunks += 1;
        stats.removed_base64_chars += chunk.length;
        return '';
    });

    cleaned = cleaned
        .replace(/\r\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trimEnd();
    cleaned = cleaned ? `${cleaned}\n` : '';

    stats.cleaned_bytes = Buffer.byteLength(cleaned, 'utf8');
    stats.changed = cleaned !== original;

    return { cleaned, stats };
}

function cleanMarkdownFile(relativePath) {
    const rel = normalizePathForJson(relativePath);
    if (!isMarkdownAssetPath(rel)) {
        return {
            path: rel,
            exists: false,
            cleaned: false,
            skipped: true,
            reason: 'not_markdown'
        };
    }

    let absolutePath = null;
    try {
        absolutePath = safeWorkspacePath(rel);
    } catch (_) {
        return {
            path: rel,
            exists: false,
            cleaned: false,
            skipped: true,
            reason: 'outside_workspace'
        };
    }

    if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
        return {
            path: rel,
            exists: false,
            cleaned: false,
            skipped: true,
            reason: 'not_found'
        };
    }

    const original = fs.readFileSync(absolutePath, 'utf8');
    const { cleaned, stats } = sanitizeMarkdownContent(original);
    if (stats.changed) {
        writeText(absolutePath, cleaned);
    }

    return {
        path: rel,
        exists: true,
        cleaned: stats.changed,
        skipped: false,
        stats
    };
}

function collectPersonaMarkdownPaths(entry) {
    if (!entry || typeof entry !== 'object') return [];
    return uniquePaths([
        entry.clone_file || null,
        ...asArray(entry.transcript_files),
        ...asArray(entry.full_transcript_files),
        ...asArray(entry.support_files)
    ]).filter(isMarkdownAssetPath);
}

function cleanPersonaMarkdownAssets(personaId, initiatedBy = 'human') {
    const registry = ensureControlJson('registry.json', { personas: [] });
    const persona = asArray(registry.personas).find(item => item && item.id === personaId);
    if (!persona) throw new Error(`persona not found: ${personaId}`);

    const { entry } = findPersonaMaterialEntry(personaId, false);
    if (!entry) throw new Error(`persona materials not found: ${personaId}`);

    const paths = collectPersonaMarkdownPaths(entry);
    const fileResults = paths.map(pathValue => cleanMarkdownFile(pathValue));
    const cleanedFiles = fileResults.filter(item => item.cleaned);
    const cleanedBytes = cleanedFiles.reduce((acc, item) => {
        const before = item && item.stats ? item.stats.original_bytes : 0;
        const after = item && item.stats ? item.stats.cleaned_bytes : 0;
        return acc + Math.max(0, before - after);
    }, 0);

    appendExecutionLog(
        'persona_asset_cleanup',
        personaId,
        `Limpeza de markdown concluida: ${cleanedFiles.length}/${paths.length} arquivo(s) alterado(s), ${cleanedBytes} byte(s) removido(s).`,
        initiatedBy || 'human',
        'Remocao automatica de imagens/base64',
        null
    );

    return {
        persona_id: personaId,
        total_files: paths.length,
        changed_files: cleanedFiles.length,
        removed_bytes: cleanedBytes,
        files: fileResults
    };
}

function cleanPersonaMarkdownAsset(personaId, sourcePath, initiatedBy = 'human') {
    const registry = ensureControlJson('registry.json', { personas: [] });
    const persona = asArray(registry.personas).find(item => item && item.id === personaId);
    if (!persona) throw new Error(`persona not found: ${personaId}`);

    const linkedAsset = resolvePersonaSourceAsset(personaId, sourcePath);
    if (!linkedAsset || !linkedAsset.path) {
        throw new Error('source_path nao esta vinculado a esta persona.');
    }

    const result = cleanMarkdownFile(linkedAsset.path);
    if (!result.exists) {
        throw new Error('Arquivo nao encontrado para limpeza.');
    }
    if (result.skipped && result.reason === 'not_markdown') {
        throw new Error('A limpeza por arquivo aceita apenas .md/.markdown/.txt.');
    }

    const removedBytes = result && result.stats
        ? Math.max(0, Number(result.stats.original_bytes || 0) - Number(result.stats.cleaned_bytes || 0))
        : 0;
    const changedText = result.cleaned ? 'arquivo alterado' : 'nenhuma alteracao necessaria';
    appendExecutionLog(
        'persona_asset_cleanup',
        personaId,
        `Limpeza de markdown por arquivo concluida (${changedText}): ${linkedAsset.path}, ${removedBytes} byte(s) removido(s).`,
        initiatedBy || 'human',
        'Remocao pontual de imagens/base64',
        null
    );

    return {
        persona_id: personaId,
        source_path: linkedAsset.path,
        changed: Boolean(result.cleaned),
        removed_bytes: removedBytes,
        file: result
    };
}

function personaDefaultEntry(personaId) {
    return {
        persona_id: personaId,
        clone_file: PERSONA_CLONE_DEFAULTS[personaId] || null,
        transcript_files: [],
        full_transcript_files: [],
        book_files: [],
        support_files: personaId === 'prs-elisa-clark' ? ['docs/content/ebooks/oto-vault/original_master_at_2026_03_31.md'] : []
    };
}

function loadPersonaMaterials() {
    const registry = ensureControlJson('registry.json', { squads: [], agents: [], personas: [] });
    const personas = asArray(registry.personas);
    const data = ensureControlJson(FILES.personaMaterials, { items: [] });
    const existingById = new Map(
        asArray(data.items)
            .filter(item => item && item.persona_id)
            .map(item => [item.persona_id, item])
    );

    const merged = personas.map(persona => {
        const base = personaDefaultEntry(persona.id);
        const existing = existingById.get(persona.id) || {};
        const existingClone = normalizePathForJson(existing.clone_file || '');
        const baseClone = normalizePathForJson(base.clone_file || '');
        return {
            persona_id: persona.id,
            clone_file: existingClone || baseClone || null,
            transcript_files: uniquePaths([...(base.transcript_files || []), ...(asArray(existing.transcript_files))]),
            full_transcript_files: uniquePaths([...(base.full_transcript_files || []), ...(asArray(existing.full_transcript_files))]),
            book_files: uniquePaths([...(base.book_files || []), ...(asArray(existing.book_files))]),
            support_files: uniquePaths([...(base.support_files || []), ...(asArray(existing.support_files))])
        };
    });

    const normalized = { items: merged };
    writeControlJson(FILES.personaMaterials, normalized);
    return normalized;
}

function findPersonaMaterialEntry(personaId, createIfMissing = false) {
    const materials = loadPersonaMaterials();
    const items = asArray(materials.items);
    let entry = items.find(item => item && item.persona_id === personaId);
    if (!entry && createIfMissing) {
        entry = personaDefaultEntry(personaId);
        entry.clone_file = entry.clone_file || null;
        items.push(entry);
    }
    materials.items = items;
    return { materials, entry };
}

function defaultPersonaAssetDir(kind) {
    if (kind === 'transcript') return 'knowledge/clones/transcripts';
    if (kind === 'full_transcript') return 'knowledge/clones/personas';
    if (kind === 'support') return 'knowledge/clones/support';
    return 'knowledge/clones';
}

function resolveSourceAbsolutePath(rawPath) {
    const cleaned = String(rawPath || '').trim().replace(/^"(.*)"$/, '$1');
    if (!cleaned) throw new Error('source_path required');
    if (path.isAbsolute(cleaned)) return path.resolve(cleaned);
    return safeWorkspacePath(cleaned);
}

function toWorkspaceRelativePathIfInside(absolutePath) {
    const abs = path.resolve(absolutePath);
    const rootLower = ROOT_DIR.toLowerCase();
    if (!abs.toLowerCase().startsWith(rootLower)) return null;
    const rel = path.relative(ROOT_DIR, abs);
    return normalizePathForJson(rel);
}

function uniqueDestinationPath(destAbsolute) {
    if (!fs.existsSync(destAbsolute)) return destAbsolute;
    const dir = path.dirname(destAbsolute);
    const ext = path.extname(destAbsolute);
    const base = path.basename(destAbsolute, ext);
    let index = 2;
    while (index < 9999) {
        const candidate = path.join(dir, `${base}-${index}${ext}`);
        if (!fs.existsSync(candidate)) return candidate;
        index += 1;
    }
    throw new Error('Could not allocate unique destination filename');
}

function slugifySegment(value) {
    return String(value || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
}

function personaBooksWorkspacePath(personaId) {
    const safePersonaId = slugifySegment(personaId) || 'persona';
    return normalizePathForJson(`knowledge/clones/personas/${safePersonaId}/books_working.md`);
}

function shortStableHash(value) {
    const text = String(value || '');
    let hash = 0;
    for (let i = 0; i < text.length; i += 1) {
        hash = ((hash * 31) + text.charCodeAt(i)) >>> 0;
    }
    return hash.toString(36).padStart(6, '0').slice(0, 8);
}

function personaBookFullTranscriptPath(personaId, bookRelativePath) {
    const safePersonaId = slugifySegment(personaId) || 'persona';
    const normalizedBook = normalizePathForJson(bookRelativePath);
    const baseName = path.posix.basename(normalizedBook, path.extname(normalizedBook));
    const slugBase = slugifySegment(baseName) || 'book';
    const hash = shortStableHash(`${safePersonaId}:${normalizedBook}`);
    return normalizePathForJson(
        `knowledge/clones/personas/${safePersonaId}/book_transcripts/${slugBase}_${hash}_full.md`
    );
}

function cleanPdfExtractedText(rawText) {
    const lines = String(rawText || '')
        .replace(/\u0000/g, '')
        .replace(/\r\n/g, '\n')
        .split('\n')
        .map(line => line.replace(/[ \t]+$/g, ''));
    return lines.join('\n').replace(/\n{4,}/g, '\n\n\n').trim();
}

function textDensityMetrics(rawText) {
    const text = String(rawText || '').trim();
    const lines = text ? text.split(/\r?\n/) : [];
    const nonEmptyLines = lines.filter(line => line.trim().length > 0);
    const alphaLines = nonEmptyLines.filter(line => /[\p{L}]/u.test(line));
    const words = text.match(/[\p{L}0-9]{2,}/gu) || [];
    return {
        chars: text.length,
        lines: lines.length,
        non_empty_lines: nonEmptyLines.length,
        alpha_lines: alphaLines.length,
        words: words.length
    };
}

function shouldUseOcrFallback(metrics, pagesDetected) {
    const pages = Math.max(1, Number(pagesDetected || 0));
    if (!metrics || typeof metrics !== 'object') return true;
    if (metrics.alpha_lines === 0) return true;
    if (metrics.words < pages * 5) return true;
    if (metrics.chars < pages * 30) return true;
    return false;
}

function buildTranscriptMarkdown({
    personaId,
    sourcePdf,
    extractionEngine,
    pagesDetected,
    text,
    extraMeta = []
}) {
    const normalizedSource = normalizePathForJson(sourcePdf);
    const lines = [
        `# Transcricao Completa - ${path.posix.basename(normalizedSource)}`,
        '',
        `- persona_id: ${personaId}`,
        `- source_pdf: ${normalizedSource}`,
        `- generated_at: ${nowIso()}`,
        `- extraction_engine: ${extractionEngine}`,
        `- pages_detected: ${Number(pagesDetected || 0)}`,
        '- fidelity_note: transcricao automatica em alta densidade; o layout do PDF pode sofrer pequenas perdas.'
    ];

    asArray(extraMeta).forEach(item => {
        if (!item || !item.key) return;
        lines.push(`- ${item.key}: ${item.value}`);
    });

    lines.push('');
    lines.push(text || '_Nao foi possivel extrair texto legivel deste PDF._');
    lines.push('');
    return lines.join('\n');
}

async function ocrPdfToText(sourceAbsolutePath) {
    const pdfToImg = await import('pdf-to-img');
    const document = await pdfToImg.pdf(sourceAbsolutePath, { scale: 1.0 });
    const worker = await createWorker('eng+por');

    let pageIndex = 0;
    let nonEmptyPages = 0;
    const pageBlocks = [];

    try {
        for await (const image of document) {
            pageIndex += 1;
            const result = await worker.recognize(image);
            const pageText = cleanPdfExtractedText((result && result.data && result.data.text) || '');
            if (pageText) nonEmptyPages += 1;
            pageBlocks.push(`## Pagina ${pageIndex}\n\n${pageText || '_Sem texto detectado por OCR nesta pagina._'}\n`);
        }
    } finally {
        await worker.terminate();
    }

    return {
        text: cleanPdfExtractedText(pageBlocks.join('\n')),
        pages_detected: pageIndex,
        ocr_non_empty_pages: nonEmptyPages
    };
}

async function extractPdfAsMarkdown(sourceAbsolutePath, personaId, bookRelativePath) {
    const pdfBuffer = fs.readFileSync(sourceAbsolutePath);
    let pageCount = 0;
    const parsed = await pdfParse(pdfBuffer, {
        pagerender: async pageData => {
            pageCount += 1;
            const content = await pageData.getTextContent({
                normalizeWhitespace: false,
                disableCombineTextItems: false
            });

            const lines = [];
            let lastY = null;
            let line = '';
            content.items.forEach(item => {
                const str = String(item.str || '');
                if (!str) return;
                const y = Number(item.transform && item.transform[5]);
                if (lastY === null) {
                    line = str;
                    lastY = y;
                    return;
                }
                if (Math.abs(y - lastY) <= 0.5) {
                    const needsSpace = !/\s$/.test(line) && !/^[,.;:!?)]/.test(str);
                    line += `${needsSpace ? ' ' : ''}${str}`;
                } else {
                    lines.push(line);
                    line = str;
                    lastY = y;
                }
            });
            if (line) lines.push(line);

            const pageBody = cleanPdfExtractedText(lines.join('\n'));
            return `\n\n## Pagina ${pageCount}\n\n${pageBody}\n`;
        }
    });

    const parsedText = cleanPdfExtractedText(parsed.text || '');
    const effectivePageCount = Number(parsed.numpages || pageCount || 0);
    const parsedMetrics = textDensityMetrics(parsedText);

    if (!shouldUseOcrFallback(parsedMetrics, effectivePageCount)) {
        return buildTranscriptMarkdown({
            personaId,
            sourcePdf: bookRelativePath,
            extractionEngine: 'pdf-parse',
            pagesDetected: effectivePageCount,
            text: parsedText,
            extraMeta: [
                { key: 'chars_extracted', value: parsedMetrics.chars },
                { key: 'alpha_lines', value: parsedMetrics.alpha_lines }
            ]
        });
    }

    try {
        const ocr = await ocrPdfToText(sourceAbsolutePath);
        const ocrMetrics = textDensityMetrics(ocr.text);
        if (!ocrMetrics.alpha_lines) {
            return buildTranscriptMarkdown({
                personaId,
                sourcePdf: bookRelativePath,
                extractionEngine: 'pdf-parse (fallback: ocr unavailable)',
                pagesDetected: effectivePageCount,
                text: parsedText,
                extraMeta: [
                    { key: 'chars_extracted', value: parsedMetrics.chars },
                    { key: 'alpha_lines', value: parsedMetrics.alpha_lines },
                    { key: 'fallback_ocr', value: 'executado_sem_melhora' }
                ]
            });
        }

        return buildTranscriptMarkdown({
            personaId,
            sourcePdf: bookRelativePath,
            extractionEngine: 'tesseract.js (fallback OCR)',
            pagesDetected: ocr.pages_detected || effectivePageCount,
            text: ocr.text,
            extraMeta: [
                { key: 'ocr_non_empty_pages', value: ocr.ocr_non_empty_pages },
                { key: 'chars_extracted', value: ocrMetrics.chars },
                { key: 'alpha_lines', value: ocrMetrics.alpha_lines },
                { key: 'fallback_trigger', value: 'pdf_parse_low_density' }
            ]
        });
    } catch (error) {
        return buildTranscriptMarkdown({
            personaId,
            sourcePdf: bookRelativePath,
            extractionEngine: 'pdf-parse (fallback OCR error)',
            pagesDetected: effectivePageCount,
            text: parsedText,
            extraMeta: [
                { key: 'chars_extracted', value: parsedMetrics.chars },
                { key: 'alpha_lines', value: parsedMetrics.alpha_lines },
                { key: 'fallback_ocr_error', value: String(error.message || 'unknown_error') }
            ]
        });
    }
}

async function generateFullTranscriptForBook({ personaId, bookRelativePath }) {
    const normalizedBook = normalizePathForJson(bookRelativePath);
    if (!normalizedBook || !/\.pdf$/i.test(normalizedBook)) return null;

    const sourceAbsolute = safeWorkspacePath(normalizedBook);
    if (!fs.existsSync(sourceAbsolute)) {
        throw new Error(`PDF nao encontrado no workspace: ${normalizedBook}`);
    }

    const transcriptRelativePath = personaBookFullTranscriptPath(personaId, normalizedBook);
    const markdown = await extractPdfAsMarkdown(sourceAbsolute, personaId, normalizedBook);
    writeText(safeWorkspacePath(transcriptRelativePath), markdown);
    return transcriptRelativePath;
}

async function generatePersonaFullTranscripts(personaId, initiatedBy = 'human', selectedBooks = null) {
    const registry = ensureControlJson('registry.json', { personas: [] });
    const persona = asArray(registry.personas).find(item => item && item.id === personaId);
    if (!persona) throw new Error(`persona not found: ${personaId}`);

    const { materials, entry } = findPersonaMaterialEntry(personaId, true);
    if (!entry) throw new Error('could not load material entry');

    const configuredBooks = uniquePaths(asArray(entry.book_files)).filter(item => /\.pdf$/i.test(item));
    const selectedSet = new Set(
        uniquePaths(asArray(selectedBooks).map(item => normalizePathForJson(item)).filter(Boolean))
    );
    const books = selectedSet.size
        ? configuredBooks.filter(book => selectedSet.has(normalizePathForJson(book)))
        : configuredBooks;
    const generated = [];
    const errors = [];

    for (const bookPath of books) {
        try {
            const transcriptPath = await generateFullTranscriptForBook({ personaId, bookRelativePath: bookPath });
            if (transcriptPath) {
                generated.push(transcriptPath);
                entry.full_transcript_files = uniquePaths([...(entry.full_transcript_files || []), transcriptPath]);
                writeControlJson(FILES.personaMaterials, materials);
            }
        } catch (error) {
            errors.push({
                source_pdf: bookPath,
                message: error.message
            });
        }
    }

    writeControlJson(FILES.personaMaterials, materials);
    if (generated.length) {
        appendExecutionLog(
            'persona_asset',
            personaId,
            `Transcricoes completas geradas: ${generated.length}`,
            initiatedBy || 'human',
            null,
            null
        );
    }

    refreshPersonaBooksWorkspace(personaId, persona.name || personaId);
    return {
        persona_id: personaId,
        generated_files: generated,
        errors
    };
}

function personaAssetFieldForKind(kind) {
    if (kind === 'transcript') return 'transcript_files';
    if (kind === 'full_transcript') return 'full_transcript_files';
    if (kind === 'book') return 'book_files';
    if (kind === 'support') return 'support_files';
    return null;
}

function resolveExistingBookMapFile(bookRelativePath) {
    const normalized = normalizePathForJson(bookRelativePath);
    if (!normalized) return null;
    const bookDir = normalizePathForJson(path.posix.dirname(normalized));
    const baseName = path.posix.basename(normalized, path.extname(normalized));
    const candidates = [];
    const primary = slugifySegment(baseName.split(' - ')[0] || baseName);
    const fallback = slugifySegment(baseName);
    if (primary) candidates.push(normalizePathForJson(`${bookDir}/${primary}_map.md`));
    if (fallback && fallback !== primary) candidates.push(normalizePathForJson(`${bookDir}/${fallback}_map.md`));

    for (const candidate of candidates) {
        try {
            if (fs.existsSync(safeWorkspacePath(candidate))) return candidate;
        } catch (_) {
            // ignore invalid candidate
        }
    }
    return null;
}

function extractExistingBookSections(workspaceContent) {
    const text = String(workspaceContent || '');
    const sections = new Map();
    const sectionRx = /(###\s+\d+\.\s+[^\n]*\n[\s\S]*?)(?=\n###\s+\d+\.\s+|\n## Proxima Acao Recomendada|$)/g;
    let match = null;
    while ((match = sectionRx.exec(text)) !== null) {
        const block = match[1];
        const source = block.match(/^- source_pdf:\s*(.+)$/m);
        if (!source || !source[1]) continue;
        const key = normalizePathForJson(source[1]);
        if (key) sections.set(key, block.trimEnd());
    }
    return sections;
}

function mapHighlights(mapPath) {
    if (!mapPath) return [];
    const content = safeReadWorkspaceText(mapPath);
    if (!content) return [];
    const lines = content
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#'))
        .filter(line => line.startsWith('-') || /^\d+\./.test(line))
        .slice(0, 6);
    return lines;
}

function buildDefaultBookSection(bookPath, index, fullTranscriptPath = null) {
    const mapPath = resolveExistingBookMapFile(bookPath);
    const highlightLines = mapHighlights(mapPath);
    const section = [
        `### ${index + 1}. ${path.basename(bookPath)}`,
        `- source_pdf: ${bookPath}`,
        `- map_md: ${mapPath || '(nao encontrado)'}`,
        `- full_transcript_md: ${fullTranscriptPath || '(nao gerado)'}`,
        '- notes_md: preencha abaixo com aprendizados acionaveis para a persona.',
        ''
    ];
    if (highlightLines.length) {
        section.push('#### Resumo Inicial (auto do map)');
        highlightLines.forEach(line => section.push(line));
        section.push('');
    }
    section.push('#### Notas');
    section.push('- ');
    return section.join('\n');
}

function refreshPersonaBooksWorkspace(personaId, personaName) {
    const materials = loadPersonaMaterials();
    const entry = asArray(materials.items).find(item => item && item.persona_id === personaId);
    if (!entry) return null;

    const books = uniquePaths(asArray(entry.book_files));
    const fullTranscripts = uniquePaths(asArray(entry.full_transcript_files));
    const workspacePath = personaBooksWorkspacePath(personaId);
    const existingContent = safeReadWorkspaceText(workspacePath);
    const existingSections = extractExistingBookSections(existingContent);
    const title = personaName || personaId;
    const lines = [
        `# Workspace Livros - ${title}`,
        '',
        `- persona_id: ${personaId}`,
        `- updated_at: ${nowIso()}`,
        '',
        '## Objetivo',
        '- Usar os PDFs como acervo e trabalhar com notas/estruturas em Markdown para acelerar leitura da IA.',
        '',
        '## Livros Vinculados'
    ];

    if (!books.length) {
        lines.push('- Nenhum livro vinculado ainda.');
    } else {
        books.forEach((bookPath, index) => {
            const expectedFullTranscriptPath = personaBookFullTranscriptPath(personaId, bookPath);
            const resolvedFullTranscriptPath = fullTranscripts.includes(expectedFullTranscriptPath)
                ? expectedFullTranscriptPath
                : (() => {
                    try {
                        return fs.existsSync(safeWorkspacePath(expectedFullTranscriptPath)) ? expectedFullTranscriptPath : null;
                    } catch (_) {
                        return null;
                    }
                })();
            lines.push('');
            const existing = existingSections.get(bookPath);
            if (existing) {
                let merged = existing;
                merged = merged.replace(/^###\s+\d+\.\s+[^\n]*/m, `### ${index + 1}. ${path.basename(bookPath)}`);
                merged = merged.replace(/^- source_pdf:\s*.*$/m, `- source_pdf: ${bookPath}`);
                if (!/^- map_md:\s*/m.test(merged)) {
                    const mapPath = resolveExistingBookMapFile(bookPath);
                    merged = `${merged}\n- map_md: ${mapPath || '(nao encontrado)'}`;
                }
                if (!/^- full_transcript_md:\s*/m.test(merged)) {
                    merged = `${merged}\n- full_transcript_md: ${resolvedFullTranscriptPath || '(nao gerado)'}`;
                } else {
                    merged = merged.replace(
                        /^- full_transcript_md:\s*.*$/m,
                        `- full_transcript_md: ${resolvedFullTranscriptPath || '(nao gerado)'}`
                    );
                }
                if (!/####\s+Resumo Inicial/i.test(merged)) {
                    const mapPath = resolveExistingBookMapFile(bookPath);
                    const highlightLines = mapHighlights(mapPath);
                    if (highlightLines.length) {
                        const summaryBlock = [
                            '',
                            '#### Resumo Inicial (auto do map)',
                            ...highlightLines,
                            ''
                        ].join('\n');
                        if (/####\s+Notas/i.test(merged)) {
                            merged = merged.replace(/####\s+Notas/i, `${summaryBlock}#### Notas`);
                        } else {
                            merged = `${merged}\n${summaryBlock}`;
                        }
                    }
                }
                lines.push(merged);
            } else {
                lines.push(buildDefaultBookSection(bookPath, index, resolvedFullTranscriptPath));
            }
        });
    }

    lines.push('');
    lines.push('## Proxima Acao Recomendada');
    lines.push('- Converter trechos-chave para Markdown e anexar como transcricao/nota de suporte da persona.');
    lines.push('');

    writeText(safeWorkspacePath(workspacePath), `${lines.join('\n')}\n`);
    return workspacePath;
}

function syncPersonaBooksWorkspaces() {
    const registry = ensureControlJson('registry.json', { personas: [] });
    const personaById = new Map(asArray(registry.personas).map(persona => [persona.id, persona]));
    const materials = loadPersonaMaterials();
    asArray(materials.items).forEach(entry => {
        if (!entry || !entry.persona_id) return;
        const books = uniquePaths(asArray(entry.book_files));
        if (!books.length) return;
        const persona = personaById.get(entry.persona_id);
        refreshPersonaBooksWorkspace(entry.persona_id, persona ? persona.name : entry.persona_id);
    });
}

function detachPersonaAsset({ personaId, kind, targetPath, initiatedBy = 'human' }) {
    const allowedKinds = new Set(['clone', 'transcript', 'full_transcript', 'support']);
    if (!allowedKinds.has(kind)) throw new Error('kind must be one of: clone, transcript, full_transcript, support');

    const registry = ensureControlJson('registry.json', { personas: [] });
    const personas = asArray(registry.personas);
    const persona = personas.find(item => item && item.id === personaId);
    if (!persona) throw new Error(`persona not found: ${personaId}`);

    const { materials, entry } = findPersonaMaterialEntry(personaId, true);
    if (!entry) throw new Error('could not load material entry');

    let changed = false;
    if (kind === 'clone') {
        if (entry.clone_file) changed = true;
        entry.clone_file = null;
    } else {
        const normalizedTarget = normalizePathForJson(targetPath || '');
        if (!normalizedTarget) throw new Error('path required for transcript/full_transcript/book/support removal');
        const field = personaAssetFieldForKind(kind);
        if (!field) throw new Error('invalid asset field');
        const current = uniquePaths(asArray(entry[field]));
        const filtered = current.filter(item => normalizePathForJson(item) !== normalizedTarget);
        changed = filtered.length !== current.length;
        entry[field] = filtered;

    }

    if (!changed) {
        return { persona_id: personaId, kind, removed: false, path: normalizePathForJson(targetPath || '') || null };
    }

    writeControlJson(FILES.personaMaterials, materials);
    appendExecutionLog(
        'persona_asset',
        personaId,
        `Asset ${kind} removido: ${normalizePathForJson(targetPath || '(clone)')}`,
        initiatedBy || 'human',
        null,
        null
    );

    return { persona_id: personaId, kind, removed: true, path: normalizePathForJson(targetPath || '') || null };
}

async function attachPersonaAsset({ personaId, kind, sourcePath, copyToLibrary = true, initiatedBy = 'human' }) {
    const allowedKinds = new Set(['clone', 'transcript', 'full_transcript', 'support']);
    if (!allowedKinds.has(kind)) throw new Error('kind must be one of: clone, transcript, full_transcript, support');

    const registry = ensureControlJson('registry.json', { personas: [] });
    const personas = asArray(registry.personas);
    const persona = personas.find(item => item && item.id === personaId);
    if (!persona) throw new Error(`persona not found: ${personaId}`);

    const sourceAbsolute = resolveSourceAbsolutePath(sourcePath);
    if (!fs.existsSync(sourceAbsolute)) throw new Error('source file not found');
    const sourceStat = fs.statSync(sourceAbsolute);
    if (!sourceStat.isFile()) throw new Error('source path must point to a file');

    let finalRelativePath = null;
    const sourceRelativeInsideWorkspace = toWorkspaceRelativePathIfInside(sourceAbsolute);
    const targetDirRelative = defaultPersonaAssetDir(kind);
    const sourceBasename = path.basename(sourceAbsolute);
    const sourceExt = path.extname(sourceBasename).toLowerCase();
    if (sourceExt === '.pdf') {
        throw new Error('Upload de PDF bloqueado neste fluxo. Converta para markdown (.md/.txt) antes de vincular.');
    }
    const fallbackName = kind === 'clone' ? `${personaId.replace(/^prs-/, '')}_clone.md` : `${personaId.replace(/^prs-/, '')}_${kind}.md`;
    const preferredName = sourceBasename || fallbackName;

    if (!copyToLibrary && sourceRelativeInsideWorkspace) {
        finalRelativePath = sourceRelativeInsideWorkspace;
    } else {
        const targetDirAbsolute = safeWorkspacePath(targetDirRelative);
        ensureDir(targetDirAbsolute);
        const initialTarget = path.join(targetDirAbsolute, preferredName || fallbackName);
        const finalTarget = uniqueDestinationPath(initialTarget);
        fs.copyFileSync(sourceAbsolute, finalTarget);
        finalRelativePath = normalizePathForJson(path.relative(ROOT_DIR, finalTarget));
    }

    if (!finalRelativePath) throw new Error('could not resolve final asset path');

    if (kind === 'clone') {
        if (!/\.(md|markdown|txt)$/i.test(finalRelativePath) && sourceExt.toLowerCase() !== '.md') {
            throw new Error('clone_file deve ser markdown/texto (.md ou .txt)');
        }
    }

    if (kind === 'full_transcript' || kind === 'transcript' || kind === 'support') {
        if (!/\.(md|markdown|txt)$/i.test(finalRelativePath)) {
            throw new Error(`${kind} deve ser markdown/texto (.md ou .txt)`);
        }
    }

    const { materials, entry } = findPersonaMaterialEntry(personaId, true);
    if (!entry) throw new Error('could not create material entry');

    let markdownCleanup = null;

    if (kind === 'clone') {
        entry.clone_file = finalRelativePath;
    } else if (kind === 'support') {
        entry.support_files = uniquePaths([...(entry.support_files || []), finalRelativePath]);
    } else {
        const field = personaAssetFieldForKind(kind);
        if (!field) throw new Error('invalid asset kind');
        entry[field] = uniquePaths([...(entry[field] || []), finalRelativePath]);
    }

    if (isMarkdownAssetPath(finalRelativePath)) {
        markdownCleanup = cleanMarkdownFile(finalRelativePath);
    }

    writeControlJson(FILES.personaMaterials, materials);
    appendExecutionLog(
        'persona_asset',
        personaId,
        `Asset ${kind} vinculado: ${finalRelativePath}${(markdownCleanup && markdownCleanup.cleaned) ? ' | markdown limpo automaticamente' : ''}`,
        initiatedBy || 'human',
        null,
        null
    );

    return {
        persona_id: personaId,
        kind,
        path: finalRelativePath,
        markdown_cleanup: markdownCleanup
    };
}

function normalizeLinkedPath(rawTarget) {
    const target = String(rawTarget || '').trim().replace(/^<|>$/g, '');
    if (!target || /^https?:\/\//i.test(target)) return null;

    if (/^file:\/\//i.test(target)) {
        const cleaned = decodeURIComponent(target.replace(/^file:\/+/, '')).replace(/\\/g, '/');
        const marker = '/SommersStore/';
        const idx = cleaned.toLowerCase().indexOf(marker.toLowerCase());
        if (idx >= 0) return normalizePathForJson(cleaned.slice(idx + marker.length));
        return null;
    }

    if (/^[a-zA-Z]:[\\/]/.test(target)) {
        const cleaned = target.replace(/\\/g, '/');
        const marker = '/SommersStore/';
        const idx = cleaned.toLowerCase().indexOf(marker.toLowerCase());
        if (idx >= 0) return normalizePathForJson(cleaned.slice(idx + marker.length));
        return null;
    }

    return normalizePathForJson(target);
}

function remapLegacyLinkedPath(relativePath) {
    const rel = normalizePathForJson(relativePath);
    if (!rel) return null;
    const legacyPrefix = 'knowledge/marketing/frameworks/raw_transcripts/';
    if (!rel.startsWith(legacyPrefix)) return rel;
    const fallback = normalizePathForJson(`knowledge/clones/transcripts/${path.basename(rel)}`);
    try {
        const exists = fs.existsSync(safeWorkspacePath(fallback));
        return exists ? fallback : rel;
    } catch (_) {
        return rel;
    }
}

function markdownLinkedPaths(content) {
    const text = String(content || '');
    const rx = /\[[^\]]*]\(([^)]+)\)/g;
    const paths = [];
    let match = null;
    while ((match = rx.exec(text)) !== null) {
        const rel = remapLegacyLinkedPath(normalizeLinkedPath(match[1]));
        if (rel) paths.push(rel);
    }
    return uniquePaths(paths);
}

function safeFileStatView(relativePath) {
    const rel = normalizePathForJson(relativePath);
    if (!rel) return null;
    try {
        return fileStatView(rel);
    } catch (_) {
        return {
            path: rel,
            name: path.basename(rel),
            exists: false,
            editable: false,
            bytes: 0,
            modified_at: null
        };
    }
}

function safeReadWorkspaceText(relativePath) {
    const rel = normalizePathForJson(relativePath);
    if (!rel) return '';
    try {
        return readText(safeWorkspacePath(rel), '');
    } catch (_) {
        return '';
    }
}

function inferredFullTranscriptsFromBooks(personaId, bookPaths) {
    const files = [];
    uniquePaths(asArray(bookPaths)).forEach(bookPath => {
        if (!/\.pdf$/i.test(String(bookPath || ''))) return;
        const expectedPath = personaBookFullTranscriptPath(personaId, bookPath);
        try {
            if (fs.existsSync(safeWorkspacePath(expectedPath))) files.push(expectedPath);
        } catch (_) {
            // ignore invalid path
        }
    });
    return uniquePaths(files);
}

function buildPersonaAssetsPayload() {
    const registry = ensureControlJson('registry.json', { squads: [], agents: [], personas: [] });
    const personas = asArray(registry.personas);
    const materials = loadPersonaMaterials();
    const materialById = new Map(asArray(materials.items).map(item => [item.persona_id, item]));

    const items = personas.map(persona => {
        const entry = materialById.get(persona.id) || personaDefaultEntry(persona.id);
        const instructionPath = `.codex/personas/${persona.id}.md`;
        const clonePath = normalizePathForJson(entry.clone_file || '');
        const cloneStat = clonePath ? safeFileStatView(clonePath) : null;
        const cloneContent = clonePath ? safeReadWorkspaceText(clonePath) : '';
        const promptLinked = markdownLinkedPaths(cloneContent);

        const isFullTranscriptPath = p => p.includes('/book_transcripts/') || p.includes('/full_transcripts/');
        const isTranscriptPath = p => (p.includes('/transcripts/') || p.includes('/raw_transcripts/')) && !isFullTranscriptPath(p);
        const isBookPath = p => p.includes('/books/');

        const promptTranscriptPaths = promptLinked.filter(isTranscriptPath);
        const promptFullTranscriptPaths = promptLinked.filter(isFullTranscriptPath);
        const promptBookPaths = promptLinked.filter(isBookPath);
        const promptSupportPaths = promptLinked.filter(p => !isTranscriptPath(p) && !isFullTranscriptPath(p) && !isBookPath(p));

        const bookPaths = uniquePaths([...(entry.book_files || []), ...promptBookPaths]);
        const inferredFullTranscriptPaths = inferredFullTranscriptsFromBooks(persona.id, bookPaths);
        const transcriptPaths = uniquePaths([...(entry.transcript_files || []), ...promptTranscriptPaths]);
        const fullTranscriptPaths = uniquePaths([...(entry.full_transcript_files || []), ...promptFullTranscriptPaths, ...inferredFullTranscriptPaths]);
        const supportPaths = uniquePaths([...(entry.support_files || []), ...promptSupportPaths]);
        const promptLinkedFiles = uniquePaths(promptLinked);
        const booksWorkspacePath = personaBooksWorkspacePath(persona.id);
        const booksWorkspaceFile = safeFileStatView(booksWorkspacePath);

        const transcriptFiles = transcriptPaths.map(safeFileStatView).filter(Boolean);
        const fullTranscriptFiles = fullTranscriptPaths.map(safeFileStatView).filter(Boolean);
        const bookFiles = bookPaths.map(safeFileStatView).filter(Boolean);
        const supportFiles = supportPaths.map(safeFileStatView).filter(Boolean);
        const promptLinkedStats = promptLinkedFiles.map(safeFileStatView).filter(Boolean);
        const expectedFullTranscriptCount = bookFiles.filter(file => file.exists && /\.pdf$/i.test(file.path || '')).length;

        const trackingData = ensureControlJson('extracted_assets.json', { extractions: {} });
        const markExtracted = (arr) => arr.map(file => {
            const track = trackingData.extractions[file.path];
            if (track) {
                const isExtracted = track.extracted !== false;
                if (isExtracted) file.extracted = true;
                if (track.harmonized && isExtracted) file.harmonized = true;
                file.extraction_count = Number(track.extraction_count || (isExtracted ? 1 : 0));
                file.harmonization_count = Number(track.harmonization_count || (track.harmonized ? 1 : 0));
                file.procedure_count = Number(track.procedure_count || file.harmonization_count || 0);
                file.reset_count = Number(track.reset_count || 0);
                if (track.pending_candidate) file.pending_candidate = true;
                if (track.candidate_path) file.candidate_path = track.candidate_path;
                if (track.backup_path) file.backup_path = track.backup_path;
                if (track.audit_status) file.audit_status = track.audit_status;
                if (track.audit_score !== undefined) file.audit_score = track.audit_score;
                if (track.audit_risk) file.audit_risk = track.audit_risk;
                if (track.audit_path) file.audit_path = track.audit_path;
                if (track.last_audited_at) file.last_audited_at = track.last_audited_at;
                file.audit_count = Number(track.audit_count || 0);
            } else {
                file.extraction_count = 0;
                file.harmonization_count = 0;
                file.procedure_count = 0;
                file.reset_count = 0;
                file.audit_count = 0;
            }
            return file;
        });

        return {
            persona_id: persona.id,
            persona_name: persona.name,
            instruction_file: safeFileStatView(instructionPath),
            clone_file: cloneStat,
            transcript_files: markExtracted(transcriptFiles),
            full_transcript_files: markExtracted(fullTranscriptFiles),
            book_files: bookFiles,
            books_working_file: (booksWorkspaceFile.exists || bookFiles.length) ? booksWorkspaceFile : null,
            support_files: markExtracted(supportFiles),
            prompt_linked_files: promptLinkedStats,
            transcript_status: {
                total: transcriptFiles.length,
                available: transcriptFiles.filter(file => file.exists).length,
                linked_in_clone: promptTranscriptPaths.length
            },
            full_transcript_status: {
                total: fullTranscriptFiles.length,
                available: fullTranscriptFiles.filter(file => file.exists).length,
                linked_in_clone: promptFullTranscriptPaths.length,
                expected_from_books: expectedFullTranscriptCount
            },
            book_status: {
                total: bookFiles.length,
                available: bookFiles.filter(file => file.exists).length,
                linked_in_clone: promptBookPaths.length
            },
            support_status: {
                total: supportFiles.length,
                available: supportFiles.filter(file => file.exists).length,
                linked_in_clone: promptSupportPaths.length
            }
        };
    });

    return {
        items,
        materials_file: `docs/control/${FILES.personaMaterials}`,
        transcript_library: DEFAULT_TRANSCRIPT_FILES.map(safeFileStatView).filter(Boolean),
        brunson_books_library: DEFAULT_BRUNSON_BOOK_FILES.map(safeFileStatView).filter(Boolean)
    };
}

function loadMemoryRegistry() {
    const defaults = {
        canonical_files: coreMemoryFiles(),
        tracked_files: []
    };
    const registry = ensureControlJson(FILES.memoryRegistry, defaults);
    registry.canonical_files = uniquePaths(asArray(registry.canonical_files).concat(defaults.canonical_files));
    registry.tracked_files = asArray(registry.tracked_files).map(normalizePathForJson).filter(Boolean);
    if (!registry.canonical_files.length) registry.canonical_files = defaults.canonical_files;
    writeControlJson(FILES.memoryRegistry, registry);
    return registry;
}

function fileStatView(relativePath) {
    const rel = normalizePathForJson(relativePath);
    const absolute = safeWorkspacePath(rel);
    const exists = fs.existsSync(absolute);
    const stat = exists ? fs.statSync(absolute) : null;
    return {
        path: rel,
        name: path.basename(rel),
        exists,
        editable: true,
        bytes: stat ? stat.size : 0,
        modified_at: stat ? stat.mtime.toISOString() : null
    };
}

function patchLastUpdated(md, timestamp) {
    if (md.includes('- updated_at:')) {
        return md.replace(/- updated_at:\s*.*/g, `- updated_at: ${timestamp}`);
    }
    return `${md.trim()}\n\n## Last updated\n- updated_at: ${timestamp}\n`;
}

function setSection(md, title, lines) {
    const body = [`## ${title}`, ...lines].join('\n');
    const pattern = new RegExp(`## ${title}[\\s\\S]*?(?=\\n## |$)`, 'm');
    if (pattern.test(md)) return md.replace(pattern, body);
    return `${md.trim()}\n\n${body}\n`;
}

function nextSerial(prefix, usedIds) {
    const today = dayKey();
    const pattern = new RegExp(`^${prefix}-${today}-(\\d{4})$`);
    const nums = usedIds
        .map(v => String(v || ''))
        .map(v => v.match(pattern))
        .filter(Boolean)
        .map(m => parseInt(m[1], 10));
    const next = (nums.length ? Math.max(...nums) : 0) + 1;
    return `${prefix}-${today}-${String(next).padStart(4, '0')}`;
}

function normalizeProjectId(raw) {
    const value = String(raw || '').trim().toLowerCase();
    if (!value) return null;
    if (value === 'sais' || value === 'velas' || value === 'electro') return value;
    return null;
}

function inferProjectIdFromText(text) {
    const haystack = String(text || '').trim().toUpperCase();
    if (!haystack) return null;
    const flows = ensureControlJson(FILES.projectFlows, { projects: {} });
    const projects = flows.projects || {};

    // Direct aliases and typo-tolerant forms used in historical logs.
    if (haystack.includes('SAIS') || haystack.includes('SIZ')) return 'sais';
    if (haystack.includes('VELAS')) return 'velas';
    if (haystack.includes('ELECTRO')) return 'electro';

    for (const [projectId, project] of Object.entries(projects)) {
        const normalizedProject = normalizeProjectId(projectId);
        if (normalizedProject && haystack.includes(String(projectId || '').toUpperCase())) return normalizedProject;

        const projectLabel = String((project && project.label) || '').trim().toUpperCase();
        if (projectLabel && haystack.includes(projectLabel)) return normalizedProject;

        const nodes = asArray(project.construcao).concat(asArray(project.vendas));
        const ids = nodes.map(node => String((node && node.id) || '').toUpperCase()).filter(Boolean);
        if (ids.some(id => haystack.includes(id))) return normalizedProject;
    }
    return null;
}

function isGenericNextAction(text) {
    const value = asTrimmedText(text);
    if (!value) return true;
    return GENERIC_NEXT_ACTION_PATTERNS.some(pattern => pattern.test(value));
}

function isAutoCloseSummary(text) {
    const value = asTrimmedText(text);
    if (!value) return false;
    return AUTO_CLOSE_SUMMARY_PATTERNS.some(pattern => pattern.test(value));
}

function resolveContinuityCheckpoint(checkpoints) {
    const items = asArray(checkpoints).filter(Boolean);
    if (!items.length) {
        return { latest: null, effective: null, strategy: 'none' };
    }
    const latest = items[items.length - 1];

    for (let i = items.length - 1; i >= 0; i -= 1) {
        const item = items[i];
        const next = asTrimmedText(item.next_exact_action);
        const stopped = asTrimmedText(item.where_it_stopped);
        if (!isGenericNextAction(next) && !isAutoCloseSummary(stopped)) {
            return { latest, effective: item, strategy: 'last_actionable_checkpoint' };
        }
    }

    for (let i = items.length - 1; i >= 0; i -= 1) {
        const item = items[i];
        const stopped = asTrimmedText(item.where_it_stopped);
        if (!isAutoCloseSummary(stopped)) {
            return { latest, effective: item, strategy: 'last_non_auto_summary' };
        }
    }

    return { latest, effective: latest, strategy: 'latest_checkpoint_fallback' };
}

function resolveContinuityNextAction(memoryState, effectiveCheckpoint) {
    const stateTask = asTrimmedText(memoryState && memoryState.active_task);
    if (stateTask && !isGenericNextAction(stateTask)) return stateTask;

    const checkpointAction = asTrimmedText(effectiveCheckpoint && effectiveCheckpoint.next_exact_action);
    if (checkpointAction && !isGenericNextAction(checkpointAction)) return checkpointAction;

    const queue = asArray(memoryState && memoryState.next_actions).map(asTrimmedText).filter(Boolean);
    const queuedMeaningful = queue.find(item => !isGenericNextAction(item));
    if (queuedMeaningful) return queuedMeaningful;
    if (checkpointAction) return checkpointAction;
    if (stateTask) return stateTask;
    if (queue.length) return queue[0];
    return 'Revisar ultimo checkpoint e definir proxima acao objetiva.';
}

function collectRecentContinuityHighlights(maxSessions = CONTINUITY_LOOKBACK_SESSIONS) {
    const state = ensureControlJson(FILES.session, { current_session: null, history: [] });
    const history = asArray(state.history)
        .filter(Boolean)
        .sort((a, b) => parseTimestampMs(b.ended_at || b.started_at) - parseTimestampMs(a.ended_at || a.started_at));

    const highlights = [];
    const seen = new Set();
    let sessionsCollected = 0;
    for (const item of history) {
        if (sessionsCollected >= maxSessions) break;
        const summary = asTrimmedText(item.close_summary || item.last_context_note || item.next_action);
        if (!summary || isAutoCloseSummary(summary)) continue;
        if (seen.has(summary)) continue;
        highlights.push(`${item.id || 'SES'}: ${summary}`);
        seen.add(summary);
        sessionsCollected += 1;
    }

    if (highlights.length < maxSessions) {
        const mutations = ensureControlJson(FILES.memoryMutations, { mutations: [] });
        const recentMutations = asArray(mutations.mutations)
            .filter(Boolean)
            .sort((a, b) => parseTimestampMs(b.timestamp) - parseTimestampMs(a.timestamp));

        for (const mutation of recentMutations) {
            if (highlights.length >= maxSessions) break;
            const summary = asTrimmedText(mutation.diff_summary);
            if (!summary) continue;
            if (/^oracle iniciou/i.test(summary)) continue;
            if (isAutoCloseSummary(summary)) continue;
            if (seen.has(summary)) continue;
            highlights.push(`${mutation.memory_scope || 'memory'}: ${summary}`);
            seen.add(summary);
        }
    }

    return {
        last_sessions: maxSessions,
        sessions_considered: history.length,
        highlights
    };
}

function writeStartupContextBrief(sessionId, context) {
    const checkpointId = context && context.effectiveCheckpoint ? context.effectiveCheckpoint.id : null;
    const checkpointTitle = context && context.effectiveCheckpoint
        ? asTrimmedText(context.effectiveCheckpoint.title || context.effectiveCheckpoint.where_it_stopped)
        : '';
    const whereStopped = context && context.effectiveCheckpoint
        ? asTrimmedText(context.effectiveCheckpoint.where_it_stopped)
        : '';
    const recent = context && context.recent ? context.recent : collectRecentContinuityHighlights();
    const lines = [
        '# Startup Context (Latest)',
        '',
        '## Session',
        `- generated_at: ${nowIso()}`,
        `- session_id: ${sessionId || '-'}`,
        '',
        '## Continuity Snapshot',
        `- checkpoint_id: ${checkpointId || '-'}`,
        `- checkpoint_strategy: ${context && context.checkpointStrategy ? context.checkpointStrategy : '-'}`,
        `- checkpoint_title: ${checkpointTitle || '-'}`,
        `- where_it_stopped: ${whereStopped || '-'}`,
        `- next_action: ${(context && context.nextAction) || '-'}`,
        '',
        '## Ultimas Conversas Relevantes',
        `- last_sessions: ${recent.last_sessions}`,
        `- sessions_considered: ${recent.sessions_considered}`
    ];

    const entries = asArray(recent.highlights).slice(0, 5);
    if (entries.length) {
        entries.forEach(item => lines.push(`- ${item}`));
    } else {
        lines.push('- (sem highlights relevantes no periodo)');
    }

    writeText(STARTUP_CONTEXT_PATH, `${lines.join('\n')}\n`);
    return {
        file: STARTUP_CONTEXT_REL_PATH,
        checkpoint_id: checkpointId,
        next_action: (context && context.nextAction) || null,
        checkpoint_strategy: context && context.checkpointStrategy ? context.checkpointStrategy : null,
        highlights: entries
    };
}

function loadSessionArchiveById(sessionId) {
    const safeId = String(sessionId || '').trim();
    if (!/^SES-\d{8}-\d{4}$/i.test(safeId)) return null;
    const filePath = path.join(SESSIONS_DIR, `${safeId}.json`);
    if (!fs.existsSync(filePath)) return null;
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (_) {
        return null;
    }
}

function inferProjectIdFromSessionArchive(sessionId) {
    const session = loadSessionArchiveById(sessionId);
    if (!session || typeof session !== 'object') return null;
    return normalizeProjectId(session.project_id || null)
        || inferProjectIdFromText(session.close_summary)
        || inferProjectIdFromText(session.next_action)
        || inferProjectIdFromText(session.last_context_note)
        || inferProjectIdFromText(session.source)
        || null;
}

function inferProjectIdFromCurrentSession() {
    const state = readControlJson(FILES.session, { current_session: null, history: [] });
    if (!state || typeof state !== 'object' || !state.current_session) return null;
    return normalizeProjectId(state.current_session.project_id || null);
}

function appendExecutionLog(type, target, details, initiatedBy = 'system', why = null, projectId = null) {
    const normalizedProjectId =
        normalizeProjectId(projectId)
        || inferProjectIdFromSessionArchive(target)
        || inferProjectIdFromCurrentSession()
        || inferProjectIdFromText(target)
        || inferProjectIdFromText(details)
        || inferProjectIdFromText(why)
        || inferProjectIdFromText(type);
    const logs = ensureControlJson(FILES.logs, { entries: [] });
    logs.entries = asArray(logs.entries);
    const id = nextSerial('LOG', logs.entries.map(item => item.id));
    logs.entries.push({
        id,
        type,
        target: target || null,
        initiated_by: initiatedBy,
        project_id: normalizedProjectId,
        timestamp: nowIso(),
        details: details || null,
        why_this_ran: why || null
    });
    writeControlJson(FILES.logs, logs);
    return id;
}

function appendMemoryMutation(scope, summary, mutatedBy = 'system', projectId = null) {
    const data = ensureControlJson(FILES.memoryMutations, { mutations: [] });
    data.mutations = asArray(data.mutations);
    const resolvedProjectId = normalizeProjectId(projectId) || inferProjectIdFromCurrentSession() || inferProjectIdFromText(summary) || inferProjectIdFromText(scope);
    data.mutations.push({
        timestamp: nowIso(),
        memory_scope: scope,
        diff_summary: summary,
        mutated_by: mutatedBy,
        project_id: resolvedProjectId
    });
    writeControlJson(FILES.memoryMutations, data);
}

function appendMemoryRun(action, outputSummary, filesTouched, projectId = null) {
    const data = ensureControlJson(FILES.memoryRuns, { items: [] });
    data.items = asArray(data.items);
    const resolvedProjectId = normalizeProjectId(projectId) || inferProjectIdFromCurrentSession() || inferProjectIdFromText(outputSummary) || inferProjectIdFromText(action) || null;
    const id = nextSerial('RUN-MEM', data.items.map(item => item.id));
    const ts = nowIso();
    data.items.push({
        id,
        timestamp_start: ts,
        timestamp_end: ts,
        actor: 'system',
        squad: 'SQD-MEM',
        skill: 'MemoryLifecycle',
        module: 'memory-governance',
        entity: 'dashboard',
        action,
        input_summary: 'Automatic lifecycle event',
        output_summary: outputSummary,
        result: 'success',
        files_touched: filesTouched || [],
        project_id: resolvedProjectId
    });
    writeControlJson(FILES.memoryRuns, data);
    return id;
}

function persistSessionArchive(session) {
    ensureDir(SESSIONS_DIR);
    const filePath = path.join(SESSIONS_DIR, `${session.id}.json`);
    writeText(filePath, `${JSON.stringify(session, null, 2)}\n`);
}

function loadSessionArchives() {
    ensureDir(SESSIONS_DIR);
    const entries = fs.readdirSync(SESSIONS_DIR)
        .filter(name => name.toLowerCase().endsWith('.json'))
        .map(name => path.join(SESSIONS_DIR, name))
        .map(full => {
            try {
                return JSON.parse(fs.readFileSync(full, 'utf8'));
            } catch (_) {
                return null;
            }
        })
        .filter(Boolean)
        .sort((a, b) => new Date(b.started_at || b.ended_at || 0).getTime() - new Date(a.started_at || a.ended_at || 0).getTime());
    return entries;
}

function listMemoryFilesPayload() {
    const registry = loadMemoryRegistry();
    const canonicalSet = new Set(registry.canonical_files.map(normalizePathForJson));
    const trackedSet = new Set(registry.tracked_files.map(normalizePathForJson));
    const trackedUnique = [...trackedSet].filter(p => !canonicalSet.has(p));
    const sessions = loadSessionArchives();
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;

    const sessions24h = sessions
        .filter(s => {
            const ref = new Date(s.ended_at || s.started_at || 0).getTime();
            return Number.isFinite(ref) && now - ref <= oneDayMs;
        })
        .map(s => ({
            id: s.id,
            started_at: s.started_at || null,
            ended_at: s.ended_at || null,
            checkpoint_id: s.checkpoint_id || null,
            status: s.status || 'closed',
            path: `docs/control/sessions/${s.id}.json`
        }));

    return {
        canonical_files: registry.canonical_files.map(fileStatView),
        tracked_files: trackedUnique.map(fileStatView),
        sessions_last_24h: sessions24h,
        sessions_total: sessions.length,
        registry
    };
}

function loadMemoryLayers() {
    return {
        current_state: ensureControlJson(FILES.memoryState, {}),
        open_loops: ensureControlJson(FILES.memoryLoops, { items: [] }),
        checkpoints: ensureControlJson(FILES.memoryCheckpoints, { items: [] }),
        decisions: ensureControlJson(FILES.memoryDecisions, { items: [] }),
        execution_journal: ensureControlJson(FILES.memoryRuns, { items: [] }),
        artifact_index: ensureControlJson(FILES.memoryArtifacts, { items: [] })
    };
}

function contextFlash() {
    const layers = loadMemoryLayers();
    const registry = ensureControlJson('registry.json', { squads: [], agents: [], personas: [] });
    const checkpointResolution = resolveContinuityCheckpoint(layers.checkpoints.items);
    const latestCheckpoint = checkpointResolution.latest;
    const effectiveCheckpoint = checkpointResolution.effective || latestCheckpoint;
    const continuityNextAction = resolveContinuityNextAction(layers.current_state, effectiveCheckpoint);
    const latestDecision = asArray(layers.decisions.items).filter(item => item.status === 'active').slice(-1)[0]
        || asArray(layers.decisions.items).slice(-1)[0]
        || null;
    const openLoops = asArray(layers.open_loops.items).filter(item => item.status !== 'closed');
    return {
        project: layers.current_state.project || 'SommersStore',
        active_goal: layers.current_state.active_goal || null,
        active_task: continuityNextAction || layers.current_state.active_task || null,
        build_phase: layers.current_state.build_phase || null,
        ops_stage: layers.current_state.ops_stage || null,
        latest_checkpoint_id: effectiveCheckpoint ? effectiveCheckpoint.id : null,
        latest_checkpoint_next_action: continuityNextAction || null,
        latest_raw_checkpoint_id: latestCheckpoint ? latestCheckpoint.id : null,
        latest_raw_checkpoint_next_action: latestCheckpoint ? latestCheckpoint.next_exact_action || null : null,
        checkpoint_resolution: checkpointResolution.strategy,
        latest_active_decision_id: latestDecision ? latestDecision.id : null,
        open_loops_count: openLoops.length,
        open_loop_ids: openLoops.slice(0, 8).map(item => item.id),
        tracked_files: asArray(registry.tracked_files).slice(0, 20),
        continuity_file: STARTUP_CONTEXT_REL_PATH,
        continuity_window_days: CONTINUITY_LOOKBACK_DAYS
    };
}

function runSessionStart(body) {
    const state = ensureControlJson(FILES.session, { current_session: null, history: [] });
    const payloadProjectId = normalizeProjectId(body.project_id || null);
    if (state.current_session && state.current_session.status === 'active' && !body.force_new) {
        const lastSeen = state.current_session.last_seen_at || state.current_session.started_at;
        const inactiveMs = Date.now() - new Date(lastSeen).getTime();
        const stale = Number.isFinite(inactiveMs) && inactiveMs > 1000 * 60 * 20;
        if (!stale) {
            state.current_session.last_seen_at = nowIso();
            if (payloadProjectId) state.current_session.project_id = payloadProjectId;
            writeControlJson(FILES.session, state);
            const resumedFlash = state.current_session.context_flash || contextFlash();
            const layers = loadMemoryLayers();
            const checkpointResolution = resolveContinuityCheckpoint(layers.checkpoints.items);
            const effectiveCheckpoint = checkpointResolution.effective || checkpointResolution.latest;
            const continuityNextAction = resolveContinuityNextAction(layers.current_state, effectiveCheckpoint);
            const recentHighlights = collectRecentContinuityHighlights(CONTINUITY_LOOKBACK_DAYS);
            const startupBrief = writeStartupContextBrief(state.current_session.id, {
                effectiveCheckpoint,
                checkpointStrategy: checkpointResolution.strategy,
                nextAction: continuityNextAction,
                recent: recentHighlights
            });
            return { resumed: true, session: state.current_session, context_flash: resumedFlash, startup_brief: startupBrief };
        }
        runSessionClose({
            summary: 'Sessao anterior encerrada automaticamente por inatividade/fechamento abrupto.',
            next_action: 'Retomar a partir do ultimo checkpoint automatico',
            completed_tasks: [],
            closed_by: 'system',
            project_id: payloadProjectId
        });
    }
    state.history = asArray(state.history);
    const usedIds = state.history.map(item => item.id).concat(state.current_session ? [state.current_session.id] : []);
    const sessionId = nextSerial('SES', usedIds);
    const flash = contextFlash();
    const layers = loadMemoryLayers();
    const checkpointResolution = resolveContinuityCheckpoint(layers.checkpoints.items);
    const effectiveCheckpoint = checkpointResolution.effective || checkpointResolution.latest;
    const continuityNextAction = resolveContinuityNextAction(layers.current_state, effectiveCheckpoint);
    const recentHighlights = collectRecentContinuityHighlights(CONTINUITY_LOOKBACK_DAYS);
    const session = {
        id: sessionId,
        status: 'active',
        started_at: nowIso(),
        started_by: body.started_by || 'dashboard',
        source: body.source || 'dashboard_auto_boot',
        model_hint: body.model_hint || 'unspecified',
        project_id: payloadProjectId,
        last_seen_at: nowIso(),
        context_flash: flash
    };
    state.current_session = session;
    writeControlJson(FILES.session, state);
    persistSessionArchive(session);
    const startupBrief = writeStartupContextBrief(sessionId, {
        effectiveCheckpoint,
        checkpointStrategy: checkpointResolution.strategy,
        nextAction: continuityNextAction,
        recent: recentHighlights
    });

    const snapshots = ensureControlJson(FILES.snapshots, { snapshots: [] });
    snapshots.snapshots = asArray(snapshots.snapshots);
    snapshots.snapshots.push({
        id: nextSerial('CTX', snapshots.snapshots.map(item => item.id)),
        timestamp: nowIso(),
        type: 'session_start',
        session_id: sessionId,
        context_flash: flash
    });
    writeControlJson(FILES.snapshots, snapshots);

    appendExecutionLog(
        'session_start',
        sessionId,
        'Oracle startup automatico executado',
        session.started_by,
        'Context flash inicial',
        payloadProjectId
    );
    appendMemoryRun('session_start', `Sessao ${sessionId} iniciada`, [
        `docs/control/${FILES.memoryState}`,
        `docs/control/${FILES.memoryLoops}`,
        `docs/control/${FILES.memoryCheckpoints}`,
        `docs/control/${FILES.memoryDecisions}`,
        STARTUP_CONTEXT_REL_PATH,
        'task.md'
    ]);
    appendMemoryMutation('session_startup', `Oracle iniciou ${sessionId}`, session.started_by);
    appendMemoryMutation('session_startup', `Startup context atualizado em ${STARTUP_CONTEXT_REL_PATH}`, session.started_by);

    return { resumed: false, session, context_flash: flash, startup_brief: startupBrief };
}

function resolveCloseKind(closedBy, summary) {
    const by = asTrimmedText(closedBy).toLowerCase();
    if (by === 'system' || isAutoCloseSummary(summary)) return 'automatico';
    if (by === 'human') return 'usuario';
    return 'manual';
}

function updateTaskAndMemoryDocs(summary, nextAction, checkpointId, closedBy = 'dashboard') {
    const timestamp = nowIso();
    const closeKind = resolveCloseKind(closedBy, summary);
    const isAutomatic = closeKind === 'automatico';

    if (!isAutomatic) {
        const taskRaw = readText(TASK_PATH, '# Task Board (Canonical)\n');
        const firstLine = closeKind === 'usuario'
            ? '- [x] Sessao encerrada pelo usuario.'
            : '- [x] Sessao encerrada.';
        const note = [
            firstLine,
            `- [x] Resumo: ${summary}`,
            `- [x] Proxima acao: ${nextAction || '(nao informada)'}`,
            `- [x] Checkpoint: ${checkpointId}`
        ];
        let taskUpdated = taskRaw;
        if (!taskUpdated.includes('## Done in this session')) {
            taskUpdated += '\n## Done in this session\n';
        }
        taskUpdated = taskUpdated.replace(/## Done in this session([\s\S]*?)(\n## |$)/m, (match, sectionBody, endHeading) => {
            const merged = `## Done in this session${sectionBody}\n${note.join('\n')}\n`;
            return `${merged}${endHeading}`;
        });
        taskUpdated = patchLastUpdated(taskUpdated, timestamp);
        writeText(TASK_PATH, taskUpdated.endsWith('\n') ? taskUpdated : `${taskUpdated}\n`);
    }

    const projectMemoryPath = path.join(MEMORY_DIR, 'project_memory.md');
    if (!fs.existsSync(projectMemoryPath)) return;
    let projectMemory = readText(projectMemoryPath, '');
    if (!projectMemory.trim()) return;
    projectMemory = patchLastUpdated(projectMemory, timestamp);

    const sectionTitle = isAutomatic ? 'Ultimo fechamento automatico' : 'Ultimo fechamento';
    projectMemory = setSection(projectMemory, sectionTitle, [
        `- timestamp: ${timestamp}`,
        `- tipo: ${closeKind}`,
        `- resumo: ${summary}`,
        `- proxima_acao: ${nextAction || '(nao informada)'}`,
        `- checkpoint: ${checkpointId}`
    ]);
    writeText(projectMemoryPath, projectMemory.endsWith('\n') ? projectMemory : `${projectMemory}\n`);
}

function runSessionClose(body) {
    const state = ensureControlJson(FILES.session, { current_session: null, history: [] });
    state.history = asArray(state.history);
    const payloadProjectId = normalizeProjectId(body.project_id || null);

    const summary = (body.summary || '').trim() || 'Sessao encerrada com organizacao automatica da memoria.';
    const nextAction = (body.next_action || '').trim();
    const current = state.current_session || {
        id: nextSerial('SES', state.history.map(item => item.id)),
        started_at: nowIso(),
        started_by: 'dashboard',
        source: 'implicit',
        status: 'active'
    };
    const closeProjectId = payloadProjectId || normalizeProjectId(current.project_id || null) || null;

    const checkpoints = ensureControlJson(FILES.memoryCheckpoints, { items: [] });
    checkpoints.items = asArray(checkpoints.items);
    const checkpointId = `CHK-MEM-${String(checkpoints.items.length + 1).padStart(4, '0')}`;
    checkpoints.items.push({
        id: checkpointId,
        timestamp: nowIso(),
        title: `Fechamento ${current.id}`,
        where_it_stopped: summary,
        completed_since_last_checkpoint: asArray(body.completed_tasks),
        do_not_repeat: ['Fechar sem checkpoint', 'Fechar sem mutacao'],
        next_exact_action: nextAction || 'Rodar startup Oracle na proxima abertura',
        active_risks: [],
        affected_files: ['task.md', 'docs/control/memory_*.json', 'docs/memory/*.md'],
        linked_loops: [],
        linked_decisions: [],
        recovery_instruction: 'Reabrir dashboard e executar startup automatico'
    });
    writeControlJson(FILES.memoryCheckpoints, checkpoints);

    const memoryState = ensureControlJson(FILES.memoryState, {});
    memoryState.last_relevant_event = summary;
    memoryState.latest_checkpoint_id = checkpointId;
    if (nextAction) {
        memoryState.active_task = nextAction;
        const existing = asArray(memoryState.next_actions).filter(item => item !== nextAction);
        memoryState.next_actions = [nextAction, ...existing].slice(0, 8);
    }
    memoryState.updated_at = nowIso();
    writeControlJson(FILES.memoryState, memoryState);

    updateTaskAndMemoryDocs(summary, nextAction, checkpointId, body.closed_by || 'dashboard');

    const closedSession = {
        ...current,
        status: 'closed',
        ended_at: nowIso(),
        close_summary: summary,
        next_action: nextAction || null,
        completed_tasks: asArray(body.completed_tasks),
        checkpoint_id: checkpointId,
        closed_by: body.closed_by || 'dashboard',
        model_hint: body.model_hint || current.model_hint || 'unspecified',
        project_id: closeProjectId
    };
    state.history.push(closedSession);
    state.history = state.history.slice(-120);
    state.current_session = null;
    writeControlJson(FILES.session, state);
    persistSessionArchive(closedSession);

    const snapshots = ensureControlJson(FILES.snapshots, { snapshots: [] });
    snapshots.snapshots = asArray(snapshots.snapshots);
    snapshots.snapshots.push({
        id: nextSerial('CTX', snapshots.snapshots.map(item => item.id)),
        timestamp: nowIso(),
        type: 'session_close',
        session_id: closedSession.id,
        summary,
        checkpoint_id: checkpointId
    });
    writeControlJson(FILES.snapshots, snapshots);

    appendExecutionLog(
        'session_close',
        closedSession.id,
        summary,
        closedSession.closed_by,
        'Scribe shutdown automatico',
        closeProjectId
    );
    appendMemoryRun('session_close', `Sessao ${closedSession.id} encerrada com ${checkpointId}`, [
        `docs/control/${FILES.memoryState}`,
        `docs/control/${FILES.memoryCheckpoints}`,
        `docs/control/${FILES.memoryMutations}`,
        'task.md'
    ]);
    appendMemoryMutation('session_shutdown', `Scribe encerrou ${closedSession.id}: ${summary}`, closedSession.closed_by);
    if (!body.skip_auto_cloud) {
        scheduleAutoCloudSync('session_close', closeProjectId);
    }

    // P1 audit: rotate large JSON files to prevent unbounded growth
    try {
        rotateControlJsonArray(FILES.logs);
        rotateControlJsonArray(FILES.memoryMutations);
        rotateControlJsonArray(FILES.snapshots);
        rotateControlJsonArray(FILES.memoryRuns);
    } catch (rotErr) {
        console.error('[ROTATION] Error during post-close rotation:', rotErr.message);
    }

    return { session: closedSession, checkpoint_id: checkpointId };
}

function recordMemorySyncFromPhase(kind, id, stateValue, initiatedBy, projectId = null) {
    const memoryState = ensureControlJson(FILES.memoryState, {});
    memoryState.updated_at = nowIso();
    memoryState.last_relevant_event = `${kind} ${id} => ${stateValue}`;
    if (kind === 'BUILD' && (stateValue === 'in_progress' || stateValue === 'completed')) memoryState.build_phase = id;
    if (kind === 'OPS' && (stateValue === 'in_progress' || stateValue === 'completed')) memoryState.ops_stage = id;
    writeControlJson(FILES.memoryState, memoryState);
    appendExecutionLog('memory_sync', id, `${kind} sincronizado na memoria`, initiatedBy || 'system', null, projectId || null);
}

function maybeRegisterFileMutation(relativePath, initiatedBy) {
    const normalized = String(relativePath || '').replace(/\\/g, '/').replace(/^\//, '');
    const isMemory = normalized.startsWith('docs/memory/')
        || normalized.startsWith('docs/control/memory_')
        || normalized === 'task.md';
    if (!isMemory) return false;
    appendMemoryMutation('file_save', `Arquivo de memoria salvo: ${normalized}`, initiatedBy || 'human');
    return true;
}

function registerTrackedMemoryFile(relativePath) {
    const rel = normalizePathForJson(relativePath);
    if (!rel) return false;
    const registry = loadMemoryRegistry();
    const canonical = new Set(registry.canonical_files.map(normalizePathForJson));
    if (canonical.has(rel)) return true;
    if (!registry.tracked_files.includes(rel)) {
        registry.tracked_files.push(rel);
        writeControlJson(FILES.memoryRegistry, registry);
    }
    return true;
}

function touchSessionPulse(body) {
    const state = ensureControlJson(FILES.session, { current_session: null, history: [] });
    if (!state.current_session || state.current_session.status !== 'active') {
        return { active: false };
    }
    const timestamp = nowIso();
    state.current_session.last_seen_at = timestamp;
    const pulseProjectId = normalizeProjectId(body.project_id || null);
    if (pulseProjectId) state.current_session.project_id = pulseProjectId;
    const pulseNote = body && typeof body.context_note === 'string' ? body.context_note.trim() : '';
    if (pulseNote) {
        state.current_session.last_context_note = pulseNote;
    }

    const lastPulseLogAt = new Date(state.current_session.last_pulse_logged_at || 0).getTime();
    const pulseTooOld = !Number.isFinite(lastPulseLogAt) || (Date.now() - lastPulseLogAt) >= SESSION_PULSE_LOG_INTERVAL_MS;
    const previousPulseNote = String(state.current_session.last_pulse_note || '').trim();
    const noteChanged = Boolean(pulseNote) && pulseNote !== previousPulseNote;
    const shouldLogPulse = pulseTooOld || noteChanged;
    const resolvedProjectId = pulseProjectId || normalizeProjectId(state.current_session.project_id || null) || null;

    if (shouldLogPulse) {
        const summary = pulseNote || 'Heartbeat da sessao ativa';
        appendExecutionLog(
            'session_pulse',
            state.current_session.id,
            summary,
            body.initiated_by || 'dashboard',
            'Pulse keepalive',
            resolvedProjectId
        );

        const snapshots = ensureControlJson(FILES.snapshots, { snapshots: [] });
        snapshots.snapshots = asArray(snapshots.snapshots);
        snapshots.snapshots.push({
            id: nextSerial('CTX', snapshots.snapshots.map(item => item.id)),
            timestamp,
            type: 'session_pulse',
            session_id: state.current_session.id,
            summary,
            project_id: resolvedProjectId
        });
        writeControlJson(FILES.snapshots, snapshots);

        state.current_session.last_pulse_logged_at = timestamp;
        if (pulseNote) state.current_session.last_pulse_note = pulseNote;
    }

    writeControlJson(FILES.session, state);
    persistSessionArchive(state.current_session);
    return {
        active: true,
        session_id: state.current_session.id,
        pulse_logged: shouldLogPulse,
        project_id: resolvedProjectId
    };
}

function ensureBootstrapFiles() {
    ensureDir(CONTROL_DIR);
    ensureDir(SESSIONS_DIR);
    ensureDir(MEMORY_EXTRA_DIR);
    ensureControlJson(FILES.logs, { entries: [] });
    ensureControlJson(FILES.snapshots, { snapshots: [] });
    ensureControlJson(FILES.session, { current_session: null, history: [] });
    ensureControlJson(FILES.memoryMutations, { mutations: [] });
    ensureControlJson(FILES.memoryState, {});
    ensureControlJson(FILES.memoryLoops, { items: [] });
    ensureControlJson(FILES.memoryCheckpoints, { items: [] });
    ensureControlJson(FILES.memoryDecisions, { items: [] });
    ensureControlJson(FILES.memoryRuns, { items: [] });
    ensureControlJson(FILES.memoryArtifacts, { items: [] });
    ensureControlJson(FILES.memoryRegistry, {
        canonical_files: coreMemoryFiles(),
        tracked_files: []
    });
    ensureControlJson(FILES.cloudSync, cloudSyncDefaultState());
    ensureControlJson(FILES.projectFlows, { projects: {} });
    loadPersonaMaterials();
    syncPersonaBooksWorkspaces();
    ensureControlJson('manual_interventions.json', { entries: [] });
    ensureControlJson('approvals.json', { items: [] });
    ensureControlJson('alerts.json', { items: [] });
    ensureControlJson('incidents.json', { items: [] });
    ensureControlJson('reruns.json', { items: [] });
}

ensureBootstrapFiles();

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    const url = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = url.pathname;

    try {
        if (pathname === '/' || pathname === '/dashboard') {
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
            return sendText(res, fs.readFileSync(path.join(DOCS_DIR, 'aiox_dashboard.html'), 'utf8'), 'text/html');
        }

        if (pathname === '/api/registry' && req.method === 'GET') return sendJson(res, ensureControlJson('registry.json', {}));
        if (pathname === '/api/build' && req.method === 'GET') return sendJson(res, ensureControlJson('build_state.json', { phases: [] }));
        if (pathname === '/api/ops' && req.method === 'GET') return sendJson(res, ensureControlJson('ops_state.json', { stages: [] }));
        if (pathname === '/api/approvals' && req.method === 'GET') return sendJson(res, ensureControlJson('approvals.json', { items: [] }));
        if (pathname === '/api/alerts' && req.method === 'GET') return sendJson(res, ensureControlJson('alerts.json', { items: [] }));
        if (pathname === '/api/incidents' && req.method === 'GET') return sendJson(res, ensureControlJson('incidents.json', { items: [] }));
        if (pathname === '/api/reruns' && req.method === 'GET') return sendJson(res, ensureControlJson('reruns.json', { items: [] }));
        if (pathname === '/api/logs' && req.method === 'GET') return sendJson(res, ensureControlJson(FILES.logs, { entries: [] }));
        if (pathname === '/api/commands' && req.method === 'GET') return sendJson(res, ensureControlJson('manual_interventions.json', { entries: [] }));
        if (pathname === '/api/memory' && req.method === 'GET') return sendJson(res, ensureControlJson(FILES.memoryMutations, { mutations: [] }));
        if (pathname === '/api/memory/layers' && req.method === 'GET') return sendJson(res, loadMemoryLayers());
        if (pathname === '/api/memory/files' && req.method === 'GET') return sendJson(res, listMemoryFilesPayload());
        if (pathname === '/api/personas/assets' && req.method === 'GET') return sendJson(res, buildPersonaAssetsPayload());
        if (pathname === '/api/personas/assets/link' && req.method === 'POST') {
            const body = await parseBody(req);
            const personaId = String(body.persona_id || '').trim();
            const kind = String(body.kind || '').trim().toLowerCase();
            const sourcePath = String(body.source_path || '').trim();
            if (!personaId) return sendJson(res, { error: 'persona_id required' }, 400);
            if (!kind) return sendJson(res, { error: 'kind required' }, 400);
            if (!sourcePath) return sendJson(res, { error: 'source_path required' }, 400);
            const result = await attachPersonaAsset({
                personaId,
                kind,
                sourcePath,
                copyToLibrary: body.copy_to_library !== false,
                initiatedBy: body.initiated_by || 'human'
            });
            return sendJson(res, { success: true, ...result });
        }
        if (pathname === '/api/personas/assets/unlink' && req.method === 'POST') {
            const body = await parseBody(req);
            const personaId = String(body.persona_id || '').trim();
            const kind = String(body.kind || '').trim().toLowerCase();
            const targetPath = String(body.path || '').trim();
            if (!personaId) return sendJson(res, { error: 'persona_id required' }, 400);
            if (!kind) return sendJson(res, { error: 'kind required' }, 400);
            const result = detachPersonaAsset({
                personaId,
                kind,
                targetPath,
                initiatedBy: body.initiated_by || 'human'
            });
            return sendJson(res, { success: true, ...result });
        }
        if (pathname === '/api/personas/assets/clean-md' && req.method === 'POST') {
            const body = await parseBody(req);
            const personaId = String(body.persona_id || '').trim();
            if (!personaId) return sendJson(res, { error: 'persona_id required' }, 400);
            const result = cleanPersonaMarkdownAssets(personaId, body.initiated_by || 'human');
            return sendJson(res, { success: true, ...result });
        }
        if (pathname === '/api/personas/assets/clean-md-file' && req.method === 'POST') {
            const body = await parseBody(req);
            const personaId = String(body.persona_id || '').trim();
            const sourcePath = String(body.source_path || '').trim();
            if (!personaId) return sendJson(res, { error: 'persona_id required' }, 400);
            if (!sourcePath) return sendJson(res, { error: 'source_path required' }, 400);
            const result = cleanPersonaMarkdownAsset(personaId, sourcePath, body.initiated_by || 'human');
            return sendJson(res, { success: true, ...result });
        }
        if (pathname === '/api/personas/assets/books-workspace/refresh' && req.method === 'POST') {
            const body = await parseBody(req);
            const personaId = String(body.persona_id || '').trim();
            if (!personaId) return sendJson(res, { error: 'persona_id required' }, 400);
            const registry = ensureControlJson('registry.json', { personas: [] });
            const persona = asArray(registry.personas).find(item => item && item.id === personaId);
            const workspacePath = refreshPersonaBooksWorkspace(personaId, persona ? persona.name : personaId);
            return sendJson(res, { success: true, persona_id: personaId, workspace_path: workspacePath });
        }
        if (pathname === '/api/personas/assets/full-transcripts/generate' && req.method === 'POST') {
            return sendJson(
                res,
                { error: 'Fluxo PDF desativado. Use apenas transcricoes em markdown (.md/.txt).' },
                410
            );
        }
        if (pathname === '/api/personas/assets/extract-heuristics' && req.method === 'POST') {
            const body = await parseBody(req);
            const { persona_id, source_path } = body;
            if (!persona_id || !source_path) return sendJson(res, { error: 'persona_id e source_path requeridos' }, 400);

            let geminiConfig = null;
            try {
                geminiConfig = resolveGeminiApiConfig({ required: true, model: GEMINI_EXTRACT_MODEL });
            } catch (error) {
                return sendJson(res, { error: error.message }, 500);
            }
            const apiKey = geminiConfig.apiKey;

            try {
                const linkedAsset = resolvePersonaSourceAsset(persona_id, source_path);
                if (!linkedAsset) throw new Error('source_path nao esta vinculado a esta persona.');
                if (linkedAsset.kind === 'clone') throw new Error('Extracao de nectar deve usar transcricoes/anexos, nao o clone.');

                const fullSourcePath = safeWorkspacePath(linkedAsset.path);
                if (!fs.existsSync(fullSourcePath)) throw new Error('Arquivo fonte nao encontrado no disco.');
                const markdownContent = fs.readFileSync(fullSourcePath, 'utf8');

                // Extraindo basename para isolar em quarentena
                const baseFilename = path.basename(fullSourcePath).replace(/\.[^/.]+$/, "");
                const stagingDir = path.join(ROOT_DIR, 'knowledge', 'clones', 'staging');
                ensureDir(stagingDir);
                const stagingFileName = `${persona_id}_${baseFilename}_nectar.md`;
                const stagingFullPath = path.join(stagingDir, stagingFileName);

                // Chama a API do Gemini BraÃ§al
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(geminiConfig.model)}:generateContent?key=${apiKey}`;
                const prompt = `Aja APENAS como um Extrator de NÃ©ctar (Engenheiro de Dados Mestre). 
Eu vou te passar um "Transcript Bruto" (VÃ­deo/Livro).
Extraia puramente as heurÃ­sticas, o tom de voz, frameworks e mentalidade contidos neste arquivo em um formato de bullet points concisos e limpos (em Markdown). 
Sua saÃ­da serÃ¡ enviada para uma Sala de Quarentena (Staging Area), sem tocar no Clone Final ainda. 
NÃƒO enrole. NÃ£o inclua texto suplementar inicial ou dÃ­sticos. Imprima apenas os pontos em Markdown.

<FORMATO_ESPERADO>
## ðŸ§  HeurÃ­sticas do Arquivo (${baseFilename})
- Regra 1
- Tom de Voz X
</FORMATO_ESPERADO>

<TRANSCRIPT_BRUTO>
${markdownContent.substring(0, 150000)}
</TRANSCRIPT_BRUTO>`;

                const geminiRes = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
                });

                const geminiData = await geminiRes.json();
                if (!geminiRes.ok) throw new Error(geminiData.error?.message || 'Falha na API Gemini');

                let extractedRules = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
                if (!extractedRules) throw new Error('A API nao retornou regras claras.');
                if (extractedRules.startsWith('\`\`\`markdown')) {
                    extractedRules = extractedRules.replace(/^\`\`\`markdown\n?/, '').replace(/\n?\`\`\`$/, '');
                }

                // Salva o NÃ©ctar na Sala de Quarentena (Staging)
                writeText(stagingFullPath, `${extractedRules.trim()}\n`);
                
                // Tracking visual para a UI (MarcaÃ§Ã£o que o usuÃ¡rio pediu)
                const trackingFile = path.join(CONTROL_DIR, 'extracted_assets.json');
                const trackingData = ensureControlJson('extracted_assets.json', { extractions: {} });
                const now = new Date().toISOString();
                const previous = trackingData.extractions[linkedAsset.path] || {};
                trackingData.extractions[linkedAsset.path] = {
                    ...previous,
                    date: now,
                    last_extracted_at: now,
                    persona_id: persona_id,
                    extracted: true,
                    harmonized: false,
                    extraction_count: Number(previous.extraction_count || 0) + 1,
                    harmonization_count: Number(previous.harmonization_count || 0),
                    procedure_count: Number(previous.procedure_count || 0),
                    reset_count: Number(previous.reset_count || 0)
                };
                delete trackingData.extractions[linkedAsset.path].harmonized_at;
                writeJsonAtomic(trackingFile, trackingData, 4);

                return sendJson(res, {
                    success: true,
                    staging_path: stagingFullPath,
                    rules: extractedRules,
                    model: geminiConfig.model,
                    api_key_source: geminiConfig.apiKeySource
                });
            } catch (err) {
                console.error('[GEMINI EXTRACTION ERROR]', err);
                return sendJson(res, { error: err.message }, 500);
            }
        }
        if (pathname === '/api/personas/assets/harmonize-staging' && req.method === 'POST') {
            const body = await parseBody(req);
            const { persona_id, source_path } = body;
            if (!persona_id || !source_path) return sendJson(res, { error: 'persona_id e source_path requeridos' }, 400);

            let geminiConfig = null;
            try {
                geminiConfig = resolveGeminiApiConfig({ required: true, model: GEMINI_HARMONIZE_MODEL });
            } catch (error) {
                return sendJson(res, { error: error.message }, 500);
            }
            const apiKey = geminiConfig.apiKey;

            try {
                const linkedAsset = resolvePersonaSourceAsset(persona_id, source_path);
                if (!linkedAsset) throw new Error('source_path nao esta vinculado a esta persona.');
                if (linkedAsset.kind === 'clone') throw new Error('Harmonizacao requer um arquivo de transcricao/anexo como fonte.');

                const baseFilename = path.basename(linkedAsset.path).replace(/\.[^/.]+$/, "");
                const stagingDir = path.join(ROOT_DIR, 'knowledge', 'clones', 'staging');
                const stagingFileName = `${persona_id}_${baseFilename}_nectar.md`;
                const stagingFullPath = path.join(stagingDir, stagingFileName);

                if (!fs.existsSync(stagingFullPath)) throw new Error('Arquivo de staging (quarentena) nÃ£o encontrado.');
                const nectarData = fs.readFileSync(stagingFullPath, 'utf8');

                const { entry } = findPersonaMaterialEntry(persona_id, true);
                const cloneRelPath = entry.clone_file || PERSONA_CLONE_DEFAULTS[persona_id] || `knowledge/clones/${persona_id.replace(/^prs-/, '')}_clone.md`;
                const cloneFullPath = path.join(ROOT_DIR, cloneRelPath);

                let cloneContent = '';
                if (fs.existsSync(cloneFullPath)) {
                    cloneContent = fs.readFileSync(cloneFullPath, 'utf8');
                } else {
                    ensureDir(path.dirname(cloneFullPath));
                    cloneContent = `---\nname: ${persona_id}\n---\n\n# SYSTEM PROMPT: CLONE ${persona_id}\nVocÃª Ã© um especialista.`;
                }

                const audit = await runNectarAudit({
                    personaId: persona_id,
                    linkedAsset,
                    cloneRelPath,
                    cloneContent,
                    stagingFullPath,
                    nectarData,
                    geminiConfig
                });

                if (audit.decision !== 'APROVAR') {
                    return sendJson(res, {
                        success: false,
                        blocked_by_audit: true,
                        error: `Auditoria Nectar Auditor bloqueou a harmonizacao: ${audit.decision}. Revise o parecer antes de prosseguir.`,
                        audit
                    }, 409);
                }

                // O Agente Harmonizador
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(geminiConfig.model)}:generateContent?key=${apiKey}`;
                const prompt = `VocÃª Ã© o Arquiteto Harmonizador (Agent Orchestrator).
Vou te passar o "CÃ©rebro Atual do Clone" e um "NÃ©ctar" (Regras isoladas na quarentena).
Sua missÃ£o: MERGEAR este NÃ©ctar com o CÃ©rebro Atual.
Resolva contradiÃ§Ãµes, mantenha o perfil agressivo/suave intacto, estruture logicamente e evite repetiÃ§Ãµes.
Retorne APENAS o arquivo Markdown do CÃ©rebro Atualizado completo, pronto para ser salvo. Sem textos de apoio.

[CEREBRO_ATUAL]
${cloneContent}
[/CEREBRO_ATUAL]

[NECTAR_PARA_INJETAR]
${nectarData}
[/NECTAR_PARA_INJETAR]

[PARECER_NECTAR_AUDITOR_APROVADO]
decision: ${audit.decision}
score: ${audit.score ?? '-'}
risk: ${audit.dilution_risk || '-'}
review_path: ${audit.review_path}
[/PARECER_NECTAR_AUDITOR_APROVADO]`;

                const geminiRes = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
                });

                const geminiData = await geminiRes.json();
                if (!geminiRes.ok) throw new Error(geminiData.error?.message || 'Falha na API Gemini Harmonize');

                let harmonizedRules = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
                if (!harmonizedRules) throw new Error('A API nao retornou regras claras.');
                if (harmonizedRules.startsWith('\`\`\`markdown')) harmonizedRules = harmonizedRules.replace(/^\`\`\`markdown\n?/, '');
                if (harmonizedRules.endsWith('\`\`\`')) harmonizedRules = harmonizedRules.replace(/\n?\`\`\`$/, '');

                const candidateDir = path.join(ROOT_DIR, 'knowledge', 'clones', 'candidates');
                ensureDir(candidateDir);
                const candidateFileName = `${persona_id}_${baseFilename}_candidate_${timestampForFile()}.md`;
                const candidateFullPath = path.join(candidateDir, candidateFileName);
                const candidateRelPath = workspaceRelativePath(candidateFullPath);
                const stagingRelPath = workspaceRelativePath(stagingFullPath);
                const ledgerEntry = {
                    at: nowIso(),
                    source_path: linkedAsset.path,
                    staging_path: stagingRelPath,
                    candidate_path: candidateRelPath
                };
                const candidateContent = appendHarmonizationLedger(harmonizedRules.trim(), ledgerEntry);

                writeText(candidateFullPath, candidateContent);
                // O clone final nao e sobrescrito aqui. A aplicacao exige confirmacao explicita.

                // Marcar como harmonizado no tracking
                const trackingFile = path.join(CONTROL_DIR, 'extracted_assets.json');
                const trackingData = ensureControlJson('extracted_assets.json', { extractions: {} });
                const now = new Date().toISOString();
                const previous = trackingData.extractions[linkedAsset.path] || {};
                trackingData.extractions[linkedAsset.path] = {
                    ...previous,
                    date: now,
                    last_candidate_at: now,
                    persona_id: persona_id,
                    extracted: true,
                    harmonized: false,
                    pending_candidate: true,
                    candidate_path: candidateRelPath,
                    extraction_count: Number(previous.extraction_count || 0),
                    harmonization_count: Number(previous.harmonization_count || 0),
                    procedure_count: Number(previous.procedure_count || 0),
                    reset_count: Number(previous.reset_count || 0)
                };
                delete trackingData.extractions[linkedAsset.path].harmonized_at;
                delete trackingData.extractions[linkedAsset.path].last_harmonized_at;
                writeJsonAtomic(trackingFile, trackingData, 4);

                return sendJson(res, {
                    success: true,
                    clone_path: cloneRelPath,
                    candidate_path: candidateRelPath,
                    staging_path: stagingRelPath,
                    audit,
                    preview_required: true,
                    model: geminiConfig.model,
                    api_key_source: geminiConfig.apiKeySource
                });
            } catch (err) {
                console.error('[GEMINI HARMONIZE ERROR]', err);
                return sendJson(res, { error: err.message }, 500);
            }
        }
        if (pathname === '/api/personas/assets/audit-nectar' && req.method === 'POST') {
            const body = await parseBody(req);
            const { persona_id, source_path } = body;
            if (!persona_id || !source_path) return sendJson(res, { error: 'persona_id e source_path requeridos' }, 400);

            let geminiConfig = null;
            try {
                geminiConfig = resolveGeminiApiConfig({ required: true, model: GEMINI_HARMONIZE_MODEL });
            } catch (error) {
                return sendJson(res, { error: error.message }, 500);
            }

            try {
                const linkedAsset = resolvePersonaSourceAsset(persona_id, source_path);
                if (!linkedAsset) throw new Error('source_path nao esta vinculado a esta persona.');
                if (linkedAsset.kind === 'clone') throw new Error('Auditoria de nectar deve usar transcricoes/anexos, nao o clone.');

                const baseFilename = path.basename(linkedAsset.path).replace(/\.[^/.]+$/, '');
                const stagingDir = path.join(ROOT_DIR, 'knowledge', 'clones', 'staging');
                const stagingFileName = `${persona_id}_${baseFilename}_nectar.md`;
                const stagingFullPath = path.join(stagingDir, stagingFileName);
                if (!fs.existsSync(stagingFullPath)) throw new Error('Arquivo de staging (quarentena) nao encontrado. Execute Extrair antes de Auditar.');
                const nectarData = fs.readFileSync(stagingFullPath, 'utf8');

                const { entry } = findPersonaMaterialEntry(persona_id, true);
                const cloneRelPath = entry.clone_file || PERSONA_CLONE_DEFAULTS[persona_id] || `knowledge/clones/${persona_id.replace(/^prs-/, '')}_clone.md`;
                const cloneFullPath = safeWorkspacePath(cloneRelPath);
                const cloneContent = fs.existsSync(cloneFullPath)
                    ? fs.readFileSync(cloneFullPath, 'utf8')
                    : `---\nname: ${persona_id}\n---\n\n# SYSTEM PROMPT: CLONE ${persona_id}\nVoce e um especialista.`;

                const audit = await runNectarAudit({
                    personaId: persona_id,
                    linkedAsset,
                    cloneRelPath,
                    cloneContent,
                    stagingFullPath,
                    nectarData,
                    geminiConfig
                });

                return sendJson(res, { success: true, audit });
            } catch (err) {
                console.error('[NECTAR AUDIT ERROR]', err);
                return sendJson(res, { error: err.message }, 500);
            }
        }
        if (pathname === '/api/personas/assets/apply-harmonization' && req.method === 'POST') {
            const body = await parseBody(req);
            const { persona_id, source_path, candidate_path } = body;
            if (!persona_id || !source_path || !candidate_path) {
                return sendJson(res, { error: 'persona_id, source_path e candidate_path requeridos' }, 400);
            }

            try {
                const linkedAsset = resolvePersonaSourceAsset(persona_id, source_path);
                if (!linkedAsset) throw new Error('source_path nao esta vinculado a esta persona.');

                const candidateRelPath = normalizePathForJson(candidate_path);
                if (!candidateRelPath.startsWith('knowledge/clones/candidates/')) {
                    throw new Error('candidate_path invalido para harmonizacao.');
                }
                const candidateFullPath = safeWorkspacePath(candidateRelPath);
                if (!fs.existsSync(candidateFullPath)) throw new Error('Arquivo candidato nao encontrado.');

                const { entry } = findPersonaMaterialEntry(persona_id, true);
                const cloneRelPath = entry.clone_file || PERSONA_CLONE_DEFAULTS[persona_id] || `knowledge/clones/${persona_id.replace(/^prs-/, '')}_clone.md`;
                const cloneFullPath = safeWorkspacePath(cloneRelPath);
                const backupDir = path.join(ROOT_DIR, 'knowledge', 'clones', 'backups');
                ensureDir(backupDir);
                const cloneBaseName = path.basename(cloneRelPath, path.extname(cloneRelPath));
                const backupFullPath = path.join(backupDir, `${persona_id}_${cloneBaseName}_${timestampForFile()}.md`);
                const backupRelPath = workspaceRelativePath(backupFullPath);

                if (fs.existsSync(cloneFullPath)) {
                    fs.copyFileSync(cloneFullPath, backupFullPath);
                } else {
                    writeText(backupFullPath, '');
                    ensureDir(path.dirname(cloneFullPath));
                }

                fs.copyFileSync(candidateFullPath, cloneFullPath);

                const trackingFile = path.join(CONTROL_DIR, 'extracted_assets.json');
                const trackingData = ensureControlJson('extracted_assets.json', { extractions: {} });
                const now = new Date().toISOString();
                const previous = trackingData.extractions[linkedAsset.path] || {};
                trackingData.extractions[linkedAsset.path] = {
                    ...previous,
                    date: now,
                    last_harmonized_at: now,
                    persona_id,
                    extracted: true,
                    harmonized: true,
                    harmonized_at: now,
                    pending_candidate: false,
                    candidate_path: candidateRelPath,
                    backup_path: backupRelPath,
                    extraction_count: Number(previous.extraction_count || 0),
                    harmonization_count: Number(previous.harmonization_count || 0) + 1,
                    procedure_count: Number(previous.procedure_count || 0) + 1,
                    reset_count: Number(previous.reset_count || 0)
                };
                writeJsonAtomic(trackingFile, trackingData, 4);

                return sendJson(res, {
                    success: true,
                    clone_path: cloneRelPath,
                    candidate_path: candidateRelPath,
                    backup_path: backupRelPath
                });
            } catch (err) {
                console.error('[APPLY HARMONIZATION ERROR]', err);
                return sendJson(res, { error: err.message }, 500);
            }
        }
        if (pathname === '/api/personas/assets/reset-tracking' && req.method === 'POST') {
            const body = await parseBody(req);
            const { persona_id, source_path } = body;
            if (!persona_id || !source_path) return sendJson(res, { error: 'persona_id e source_path requeridos' }, 400);

            try {
                const linkedAsset = resolvePersonaSourceAsset(persona_id, source_path);
                if (!linkedAsset) throw new Error('source_path nao esta vinculado a esta persona.');

                const trackingFile = path.join(CONTROL_DIR, 'extracted_assets.json');
                const trackingData = ensureControlJson('extracted_assets.json', { extractions: {} });
                
                if (trackingData.extractions[linkedAsset.path]) {
                    const previous = trackingData.extractions[linkedAsset.path];
                    trackingData.extractions[linkedAsset.path] = {
                        ...previous,
                        date: new Date().toISOString(),
                        extracted: false,
                        harmonized: false,
                        reset_count: Number(previous.reset_count || 0) + 1
                    };
                    delete trackingData.extractions[linkedAsset.path].harmonized_at;
                    delete trackingData.extractions[linkedAsset.path].last_harmonized_at;
                    delete trackingData.extractions[linkedAsset.path].pending_candidate;
                    delete trackingData.extractions[linkedAsset.path].candidate_path;
                    delete trackingData.extractions[linkedAsset.path].audit_status;
                    delete trackingData.extractions[linkedAsset.path].audit_score;
                    delete trackingData.extractions[linkedAsset.path].audit_risk;
                    delete trackingData.extractions[linkedAsset.path].audit_path;
                    delete trackingData.extractions[linkedAsset.path].last_audited_at;
                    writeJsonAtomic(trackingFile, trackingData, 4);
                }

                return sendJson(res, { success: true });
            } catch (err) {
                return sendJson(res, { error: err.message }, 500);
            }
        }
        if (pathname === '/api/personas/assets/ingest-url' && req.method === 'POST') {
            const body = await parseBody(req);
            const { url, persona_id, kind = 'full_transcript' } = body;
            if (!url || !persona_id) return sendJson(res, { error: 'url e persona_id requeridos' }, 400);

            try {
                const urlObj = new URL(url);
                if (!/^https?:$/i.test(urlObj.protocol)) {
                    throw new Error('Somente URLs http/https sao permitidas.');
                }
                const normalizedKind = String(kind || '').trim().toLowerCase();
                const allowedKinds = new Set(['transcript', 'full_transcript', 'support']);
                if (!allowedKinds.has(normalizedKind)) {
                    throw new Error('kind invalido para ingestao por URL.');
                }

                let markdown = '';
                let ingestionMode = 'web_scrape';
                let ingestionMeta = {};
                if (isYouTubeHost(urlObj.hostname)) {
                    const youtubeResult = await fetchYouTubeTranscriptMarkdown(urlObj.toString(), {
                        allowAudioFallback: body.allow_audio_fallback !== false,
                        forceAudioApi: body.force_audio_api === true
                    });
                    markdown = youtubeResult.markdown;
                    ingestionMode = youtubeResult.mode || 'youtube_transcript';
                    ingestionMeta = {
                        video_id: youtubeResult.video_id || null,
                        model: youtubeResult.model || null,
                        api_key_source: youtubeResult.api_key_source || null
                    };
                } else {
                    const response = await fetch(urlObj.toString(), { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } });
                    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
                    const htmlData = await response.text();

                    const dom = new JSDOM(htmlData);
                    const document = dom.window.document;
                    const elementsToRemove = document.querySelectorAll('script, style, noscript, nav, footer, header, svg, iframe');
                    elementsToRemove.forEach(el => el.remove());

                    const cleanHtml = DOMPurify(dom.window).sanitize(document.body.innerHTML);
                    const turndownService = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
                    markdown = turndownService.turndown(cleanHtml).replace(/\n{3,}/g, '\n\n').trim();
                }

                if (!String(markdown || '').trim()) {
                    throw new Error('Nao foi possivel extrair conteudo textual da URL informada.');
                }

                const slug = `${ingestionMode}_${urlObj.hostname.replace(/[^a-z0-9]/gi, '_')}${urlObj.pathname.replace(/[^a-z0-9]/gi, '_')}`;
                const cleanSlug = slug.replace(/_+/g, '_').replace(/^_|_$/g, '').substring(0, 40) || 'page';
                const fileName = `ingest_${cleanSlug}_${Date.now()}.md`;
                const targetDir = path.join(ROOT_DIR, 'knowledge', 'clones', 'transcripts');
                
                if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
                const savePath = path.join(targetDir, fileName);
                writeText(savePath, `${markdown.trim()}\n`);
                
                const relPath = `knowledge/clones/transcripts/${fileName}`;
                const linkResult = await attachPersonaAsset({
                    personaId: persona_id,
                    kind: normalizedKind,
                    sourcePath: relPath,
                    copyToLibrary: false,
                    initiatedBy: body.initiated_by || 'dashboard_url_ingest'
                });
                
                return sendJson(res, {
                    success: true,
                    file: relPath,
                    bytes: markdown.length,
                    mode: ingestionMode,
                    ...ingestionMeta,
                    link: linkResult
                });
            } catch (err) {
                console.error('[URL INGEST] Ocorreu um erro:', err.message);
                return sendJson(res, { error: 'Parse falhou: ' + err.message }, 500);
            }
        }
        if (pathname === '/api/project-flows' && req.method === 'GET') return sendJson(res, ensureControlJson(FILES.projectFlows, { projects: {} }));
        if (pathname === '/api/session' && req.method === 'GET') return sendJson(res, ensureControlJson(FILES.session, { current_session: null, history: [] }));
        if (pathname === '/api/cloud-sync/status' && req.method === 'GET') return sendJson(res, loadCloudSyncState());
        if (pathname === '/api/snapshots' && req.method === 'GET') return sendJson(res, ensureControlJson(FILES.snapshots, { snapshots: [] }));

        if (pathname === '/api/registry/personas' && req.method === 'POST') {
            const body = await parseBody(req);
            if (!body.name) return sendJson(res, { error: 'name required' }, 400);
            const registry = ensureControlJson('registry.json', {});
            registry.personas = asArray(registry.personas);
            const id = `prs-${body.name.toLowerCase().replace(/\s+/g, '-')}`;
            if (registry.personas.some(item => item && item.id === id)) {
                return sendJson(res, { error: 'persona already exists', id }, 409);
            }
            const persona = {
                id,
                icon: body.icon || 'ðŸ‘¤',
                name: body.name,
                role: body.role || 'Nova Persona',
                traits: body.traits || [],
                bio: body.bio || '',
                agents: body.agents || []
            };
            registry.personas.push(persona);
            writeControlJson('registry.json', registry);
            const personaDir = path.join(ROOT_DIR, '.codex', 'personas');
            ensureDir(personaDir);
            const personaFile = path.join(personaDir, `${id}.md`);
            if (!fs.existsSync(personaFile)) writeText(personaFile, `# Persona ${body.name}\n\nGuia da persona.\n`);
            const synced = findPersonaMaterialEntry(id, true);
            writeControlJson(FILES.personaMaterials, synced.materials);
            return sendJson(res, { success: true, persona });
        }

        if (pathname === '/api/registry/agents' && req.method === 'POST') {
            const body = await parseBody(req);
            const name = String(body.name || '').trim();
            const handle = String(body.handle || '').trim();
            const squad = String(body.squad || 'SQD-CORE').trim();
            if (!name) return sendJson(res, { error: 'name required' }, 400);
            if (!handle || !handle.startsWith('@')) return sendJson(res, { error: 'handle must start with @' }, 400);

            const registry = ensureControlJson('registry.json', {});
            registry.agents = asArray(registry.agents);
            registry.squads = asArray(registry.squads);
            if (registry.agents.some(item => item && item.handle === handle)) {
                return sendJson(res, { error: 'agent handle already exists', handle }, 409);
            }

            const squadSuffix = String(squad || 'SQD-CORE').replace(/^SQD-/i, '').toUpperCase() || 'CORE';
            const existingIds = registry.agents.map(item => item && item.id).filter(Boolean);
            let index = 1;
            while (existingIds.includes(`AGT-${squadSuffix}-${String(index).padStart(2, '0')}`)) index += 1;
            const agent = {
                id: `AGT-${squadSuffix}-${String(index).padStart(2, '0')}`,
                name,
                handle,
                squad,
                role: String(body.role || 'Novo agente operacional.').trim(),
                icon: body.icon || 'user'
            };

            registry.agents.push(agent);
            const targetSquad = registry.squads.find(item => item && item.id === squad);
            if (targetSquad) {
                targetSquad.agents = asArray(targetSquad.agents);
                if (!targetSquad.agents.includes(agent.id)) targetSquad.agents.push(agent.id);
            }
            writeControlJson('registry.json', registry);

            const fileName = slugifySegment(handle.replace(/^@/, '')) || slugifySegment(name) || agent.id.toLowerCase();
            const relPath = `.codex/agents/${fileName}.md`;
            const fullPath = safeWorkspacePath(relPath);
            if (!fs.existsSync(fullPath)) {
                writeText(fullPath, `# ${name}\n\n## Role\n${agent.role}\n\n## Handle\n${handle}\n\n## Squad\n${squad}\n`);
            }
            appendExecutionLog('registry_create', agent.id, `Agente criado: ${name}`, body.initiated_by || 'human', null, body.project_id || null);
            appendMemoryMutation('registry', `Novo agente registrado: ${name}`, body.initiated_by || 'human', body.project_id || null);
            return sendJson(res, { success: true, agent, file_path: relPath });
        }

        if (pathname === '/api/registry/skills' && req.method === 'POST') {
            const body = await parseBody(req);
            const name = String(body.name || '').trim();
            if (!name) return sendJson(res, { error: 'name required' }, 400);

            const registry = ensureControlJson('registry.json', {});
            registry.skills = registry.skills && typeof registry.skills === 'object' ? registry.skills : {};
            const group = String(body.group || 'CORE').trim().toUpperCase() || 'CORE';
            registry.skills[group] = asArray(registry.skills[group]);
            const allSkills = Object.values(registry.skills).flatMap(items => asArray(items));
            if (allSkills.some(item => item && String(item.name || '').toLowerCase() === name.toLowerCase())) {
                return sendJson(res, { error: 'skill already exists', name }, 409);
            }

            const prefix = `SKL-${group}-`;
            const existingIds = allSkills.map(item => item && item.id).filter(Boolean);
            let index = 1;
            while (existingIds.includes(`${prefix}${String(index).padStart(2, '0')}`)) index += 1;
            const fileName = slugifySegment(name) || `${group.toLowerCase()}-${String(index).padStart(2, '0')}`;
            const relPath = `.codex/skills/${fileName}.md`;
            const skill = {
                id: `${prefix}${String(index).padStart(2, '0')}`,
                name,
                desc: String(body.desc || 'Nova skill operacional.').trim(),
                agents: asArray(body.agents),
                activation_lane: body.activation_lane || 'producao',
                activation_relevance: body.activation_relevance || 'build',
                activation_criticality: body.activation_criticality || 'media',
                activation_trigger: body.activation_trigger || 'fase+manual',
                activation_enabled: body.activation_enabled !== false,
                playbook_file: relPath
            };

            registry.skills[group].push(skill);
            writeControlJson('registry.json', registry);
            const fullPath = safeWorkspacePath(relPath);
            if (!fs.existsSync(fullPath)) {
                writeText(fullPath, `# ${name}\n\n## Objetivo\n${skill.desc}\n\n## Ativacao\n- Lane: ${skill.activation_lane}\n- Trigger: ${skill.activation_trigger}\n`);
            }
            appendExecutionLog('registry_create', skill.id, `Skill criada: ${name}`, body.initiated_by || 'human', null, body.project_id || null);
            appendMemoryMutation('registry', `Nova skill registrada: ${name}`, body.initiated_by || 'human', body.project_id || null);
            return sendJson(res, { success: true, skill, file_path: relPath });
        }

        if (pathname.startsWith('/api/build/') && req.method === 'POST') {
            const phaseId = pathname.split('/')[3];
            const body = await parseBody(req);
            const data = ensureControlJson('build_state.json', { phases: [] });
            data.phases = asArray(data.phases);
            const phase = data.phases.find(item => item.id === phaseId);
            if (!phase) return sendJson(res, { error: 'phase not found' }, 404);
            const from = phase.state;
            if (body.state) phase.state = body.state;
            if (body.last_run !== undefined) phase.last_run = body.last_run;
            phase.last_run_at = nowIso();
            writeControlJson('build_state.json', data);
            appendExecutionLog(
                'state_change',
                phaseId,
                `${from} -> ${phase.state}`,
                body.initiated_by || 'human',
                null,
                body.project_id || null
            );
            recordMemorySyncFromPhase('BUILD', phaseId, phase.state, body.initiated_by || 'human', body.project_id || null);
            return sendJson(res, { success: true, phase });
        }

        if (pathname.startsWith('/api/ops/') && req.method === 'POST') {
            const stageId = pathname.split('/')[3];
            const body = await parseBody(req);
            const data = ensureControlJson('ops_state.json', { stages: [] });
            data.stages = asArray(data.stages);
            const stage = data.stages.find(item => item.id === stageId);
            if (!stage) return sendJson(res, { error: 'stage not found' }, 404);
            if (body.state) stage.state = body.state;
            if (body.last_error !== undefined) stage.last_error = body.last_error;
            writeControlJson('ops_state.json', data);
            recordMemorySyncFromPhase('OPS', stageId, stage.state, body.initiated_by || 'human', body.project_id || null);
            return sendJson(res, { success: true, stage });
        }

        if (pathname === '/api/approvals' && req.method === 'POST') {
            const body = await parseBody(req);
            const data = ensureControlJson('approvals.json', { items: [] });
            data.items = asArray(data.items);
            if (body.action === 'create') {
                const item = {
                    id: nextSerial('APR', data.items.map(v => v.id)),
                    decision_id: body.decision_id || null,
                    phase_id: body.phase_id || null,
                    project_id: normalizeProjectId(body.project_id || null),
                    context: body.context || '',
                    status: 'pending',
                    created_at: nowIso(),
                    resolved_at: null,
                    resolved_by: null,
                    notes: null
                };
                data.items.push(item);
                writeControlJson('approvals.json', data);
                return sendJson(res, { success: true, item });
            }
            if (body.action === 'resolve') {
                const item = data.items.find(v => v.id === body.approval_id);
                if (!item) return sendJson(res, { error: 'approval not found' }, 404);
                item.status = body.verdict || 'approved';
                item.resolved_at = nowIso();
                item.resolved_by = body.resolved_by || 'human';
                item.notes = body.notes || null;
                writeControlJson('approvals.json', data);
                appendExecutionLog(
                    'approval',
                    item.decision_id || item.phase_id,
                    item.status,
                    item.resolved_by,
                    null,
                    item.project_id || normalizeProjectId(body.project_id || null)
                );
                return sendJson(res, { success: true, item });
            }
            return sendJson(res, { error: 'invalid action' }, 400);
        }

        if (pathname === '/api/alerts' && req.method === 'POST') {
            const body = await parseBody(req);
            const data = ensureControlJson('alerts.json', { items: [] });
            data.items = asArray(data.items);
            if (body.action === 'create') {
                const item = {
                    id: nextSerial('ALT', data.items.map(v => v.id)),
                    severity: body.severity || 'medium',
                    owner: body.owner || null,
                    message: body.message || '',
                    source: body.source || null,
                    status: 'open',
                    created_at: nowIso(),
                    ack_at: null,
                    closed_at: null
                };
                data.items.push(item);
                writeControlJson('alerts.json', data);
                return sendJson(res, { success: true, item });
            }
            if (body.action === 'ack' || body.action === 'close') {
                const item = data.items.find(v => v.id === body.alert_id);
                if (!item) return sendJson(res, { error: 'alert not found' }, 404);
                if (body.action === 'ack') { item.status = 'acknowledged'; item.ack_at = nowIso(); }
                if (body.action === 'close') { item.status = 'closed'; item.closed_at = nowIso(); }
                writeControlJson('alerts.json', data);
                return sendJson(res, { success: true, item });
            }
            return sendJson(res, { error: 'invalid action' }, 400);
        }

        if (pathname === '/api/incidents' && req.method === 'POST') {
            const body = await parseBody(req);
            const data = ensureControlJson('incidents.json', { items: [] });
            data.items = asArray(data.items);
            if (body.action === 'create') {
                const item = {
                    id: nextSerial('INC', data.items.map(v => v.id)),
                    severity: body.severity || 'medium',
                    owner: body.owner || null,
                    source_run: body.source_run || null,
                    blast_radius: body.blast_radius || null,
                    affected_nodes: body.affected_nodes || [],
                    affected_artifacts: body.affected_artifacts || [],
                    recovery_path: body.recovery_path || null,
                    description: body.description || '',
                    status: 'open',
                    ack_required: true,
                    created_at: nowIso(),
                    resolved_at: null
                };
                data.items.push(item);
                writeControlJson('incidents.json', data);
                return sendJson(res, { success: true, item });
            }
            if (body.action === 'resolve') {
                const item = data.items.find(v => v.id === body.incident_id);
                if (!item) return sendJson(res, { error: 'incident not found' }, 404);
                item.status = 'resolved';
                item.resolved_at = nowIso();
                item.resolution = body.resolution || null;
                writeControlJson('incidents.json', data);
                return sendJson(res, { success: true, item });
            }
            return sendJson(res, { error: 'invalid action' }, 400);
        }

        if (pathname === '/api/reruns' && req.method === 'POST') {
            const body = await parseBody(req);
            const data = ensureControlJson('reruns.json', { items: [] });
            data.items = asArray(data.items);
            const item = {
                id: nextSerial('RERUN', data.items.map(v => v.id)),
                parent_run_id: body.parent_run_id || null,
                initiated_by: body.initiated_by || 'human',
                reason: body.reason || '',
                scope: body.scope || 'node',
                target_id: body.target_id || null,
                context_snapshot_id: nextSerial('CTX', []),
                memory_policy: body.memory_policy || 'inherit',
                approval_required: Boolean(body.approval_required),
                status: 'queued',
                created_at: nowIso()
            };
            data.items.push(item);
            writeControlJson('reruns.json', data);
            return sendJson(res, { success: true, item });
        }

        if (pathname === '/api/logs' && req.method === 'POST') {
            const body = await parseBody(req);
            const id = appendExecutionLog(
                body.type || 'execution',
                body.target || null,
                body.details || null,
                body.initiated_by || 'system',
                body.why_this_ran || null,
                body.project_id || null
            );
            return sendJson(res, { success: true, entry: { id } });
        }

        if (pathname === '/api/commands' && req.method === 'POST') {
            const body = await parseBody(req);
            const data = ensureControlJson('manual_interventions.json', { entries: [] });
            data.entries = asArray(data.entries);
            const entry = {
                id: nextSerial('CMD', data.entries.map(v => v.id)),
                issued_by: body.issued_by || '[HUMAN_OWNER_PENDING]',
                target_scope: body.target_scope || 'node',
                target_id: body.target_id || null,
                project_id: normalizeProjectId(body.project_id || null),
                action: body.action || 'annotate',
                payload: body.payload || {},
                approval_required: Boolean(body.approval_required),
                timestamp: nowIso()
            };
            data.entries.push(entry);
            writeControlJson('manual_interventions.json', data);
            appendExecutionLog('manual_intervention', entry.target_id, entry.action, 'human', null, entry.project_id);
            return sendJson(res, { success: true, entry });
        }

        if (pathname === '/api/memory/mutate' && req.method === 'POST') {
            const body = await parseBody(req);
            appendMemoryMutation(body.memory_scope || 'manual', body.diff_summary || 'Mutacao manual registrada', body.mutated_by || 'human');
            scheduleAutoCloudSync('memory_mutation_manual', body.project_id || null);
            return sendJson(res, { success: true });
        }

        if (pathname === '/api/memory/files/register' && req.method === 'POST') {
            const body = await parseBody(req);
            const filePath = normalizePathForJson(body.path || '');
            if (!filePath) return sendJson(res, { error: 'path required' }, 400);
            const absolute = safeWorkspacePath(filePath);
            if (!fs.existsSync(absolute)) return sendJson(res, { error: 'file not found' }, 404);
            registerTrackedMemoryFile(filePath);
            appendMemoryMutation('memory_registry', `Arquivo registrado para leitura de memoria: ${filePath}`, body.by || 'human');
            scheduleAutoCloudSync('memory_file_register', body.project_id || null);
            return sendJson(res, { success: true, path: filePath });
        }

        if (pathname === '/api/memory/files/create' && req.method === 'POST') {
            const body = await parseBody(req);
            const baseName = String(body.file_name || '').trim();
            if (!baseName) return sendJson(res, { error: 'file_name required' }, 400);
            const ext = (body.type === 'json' ? '.json' : '.md');
            const safeName = baseName.toLowerCase().replace(/[^a-z0-9-_]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'memory-note';
            const relPath = normalizePathForJson(`docs/control/memory_extra/${safeName}${ext}`);
            const absolute = safeWorkspacePath(relPath);
            if (fs.existsSync(absolute)) return sendJson(res, { error: 'file already exists', path: relPath }, 409);
            const initialContent = ext === '.json'
                ? `${JSON.stringify({ title: baseName, created_at: nowIso(), notes: [] }, null, 2)}\n`
                : `# ${baseName}\n\n- created_at: ${nowIso()}\n- notes:\n`;
            writeText(absolute, initialContent);
            registerTrackedMemoryFile(relPath);
            appendMemoryMutation('memory_registry', `Novo arquivo de memoria criado: ${relPath}`, body.by || 'human');
            scheduleAutoCloudSync('memory_file_create', body.project_id || null);
            return sendJson(res, { success: true, path: relPath });
        }

        if (pathname === '/api/session/start' && req.method === 'POST') {
            const body = await parseBody(req);
            return sendJson(res, { success: true, ...runSessionStart(body) });
        }

        if (pathname === '/api/session/close' && req.method === 'POST') {
            const body = await parseBody(req);
            return sendJson(res, { success: true, ...runSessionClose(body) });
        }

        if (pathname === '/api/session/pulse' && req.method === 'POST') {
            const body = await parseBody(req);
            return sendJson(res, { success: true, ...touchSessionPulse(body) });
        }

        if (pathname === '/api/cloud-sync/auto' && req.method === 'POST') {
            const body = await parseBody(req);
            const state = loadCloudSyncState();
            state.auto_sync_memory = Boolean(body.enabled);
            writeCloudSyncState(state);
            return sendJson(res, { success: true, auto_sync_memory: state.auto_sync_memory });
        }

        if (pathname === '/api/cloud-sync/run' && req.method === 'POST') {
            const body = await parseBody(req);
            const target = ['all', 'github', 'firebase'].includes(body.target) ? body.target : 'all';
            const scope = ['memory', 'all'].includes(body.scope) ? body.scope : 'memory';
            const result = await runCloudSyncJob({
                target,
                scope,
                trigger: body.trigger || 'manual',
                initiated_by: body.initiated_by || 'human',
                project_id: body.project_id || null,
                commit_message: body.commit_message || null
            });
            return sendJson(res, { success: true, ...result });
        }

        if (pathname === '/api/cloud-sync/save-all' && req.method === 'POST') {
            const body = await parseBody(req);
            const closeSummary = String(body.summary || '').trim() || 'Salvar tudo na nuvem pelo painel.';
            const nextAction = String(body.next_action || '').trim();
            const completedTasks = asArray(body.completed_tasks).map(v => String(v || '').trim()).filter(Boolean);
            const closePayload = {
                summary: closeSummary,
                next_action: nextAction,
                completed_tasks: completedTasks,
                closed_by: body.closed_by || 'human',
                model_hint: body.model_hint || 'dashboard',
                project_id: body.project_id || null,
                skip_auto_cloud: true
            };
            const closeResult = runSessionClose(closePayload);
            const cloudResult = await runCloudSyncJob({
                target: 'all',
                scope: 'all',
                trigger: body.trigger || 'save_all_button',
                initiated_by: closePayload.closed_by,
                project_id: closePayload.project_id
            });
            return sendJson(res, {
                success: true,
                checkpoint_id: closeResult.checkpoint_id || null,
                session: closeResult.session || null,
                cloud: cloudResult
            });
        }

        if (pathname.startsWith('/api/file') && req.method === 'GET') {
            const relative = decodeURIComponent(url.searchParams.get('path') || '');
            try {
                const absolute = safeWorkspacePath(relative);
                return sendText(res, fs.readFileSync(absolute, 'utf8'));
            } catch (error) {
                return sendText(res, `Erro ao ler arquivo: ${error.message}`, 'text/plain', 404);
            }
        }

        if (pathname === '/api/save' && req.method === 'POST') {
            const body = await parseBody(req);
            if (!body.path) return sendJson(res, { error: 'path required' }, 400);
            const normalizedPath = normalizePathForJson(body.path);
            const absolute = safeWorkspacePath(normalizedPath);
            writeText(absolute, body.content || '');
            if (normalizedPath.startsWith('docs/control/memory_extra/')) {
                registerTrackedMemoryFile(normalizedPath);
            }
            const isMemoryFile = maybeRegisterFileMutation(normalizedPath, body.initiated_by || 'human');
            const autoCloud = isMemoryFile ? scheduleAutoCloudSync('memory_file_save', body.project_id || null) : { scheduled: false };
            return sendJson(res, {
                success: true,
                memory_file: Boolean(isMemoryFile),
                cloud_sync_scheduled: Boolean(autoCloud.scheduled)
            });
        }

        const staticPath = path.join(DOCS_DIR, pathname);
        if (fs.existsSync(staticPath) && fs.statSync(staticPath).isFile()) {
            const ext = path.extname(staticPath);
            const mime = {
                '.html': 'text/html',
                '.js': 'text/javascript',
                '.css': 'text/css',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.svg': 'image/svg+xml'
            };
            return sendText(res, fs.readFileSync(staticPath), mime[ext] || 'application/octet-stream');
        }

        res.writeHead(404);
        return res.end(`Not found: ${pathname}`);
    } catch (error) {
        console.error('Server error:', error);
        return sendJson(res, { error: error.message }, 500);
    }
});

server.listen(PORT, () => {
    console.log(`Anti-Gravity Tower online: http://localhost:${PORT}`);
});


