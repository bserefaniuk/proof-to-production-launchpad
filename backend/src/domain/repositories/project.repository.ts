import { Checklist } from '../entities/checklist.entity';
import { Project } from '../entities/project.entity';
import { Task } from '../entities/task.entity';

export interface ProjectRepository {
  findAll(): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
  save(project: Project): Promise<void>;
  addChecklist(
    projectId: string,
    checklist: Checklist,
  ): Promise<Checklist | null>;
  addTask(
    projectId: string,
    checklistId: string,
    task: Task,
  ): Promise<Task | null>;
  updateTaskStatus(
    projectId: string,
    checklistId: string,
    taskId: string,
    status: Task['status'],
  ): Promise<Task | null>;
}
