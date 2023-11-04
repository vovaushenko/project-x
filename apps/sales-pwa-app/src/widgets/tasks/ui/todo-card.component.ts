import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ITask } from '../types/task.types';

@customElement('task-card')
export class TaskCard extends LitElement {
  @property() task?: ITask;
  @property() onDelete: (id: string) => void = (id: string) => console.log({ id });

  render() {
    return html`<article class="todo-card">
      <h3>${this.task?.title}</h3>
      <p>${this.task?.completed ? 'Completed' : 'Not Completed'}</p>
      <button @click=${() => this.onDelete(this.task?.id)}>X</button>
    </article>`;
  }

  static styles = css`
    .todo-card {
      border: 1px solid black;
      padding: 1rem;
      border-radius: 6px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'task-card': TaskCard;
  }
}
