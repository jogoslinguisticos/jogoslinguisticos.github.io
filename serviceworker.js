importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.routing.registerRoute(
    /\.(?:css|js)$/,
    new workbox.strategies.StaleWhileRevalidate({
        "cacheName": "motor",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 500,
                maxAgeSeconds: 604800
            })
        ]
    })
)

