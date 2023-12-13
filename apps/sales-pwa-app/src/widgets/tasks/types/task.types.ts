export type ITask = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type IUpdateTaskDto = Pick<ITask, 'title' | 'id'>;
