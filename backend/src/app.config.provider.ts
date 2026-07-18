import { ConfigService } from '@nestjs/config';

export const configProvider = {
  provide: 'CONFIG',
  useFactory: (configService: ConfigService) => ({
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
