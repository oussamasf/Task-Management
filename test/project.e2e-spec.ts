import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { INestApplication } from '@nestjs/common';
import { User, UserDocument } from '../src/schemas/user.schema';
import { AppModule } from '../src/app.module';
import { config } from '../src/utils/config/app';

describe('Project (e2e)', () => {
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

  it('it should signup successfully', async () => {
    const { text } = await request(app.getHttpServer())
      .post('/api/signup')
      .send({
        email: 'basic@user.com',
        username: 'basic',
        password: '123456789',
      })
      .expect(201);

    expect(typeof JSON.parse(text)?.access_token).toEqual('string');
  });

  it('it should fail signing up because extra field roles', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/signup')
      .send({
        email: 'basic@user.com',
        username: 'basic',
        password: '123456789',
        roles: ['admin'],
      })
      .expect(400);

    expect(JSON.parse(response.text)?.details).toEqual([
      expect.objectContaining({
        whitelistValidation: 'property roles should not exist',
      }),
    ]);
  });

  it('it should fail signing up because email exists in the system', async () => {
    const { text } = await request(app.getHttpServer())
      .post('/api/signup')
      .send({
        email: 'fisrtadmin@fisrtadmin.com',
        username: 'basic',
        password: '123456789',
      })
      .expect(400);

    expect(JSON.parse(text)?.message).toBe('ALREADY_SIGNED_UP');
  });

  it('it should login successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/login')
      .send({ email: 'fisrtadmin@fisrtadmin.com', password: '1234ddddd5' })
      .expect(200);

    expect(response.status).toBe(200);
  });

  it('it should fail login', async () => {
    const { text } = await request(app.getHttpServer())
      .post('/api/login')
      .send({ email: 'fisrtn@fisrtadmin.com', password: '1234ddddd5' })
      .expect(400);

    expect(JSON.parse(text)?.message).toBe('BAD_REQUEST');
  });

  it('it should create new user as an admin', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/login')
      .send({ email: 'fisrtadmin@fisrtadmin.com', password: '1234ddddd5' })
      .expect(200);
    const token = JSON.parse(res.text)?.access_token;

    const response = await request(app.getHttpServer())
      .post('/api/user')
      .send({
        username: 'ousf',
        password: '1233eeeeeeee',
        email: 'notAdmin@All.com',
        roles: ['basic_user'],
      })
      .set('Authorization', 'Bearer ' + token)
      .expect(201);

    expect(response.status).toBe(201);
  });

  it('it should not create new user cause user is not admin', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/login')
      .send({ email: 'notAdmin@All.com', password: '1233eeeeeeee' })
      .expect(200);
    const token = JSON.parse(res.text)?.access_token;

    const response = await request(app.getHttpServer())
      .post('/api/user')
      .send({
        username: 'ousf',
        password: '1233eeeeeeee',
        email: 'notAdmin@All.com',
        roles: ['basic_user'],
      })
      .set('Authorization', 'Bearer ' + token)
      .expect(403);

    expect(response.status).toBe(403);
  });
});
