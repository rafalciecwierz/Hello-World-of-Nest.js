import { Repository } from "typeorm";
import { Task } from "./task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";

export class TasksRepository extends Repository<Task> {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) {
        super(taskRepository.target, taskRepository.manager, taskRepository.queryRunner)
    }

    async findByStatus(status: TaskStatus): Promise<Task[]> {
        return await this.taskRepository.find({ where: { status } });

    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.taskRepository.create({
            title,
            description,
            status: TaskStatus.OPEN
        })

        await this.taskRepository.save(task);
        return task;
    }

}