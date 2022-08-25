import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getFilteredTasks(filterDto);
    }
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  //Note: Task status is not really enforced here
  @Patch('/:id/status')
  updateTaskStatusById(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    switch (status) {
      case TaskStatus.DONE:
      case TaskStatus.IN_PROGRESS:
      case TaskStatus.OPEN:
        return this.tasksService.updateTaskStatusById(id, status);
      default:
        throw new Error('Invalid status value');
    }
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): string {
    return this.tasksService.deleteTaskById(id);
  }
}
