import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';
import { RepositoryService } from './repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  providers: [
    {
      provide: 'FILMS_REPOSITORY',
      useClass: RepositoryService,
    },
  ],
  exports: ['FILMS_REPOSITORY'],
})
export class RepositoryModule {}
