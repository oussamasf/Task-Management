import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { INestApplication } from '@nestjs/common';
import { User, UserDocument } from '../src/schemas/user.schema';
import { AppModule } from '../src/app.module';
import { config } from '../src/utils/config/app';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userModel;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule.forRoot(config)],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    userModel = moduleFixture.get<UserDocument>(getModelToken(User.name));
    // populate the DB with 1 user
    const mockUser = {
      _id: '6495cbe61279f54d38201fd4',
      username: 'fffff',
      password: '$2b$10$6Lv.O0E.sJRRCMYKklVGReCMOdL9Gb6hqqhD2hh0mM4PW2PufSEQ.',
      email: 'fisrtadmin@fisrtadmin.com',
      roles: ['admin'],
      createdAt: '2023-06-23T16:44:22.575Z',
      updatedAt: '2023-06-27T16:44:22.575Z',

      __v: 0,
    };
    await userModel.insertMany([mockUser]);
  });

  afterAll(async () => {
    await userModel.deleteMany({});
    await app.close();
  });

  it('api/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/login')
      .send({ email: 'fisrtadmin@fisrtadmin.com', password: '1234ddddd5' })
      .expect(200);

    // Assert the response body or other expectations
    expect(response.status).toBe(200);
  });
});
