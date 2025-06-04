// Nombre de la caché
const CACHE_NAME = 'mi-argentina-v1';

// Archivos esenciales para cachear
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/imgs/logo-192x192.png'
];

// Instalación: cachea recursos estáticos
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

// Estrategia: Cache First, luego red
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(cachedRes => cachedRes || fetch(e.request))
  );
});