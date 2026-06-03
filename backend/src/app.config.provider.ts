import { ConfigModule, ConfigService } from '@nestjs/config';

export const configProvider = {
  // Используем 'useFactory' для получения значений через ConfigService
  imports: [ConfigModule],
  provide: 'CONFIG',
  useFactory: (configService: ConfigService): AppConfig => ({
    database: {
      driver: configService.get<string>('DATABASE_DRIVER'),
      url: configService.get<string>('DATABASE_URL'),
    },
  }),
  inject: [ConfigService],
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}
