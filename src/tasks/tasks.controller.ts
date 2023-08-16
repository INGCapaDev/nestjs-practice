import { Body, Controller, Get, Post } from '@nestjs/common';
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
  deleteTasks() {}
}
