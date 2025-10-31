// Placeholder Postgres repository to be completed when the relational adapter lands.
import { Injectable } from '@nestjs/common';
import type { Checklist } from '../../../domain/entities/checklist.entity';
import type { Project } from '../../../domain/entities/project.entity';
import type { Task } from '../../../domain/entities/task.entity';
import type { ProjectRepository } from '../../../domain/repositories/project.repository';

const notImplemented = (context: string) =>
  Promise.reject(
    new Error(
      `Postgres repository not yet wired. Attempted operation: ${context}. Follow the roadmap to swap the in-memory adapter.`,
    ),
  );

@Injectable()
export class PostgresProjectRepository implements ProjectRepository {
  findAll(): Promise<Project[]> {
    return notImplemented('findAll');
  }

  findById(id: string): Promise<Project | null> {
    return notImplemented(`findById(id=${id})`);
  }

  save(project: Project): Promise<void> {
    return notImplemented(`save(project=${project.id})`);
  }

  addChecklist(
    projectId: string,
    checklist: Checklist,
  ): Promise<Checklist | null> {
    return notImplemented(
      `addChecklist(projectId=${projectId}, checklist=${checklist.id})`,
    );
  }

  addTask(
    projectId: string,
    checklistId: string,
    task: Task,
  ): Promise<Task | null> {
    return notImplemented(
      `addTask(projectId=${projectId}, checklistId=${checklistId}, task=${task.id})`,
    );
  }

  updateTaskStatus(
    projectId: string,
    checklistId: string,
    taskId: string,
    status: Task['status'],
  ): Promise<Task | null> {
    return notImplemented(
      `updateTaskStatus(projectId=${projectId}, checklistId=${checklistId}, taskId=${taskId}, status=${status})`,
    );
  }
}
