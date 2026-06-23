import fs from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.resolve('projects/forex/research/rimantas-channel');
const INPUT = path.join(OUT_DIR, 'channel-videos.initial.json');
const JSON_OUT = path.join(OUT_DIR, 'channel-video-content-map.json');
const MD_OUT = path.join(OUT_DIR, 'channel-video-content-map.md');
const SUMMARY_OUT = path.join(OUT_DIR, 'channel-transcript-context-summary.md');
const CHANNEL_PAGE = path.join(OUT_DIR, 'channel-videos-page.html');
const PLAYER_CACHE_DIR = path.join(OUT_DIR, 'player-cache');
const TRANSCRIPT_ANALYSIS_CACHE_DIR = path.join(OUT_DIR, 'transcript-analysis-cache');

let youtubeTranscriptClient = null;
let youtubeTranscriptLoadTried = false;

const STOPWORDS = new Set([
  'the', 'and', 'for', 'with', 'you', 'your', 'how', 'to', 'in', 'on', 'of', 'a', 'an',
  'is', 'are', 'this', 'that', 'from', 'by', 'be', 'it', 'or', 'as', 'at', 'we', 'i',
  'can', 'will', 'video', 'tutorial', 'forex', 'trading', 'trade', 'trades',
]);

const DOMAIN_RULES = [
  { tag: 'Local Trade Copier', match: /local trade copier|ltc\b|copy trades|trade copier/i },
  { tag: 'Remote Trade Copier', match: /remote trade copier|rtc\b|signal receiver|signal provider/i },
  { tag: 'MT4/MT5 interoperability', match: /mt4|mt5|metatrader|meta trader|mql4|mql5/i },
  { tag: 'EA engineering', match: /expert advisor|\bea\b|robot|autotrading|automation|mql/i },
  { tag: 'Installation and setup', match: /install|setup|update|configure|settings|inputs|template/i },
  { tag: 'Troubleshooting', match: /fix|error|cannot|failed|problem|issue|license|server|connection/i },
  { tag: 'Execution control', match: /manual|execution|slippage|lot|magic|pending|market order|risk|money management/i },
  { tag: 'Trade management tools', match: /trendline trader|trader on chart|stealth|equity sentry|candle range|fxmagnetic|magnetic/i },
  { tag: 'Signal service operations', match: /signal|subscriber|provider|client|copier|membership|service/i },
  { tag: 'Prop firm and multi-account ops', match: /prop firm|multiple accounts|multi account|vps|broker|master|slave/i },
];

function extractJsonAfter(html, marker) {
  const start = html.indexOf(marker);
  if (start < 0) return null;
  const braceStart = html.indexOf('{', start);
  if (braceStart < 0) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = braceStart; i < html.length; i++) {
    const ch = html[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return html.slice(braceStart, i + 1);
    }
  }
  return null;
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function fixMojibake(value) {
  const text = String(value || '');
  if (!/[ÃÂâð]/.test(text)) return text;
  try {
    const decoded = Buffer.from(text, 'latin1').toString('utf8');
    return decoded.includes('\uFFFD') ? text : decoded;
  } catch {
    return text;
  }
}

function normalizeText(value) {
  return fixMojibake(decodeHtml(String(value || '')))
    .replace(/[\u2013\u2014\u2212]/g, ' - ')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2122/g, 'TM')
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s([,.!?;:])/g, '$1')
    .trim();
}

function normalizeVideo(video) {
  return Object.fromEntries(
    Object.entries(video).map(([key, value]) => [key, typeof value === 'string' ? normalizeText(value) : value]),
  );
}

async function fetchText(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'accept-language': 'en-US,en;q=0.9',
      ...(options.headers || {}),
    },
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  return response.text();
}

async function readJsonIfExists(filePath) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function extractYtcfg(html) {
  const json = extractJsonAfter(html, 'ytcfg.set({');
  if (!json) return {};
  try {
    return JSON.parse(json);
  } catch {
    return {};
  }
}

