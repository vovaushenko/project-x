import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Utils } from '../shared/utils';
function heavyCompute() {
  return 'takes 5 minutes';
}

@customElement('av-worker-page')
export class WorkerPage extends LitElement {
  render() {
    return html`<section>
      <h1>Worker Playground</h1>

      <av-button label="Use Browser Action" @click=${() => alert('I am alive!')}></av-button>

      <av-button label="Slow Fibonacci" @click=${this._expensiveOperation} type="error"></av-button>
      <h3>Fibonacci: ${this.fibonacciResult} Operation took: ${this.fibonacciOperationTime}ms</h3>

      <av-button label="Fibonacci in Worker" @click=${this._postMessage} type="success"></av-button>

      <av-button label="Stop Worker" @click=${this._stopWorker}></av-button>

      <pre>
      Fibonacci Numbers:
      ${this.fibonacciNumbers.map((num) => html`<div>${num}</div>`)}
      </pre
      >
    </section>`;
  }

  private worker: Worker | null = null;
  @state() fibonacciResult = 0;
  @state() fibonacciOperationTime = 0;
  @state() fibonacciNumbers: Array<string | number> = [];

  connectedCallback(): void {
    super.connectedCallback();

    this.worker = new Worker(new URL('../worker/worker.ts', import.meta.url), {
      type: 'module',
    });

    this.worker.addEventListener('message', (event) => {
      console.log('=== message from worker ===');
      console.log(event.data);
      this.fibonacciNumbers.push('---->');
      this.fibonacciNumbers.push(event.data.result);
      this.requestUpdate();
      console.log('=== message from worker ===');
    });
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.worker) {
      this.worker.terminate();
    }
  }

  private _expensiveOperation() {
    const start = performance.now();
    const result = Utils.fibonacci(42);
    const end = performance.now();

    this.fibonacciResult = result;
    this.fibonacciOperationTime = end - start;
  }

  private _postMessage() {
    if (this.worker) {
      this.worker.postMessage({
        task: 'COMPUTE_FIBONACCI',
      });
    }
  }

  private _stopWorker() {
    if (this.worker) {
      this.worker.terminate();
    }
  }
}
