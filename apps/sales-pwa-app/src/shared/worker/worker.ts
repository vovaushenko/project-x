import { Utils } from '../utils';
/**
 *  Example of a web worker
 * https://web.dev/workers-basics/
 * https://developer.mozilla.org/en-US/docs/Web/API/Worker
 */

//Shared Array Buffer: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer

// Atomics: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics
self.postMessage('=== Worker has been instantiated ===');

let fibonacciId = 0;

function computeFibonacciForever() {
  const fibNum = Utils.fibonacci(fibonacciId);
  self.postMessage({
    task: 'COMPUTE_FIBONACCI',
    result: fibNum,
  });

  setTimeout(() => {
    fibonacciId++;
    computeFibonacciForever();
  }, 300);
}

self.onmessage = (event) => {
  if (event.data.task === 'COMPUTE_FIBONACCI') {
    computeFibonacciForever();
  }
};