async function loadYtcfg() {
  let html = '';
  try {
    html = await fs.readFile(CHANNEL_PAGE, 'utf8');
  } catch {
    html = await fetchText('https://www.youtube.com/@RimantasPetrauskasEACoder/videos');
    await fs.writeFile(CHANNEL_PAGE, html, 'utf8');
  }
  const ytcfg = extractYtcfg(html);
  if (!ytcfg.INNERTUBE_API_KEY) throw new Error('INNERTUBE_API_KEY not found in channel page');
  return ytcfg;
}

async function fetchPlayerResponse(video, ytcfg) {
  await fs.mkdir(PLAYER_CACHE_DIR, { recursive: true });
  const cachePath = path.join(PLAYER_CACHE_DIR, `${video.videoId}.json`);
  const cached = await readJsonIfExists(cachePath);
  if (cached?.videoDetails || cached?.playabilityStatus) return cached;

  const body = {
    context: ytcfg.INNERTUBE_CONTEXT || {
      client: {
        clientName: 'WEB',
        clientVersion: ytcfg.INNERTUBE_CLIENT_VERSION || '2.20260618.05.00',
      },
    },
    videoId: video.videoId,
  };

  const response = await fetch(`https://www.youtube.com/youtubei/v1/player?key=${ytcfg.INNERTUBE_API_KEY}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'accept-language': 'en-US,en;q=0.9',
      'x-youtube-client-name': String(ytcfg.INNERTUBE_CONTEXT_CLIENT_NAME || 1),
      'x-youtube-client-version': ytcfg.INNERTUBE_CLIENT_VERSION || '',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for youtubei player ${video.videoId}`);
  const raw = await response.text();
  await fs.writeFile(cachePath, raw, 'utf8');
  return JSON.parse(raw);
}

function extractCaptionText(json3) {
  const chunks = [];
  for (const event of json3.events || []) {
    for (const seg of event.segs || []) {
      if (seg.utf8) chunks.push(seg.utf8);
    }
  }
  return normalizeText(chunks.join(' '));
}

async function fetchCaption(track) {
  if (!track?.baseUrl) return '';
  const url = new URL(track.baseUrl);
  url.searchParams.set('fmt', 'json3');
  const raw = await fetchText(url.toString());
  try {
    return extractCaptionText(JSON.parse(raw));
  } catch {
    return normalizeText(raw.replace(/<[^>]+>/g, ' '));
  }
}

function chooseCaptionTrack(playerResponse) {
  const tracks = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
  return tracks.find((track) => track.languageCode?.startsWith('en') && track.kind !== 'asr') ||
    tracks.find((track) => track.languageCode?.startsWith('en')) ||
    tracks[0] ||
    null;
}

async function ensureYoutubeTranscriptClient() {
  if (youtubeTranscriptClient) return youtubeTranscriptClient;
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

  for (const spec of [
    'youtube-transcript',
    'youtube-transcript/dist/youtube-transcript.esm.js',
    'youtube-transcript/dist/youtube-transcript.common.js',
  ]) {
    try {
      const module = await import(spec);
      const candidate = coerceTranscriptClient(module);
      if (candidate) {
        youtubeTranscriptClient = candidate;
        return youtubeTranscriptClient;
      }
    } catch {
      // Keep parity with dashboard_server.js: try every package entry point.
    }
  }

  return null;
}

