import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('api/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/login')
      .send({ email: 'fisrtadmin@fisrtadmin.com', password: '1234ddddd5' })
      .expect(200);

    // Assert the response body or other expectations
    expect(response).toBe('Welcome to task manager API');
  });

  // Add more test cases as needed for other endpoints
});
