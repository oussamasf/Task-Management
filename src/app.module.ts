import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { MorganMiddleware } from './middlewares/morgan.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './resources/project/project.module';
import { AuthModule } from './resources/auth/auth.module';
import { UserModule } from './resources/user/user.module';
import { AllExceptionsFilter } from './utils/filters/error-logging.filter';

const { MONGO_URI } = process.env;
@Module({
  imports: [
    ProjectModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ envFilePath: '.development.env', isGlobal: true }),
    MongooseModule.forRoot(MONGO_URI),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}
