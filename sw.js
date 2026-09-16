const CACHE = "nur-pwa-v2";
const CORE = ["./", "./index.html", "./css/styles.css", "./js/app.js", "./js/data.js", "./assets/icon.svg", "./manifest.webmanifest", "./locales/ru.json", "./locales/en.json", "./locales/ar.json", "./locales/kk.json"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE))));
self.addEventListener("activate", event => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    if (new URL(event.request.url).origin === location.origin) caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match("./index.html"))));
});
