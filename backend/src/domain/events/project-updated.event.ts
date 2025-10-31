import type { Project } from '../entities/project.entity';

type ProjectListener = (event: { project: Project; occurredAt: Date }) => void;

export class ProjectUpdatedEvent {
  private static listeners: ProjectListener[] = [];

  static emit(project: Project): void {
    const payload = { project, occurredAt: new Date() };
    for (const listener of ProjectUpdatedEvent.listeners) {
      listener(payload);
    }
  }

  static subscribe(listener: ProjectListener): void {
    ProjectUpdatedEvent.listeners.push(listener);
  }
}
