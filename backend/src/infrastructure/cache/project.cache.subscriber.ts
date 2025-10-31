import { Injectable } from '@nestjs/common';
import { ProjectUpdatedEvent } from '../../domain/events/project-updated.event';
import { ProjectCache } from './project.cache';

@Injectable()
export class ProjectCacheInvalidator {
  constructor(private readonly cache: ProjectCache) {
    ProjectUpdatedEvent.subscribe(() => {
      this.cache.clear();
    });
  }
}
