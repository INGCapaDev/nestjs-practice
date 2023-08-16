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
    id: string,
    updatedFields: {
      title?: string;
      description?: string;
      status?: TaskStatus;
    },
  ): string {
    const task = this.getTaskById(id);
    if (typeof task === 'string') {
      return task;
    }
    const newTask = Object.assign(task, updatedFields);
    this.tasks.map((task) => (task.id === id ? newTask : task));
    return `Task '${id}' updated to '${JSON.stringify(newTask)}'`;
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
