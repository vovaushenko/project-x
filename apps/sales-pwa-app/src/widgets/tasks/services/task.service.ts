import { ITask, IUpdateTaskDto } from '../types/task.types';

export class TaskService {
  static addNewTask({ toBeAddedTask, tasks }: { toBeAddedTask: ITask; tasks: ITask[] }) {
    return [toBeAddedTask, ...tasks];
  }

  static removeTaskById({ id, tasks }: { id: number; tasks: ITask[] }) {
    return tasks.filter((task) => task.id !== id);
  }

  static updateTaskTitle({
    tasks,
    updateTaskTitleDto,
  }: {
    updateTaskTitleDto: IUpdateTaskDto;
    tasks: ITask[];
  }) {
    return tasks.map((task) =>
      task.id === updateTaskTitleDto.id ? { ...task, title: updateTaskTitleDto.title } : task,
    );
  }
}
