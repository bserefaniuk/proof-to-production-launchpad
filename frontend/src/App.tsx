import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import './App.css';
import {
  createChecklist,
  createProject,
  createTask,
  fetchProjects,
  updateTaskStatus,
} from './services/api';
import type { Checklist, Project, Task } from './types';

type ChecklistFormState = Record<string, string>;
type TaskFormState = Record<string, string>;

const TASK_STATUS_LABELS: Record<Task['status'], string> = {
  pending: 'Mark in progress',
  in_progress: 'Complete task',
  done: 'Reset to pending',
};

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [checklistForms, setChecklistForms] = useState<ChecklistFormState>({});
  const [taskForms, setTaskForms] = useState<TaskFormState>({});

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load projects. Verify the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProjects();
  }, []);

  const projectCount = projects.length;
  const checklistCount = useMemo(
    () => projects.reduce((acc, project) => acc + project.checklists.length, 0),
    [projects],
  );
  const taskCount = useMemo(
    () =>
      projects.reduce(
        (projectTotal, project) =>
          projectTotal +
          project.checklists.reduce((checklistTotal, checklist) => checklistTotal + checklist.tasks.length, 0),
        0,
      ),
    [projects],
  );

  const handleCreateProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newProject.name.trim()) {
      return;
    }
    try {
      await createProject({
        name: newProject.name.trim(),
        description: newProject.description.trim() || undefined,
      });
      setNewProject({ name: '', description: '' });
      await loadProjects();
    } catch (err) {
      console.error(err);
      setError('Unable to create project. Please try again.');
    }
  };

  const handleCreateChecklist = async (project: Project) => {
    const name = checklistForms[project.id]?.trim();
    if (!name) {
      return;
    }
    try {
      await createChecklist(project.id, { name });
      setChecklistForms((prev) => ({ ...prev, [project.id]: '' }));
      await loadProjects();
    } catch (err) {
      console.error(err);
      setError('Unable to create checklist.');
    }
  };

  const handleCreateTask = async (project: Project, checklist: Checklist) => {
    const key = `${project.id}:${checklist.id}`;
    const title = taskForms[key]?.trim();
    if (!title) {
      return;
    }
    try {
      await createTask(project.id, checklist.id, { title });
      setTaskForms((prev) => ({ ...prev, [key]: '' }));
      await loadProjects();
    } catch (err) {
      console.error(err);
      setError('Unable to create task.');
    }
  };

  const determineNextStatus = (status: Task['status']): Task['status'] => {
    switch (status) {
      case 'pending':
        return 'in_progress';
      case 'in_progress':
        return 'done';
      case 'done':
      default:
        return 'pending';
    }
  };

  const handleUpdateTaskStatus = async (
    projectId: string,
    checklistId: string,
    task: Task,
  ) => {
    try {
      const next = determineNextStatus(task.status);
      await updateTaskStatus(projectId, checklistId, task.id, next);
      await loadProjects();
    } catch (err) {
      console.error(err);
      setError('Unable to update task status.');
    }
  };

  return (
    <div className="layout">
      <header className="header">
        <div>
          <h1>LaunchPad Readiness Tracker</h1>
          <p className="tagline">
            Follow along with the series to evolve this proof of concept into a production-ready platform.
          </p>
        </div>
        <div className="stats">
          <span>{projectCount} projects</span>
          <span>{checklistCount} checklists</span>
          <span>{taskCount} tasks</span>
        </div>
      </header>

      <aside className="sidebar">
        <section className="panel">
          <h2>Create a new project</h2>
          <p className="panel-description">
            Projects represent initiatives or product launches. Over the series we&rsquo;ll enhance this flow with auth,
            persistence, and process automation.
          </p>
          <form className="form" onSubmit={handleCreateProject}>
            <label>
              <span>Project name</span>
              <input
                type="text"
                value={newProject.name}
                onChange={(event) =>
                  setNewProject((prev) => ({ ...prev, name: event.target.value }))
                }
                placeholder="Launch readiness for v1"
                required
              />
            </label>
            <label>
              <span>Description (optional)</span>
              <textarea
                value={newProject.description}
                onChange={(event) =>
                  setNewProject((prev) => ({ ...prev, description: event.target.value }))
                }
                placeholder="Outline what success looks like."
              />
            </label>
            <button type="submit" className="primary-button">
              Add project
            </button>
          </form>
        </section>
      </aside>

      <main className="main-content">
        <section className="panel">
          <h2>Current projects</h2>
          {error && <p className="error">{error}</p>}
          {loading && <p>Loading projects…</p>}
          {!loading && projects.length === 0 && (
            <p className="empty">No projects yet. Create one in the sidebar to get started.</p>
          )}

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                <header>
                  <h3>{project.name}</h3>
                  {project.description && <p>{project.description}</p>}
                </header>

                <div className="checklist-section">
                  <h4>Checklists</h4>
                  {project.checklists.length === 0 && (
                    <p className="empty">No checklists yet. Add one below.</p>
                  )}

                  {project.checklists.map((checklist) => (
                    <div className="checklist-card" key={checklist.id}>
                      <header>
                        <h5>{checklist.name}</h5>
                        <span className="badge">{checklist.tasks.length} tasks</span>
                      </header>
                      <ul className="task-list">
                        {checklist.tasks.map((task) => (
                          <li key={task.id}>
                            <div>
                              <span className={`status status-${task.status}`}></span>
                              <span>{task.title}</span>
                            </div>
                            <button
                              type="button"
                              className="status-button"
                              onClick={() =>
                                handleUpdateTaskStatus(project.id, checklist.id, task)
                              }
                            >
                              {TASK_STATUS_LABELS[task.status]}
                            </button>
                          </li>
                        ))}
                      </ul>

                      <div className="inline-form">
                        <input
                          type="text"
                          placeholder="Add task"
                          value={taskForms[`${project.id}:${checklist.id}`] ?? ''}
                          onChange={(event) =>
                            setTaskForms((prev) => ({
                              ...prev,
                              [`${project.id}:${checklist.id}`]: event.target.value,
                            }))
                          }
                        />
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => handleCreateTask(project, checklist)}
                        >
                          Add task
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="inline-form">
                  <input
                    type="text"
                    placeholder="Checklist name"
                    value={checklistForms[project.id] ?? ''}
                    onChange={(event) =>
                      setChecklistForms((prev) => ({ ...prev, [project.id]: event.target.value }))
                    }
                  />
                  <button type="button" className="secondary-button" onClick={() => handleCreateChecklist(project)}>
                    Add checklist
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
