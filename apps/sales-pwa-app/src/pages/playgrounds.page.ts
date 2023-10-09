import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ApplicationView } from '../components/view/view.component';
import { TaskService } from '../services/task.service';

@customElement('playgrounds-page')
export class PlaygroundsPage extends ApplicationView {
  private _taskService: TaskService = TaskService.getInstance();

  async connectedCallback() {
    super.connectedCallback();
    const tasksOutcome = await this._taskService.getTasks();
    console.log({ tasksOutcome });
  }

  render() {
    return html`<section>
      <h1>Playgrounds</h1>
      <av-button variant="primary">Primary</av-button>
      <av-paragraph>Hello world!</av-paragraph>
      <av-mock-theme></av-mock-theme>
    </section> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playgrounds-page': PlaygroundsPage;
  }
}
