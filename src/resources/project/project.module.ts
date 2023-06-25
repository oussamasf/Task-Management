import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '../../schemas/project.schema';
import { Task, TaskSchema } from '../../schemas/task.schema';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { RolesModule } from '../../utils/config/roles/roles.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
    RolesModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
