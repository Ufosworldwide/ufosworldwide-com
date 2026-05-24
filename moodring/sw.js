/**
 * PRESIGNAL MOOD RING — Service Worker v1.0
 * Offline-first. All sensor processing local. No external data.
 */

const CACHE_NAME = 'presignal-mood-ring-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/js/sensors.js',
  '/js/matrix.js',
  '/js/ring.js',
  '/js/d1111.js',
  '/js/dice.js',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
