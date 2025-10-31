import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Project API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/api/projects (GET)', async () => {
    const server = app.getHttpServer() as unknown as Parameters<
      typeof request
    >[0];
    const response = await request(server).get('/api/projects').expect(200);
    const body: unknown = response.body;
    expect(Array.isArray(body)).toBe(true);
    if (!Array.isArray(body)) {
      return;
    }
    expect(body.length).toBeGreaterThanOrEqual(1);
  });
});
