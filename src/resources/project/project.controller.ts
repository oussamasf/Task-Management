import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import ExtendedRequest from 'src/utils/interfaces/extended-request.interface';
import { PoliciesGuard } from 'src/utils/config/roles/roles.guard';
import { CheckPolicies } from 'src/utils/decorator/roles.decorator';
import { AppAbility, Action } from 'src/utils/config/roles/roles.factory';
import { Project } from 'src/schemas/project.schema';

@UseGuards(PoliciesGuard)
@Controller('api/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Project))
  create(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req: ExtendedRequest,
  ) {
    const userId = req.user.sub;
    return this.projectService.create(userId, createProjectDto);
  }

  @Post(':id/task')
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Param('id') id: string,
    @Req() req: ExtendedRequest,
  ) {
    const userId = req.user.sub;
    const projectId = id;
    return this.projectService.createTask({ projectId, userId }, createTaskDto);
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
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req: ExtendedRequest,
  ) {
    const userId = req.user.sub;
    const projectId = id;

    return this.projectService.update({ projectId, userId }, updateProjectDto);
  }

  @Patch(':id/task/:task_id')
  updateTask(
    @Param('id') id: string,
    @Param('task_id') task_id: string,
    @Body() updatetaskDto: UpdateTaskDto,
    @Req() req: ExtendedRequest,
  ) {
    const ids = { userId: req.user.sub, projectId: id, taskId: task_id };
    return this.projectService.updateTask(ids, updatetaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
