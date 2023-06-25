import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './utils/pipes/validation.pipe';
import { config } from './utils/config/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot(config));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
