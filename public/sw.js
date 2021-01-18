// console.log("Public file");

// let cacheData = "appV1";
// this.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(cacheData).then((cache) => {
//       cache.addAll([
//         "static/js/main.chunk.js",
//         "/static/js/0.chunk.js",
//         "/static/js/bundle.js",
//         "img/intro-bg.jpg",
//         "/css/style.css",
//         "/fonts/font-awesome/css/font-awesome.css",
//         "/index.html",
//         "/",
//       ]);
//     })
//   );
// });

// this.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((resp) => {
//       if (resp) return resp;
//     })
//   );
// });
