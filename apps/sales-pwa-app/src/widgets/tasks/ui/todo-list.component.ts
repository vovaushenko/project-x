import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ITask } from '../types/task.types';
import { TaskApiService } from '../services/task-api.service';
import { tasksMachineService } from '../services/task-machine.service';

@customElement('todo-list')
export class TodoList extends LitElement {
  private apiService = new TaskApiService();
  private service = tasksMachineService;

  @state() tasksUI: any = null;
  @state() tasks: ITask[] = [];

  render() {
    return html`<div>${this.tasksUI}</div>`;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.service.start();
    this.service.onTransition((state) => {
      console.log({ state });
      if (state.matches('fetching')) {
        this.tasksUI = this._getFetchingUi();
      } else if (state.matches('idle')) {
        this.tasksUI = this._getIdleUi();
      } else if (state.matches('tasksFetched')) {
        this.tasks = state.context.tasks;
        this.tasksUI = this._getTasksFetchedUi();
      } else if (state.matches('errorState')) {
        this.tasksUI = this._getErrorHappenedUi();
      }
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.service.stop();
  }

  private _getFetchingUi() {
    return html`<div>Loading...</div>`;
  }
  private _getIdleUi() {
    return html`<div>
      We are in idle state, lets get started
      <button @click=${() => this._fetchTasks()}>Fetch</button>
    </div>`;
  }

  private _getTasksFetchedUi() {
    const taskList = this.tasks.map((task) => {
      return html`<task-card .task=${task} .onDelete=${this._deleteTaskById}></task-card>`;
    });

    return html`
      <div>
        <button @click=${this._addNewTask}>Add New Task</button>
        ${taskList}
      </div>
    `;
  }

  private _getErrorHappenedUi() {
    return html`<div>
      We are in Error state, do you want to try to refetch?
      <button @click=${() => this._fetchTasks()}>Fetch</button>
    </div>`;
  }

  private _fetchTasks() {
    this.service.send('FETCH_TASKS');
  }

  private _deleteTaskById = (id: string) => {
    this.service.send('REMOVE_TASK_BY_ID', { data: id });
  };

  private _addNewTask() {
    const task: ITask = {
      completed: false,
      id: 1,
      title: 'New Task',
      userId: 1,
    };
    this.service.send('ADD_NEW_TASK', { data: task });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-list': TodoList;
  }
}
