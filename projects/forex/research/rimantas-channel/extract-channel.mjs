import fs from 'node:fs/promises';
import path from 'node:path';

const CHANNEL_URL = 'https://www.youtube.com/@RimantasPetrauskasEACoder/videos';
const OUT_DIR = path.resolve('projects/forex/research/rimantas-channel');

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
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }
    if (ch === '"') {
      inString = true;
    } else if (ch === '{') {
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0) return html.slice(braceStart, i + 1);
    }
  }
  return null;
}

function textFromRuns(value) {
  if (!value) return '';
  if (typeof value.simpleText === 'string') return value.simpleText;
  if (Array.isArray(value.runs)) return value.runs.map((run) => run.text || '').join('');
  return '';
}

function metadataPartText(row, index) {
  return row?.metadataParts?.[index]?.text?.content || '';
}

function walk(value, visit) {
  if (!value || typeof value !== 'object') return;
  visit(value);
  if (Array.isArray(value)) {
    for (const item of value) walk(item, visit);
    return;
  }
  for (const item of Object.values(value)) walk(item, visit);
}

function uniqueById(videos) {
  const byId = new Map();
  for (const video of videos) {
    if (!video.videoId || byId.has(video.videoId)) continue;
    byId.set(video.videoId, video);
  }
  return [...byId.values()];
}

function collectVideos(initialData) {
  const videos = [];
  walk(initialData, (node) => {
    const lockup = node.lockupViewModel;
    if (lockup?.contentId) {
      const row = lockup.metadata?.lockupMetadataViewModel?.metadata?.contentMetadataViewModel?.metadataRows?.[0];
      videos.push({
        videoId: lockup.contentId,
        title: lockup.metadata?.lockupMetadataViewModel?.title?.content || '',
        published: metadataPartText(row, 1),
        duration: lockup.contentImage?.thumbnailViewModel?.overlays?.[0]?.thumbnailBottomOverlayViewModel?.badges?.[0]?.thumbnailBadgeViewModel?.text || '',
        views: metadataPartText(row, 0),
        descriptionSnippet: '',
        url: `https://www.youtube.com/watch?v=${lockup.contentId}`,
      });
      return;
    }

    const renderer = node.gridVideoRenderer || node.videoRenderer || node.richItemRenderer?.content?.videoRenderer;
    if (!renderer?.videoId) return;
    videos.push({
      videoId: renderer.videoId,
      title: textFromRuns(renderer.title),
      published: textFromRuns(renderer.publishedTimeText),
      duration: textFromRuns(renderer.lengthText),
      views: textFromRuns(renderer.viewCountText),
      descriptionSnippet: textFromRuns(renderer.descriptionSnippet),
      url: `https://www.youtube.com/watch?v=${renderer.videoId}`,
    });
  });
  return uniqueById(videos);
}

function extractYtcfg(html) {
  const json = extractJsonAfter(html, 'ytcfg.set(');
  if (!json) return {};
  try {
    return JSON.parse(json);
  } catch {
    return {};
  }
}

function collectContinuationTokens(initialData) {
  const tokens = [];
  walk(initialData, (node) => {
    const token = node.continuationCommand?.token || node.reloadContinuationData?.continuation;
    if (token && !tokens.includes(token)) tokens.push(token);
  });
  return tokens;
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

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const html = await fetchText(CHANNEL_URL);
  await fs.writeFile(path.join(OUT_DIR, 'channel-videos-page.html'), html, 'utf8');

  const initialJson = extractJsonAfter(html, 'var ytInitialData =') || extractJsonAfter(html, 'ytInitialData');
  if (!initialJson) throw new Error('Could not locate ytInitialData');
  const ytcfg = extractYtcfg(html);
  const initialData = JSON.parse(initialJson);
  let videos = collectVideos(initialData);
  const visitedTokens = new Set();
  let tokens = collectContinuationTokens(initialData);

  for (let page = 1; tokens.length && page <= 12; page++) {
    const token = tokens.find((item) => !visitedTokens.has(item));
    if (!token) break;
    visitedTokens.add(token);
    const body = {
      context: ytcfg.INNERTUBE_CONTEXT || {
        client: {
          clientName: 'WEB',
          clientVersion: ytcfg.INNERTUBE_CLIENT_VERSION || '2.20260618.01.00',
        },
      },
      continuation: token,
    };
    const responseText = await fetchText(`https://www.youtube.com/youtubei/v1/browse?key=${ytcfg.INNERTUBE_API_KEY}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-youtube-client-name': String(ytcfg.INNERTUBE_CONTEXT_CLIENT_NAME || 1),
        'x-youtube-client-version': ytcfg.INNERTUBE_CLIENT_VERSION || '',
      },
      body: JSON.stringify(body),
    });
    await fs.writeFile(path.join(OUT_DIR, `channel-videos.continuation-${page}.json`), responseText, 'utf8');
    const continuationData = JSON.parse(responseText);
    videos = uniqueById([...videos, ...collectVideos(continuationData)]);
    tokens = collectContinuationTokens(continuationData).filter((item) => !visitedTokens.has(item));
  }

  const meta = {
    source: CHANNEL_URL,
    generated_at: new Date().toISOString(),
    channel_id: ytcfg.CHANNEL_ID || '',
    initial_video_count: collectVideos(initialData).length,
    total_video_count: videos.length,
    continuation_pages_visited: visitedTokens.size,
    continuation_token_count: tokens.length,
    videos,
    continuation_tokens_remaining: tokens,
  };

  await fs.writeFile(path.join(OUT_DIR, 'channel-videos.initial.json'), JSON.stringify(meta, null, 2), 'utf8');
  console.log(JSON.stringify({
    source: CHANNEL_URL,
    videos: videos.length,
    tokens: tokens.length,
    first: videos[0],
    last: videos[videos.length - 1],
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
