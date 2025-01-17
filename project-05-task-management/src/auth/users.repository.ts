import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

export class UsersRepository extends Repository<User> {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {
        super(usersRepository.target, usersRepository.manager, usersRepository.queryRunner)
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);


        const user = this.usersRepository.create({ username, password: hashedPassword });

        try {
            await this.usersRepository.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            }
            throw new InternalServerErrorException(error);
        }
    }
}