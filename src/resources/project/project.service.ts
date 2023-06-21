import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Project } from '../../schemas/project.schema';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private userModel: Model<Project>) {}

  async create(createProjectDto: CreateProjectDto) {
    const createdUser = await this.userModel.create(createProjectDto);
    return `This action adds a new project: ${createdUser}`;
  }

  createTask(createProjectDto: CreateTaskDto) {
    return `This action adds a task to project: ${createProjectDto.name}`;
  }

  findAll() {
    return `This action returns all project`;
  }
  findAllTask(id: number) {
    return `This action returns all tasks within #${id} project`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  findTask(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project #${updateProjectDto} `;
  }

  updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} project task #${updateTaskDto} `;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
