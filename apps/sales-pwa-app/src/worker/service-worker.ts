/**
 * https://serviceworke.rs/
 *
 * Service Worker Example (or Network Worker)
 * sits between your application and rest of the web
 * every single web request (css file, js file, favicon, fetch request etc) will go through the service worker
 *
 * This is essentially a proxy server that sits between your application and the rest of the web. You need to properly reroute the requests to the right place.
 * But this proxy server lives in the browser.
 *
 * 1) Primary use case -> work with Cache API https://developer.mozilla.org/en-US/docs/Web/API/Cache
 * it's a programmatic way to cache resources in the browser, instead of relying on auto browser caching
 * 2) Fancy request scenarios. We have the right over network request and we can create really fance stategies.
 *  For instance when browser requests 1 picture, we can foresee 2 additional resources and fetch them in advance.
 * 3) Push notifications. Service worker (in background, site is off) can send notification to OS (notification about new email, new message, new order etc)
 *
 * Background sync 🧪 (experimental) : https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API
 */

// 1) figure out if we are offline
const isOnline = (): boolean => {
  if ('onLine' in navigator) {
    return navigator.onLine;
  } else {
    return true;
  }
};

export const ServiceWorkerUtils = {
  isOnline,
};

async function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        updateViaCache: 'none',
      });
      console.log('Service worker registered: ', registration);

      let swcWorker = registration.active || registration.installing || registration.waiting;

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        swcWorker = navigator.serviceWorker.controller;
        console.log('Service worker controller changed: ', swcWorker);
      });
    } catch (error) {
      console.log('Service worker registration failed: ', error);
    }
  }
}

initServiceWorker();
