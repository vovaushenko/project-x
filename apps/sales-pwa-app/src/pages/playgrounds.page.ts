import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ApplicationView } from '../components/view/view.component';
import { TaskService } from '../services/task.service';
import { WebStoreManager } from '@project-x/web-lib';
import { IndexedDBStrategy } from '@project-x/web-lib/src/persistence/strategies';
import { AvxSalesEventBus } from '../communication/avx-sales-event-bus';

@customElement('playgrounds-page')
export class PlaygroundsPage extends ApplicationView {
  private _taskService: TaskService = TaskService.getInstance();

  render() {
    return html`<section>
      <h1>Playgrounds</h1>
      <av-button @click="${this._handleClick}" variant="primary">Primary</av-button>
      <av-paragraph>Hello world!</av-paragraph>
      <av-mock-theme></av-mock-theme>
      <av-button variant="primary" @click=${this.handleSendEvent}>Send Event</av-button>
    </section> `;
  }

  async _handleClick(e) {
    const indexedDBStrategy = new IndexedDBStrategy();
    const webStore = new WebStoreManager(indexedDBStrategy);
    await webStore.init({ name: 'am-test-db', version: 1 });
    const setReq = await indexedDBStrategy.setOneByKey('123', { wassup: 'foo' }, {});
    console.log('set req:', setReq);
    const getReq = await indexedDBStrategy.getOneByKey('123', {});
    console.log('get req:', getReq);
    const delReq = await indexedDBStrategy.remove('123', {});
    console.log('del req:', delReq);
    const getReq2 = await indexedDBStrategy.getOneByKey('123', {});
    console.log('get req:', getReq2);
  }

  async connectedCallback() {
    super.connectedCallback();
    const tasksOutcome = await this._taskService.getTasks();
    console.log({ tasksOutcome });
  }

  handleSendEvent() {
    AvxSalesEventBus.emit('AVX_MESSAGE', {
      message: 'Hello from playgrounds page',
      type: 'success',
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playgrounds-page': PlaygroundsPage;
  }
}
