import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Checklist } from '../../../domain/entities/checklist.entity';
import { Project } from '../../../domain/entities/project.entity';
import { Task } from '../../../domain/entities/task.entity';
import { ProjectRepository } from '../../../domain/repositories/project.repository';

@Injectable()
export class InMemoryProjectRepository implements ProjectRepository {
  private projects = new Map<string, Project>();

  constructor() {
    const launchProjectId = randomUUID();
    const planningChecklistId = randomUUID();
    const hardeningChecklistId = randomUUID();

    const planningChecklist = Checklist.create({
      id: planningChecklistId,
      projectId: launchProjectId,
      name: 'Foundation & Planning',
      tasks: [
        Task.create({
          id: randomUUID(),
          checklistId: planningChecklistId,
          title: 'Define success metrics and guardrails',
        }),
        Task.create({
          id: randomUUID(),
          checklistId: planningChecklistId,
          title: 'Map core domains and bounded contexts',
          status: 'in_progress',
        }),
      ],
    });

    const hardeningChecklist = Checklist.create({
      id: hardeningChecklistId,
      projectId: launchProjectId,
      name: 'Hardening & Launch Readiness',
      tasks: [
        Task.create({
          id: randomUUID(),
          checklistId: hardeningChecklistId,
          title: 'Add observability baseline (logs, metrics, traces)',
        }),
        Task.create({
          id: randomUUID(),
          checklistId: hardeningChecklistId,
          title: 'Run security posture review and threat modelling',
          status: 'pending',
        }),
      ],
    });

    const project = Project.create({
      id: launchProjectId,
      name: 'LaunchPad – v0 Readiness',
      description:
        'Seed data used throughout the series to illustrate the journey from PoC to production-ready.',
      checklists: [planningChecklist, hardeningChecklist],
    });

    this.projects.set(project.id, project);
  }

  findAll(): Promise<Project[]> {
    const projects = Array.from(this.projects.values()).map((project) =>
      Project.create(project.toJSON()),
    );
    return Promise.resolve(projects);
  }

  findById(id: string): Promise<Project | null> {
    const project = this.projects.get(id);
    return Promise.resolve(project ? Project.create(project.toJSON()) : null);
  }

  save(project: Project): Promise<void> {
    this.projects.set(project.id, Project.create(project.toJSON()));
    return Promise.resolve();
  }

  addChecklist(
    projectId: string,
    checklist: Checklist,
  ): Promise<Checklist | null> {
    const project = this.projects.get(projectId);
    if (!project) {
      return Promise.resolve(null);
    }
    project.addChecklist(checklist.toJSON());
    this.projects.set(projectId, project);
    return Promise.resolve(checklist);
  }

  addTask(
    projectId: string,
    checklistId: string,
    task: Task,
  ): Promise<Task | null> {
    const project = this.projects.get(projectId);
    if (!project) {
      return Promise.resolve(null);
    }
    const checklist = project.checklists.find((c) => c.id === checklistId);
    if (!checklist) {
      return Promise.resolve(null);
    }
    checklist.addTask(task.toJSON());
    this.projects.set(projectId, project);
    return Promise.resolve(task);
  }

  updateTaskStatus(
    projectId: string,
    checklistId: string,
    taskId: string,
    status: Task['status'],
  ): Promise<Task | null> {
    const project = this.projects.get(projectId);
    if (!project) {
      return Promise.resolve(null);
    }
    const checklist = project.checklists.find((c) => c.id === checklistId);
    if (!checklist) {
      return Promise.resolve(null);
    }
    const task = checklist.updateTaskStatus(taskId, status);
    this.projects.set(projectId, project);
    return Promise.resolve(task ?? null);
  }
}
