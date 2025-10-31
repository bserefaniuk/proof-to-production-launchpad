import { Module } from '@nestjs/common';
import { ProjectService } from '../../application/services/project.service';
import { PROJECT_REPOSITORY } from '../../domain/repositories/tokens';
import { ProjectCache } from '../../infrastructure/cache/project.cache';
import { ProjectCacheInvalidator } from '../../infrastructure/cache/project.cache.subscriber';
import { InMemoryProjectRepository } from '../../infrastructure/persistence/memory/project.memory.repository';
import { ProjectController } from '../../interfaces/http/project.controller';

@Module({
  controllers: [ProjectController],
  providers: [
    ProjectService,
    ProjectCache,
    ProjectCacheInvalidator,
    {
      provide: PROJECT_REPOSITORY,
      useClass: InMemoryProjectRepository,
    },
  ],
})
export class ProjectModule {}
