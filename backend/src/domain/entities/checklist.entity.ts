import { Task, TaskProps, TaskStatus } from './task.entity';

export interface ChecklistProps {
  id: string;
  projectId: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  tasks?: Task[];
}

export class Checklist {
  private props: {
    id: string;
    projectId: string;
    name: string;
    tasks: Task[];
    createdAt: Date;
    updatedAt: Date;
  };

  private constructor(props: ChecklistProps) {
    this.props = {
      id: props.id,
      projectId: props.projectId,
      name: props.name,
      tasks: (props.tasks ?? []).map((task) =>
        task instanceof Task ? task : Task.create(task),
      ),
      createdAt: props.createdAt ? new Date(props.createdAt) : new Date(),
      updatedAt: props.updatedAt ? new Date(props.updatedAt) : new Date(),
    };
  }

  static create(props: ChecklistProps): Checklist {
    return new Checklist(props);
  }

  get id(): string {
    return this.props.id;
  }

  get projectId(): string {
    return this.props.projectId;
  }

  get name(): string {
    return this.props.name;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get tasks(): Task[] {
    return this.props.tasks;
  }

  rename(name: string): void {
    this.props.name = name;
    this.touch();
  }

  addTask(taskProps: TaskProps): Task {
    const task = Task.create(taskProps);
    this.props.tasks.push(task);
    this.touch();
    return task;
  }

  updateTaskStatus(taskId: string, status: TaskStatus): Task | undefined {
    const task = this.props.tasks.find((t) => t.id === taskId);
    if (!task) {
      return undefined;
    }
    task.updateStatus(status);
    this.touch();
    return task;
  }

  toJSON(): ChecklistProps {
    return {
      id: this.props.id,
      projectId: this.props.projectId,
      name: this.props.name,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      tasks: this.props.tasks.map((task) => task as unknown as Task),
    };
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }
}
