import { AVXError, AVXEventBus } from '@project-x/web-lib';

type AVXSalesEvent = {
  AVX_ERROR: AVXError;
  AVX_MESSAGE: { message: string; type: 'success' | 'error' | 'warning' | 'info' };
  AUSTIN_MESSAGE: { hello: string };
};

export const AvxSalesEventBus = new AVXEventBus<AVXSalesEvent>();

AvxSalesEventBus.on('AVX_ERROR', (event) => {
  console.log('===AVX_ERROR===', event.detail);
});

AvxSalesEventBus.on('AVX_MESSAGE', (event) => {
  alert(event.detail.message);
});
