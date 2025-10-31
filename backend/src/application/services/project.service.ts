import { randomUUID } from 'node:crypto';
import { Inject, Injectable } from '@nestjs/common';
import { Checklist } from '../../domain/entities/checklist.entity';
import { Project } from '../../domain/entities/project.entity';
import { ProjectUpdatedEvent } from '../../domain/events/project-updated.event';
import { Task } from '../../domain/entities/task.entity';
import type { ProjectRepository } from '../../domain/repositories/project.repository';
import { PROJECT_REPOSITORY } from '../../domain/repositories/tokens';
import { ProjectCache } from '../../infrastructure/cache/project.cache';
import {
  CreateChecklistCommand,
  CreateProjectCommand,
  CreateTaskCommand,
  UpdateTaskStatusCommand,
} from '../dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly repository: ProjectRepository,
    private readonly cache: ProjectCache,
  ) {}

  async listProjects(): Promise<ReturnType<Project['toJSON']>[]> {
    const cached = this.cache.getAll();
    if (cached) {
      return cached;
    }
    const projects = await this.repository.findAll();
    const serialized = projects.map((project) => project.toJSON());
    this.cache.setAll(serialized);
    return serialized;
  }

  async createProject(
    command: CreateProjectCommand,
  ): Promise<ReturnType<Project['toJSON']>> {
    const project = Project.create({
      id: randomUUID(),
      name: command.name,
      description: command.description,
    });
    await this.repository.save(project);
    ProjectUpdatedEvent.emit(project);
    return project.toJSON();
  }

  async addChecklist(
    command: CreateChecklistCommand,
  ): Promise<ReturnType<Checklist['toJSON']> | null> {
    const project = await this.repository.findById(command.projectId);
    if (!project) {
      return null;
    }

    const checklist = Checklist.create({
      id: randomUUID(),
      projectId: project.id,
      name: command.name,
    });

    const added = await this.repository.addChecklist(project.id, checklist);
    if (!added) {
      return null;
    }

    const updatedProject = await this.repository.findById(project.id);
    if (updatedProject) {
      ProjectUpdatedEvent.emit(updatedProject);
    }

    return added.toJSON();
  }

  async addTask(
    command: CreateTaskCommand,
  ): Promise<ReturnType<Task['toJSON']> | null> {
    const task = Task.create({
      id: randomUUID(),
      checklistId: command.checklistId,
      title: command.title,
    });

    const added = await this.repository.addTask(
      command.projectId,
      command.checklistId,
      task,
    );

    if (!added) {
      return null;
    }

    const updatedProject = await this.repository.findById(command.projectId);
    if (updatedProject) {
      ProjectUpdatedEvent.emit(updatedProject);
    }

    return added.toJSON();
  }

  async updateTaskStatus(
    command: UpdateTaskStatusCommand,
  ): Promise<ReturnType<Task['toJSON']> | null> {
    const updatedTask = await this.repository.updateTaskStatus(
      command.projectId,
      command.checklistId,
      command.taskId,
      command.status,
    );

    if (!updatedTask) {
      return null;
    }

    const project = await this.repository.findById(command.projectId);
    if (project) {
      ProjectUpdatedEvent.emit(project);
    }

    return updatedTask.toJSON();
  }
}
