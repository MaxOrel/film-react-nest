import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from './schemas/film.schema';
import {
  FilmDto,
  FilmListItemDto,
  ScheduleItemDto,
} from '../films/dto/films.dto';

@Injectable()
export class RepositoryService {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<FilmDocument>,
  ) {}

  async getAll(): Promise<FilmListItemDto[]> {
    const films = await this.filmModel.find().lean();
    return films.map((film) => this.toFilmListItem(film as unknown as Film));
  }

  async getById(id: string): Promise<FilmDto | null> {
    const film = await this.filmModel.findOne({ id }).lean();
    if (!film) return null;
    return this.toFilmDto(film as unknown as Film);
  }

  async getSchedule(filmId: string): Promise<ScheduleItemDto[] | null> {
    const film = await this.getById(filmId);
    if (!film) return null;
    return film.schedule;
  }

  async updateFilmSchedule(
    filmId: string,
    scheduleId: string,
    taken: string[],
  ): Promise<void> {
    await this.filmModel.updateOne(
      { id: filmId, 'schedule.id': scheduleId },
      { $set: { 'schedule.$.taken': taken } },
    );
  }

  private toFilmListItem(film: Film): FilmListItemDto {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      title: film.title,
      about: film.about,
      description: film.description,
      image: film.image,
      cover: film.cover,
    };
  }

  private toFilmDto(film: Film): FilmDto {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
      schedule: film.schedule.map((s) => ({
        id: s.id,
        daytime: s.daytime,
        hall: s.hall,
        rows: s.rows,
        seats: s.seats,
        price: s.price,
        taken: s.taken,
      })),
    };
  }
}
