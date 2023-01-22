importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.routing.registerRoute(
    /\.(?:css|js|html)$/,
    new workbox.strategies.StaleWhileRevalidate({
        "cacheName": "motor"
    })
)

