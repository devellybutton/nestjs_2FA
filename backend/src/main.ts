import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { setupSwagger } from './config/swagger.document';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
