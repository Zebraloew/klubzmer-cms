const CACHE_NAME = "video-cache-v1";
const VIDEO_URL = "/video/klubzmer-2022-schaltzentrale.mp4"; // Adjust path if needed

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.add(VIDEO_URL);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes(VIDEO_URL)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request).then((response) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response.clone());
              return response;
            });
          })
        );
      })
    );
  }
});
