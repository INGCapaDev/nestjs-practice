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
    return this.tasksService.createTasks(
      newTask.title.toString(),
      newTask.description.toString(),
    );
  }

  @Patch(':id')
  updateTasks(
    @Param('id') id: string,
    @Body() updatedFields: UpdateTaskDto,
  ): string {
    const validFields = ['title', 'description', 'status'];
    const filteredFields: UpdateTaskDto = {};

    validFields.forEach((field) => {
      if (updatedFields[field]) {
        filteredFields[field] = updatedFields[field];
      }
    });

    if (Object.keys(filteredFields).length === 0) {
      return 'At least one field is required';
    }

    return this.tasksService.updateTasks(id, filteredFields);
  }

  @Delete(':id')
  deleteTasks(@Param('id') id: string) {
    if (!id) {
      return 'Id is required';
    }
    return this.tasksService.deleteTasks(id);
  }
}
