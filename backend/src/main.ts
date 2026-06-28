import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { JsonLogger } from './logger/json.logger'; // укажите правильный путь
import { TskvLogger } from './logger/tskv.logger'; // укажите правильный путь
import { DevLogger } from './logger/dev.logger'; // укажите правильный путь

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  // Выбор логгера через переменную окружения LOG_FORMAT
  const logFormat = process.env.LOG_FORMAT || 'dev';

  switch (logFormat) {
    case 'json':
      app.useLogger(new JsonLogger());
      break;
    case 'tskv':
      app.useLogger(new TskvLogger());
      break;
    default:
      app.useLogger(new DevLogger());
  }

  // Основные настройки приложения
  app.setGlobalPrefix('api/afisha');
  app.enableCors({ origin: 'http://localhost:5173', credentials: true });
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/content/afisha/',
  });

  await app.listen(3000);
  console.log('Сервер запущен');

  // Глобальные пайпы
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
}

main();