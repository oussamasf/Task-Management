import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class ProjectService {
  create(createProjectDto: CreateProjectDto) {
    return `This action adds a new project: ${createProjectDto.name}`;
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
