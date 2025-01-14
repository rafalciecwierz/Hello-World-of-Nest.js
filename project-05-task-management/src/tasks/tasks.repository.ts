import { Repository } from "typeorm";
import { Task } from "./task.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class TasksRepository extends Repository<Task> {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) {
        super(taskRepository.target, taskRepository.manager, taskRepository.queryRunner)
    }
}