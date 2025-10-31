import { Checklist, ChecklistProps } from './checklist.entity';

export interface ProjectProps {
  id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  checklists?: Checklist[];
}

export class Project {
  private props: {
    id: string;
    name: string;
    description?: string;
    checklists: Checklist[];
    createdAt: Date;
    updatedAt: Date;
  };

  private constructor(props: ProjectProps) {
    this.props = {
      id: props.id,
      name: props.name,
      description: props.description,
      checklists: (props.checklists ?? []).map((checklist) =>
        checklist instanceof Checklist
          ? checklist
          : Checklist.create(checklist),
      ),
      createdAt: props.createdAt ? new Date(props.createdAt) : new Date(),
      updatedAt: props.updatedAt ? new Date(props.updatedAt) : new Date(),
    };
  }

  static create(props: ProjectProps): Project {
    return new Project(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get checklists(): Checklist[] {
    return this.props.checklists;
  }

  rename(name: string): void {
    this.props.name = name;
    this.touch();
  }

  updateDescription(description: string | undefined): void {
    this.props.description = description;
    this.touch();
  }

  addChecklist(props: ChecklistProps): Checklist {
    const checklist = Checklist.create(props);
    this.props.checklists.push(checklist);
    this.touch();
    return checklist;
  }

  toJSON(): ProjectProps {
    return {
      id: this.props.id,
      name: this.props.name,
      description: this.props.description,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      checklists: this.props.checklists.map(
        (checklist) => checklist as unknown as Checklist,
      ),
    };
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }
}
