var staticCacheName = "pwaContenidopru" + new Date().getTime();
var filesToCache = [
    './',
    './serviceworker.js',
    '/offline.html',
    '/images/icons/icon-72x72.png',
    '/images/icons/icon-96x96.png',
    '/images/icons/icon-128x128.png',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-152x152.png',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-384x384.png',
    '/images/icons/icon-512x512.png',
    /* components */
    '/assets/js/script.min.js',
    '/assets/img/logo_juan.jpg?h=9c60530c14723759f21747f8526563cd',
    '/assets/bootstrap/css/bootstrap.min.css?h=fdd8692f1bc83d74dd8a74f30bbb64d3',
    '/assets/css/styles.min.css?h=724f62978eaa80b00081f071d6e30448',
    '/js/lok.js',
    /* code */
    'https://ef010.000webhostapp.com/api/users',
];

// Cache on install
self.addEventListener("install", event => {
    this.skipWaiting();
    event.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
            return cache.addAll(filesToCache);
        })
    )
});

// Clear cache on activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                .filter(cacheName => (cacheName.startsWith("pwaContenidopru")))
                .filter(cacheName => (cacheName !== staticCacheName))
                .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

// Serve from Cache
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
        .catch(() => {
            return caches.match('/offline.html');
        })
    )
});