import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task | string {
    if (!id) {
      return 'Id is required';
    }
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTasks(@Body() newTask: CreateTaskDto) {
    if (!newTask.title || !newTask.description) {
      return 'Title and description are required';
    }
    return this.tasksService.createTasks(
      newTask.title.toString(),
      newTask.description.toString(),
    );
  }

  updateTasks() {}

  @Delete(':id')
  deleteTasks(@Param('id') id: string) {
    if (!id) {
      return 'Id is required';
    }
    return this.tasksService.deleteTasks(id);
  }
}
