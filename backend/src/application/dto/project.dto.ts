export class CreateProjectCommand {
  constructor(
    public readonly name: string,
    public readonly description?: string,
  ) {}
}

export class CreateChecklistCommand {
  constructor(
    public readonly projectId: string,
    public readonly name: string,
  ) {}
}

export class CreateTaskCommand {
  constructor(
    public readonly projectId: string,
    public readonly checklistId: string,
    public readonly title: string,
  ) {}
}

export class UpdateTaskStatusCommand {
  constructor(
    public readonly projectId: string,
    public readonly checklistId: string,
    public readonly taskId: string,
    public readonly status: 'pending' | 'in_progress' | 'done',
  ) {}
}
