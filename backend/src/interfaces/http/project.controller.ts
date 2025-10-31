import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Patch,
} from '@nestjs/common';
import {
  CreateChecklistCommand,
  CreateProjectCommand,
  CreateTaskCommand,
  UpdateTaskStatusCommand,
} from '../../application/dto/project.dto';
import { ProjectService } from '../../application/services/project.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async listProjects() {
    return this.projectService.listProjects();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProject(@Body() dto: CreateProjectDto) {
    return this.projectService.createProject(
      new CreateProjectCommand(dto.name, dto.description),
    );
  }

  @Post(':projectId/checklists')
  @HttpCode(HttpStatus.CREATED)
  async addChecklist(
    @Param('projectId', new ParseUUIDPipe({ version: '4' })) projectId: string,
    @Body() dto: CreateChecklistDto,
  ) {
    const result = await this.projectService.addChecklist(
      new CreateChecklistCommand(projectId, dto.name),
    );
    if (!result) {
      throw new NotFoundException('Project not found');
    }
    return result;
  }

  @Post(':projectId/checklists/:checklistId/tasks')
  @HttpCode(HttpStatus.CREATED)
  async addTask(
    @Param('projectId', new ParseUUIDPipe({ version: '4' })) projectId: string,
    @Param('checklistId', new ParseUUIDPipe({ version: '4' }))
    checklistId: string,
    @Body() dto: CreateTaskDto,
  ) {
    const result = await this.projectService.addTask(
      new CreateTaskCommand(projectId, checklistId, dto.title),
    );
    if (!result) {
      throw new NotFoundException('Project or checklist not found');
    }
    return result;
  }

  @Patch(':projectId/checklists/:checklistId/tasks/:taskId')
  async updateTaskStatus(
    @Param('projectId', new ParseUUIDPipe({ version: '4' })) projectId: string,
    @Param('checklistId', new ParseUUIDPipe({ version: '4' }))
    checklistId: string,
    @Param('taskId', new ParseUUIDPipe({ version: '4' })) taskId: string,
    @Body() dto: UpdateTaskStatusDto,
  ) {
    const result = await this.projectService.updateTaskStatus(
      new UpdateTaskStatusCommand(projectId, checklistId, taskId, dto.status),
    );
    if (!result) {
      throw new NotFoundException('Task not found');
    }
    return result;
  }
}
