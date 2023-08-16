import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { validateUpdateTaskDto } from './task.validations';

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

  @Patch(':id')
  updateTasks(@Param('id') id: string, @Body() updatedFields: UpdateTaskDto) {
    if (!id) {
      return 'Id is required';
    }
    const validFields: UpdateTaskDto = validateUpdateTaskDto(updatedFields);
    if (Object.keys(validFields).length === 0) {
      return 'At least one valid field is required';
    }

    return this.tasksService.updateTasks(id, validFields);
  }

  @Delete(':id')
  deleteTasks(@Param('id') id: string) {
    if (!id) {
      return 'Id is required';
    }
    return this.tasksService.deleteTasks(id);
  }
}
