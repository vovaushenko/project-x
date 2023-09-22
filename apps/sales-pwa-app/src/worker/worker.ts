import { Utils } from '../shared/utils';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer
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
	}, 5);
}

self.onmessage = (event) => {
	if (event.data.task === 'COMPUTE_FIBONACCI') {
		computeFibonacciForever();
	}
};
