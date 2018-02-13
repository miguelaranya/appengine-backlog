/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","f26812abb7bf27c5421f1e72cc668bfa"],["/bower_components/app-layout/app-drawer/app-drawer.html","aaf55a3180bcfe8b3d87432c6be13f56"],["/bower_components/app-layout/app-header-layout/app-header-layout.html","76f1d15ce91a3135e931499d712a6737"],["/bower_components/app-layout/app-header/app-header.html","b2868e8ecc003d21aef3a96ea1b06306"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","dfb56eb1b0306fabe4d2cfd512e8daac"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","44c79fe799ada14955b5d33917d99274"],["/bower_components/app-layout/app-scroll-effects/effects/blend-background.html","53418d4b21e310534928ff596e5a6401"],["/bower_components/app-layout/app-scroll-effects/effects/fade-background.html","4984cb8286a556c07f4c43b942126ea0"],["/bower_components/app-layout/app-scroll-effects/effects/material.html","371770b31d89c1d5c0c457603229ea9c"],["/bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","b565df57dd784e52a48c7f3574ca0236"],["/bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","761bfb7efa9a2c341d2638675c4cb776"],["/bower_components/app-layout/app-scroll-effects/effects/resize-title.html","ccfcc44662eae967f4bb77057829adc3"],["/bower_components/app-layout/app-scroll-effects/effects/waterfall.html","90f75129331302c23398228d0fcda3a8"],["/bower_components/app-layout/app-toolbar/app-toolbar.html","f4977c1eb0dc0fc08bd65f04ef1e0182"],["/bower_components/app-layout/helpers/helpers.html","cf989302d19486f80ee0496bbef0c9e8"],["/bower_components/app-route/app-location.html","de7ff5c083134cb858c11c11805dce4a"],["/bower_components/app-route/app-route-converter-behavior.html","c5d76631af30c2de417baec672168673"],["/bower_components/app-route/app-route.html","6f0c2177380633ba6cc40193adc65999"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","19ece52916dc24b573c75873495dc788"],["/bower_components/iron-behaviors/iron-button-state.html","34fbd83544ba14c35b2574813bca56ae"],["/bower_components/iron-behaviors/iron-control-state.html","4529e292423d3a6ac5a9c2d6b0f9dfa0"],["/bower_components/iron-flex-layout/iron-flex-layout.html","d642cb096930193978ff3102ba7a20ec"],["/bower_components/iron-icon/iron-icon.html","5b297d200c12087167344a8e3fdfd1bc"],["/bower_components/iron-icons/iron-icons.html","ab6e1683b84df137aa5d6b63b7168e0f"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","b341d776f326931d897151351c9fcb11"],["/bower_components/iron-location/iron-location.html","88a9661f789c70f85ca7edeb458b0824"],["/bower_components/iron-location/iron-query-params.html","dd492e11a190676f4b70dd4e19bd8dee"],["/bower_components/iron-media-query/iron-media-query.html","7ada23d39a05189a655a281f95f69338"],["/bower_components/iron-meta/iron-meta.html","48590ebb515ae6cafaa3f1e374eb0974"],["/bower_components/iron-pages/iron-pages.html","6d13c28ec05454b62fdbdabee3057206"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","85bbfd1f7079348c7ecc8caba1cb7850"],["/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","bd7f820cab68a873f7380ef084e87170"],["/bower_components/iron-selector/iron-multi-selectable.html","a2e8e9d38758dd2c973dc530cf28d945"],["/bower_components/iron-selector/iron-selectable.html","c90b4131016609fa605bc9a53f47317a"],["/bower_components/iron-selector/iron-selection.html","c1cb21a146682d73505c549b2babc33c"],["/bower_components/iron-selector/iron-selector.html","e0daf776de579e0a4f5ac65e283e3e69"],["/bower_components/paper-behaviors/paper-inky-focus-behavior.html","5892d2473b6140676eea2bb537ff0c92"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","0d02098931b1388f75f96d6b73023929"],["/bower_components/paper-icon-button/paper-icon-button.html","5f72c5356e3a6b8b976ab934b1df21ba"],["/bower_components/paper-image/paper-image.html","0f83edb188b34f98a4877afde79b159b"],["/bower_components/paper-material/paper-material-shared-styles.html","9f9239b358a9701bc5d02f2491aa1a86"],["/bower_components/paper-material/paper-material.html","2fb02015d89d5a94bf281eee41fd703c"],["/bower_components/paper-ripple/paper-ripple.html","8880e16a4e810d1aafb8acf53c82a67c"],["/bower_components/paper-styles/color.html","a37abf29ff1a1c1ebba8a9588afa4dc3"],["/bower_components/paper-styles/default-theme.html","5b94ce99679130a4c590ba985c77ca94"],["/bower_components/paper-styles/shadow.html","9ef031403c3ce98302d35b136e4fa1bd"],["/bower_components/polymer/polymer-micro.html","f3984ee4d8d76c1834ff15a0c1fc42b9"],["/bower_components/polymer/polymer-mini.html","5d1923b40ae9a66bce15f661eb88d17c"],["/bower_components/polymer/polymer.html","c87835c2da68d8197f370c5e026fb40c"],["/bower_components/webcomponentsjs/webcomponents-lite.min.js","32b5a9b7ada86304bec6b43d3f2194f0"],["/index.html","ad4f30c6d5aa3c9e3cdc3d47d7a94759"],["/manifest.json","39a400389f05600d3ec8c419680017c6"],["/src/my-app.html","827e984ecbe4d08c8054fd78fa4230d1"],["/src/my-icons.html","b1cb122e789479cf68abcac2438734d8"],["/src/my-view1.html","9a973d498560a8eb9628b65809f6c4cf"],["/src/my-view2.html","817ba1ddce381edea53555e26f3f9f12"],["/src/my-view3.html","f8e2f7751a062674307771a0054e912d"],["/src/my-view404.html","1d4ecd3ca7397cca55f7b64c10385d18"],["/src/shared-styles.html","7d7cd0df4a49cdc964f7b682d4143e7f"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







