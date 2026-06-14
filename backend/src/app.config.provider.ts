import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Schedule } from './entities/schedule.entity';
import { Film } from './entities/film.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
// Настройка подключения к базе данных PostgreSQL с использованием асинхронного метода    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([Film, Schedule]),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}