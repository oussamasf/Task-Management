import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('api/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Post(':id/task')
  createTask(@Body() createTaskDto: CreateTaskDto, @Param('id') id: string) {
    const taskBody = { projectId: id, ...createTaskDto };
    return this.projectService.createTask(taskBody);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Get(':id/task')
  findAllTask(@Param('id') id: string) {
    return this.projectService.findAllTask(id);
  }

  @Get(':id/task/:task_id')
  findTask(@Param('id') id: string, @Param('task_id') task_id: string) {
    return this.projectService.findTask(id, task_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Patch(':id/task/:task_id')
  updateTask(
    @Param('id') id: string,
    @Param('task_id') task_id: string,
    @Body() updatetaskDto: UpdateTaskDto,
  ) {
    return this.projectService.updateTask(id, task_id, updatetaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
