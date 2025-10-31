import { LRUCache } from 'lru-cache';
import { Project } from '../../domain/entities/project.entity';

type CachedProject = ReturnType<Project['toJSON']>;

export class ProjectCache {
  private readonly cache: LRUCache<string, CachedProject[]> = new LRUCache({
    max: 50,
    ttl: 5 * 60 * 1000,
  });

  getAll(): CachedProject[] | undefined {
    return this.cache.get('projects');
  }

  setAll(projects: CachedProject[]): void {
    this.cache.set('projects', projects);
  }

  clear(): void {
    this.cache.delete('projects');
  }
}
