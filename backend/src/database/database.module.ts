import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../repository/entities/film.entity';
import { Schedule } from '../repository/entities/schedule.entity';
import { RepositoryService } from '../repository/repository.service';

@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            const driver = configService.get<string>('DATABASE_DRIVER');
            if (driver !== 'postgres') {
              throw new Error(
                `DATABASE_DRIVER must be 'postgres', got '${driver}'`,
              );
            }

            const options: Record<string, unknown> = {
              type: 'postgres',
              url: configService.get<string>('DATABASE_URL'),
              entities: [Film, Schedule],
              synchronize: true,
            };

            const username = configService.get<string>('DATABASE_USERNAME');
            const password = configService.get<string>('DATABASE_PASSWORD');
            if (username) options.username = username;
            if (password) options.password = password;

            return options;
          },
        }),
        TypeOrmModule.forFeature([Film, Schedule]),
      ],
      providers: [
        {
          provide: 'FILMS_REPOSITORY',
          useClass: RepositoryService,
        },
      ],
      exports: ['FILMS_REPOSITORY'],
    };
  }
}
