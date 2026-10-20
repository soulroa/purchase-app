const CACHE_NAME = 'purchase-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './menu.html',
  './form.html',
  './history.html',
  './form_edit.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // 구글 앱스 스크립트 API 호출은 캐싱하지 않고 항상 네트워크 통신
  if (event.request.url.includes('script.google.com')) {
    return; 
  }
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});