import { Logger } from 'web-lib';

const version = 1;

const self = globalThis.self as ServiceWorker;

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);

main().catch(console.error);

async function onInstall(event: Event) {
  Logger.log(`=== Service Worker ${version} installed ===`);
  self.skipWaiting();
}

async function onActivate(event: Event) {
  Logger.log(`=== Service Worker ${version} activated ===`);

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

async function handleActivation() {}

async function main() {
  Logger.log(`=== Service Worker ${version} has been instantiated ===`);
}
