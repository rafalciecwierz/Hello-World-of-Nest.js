import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeaEntity } from './idea/idea.entity';

@Module({
  imports: [TypeOrmModule.forRoot(), IdeaEntity],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
