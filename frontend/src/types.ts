export interface Task {
  id: string;
  checklistId: string;
  title: string;
  status: 'pending' | 'in_progress' | 'done';
  createdAt: string;
  updatedAt: string;
}

export interface Checklist {
  id: string;
  projectId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  checklists: Checklist[];
}
