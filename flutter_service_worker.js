'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "aca067e0dad91468ff72efbdff29c7a3",
"assets/AssetManifest.bin.json": "038ea1d74dded4f94a91fd91dabd4af6",
"assets/AssetManifest.json": "99a056af428e2ba107230bf389fdd764",
"assets/assets/fonts/BalooThambi2-SemiBold.ttf": "77abf550702f009ac11e2879b8e50f92",
"assets/assets/images/ai_ask.png": "b10405d44bcf1d31faed33a505268e03",
"assets/assets/images/ask.png": "bdc431d7cc274ca181ab5ef470733637",
"assets/assets/images/bible_logo.png": "d5ea1ca831e33a157eab73a98bb4f90d",
"assets/assets/images/church.png": "948043059f0a1411809404711077a2db",
"assets/assets/images/faviconpng.png": "a31f2bef2437c986c397c89ee66ad32a",
"assets/assets/images/leaderboard.png": "3b10515a06860cabecb9fef62d10956c",
"assets/assets/images/logofancy.png": "cfd2f87273300b81cb6d31ceee4c6e46",
"assets/assets/images/song-lyrics.png": "9c39b562c0c58b5e342587191d686bdc",
"assets/assets/images/vop_logo.png": "14180f634cf5275f5db5b8b0a101a306",
"assets/assets/images/vop_logo_circle.png": "24f78c4da4912909d4f34898340a692a",
"assets/assets/images/vop_logo_circle_transperent%2520copy.png": "6e050ae5e344a6eb7e6a3e6d8fe9e9a0",
"assets/assets/images/vop_logo_circle_transperent.png": "994103b6d8742cb14e73ccb87fce7e44",
"assets/assets/images/vop_logo_circle_transperent_20copy.png": "6e050ae5e344a6eb7e6a3e6d8fe9e9a0",
"assets/assets/legal/privacy_policy.md": "a6a0417a3246e2c2e44f7b34a613a39d",
"assets/FontManifest.json": "4b7b664dcdf497c3be914265583b002a",
"assets/fonts/MaterialIcons-Regular.otf": "1c0f01e78128684e3ac4720310619754",
"assets/NOTICES": "686798bcbbfb3d43d132e13d99479604",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.js.symbols": "58832fbed59e00d2190aa295c4d70360",
"canvaskit/canvaskit.wasm": "07b9f5853202304d3b0749d9306573cc",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.js.symbols": "193deaca1a1424049326d4a91ad1d88d",
"canvaskit/chromium/canvaskit.wasm": "24c77e750a7fa6d474198905249ff506",
"canvaskit/skwasm.js": "1ef3ea3a0fec4569e5d531da25f34095",
"canvaskit/skwasm.js.symbols": "0088242d10d7e7d6d2649d1fe1bda7c1",
"canvaskit/skwasm.wasm": "264db41426307cfc7fa44b95a7772109",
"canvaskit/skwasm_heavy.js": "413f5b2b2d9345f37de148e2544f584f",
"canvaskit/skwasm_heavy.js.symbols": "3c01ec03b5de6d62c34e17014d1decd3",
"canvaskit/skwasm_heavy.wasm": "8034ad26ba2485dab2fd49bdd786837b",
"favicon.png": "a31f2bef2437c986c397c89ee66ad32a",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"flutter_bootstrap.js": "c41a4990bb073ad6cae66f64c9658c76",
"icons/Icon-192.png": "a31f2bef2437c986c397c89ee66ad32a",
"icons/Icon-512.png": "a31f2bef2437c986c397c89ee66ad32a",
"icons/Icon-maskable-192.png": "a31f2bef2437c986c397c89ee66ad32a",
"icons/Icon-maskable-512.png": "a31f2bef2437c986c397c89ee66ad32a",
"index.html": "d03b649321691d04e99162f3a6c18aad",
"/": "d03b649321691d04e99162f3a6c18aad",
"main.dart.js": "4225cddc61a91d388e61d49eabf0bf5a",
"manifest.json": "de1390c61c597d7617d27f4fb3e0b04c",
"version.json": "3955b1186f01b2d267f57a075aa99a74"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
