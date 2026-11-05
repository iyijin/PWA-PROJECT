const CACHE_NAME = "college-pwa-v3";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./manifest.json",
    "./offline.html"
];

// INSTALL
self.addEventListener("install", function (event) {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(function (cache) {

                return cache.addAll(FILES_TO_CACHE);

            })

    );

    self.skipWaiting();

});

// ACTIVATE
self.addEventListener("activate", function (event) {

    event.waitUntil(

        self.clients.claim()
    );

});

// FETCH
self.addEventListener("fetch", function (event) {

    // Handle page navigation
    if (event.request.mode === "navigate") {

        event.respondWith(

            fetch(event.request)
                .catch(function () {

                    return caches.match("./offline.html");

                })

        );

        return;

    }

    // Handle other files
    event.respondWith(

        caches.match(event.request)
            .then(function (response) {

                return response || fetch(event.request);

            })

    );

});