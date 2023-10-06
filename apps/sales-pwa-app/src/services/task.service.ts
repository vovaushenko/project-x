import { HttpService } from '@project-x/web-lib';

interface ITask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export class TaskService extends HttpService {
  protected readonly baseUrl = 'https://jsonplaceholder.typicode.com/todos';

  private static instance: TaskService = new TaskService();

  public static getInstance(): TaskService {
    return TaskService.instance;
  }
  private constructor() {
    super();
  }

  public async getTasks() {
    return this.get<ITask[]>(this.baseUrl);
  }

  public async getTaskById(id: number) {
    return this.get<ITask>(`${this.baseUrl}/${id}`);
  }
}
