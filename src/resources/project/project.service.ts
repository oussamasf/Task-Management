import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Project } from '../../schemas/project.schema';
import { Task } from '../../schemas/task.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  async create(userId: string, createProjectDto: CreateProjectDto) {
    const createdProject = await this.projectModel.create({
      createdBy: userId,
      ...createProjectDto,
    });
    return createdProject;
  }

  async createTask(
    { projectId, userId }: { projectId: string; userId: string },
    createTaskDto: CreateTaskDto,
  ) {
    const createdTask = await this.taskModel.create({
      projectId,
      createdBy: userId,
      ...createTaskDto,
    });

    return createdTask;
  }

  async findAll() {
    const Projects = await this.projectModel.find();

    return Projects;
  }

  async findAllTask(id: string) {
    const Task = await this.taskModel.find({ projectId: id });

    return Task;
  }

  async findOne(id: string) {
    const project = await this.projectModel.findOne({ _id: id });

    return project;
  }

  async findTask(id: string, taskId: string) {
    const Tasks = await this.taskModel.findOne({ projectId: id, _id: taskId });

    return Tasks;
  }

  async update(
    { projectId, userId }: { projectId: string; userId: string },
    updateProjectDto: UpdateProjectDto,
  ) {
    const updatedProject = await this.projectModel.findByIdAndUpdate(
      { _id: projectId },
      {
        updatedBy: userId,
        ...updateProjectDto,
      },
    );

    return updatedProject;
  }

  async updateTask(
    {
      projectId,
      taskId,
      userId,
    }: { projectId: string; taskId: string; userId: string },
    updateTaskDto: UpdateTaskDto,
  ) {
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      { projectId, _id: taskId },
      {
        updatedBy: userId,
        ...updateTaskDto,
      },
    );
    return updatedTask;
  }

  async remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
