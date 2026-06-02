import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
// ...



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api/afisha');
  app.enableCors({ origin: 'http://localhost:5173', credentials: true });

  // Главное здесь: public прямо в backend
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/content/afisha/',
  });

  await app.listen(3000);
  console.log('🚀 Сервер запущен на http://localhost:3000');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
}
bootstrap();
