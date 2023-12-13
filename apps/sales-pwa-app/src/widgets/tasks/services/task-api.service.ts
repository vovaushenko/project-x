import { HttpService } from '@project-x/web-lib';
import { ITask } from '../types/task.types';

export class TaskApiService extends HttpService {
  private BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

  async getTasks() {
    const getAllTasksApiResponse = await this.get<ITask[]>(this.BASE_URL);
    return getAllTasksApiResponse;
  }
}
