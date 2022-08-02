import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';

/* Note: making any component Injectable converts it into a Singleton
Hence, the TasksService component here one such */
@Injectable()
export class TasksService {
  private tasks: Array<Task> = [
    {
      id: '1',
      title: 'Wash Car',
      description: 'Apply polish and wash',
      status: TaskStatus.OPEN,
    },
  ];

  getAllTasks() {
    return this.tasks;
  }
}
