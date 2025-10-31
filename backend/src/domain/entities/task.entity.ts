export type TaskStatus = 'pending' | 'in_progress' | 'done';

export interface TaskProps {
  id: string;
  checklistId: string;
  title: string;
  status?: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Task {
  private props: {
    id: string;
    checklistId: string;
    title: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
  };

  private constructor(props: TaskProps) {
    this.props = {
      id: props.id,
      checklistId: props.checklistId,
      title: props.title,
      status: props.status ?? 'pending',
      createdAt: props.createdAt ? new Date(props.createdAt) : new Date(),
      updatedAt: props.updatedAt ? new Date(props.updatedAt) : new Date(),
    };
  }

  static create(props: TaskProps): Task {
    return new Task(props);
  }

  get id(): string {
    return this.props.id;
  }

  get checklistId(): string {
    return this.props.checklistId;
  }

  get title(): string {
    return this.props.title;
  }

  get status(): TaskStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updateStatus(status: TaskStatus): void {
    this.props.status = status;
    this.touch();
  }

  rename(title: string): void {
    this.props.title = title;
    this.touch();
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  toJSON(): TaskProps {
    return { ...this.props };
  }
}
