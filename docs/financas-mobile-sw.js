const FINANCAS_MOBILE_CACHE = 'financas-mobile-v1';
const FINANCAS_MOBILE_ASSETS = [
  '/mobile',
  '/financas-mobile.webmanifest',
  '/assets/financas-mobile-icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(FINANCAS_MOBILE_CACHE)
      .then(cache => cache.addAll(FINANCAS_MOBILE_ASSETS))
      .catch(() => null)
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  if (requestUrl.pathname.startsWith('/api/')) return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
