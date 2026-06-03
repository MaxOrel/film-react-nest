import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../repository/films.repository';
import { Film, FilmSchema } from './schemas/film.schema'; // путь к схеме

@Module({
  imports: [
    // обязательно подключите схему
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository],
  exports: [FilmsRepository],
})
export class FilmsModule {}
