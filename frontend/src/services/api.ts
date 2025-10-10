import type { Checklist, Project, Task } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

async function request<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchProjects(): Promise<Project[]> {
  return request<Project[]>(`${API_BASE_URL}/projects`);
}

export async function createProject(payload: { name: string; description?: string }): Promise<Project> {
  return request<Project>(`${API_BASE_URL}/projects`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function createChecklist(
  projectId: string,
  payload: { name: string },
): Promise<Checklist> {
  return request<Checklist>(`${API_BASE_URL}/projects/${projectId}/checklists`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function createTask(
  projectId: string,
  checklistId: string,
  payload: { title: string },
): Promise<Task> {
  return request<Task>(
    `${API_BASE_URL}/projects/${projectId}/checklists/${checklistId}/tasks`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
}

export async function updateTaskStatus(
  projectId: string,
  checklistId: string,
  taskId: string,
  status: Task['status'],
): Promise<Task> {
  return request<Task>(
    `${API_BASE_URL}/projects/${projectId}/checklists/${checklistId}/tasks/${taskId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    },
  );
}
