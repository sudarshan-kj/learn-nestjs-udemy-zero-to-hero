import { Get, Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

/* Note: making any component Injectable converts it into a Singleton
Hence, the TasksService component here one such */
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFilteredTasks(filterDto: GetTasksFilterDto): Task[] {
    const { search, status } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      return this.tasks.filter((task) => task.status === status);
    }
    if (search) {
      return this.tasks.filter(
        (task) =>
          task.description.toLowerCase().includes(search) ||
          task.title.toLowerCase().includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskStatusById(id: string, status: TaskStatus) {
    const taskToUpdate = this.tasks.find((task) => task.id === id);
    if (taskToUpdate) taskToUpdate.status = status;
    return taskToUpdate;
  }

  //a better alternative is to just use the filter method
  deleteTaskById(id: string): string {
    const taskToDeleteIndex = this.tasks.findIndex((task) => task.id === id);
    if (~taskToDeleteIndex) {
      const firstHalf = this.tasks.slice(0, taskToDeleteIndex);
      const secondHalf = this.tasks.slice(
        taskToDeleteIndex + 1,
        this.tasks.length,
      );
      this.tasks = [...firstHalf, ...secondHalf];
      return `Deleted task with id: ${id} successfully`;
    }
    return `Task id: ${id} not found`;
  }
}
