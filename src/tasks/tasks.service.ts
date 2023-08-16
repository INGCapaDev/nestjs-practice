import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: TaskStatus.PENDING,
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      status: TaskStatus.DONE,
    },
  ];

  getAllTasks() {
    return this.tasks;
  }

  createTasks(title: string, description: string) {
    const task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.PENDING,
    };

    this.tasks.push(task);

    return task;
  }

  getTaskById(id: string): Task | string {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      return 'Task not found';
    }
    return task;
  }

  updateTasks(
    title: string,
    description: string,
    status: TaskStatus,
    id: string,
  ) {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      return 'Task not found';
    }
    task.title = title;
    task.description = description;
    task.status = status;
    return task;
  }

  deleteTasks(id: string): string {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      return 'Task not found';
    }
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return 'Task deleted';
  }
}
