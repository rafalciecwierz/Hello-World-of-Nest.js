import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private taskRepository: TasksRepository
    ) { }

    // getAllTasks() {
    //     return this.tasks;
    // }

    // getTasksWithFilter(filterDto: GetTaskFilterDto): Task[] {
    //     const { status, search } = filterDto;

    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter((task) => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter((task) => {
    //             if (task.title.includes(search) || task.description.includes(search)) {
    //                 return true;
    //             }
    //             return false;
    //         });
    //     }

    //     return tasks;
    // }


    async getTaskById(id: string): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id } });

        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return found;
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     }

    //     this.tasks.push(task);
    //     return task;
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const newTask = this.getTaskById(id);
    //     newTask.status = status;
    //     return newTask;
    // }

    async deleteTask(id: string): Promise<void> {
        const result = await this.taskRepository.delete({ id });

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }
}
