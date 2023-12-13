import { createMachine, interpret } from 'xstate';
import { ITask } from '../types/task.types';
import { TaskApiService } from './task-api.service';
import { TaskService } from './task.service';

export type TaskContext = {
  tasks: ITask[];
};

export type TaskEvents =
  | { type: 'FETCH_TASKS' }
  | { type: 'SET_TASKS'; data: ITask[] }
  | { type: 'ADD_NEW_TASK'; data: ITask }
  | { type: 'REMOVE_TASK_BY_ID'; data: string }
  | { type: 'UPDATE_TASK_BY_ID'; data: ITask };

export const initialContext: TaskContext = {
  tasks: [],
};

const taskApiService = new TaskApiService();

export const tasksMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgAoBbAQwGMALASwzAEp8QAHLWKgFyqw0YA9EAtADZ0AT0FDkaEMXLVadAHRUIAGzCMWbTtz6IALACYxiABwBGRUIDsAVgAM9w0fPn99oaalSgA */
    predictableActionArguments: true,
    schema: {
      context: {} as TaskContext,
      events: {} as TaskEvents,
    },
    context: initialContext,
    initial: 'idle',
    states: {
      idle: {
        on: {
          FETCH_TASKS: 'fetching',
        },
      },
      fetching: {
        invoke: {
          src: 'fetchTasks',
          onDone: {
            target: 'tasksFetched',
            actions: ['SET_TASKS'],
          },
          onError: {
            target: 'errorState',
            actions: [],
          },
        },
      },
      tasksFetched: {
        on: {
          ADD_NEW_TASK: {
            actions: ['ADD_NEW_TASK'],
          },
          REMOVE_TASK_BY_ID: {
            actions: ['REMOVE_TASK_BY_ID'],
          },
        },
      },
      errorState: {
        on: {
          FETCH_TASKS: 'fetching',
        },
      },
    },
  },
  {
    actions: {
      SET_TASKS: (context, event) => {
        context.tasks = event.data;
      },
      ADD_NEW_TASK: (context, event) => {
        context.tasks = TaskService.addNewTask({
          toBeAddedTask: event.data,
          tasks: context.tasks,
        });
      },
      REMOVE_TASK_BY_ID: (context, event) => {
        context.tasks = TaskService.removeTaskById({
          id: event.data,
          tasks: context.tasks,
        });
      },
    },
    services: {
      fetchTasks: async () => {
        const getAllTasksApiResponse = await taskApiService.getTasks();
        if (getAllTasksApiResponse.success) {
          return getAllTasksApiResponse.value;
        } else {
          throw getAllTasksApiResponse.error;
        }
      },
    },
  },
);

export const tasksMachineService = interpret(tasksMachine);
