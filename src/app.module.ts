import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { MorganMiddleware } from './middlewares/morgan.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './resources/project/project.module';
import { AuthModule } from './resources/auth/auth.module';
import { UserModule } from './resources/user/user.module';
import { AllExceptionsFilter } from './utils/filters/error-logging.filter';
import { RolesModule } from './utils/config/roles/roles.module';
import { ValidationPipe } from './utils/pipes/validation.pipe';
import { AppConfig } from './utils/interfaces/app-config.interface';

@Module({})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
  static forRoot(config: AppConfig): DynamicModule {
    const { envFilePath, dbUri } = config;
    return {
      module: AppModule,
      imports: [
        ProjectModule,
        AuthModule,
        UserModule,
        ConfigModule.forRoot({
          envFilePath,
          isGlobal: true,
        }),
        MongooseModule.forRoot(dbUri),
        RolesModule,
      ],
      providers: [
        AppService,
        {
          provide: APP_FILTER,
          useClass: AllExceptionsFilter,
        },
        {
          provide: APP_PIPE,
          useClass: ValidationPipe,
        },
      ],
      controllers: [AppController],
    };
  }
}