function transcriptLinesToText(items) {
  return items
    .map((item) => normalizeText(item?.text || ''))
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function transcriptDomainSignals(text) {
  const normalized = normalizeText(text).toLowerCase();
  const rules = [
    { key: 'installation', label: 'Instalacao/configuracao', re: /\b(install|installation|setup|download|folder|paste|navigator|input|settings|update|template)\b/g },
    { key: 'copying', label: 'Copia de trades', re: /\b(copy|copier|client|receiver|master|provider|subscriber|signal|slave|account)\b/g },
    { key: 'execution', label: 'Execucao e risco', re: /\b(order|trade|lot|lots|stop loss|take profit|slippage|spread|pending|market|risk|money management)\b/g },
    { key: 'troubleshooting', label: 'Diagnostico/troubleshooting', re: /\b(error|problem|issue|fix|failed|license|connection|server|journal|experts|permission)\b/g },
    { key: 'platform', label: 'MT4/MT5/plataforma', re: /\b(mt4|mt5|metatrader|mql4|mql5|terminal|broker|symbol|vps)\b/g },
    { key: 'productOps', label: 'Operacao de produto/servico', re: /\b(service|membership|business|customer|friend|family|prop firm|challenge|monetize)\b/g },
  ];

  return rules
    .map((rule) => ({ key: rule.key, label: rule.label, count: [...normalized.matchAll(rule.re)].length }))
    .filter((signal) => signal.count > 0)
    .sort((a, b) => b.count - a.count);
}

function transcriptDerivedInsights(signals, tags, title) {
  const signalKeys = new Set(signals.map((signal) => signal.key));
  const insights = [];
  if (signalKeys.has('copying') || tags.includes('Local Trade Copier') || tags.includes('Remote Trade Copier')) {
    insights.push('A transcricao reforca rotinas de copia: papeis master/client, direcao da copia, filtros, lote, simbolo e consistencia entre contas.');
  }
  if (signalKeys.has('installation') || tags.includes('Installation and setup')) {
    insights.push('Ha material operacional para transformar instalacao/configuracao em checklist de terminal, pasta, inputs, presets e validacao em demo.');
  }
  if (signalKeys.has('execution') || tags.includes('Execution control')) {
    insights.push('O conteudo sustenta playbooks de execucao manual/assistida com atencao a lote, SL/TP, spread, slippage, pendentes e gestao de risco.');
  }
  if (signalKeys.has('troubleshooting') || tags.includes('Troubleshooting')) {
    insights.push('Ha sinais para diagnostico baseado em logs, permissoes, licenca, conexao, broker, servidor e diferencas de simbolo.');
  }
  if (signalKeys.has('platform') || tags.includes('MT4/MT5 interoperability')) {
    insights.push('O video deve alimentar matriz MT4/MT5: simbolos, sufixos, lot step, terminal, broker, VPS e diferencas de execucao.');
  }
  if (signalKeys.has('productOps') || tags.includes('Signal service operations') || tags.includes('Prop firm and multi-account ops')) {
    insights.push('O contexto ajuda a desenhar operacao multi-conta/sinal/prop firm com segregacao de responsabilidades e limites de risco.');
  }
  if (!insights.length) {
    insights.push(`A transcricao de "${title}" deve ser usada como contexto secundario do corpus EA Coder.`);
  }
  return insights.slice(0, 5);
}

async function fetchTranscriptAnalysis(video, tags) {
  await fs.mkdir(TRANSCRIPT_ANALYSIS_CACHE_DIR, { recursive: true });
  const cachePath = path.join(TRANSCRIPT_ANALYSIS_CACHE_DIR, `${video.videoId}.json`);
  const cached = await readJsonIfExists(cachePath);
  if (cached?.videoId === video.videoId && cached?.source === 'youtube-transcript') return cached;

  const client = await ensureYoutubeTranscriptClient();
  if (!client) {
    return {
      videoId: video.videoId,
      source: 'unavailable',
      available: false,
      error: 'youtube-transcript client unavailable',
    };
  }

  const languageOrder = ['en', 'pt', 'pt-BR', null];
  let transcriptItems = [];
  let language = '';
  let lastError = null;

  for (const lang of languageOrder) {
    try {
      const fetched = lang ? await client.fetchTranscript(video.videoId, { lang }) : await client.fetchTranscript(video.videoId);
      if (Array.isArray(fetched) && fetched.length) {
        transcriptItems = fetched;
        language = fetched.find((item) => item?.lang)?.lang || lang || '';
        break;
      }
    } catch (error) {
      lastError = error;
    }
  }

  if (!transcriptItems.length) {
    const unavailable = {
      videoId: video.videoId,
      source: 'youtube-transcript',
      available: false,
      error: String(lastError?.message || 'transcript unavailable'),
    };
    await fs.writeFile(cachePath, JSON.stringify(unavailable, null, 2), 'utf8');
    return unavailable;
  }

  const transcriptText = transcriptLinesToText(transcriptItems);
  const analysis = {
    videoId: video.videoId,
    source: 'youtube-transcript',
    available: true,
    language,
    lineCount: transcriptItems.length,
    wordCount: transcriptText ? transcriptText.split(/\s+/).length : 0,
    durationMs: transcriptItems.reduce((sum, item) => sum + Number(item?.duration || 0), 0),
    signals: transcriptDomainSignals(transcriptText),
    derivedInsights: transcriptDerivedInsights(transcriptDomainSignals(transcriptText), tags, video.title),
    topTerms: topTerms(transcriptText),
    copyright_note: 'Raw transcript text is intentionally not stored; this cache keeps only derived analysis.',
  };
  await fs.writeFile(cachePath, JSON.stringify(analysis, null, 2), 'utf8');
  return analysis;
}

function topTerms(text) {
  const counts = new Map();
  const words = normalizeText(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOPWORDS.has(word));
  for (const word of words) counts.set(word, (counts.get(word) || 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([term]) => term);
}

function topicTags(text) {
  const tags = DOMAIN_RULES.filter((rule) => rule.match.test(text)).map((rule) => rule.tag);
  return [...new Set(tags)];
}

function derivedTakeaways(tags, title) {
  const takeaways = [];
  if (tags.includes('Local Trade Copier')) takeaways.push('Modelar rotinas de master/client, filtros por simbolo/magic e repetibilidade de execucao multi-conta.');
  if (tags.includes('Remote Trade Copier')) takeaways.push('Separar operacao de provedor/assinante, latencia, autorizacao e diagnostico de conectividade.');
  if (tags.includes('MT4/MT5 interoperability')) takeaways.push('Registrar diferencas de MT4/MT5, especialmente simbolos, lot step, magic, filling mode e rotas de instalacao.');
  if (tags.includes('EA engineering')) takeaways.push('Tratar EA como produto operacional: inputs claros, logs, protecoes e checklist de teste em demo.');
  if (tags.includes('Installation and setup')) takeaways.push('Criar playbooks passo a passo para instalacao, atualizacao, templates, presets e validacao visual.');
  if (tags.includes('Troubleshooting')) takeaways.push('Transformar erros recorrentes em checklist: permissao, licenca, terminal, servidor, broker e logs Experts/Journal.');
  if (tags.includes('Execution control')) takeaways.push('Priorizar controle manual seguro: lote, SL/TP, spread, slippage, magic number e modo de envio.');
  if (tags.includes('Trade management tools')) takeaways.push('Extrair padroes de UX para painel no grafico: botoes visiveis, campos curtos e feedback imediato.');
  if (tags.includes('Signal service operations')) takeaways.push('Mapear regras para sinal, assinatura, copia, auditoria de entrega e segregacao de responsabilidades.');
  if (tags.includes('Prop firm and multi-account ops')) takeaways.push('Considerar restricoes de prop firms, VPS, multiplas contas e consistencia entre terminais.');
  if (!takeaways.length) takeaways.push(`Usar o tema do video "${title}" como referencia contextual secundaria para operacao MetaTrader.`);
  return takeaways.slice(0, 4);
}

function evidenceSentence(text, tags) {
  if (tags.length) {
    return `Titulo e descricao publica sustentam classificacao em: ${tags.slice(0, 4).join(', ')}.`;
  }
  return text ? 'Titulo e descricao publica usados como contexto geral, sem tema operacional dominante.' : '';
}

function summarize(video, playerResponse, captionText) {
  const cleanVideo = normalizeVideo(video);
  const details = playerResponse.videoDetails || {};
  const description = normalizeText(details.shortDescription || '');
  const combined = [cleanVideo.title, description, captionText].filter(Boolean).join(' ');
  const tags = topicTags(combined);
  return {
    ...cleanVideo,
    channelTitle: normalizeText(details.author || 'Rimantas Petrauskas - EA Coder'),
    publishDate: playerResponse.microformat?.playerMicroformatRenderer?.publishDate || '',
    descriptionWordCount: description ? description.split(/\s+/).length : 0,
    captionAvailable: Boolean(captionText),
    captionWordCount: captionText ? captionText.split(/\s+/).length : 0,
    sourceBasis: captionText ? 'title+description+captions' : (description ? 'title+description' : 'title-only'),
    topicTags: tags,
    topTerms: topTerms(combined),
    evidenceExcerpt: evidenceSentence([description, captionText].filter(Boolean).join(' '), tags),
    operationalTakeaways: derivedTakeaways(tags, cleanVideo.title),
  };
}

async function processVideo(video, index, total, ytcfg) {
  const playerResponse = await fetchPlayerResponse(video, ytcfg);
  if (!playerResponse?.videoDetails) {
    const cleanVideo = normalizeVideo(video);
    const tags = topicTags(cleanVideo.title);
    return {
      ...cleanVideo,
      sourceBasis: 'title-only',
      topicTags: tags,
      topTerms: topTerms(cleanVideo.title),
      captionAvailable: false,
      captionWordCount: 0,
      descriptionWordCount: 0,
      evidenceExcerpt: '',
      operationalTakeaways: derivedTakeaways(tags, cleanVideo.title),
      error: 'youtubei player response did not include videoDetails',
    };
  }
  const captionTrack = chooseCaptionTrack(playerResponse);
  let captionText = '';
  if (captionTrack) {
    try {
      captionText = await fetchCaption(captionTrack);
    } catch (error) {
      captionText = '';
    }
  }
  const preliminary = summarize(video, playerResponse, captionText);
  const transcriptAnalysis = await fetchTranscriptAnalysis(preliminary, preliminary.topicTags || []);
  const item = {
    ...preliminary,
    captionAvailable: Boolean(captionText) || Boolean(transcriptAnalysis.available),
    captionWordCount: captionText
      ? captionText.split(/\s+/).length
      : Number(transcriptAnalysis.wordCount || 0),
    captionLanguage: transcriptAnalysis.language || '',
    captionSource: captionText ? 'player-caption' : (transcriptAnalysis.available ? 'youtube-transcript' : ''),
    sourceBasis: transcriptAnalysis.available
      ? 'title+description+youtube-transcript'
      : preliminary.sourceBasis,
    transcriptLineCount: transcriptAnalysis.lineCount || 0,
    transcriptSignals: transcriptAnalysis.signals || [],
    transcriptInsights: transcriptAnalysis.derivedInsights || [],
    transcriptTopTerms: transcriptAnalysis.topTerms || [],
    transcriptError: transcriptAnalysis.available ? '' : (transcriptAnalysis.error || ''),
  };
  console.log(`${index + 1}/${total} ${item.videoId} ${item.sourceBasis} ${item.topicTags.join(', ')}`);
  return item;
}

function aggregate(items) {
  const tagCounts = new Map();
  const transcriptTagCounts = new Map();
  for (const item of items) {
    for (const tag of item.topicTags || []) tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    if (item.captionAvailable) {
      for (const tag of item.topicTags || []) transcriptTagCounts.set(tag, (transcriptTagCounts.get(tag) || 0) + 1);
    }
  }
  return {
    videos_total: items.length,
    captions_available: items.filter((item) => item.captionAvailable).length,
    transcripts_available: items.filter((item) => item.captionAvailable).length,
    descriptions_available: items.filter((item) => item.descriptionWordCount > 0).length,
    transcript_words_total: items.reduce((sum, item) => sum + Number(item.captionWordCount || 0), 0),
    tag_counts: Object.fromEntries([...tagCounts.entries()].sort((a, b) => b[1] - a[1])),
    transcript_tag_counts: Object.fromEntries([...transcriptTagCounts.entries()].sort((a, b) => b[1] - a[1])),
  };
}

function markdownReport(source, items, stats) {
  const lines = [
    '# Rimantas Petrauskas EA Coder - Video Content Map',
    '',
    `- Fonte: ${source}`,
    `- Gerado em: ${new Date().toISOString()}`,
    `- Videos mapeados: ${stats.videos_total}`,
    `- Videos com legenda/captions acessiveis: ${stats.captions_available}`,
    `- Videos com descricao acessivel: ${stats.descriptions_available}`,
    '',
    '## Temas Agregados',
    '',
    ...Object.entries(stats.tag_counts).map(([tag, count]) => `- ${tag}: ${count}`),
    '',
    '## Extracao Um a Um',
    '',
  ];

  items.forEach((item, index) => {
    lines.push(`### ${index + 1}. ${item.title}`);
    lines.push('');
    lines.push(`- URL: ${item.url}`);
    lines.push(`- Publicacao: ${item.publishDate || item.published || 'nao informada'}`);
    lines.push(`- Duracao: ${item.duration || 'nao informada'}`);
    lines.push(`- Base de extracao: ${item.sourceBasis}`);
    lines.push(`- Transcricao YouTube: ${item.captionAvailable ? `${item.captionWordCount} palavras via ${item.captionSource || 'captions'}${item.captionLanguage ? ` (${item.captionLanguage})` : ''}` : 'nao acessivel'}`);
    lines.push(`- Temas: ${(item.topicTags || []).join(', ') || 'contexto geral'}`);
    lines.push(`- Termos-chave: ${(item.topTerms || []).join(', ') || 'n/a'}`);
    if (item.transcriptTopTerms?.length) lines.push(`- Termos da transcricao: ${item.transcriptTopTerms.join(', ')}`);
    if (item.transcriptSignals?.length) {
      lines.push(`- Sinais da transcricao: ${item.transcriptSignals.map((signal) => `${signal.label} (${signal.count})`).join(', ')}`);
    }
    if (item.evidenceExcerpt) lines.push(`- Evidencia curta: ${item.evidenceExcerpt}`);
    lines.push('- Aplicacao AIOX:');
    for (const takeaway of item.operationalTakeaways || []) lines.push(`  - ${takeaway}`);
    if (item.transcriptInsights?.length) {
      lines.push('- Insights da transcricao:');
      for (const insight of item.transcriptInsights) lines.push(`  - ${insight}`);
    }
    lines.push('');
  });

  return lines.join('\n');
}

function combinedTranscriptSummary(source, items, stats) {
  const signalCounts = new Map();
  for (const item of items) {
    for (const signal of item.transcriptSignals || []) {
      signalCounts.set(signal.label, (signalCounts.get(signal.label) || 0) + Number(signal.count || 0));
    }
  }
  const dominantSignals = [...signalCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  const dominantTranscriptTags = Object.entries(stats.transcript_tag_counts || {}).slice(0, 10);

  const lines = [
    '# Rimantas / EA Coder - Resumo Contextualizado por Transcricoes',
    '',
    `- Fonte: ${source}`,
    `- Gerado em: ${new Date().toISOString()}`,
    `- Videos mapeados: ${stats.videos_total}`,
    `- Transcricoes acessiveis via configuracao do painel/youtube-transcript: ${stats.transcripts_available}`,
    `- Palavras analisadas em transcricoes: ${stats.transcript_words_total}`,
    '- Nota: este arquivo guarda sintese derivada. As transcricoes brutas integrais nao sao reproduzidas aqui.',
    '',
    '## Temas Dominantes Com Transcricao',
    '',
    ...(dominantTranscriptTags.length ? dominantTranscriptTags.map(([tag, count]) => `- ${tag}: ${count} videos`) : ['- Nenhum tema com transcricao acessivel.']),
    '',
    '## Sinais Operacionais Dominantes',
    '',
    ...(dominantSignals.length ? dominantSignals.map(([label, count]) => `- ${label}: ${count} ocorrencias aproximadas`) : ['- Nenhum sinal operacional de transcricao disponivel.']),
    '',
    '## Contexto Consolidado Para Persona',
    '',
    'O corpus transcrito reforca uma persona de mentor operacional de MetaTrader: pratica, diagnostica e orientada por evidencias. O eixo principal e copiar/executar trades com seguranca entre MT4/MT5, configurar terminais e EAs sem ambiguidade, transformar erros em checklists e sempre validar no terminal real antes de mexer em codigo.',
    '',
    'A persona deve comecar perguntando por terminal, broker, simbolo exato, papel do EA, permissao de algo trading, parametros, print do painel e logs `Experts`/`Journal`. So depois disso deve sugerir patch, preset ou ajuste de template.',
    '',
    '## Contexto Consolidado Para Skills',
    '',
    '- `metatrader-ea-coder-operations`: instalar, configurar, validar permissao, revisar inputs, melhorar mensagens de erro, cuidar de spread/pip/point e manter UX clara no painel.',
    '- `metatrader-trade-copier-ops`: mapear topologias master/client, provider/receiver, local/remoto, lote, simbolo, magic, SL/TP, slippage, latencia, duplicidade e fechamento sincronizado.',
    '- `mql5-expert-advisor-engineering`: traduzir falhas operacionais em retcodes, filling mode, lot step, tick size, tick value, stops/freeze level e logs ricos.',
    '- `platform-template-build`: separar template visual, painel manual, copier, EA executor, diario e presets por broker/ativo/cenario.',
    '',
    '## Playbook Combinado',
    '',
    '1. Identificar cenario: painel manual, EA automatico, copier master/client, sinal remoto ou prop firm.',
    '2. Validar instalacao: pasta correta, compilacao, template, preset, permissoes e logs de inicializacao.',
    '3. Validar simbolo: nome exato, sufixo, digits, point, pip, lot step, tick size, stop/freeze level e tipo de execucao.',
    '4. Validar ordem/copia: lote, SL/TP, magic, comentario, filtro de simbolo, slippage, latencia, VPS e duplicidade.',
    '5. Diagnosticar por evidencia: `Experts`, `Journal`, parametros do EA, print do painel e horario do clique.',
    '6. Aplicar correcao pequena, testar em demo e registrar o padrao na skill/persona se ele se repetir.',
    '',
    '## Limite',
    '',
    'O resumo e operacional, nao uma promessa de resultado financeiro. Nenhuma recomendacao substitui teste em demo, logs reais e validacao do broker.',
    '',
  ];

  return lines.join('\n');
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const channel = JSON.parse(await fs.readFile(INPUT, 'utf8'));
  const ytcfg = await loadYtcfg();
  const videos = channel.videos || [];
  const items = [];

  for (let i = 0; i < videos.length; i++) {
    try {
      items.push(await processVideo(videos[i], i, videos.length, ytcfg));
    } catch (error) {
      const cleanVideo = normalizeVideo(videos[i]);
      const tags = topicTags(cleanVideo.title);
      items.push({
        ...cleanVideo,
        sourceBasis: 'title-only',
        topicTags: tags,
        topTerms: topTerms(cleanVideo.title),
        captionAvailable: false,
        captionWordCount: 0,
        descriptionWordCount: 0,
        evidenceExcerpt: '',
        operationalTakeaways: derivedTakeaways(tags, cleanVideo.title),
        error: String(error.message || error),
      });
      console.log(`${i + 1}/${videos.length} ${videos[i].videoId} ERROR ${error.message || error}`);
    }
  }

  const stats = aggregate(items);
  const output = {
    source: channel.source,
    generated_at: new Date().toISOString(),
    copyright_note: 'This file stores transcript-derived summaries, metrics and metadata only; it intentionally does not store full transcripts.',
    stats,
    items,
  };
  await fs.writeFile(JSON_OUT, JSON.stringify(output, null, 2), 'utf8');
  await fs.writeFile(MD_OUT, markdownReport(channel.source, items, stats), 'utf8');
  await fs.writeFile(SUMMARY_OUT, combinedTranscriptSummary(channel.source, items, stats), 'utf8');
  console.log(JSON.stringify(stats, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
