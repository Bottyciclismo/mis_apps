const CACHE_NAME = "botty-app-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/img/fondomio.png",
  "/manifest.json"
];

// INSTALAR
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ACTIVAR
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// FETCH (offline)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
