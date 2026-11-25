const CACHE_NAME = 'verdant-knight-shell-v1';
const SHELL_ASSETS = [
  './',
  './index.html',
  './game-logic.js',
  './manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const networkPromise = fetch(event.request)
    .then(async (response) => {
      if (response && response.ok && response.type === 'basic') {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(event.request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  event.waitUntil(networkPromise);

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return networkPromise.then((response) => {
        if (response) return response;
        if (event.request.mode === 'navigate') {
          return caches
            .match('./index.html')
            .then((fallback) => fallback || new Response('Offline', { status: 503, statusText: 'Offline' }));
        }
        return new Response('Offline', { status: 503, statusText: 'Offline' });
      });
    })
  );
});
