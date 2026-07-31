/**
 * T • R • O • R - Advanced Service Worker (v1.2.0 Final Release)
 */
const CACHE_NAME = 'tror-v1.2.0-final';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/css/driving-dashboard.css',
    '/css/pwa-dashboard.css',
    '/css/vms-production.css',
    '/js/core/app.js',
    '/js/core/errorHandler.js',
    '/js/core/systemDiagnostics.js',
    '/js/storage/db.js',
    '/js/navigation/voiceSystem.js',
    '/js/map/mapEngine.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    if (url.pathname.includes('/api/')) {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(cached => {
                if (cached) return cached;
                return fetch(event.request).then(response => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                }).catch(() => {
                    if (event.request.headers.get('accept').includes('text/html')) {
                        return caches.match('/index.html');
                    }
                });
            })
        );
    }
});
