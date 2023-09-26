/// <reference lib="WebWorker" />
export type {};
declare let self: ServiceWorkerGlobalScope;
declare const clients: Clients;
type ServiceWorkerEvent = Event & { waitUntil: (...args: unknown[]) => void };

const SERVICE_WORKER_VERSION = 1;

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);

main().catch(console.error);

async function main() {
  console.log(`=== Service Worker ${SERVICE_WORKER_VERSION} has been instantiated ===`);
}

async function onInstall() {
  console.log(`=== Service Worker ${SERVICE_WORKER_VERSION} installed ===`);
  self.skipWaiting();
}

async function onActivate(event: ServiceWorkerEvent) {
  console.log(`=== Service Worker ${SERVICE_WORKER_VERSION} activation started ===`);

  // ask broswer to not kill the service worker
  // scenario:
  // 1) user opens the app
  // 2) you start filling the cache
  // 3) user closes the app
  // 4) browser kills the service worker
  // 5) we want to ask browser permisson to not kill the service worker while we are filling the cache
  // 6) it's not a guarantee tho, browser can still kill the service worker
  event.waitUntil(handleActivation());
}

async function handleActivation() {
  // clients.claim() will make sure that the service worker will take control over the page immediately
  await clients.claim();
  console.log(`=== Service Worker ${SERVICE_WORKER_VERSION} activated ===`);
}
