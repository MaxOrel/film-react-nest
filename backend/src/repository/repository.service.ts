import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';
import {
  FilmDto,
  FilmListItemDto,
  ScheduleItemDto,
} from '../films/dto/films.dto';
import { FilmsRepository } from './films-repository.interface';

@Injectable()
export class RepositoryService implements FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async getAll(): Promise<FilmListItemDto[]> {
    const films = await this.filmRepository.find();
    return films.map((film) => this.toFilmListItem(film));
  }

  async getById(id: string): Promise<FilmDto | null> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
    if (!film) return null;
    return this.toFilmDto(film);
  }

  async getSchedule(filmId: string): Promise<ScheduleItemDto[] | null> {
    const film = await this.filmRepository.findOne({
      where: { id: filmId },
      select: ['id'],
      order: { rating: 'ASC' },
    });
    if (!film) return null;

    const schedules = await this.scheduleRepository.find({
      where: { film: { id: filmId } },
      order: { daytime: 'ASC' },
    });

    return schedules.map((s) => ({
      id: s.id,
      daytime: s.daytime,
      hall: s.hall,
      rows: s.rows,
      seats: s.seats,
      price: s.price,
      taken: s.taken,
    }));
  }

  async updateFilmSchedule(
    filmId: string,
    scheduleId: string,
    taken: string[],
  ): Promise<void> {
    await this.scheduleRepository.update(
      { id: scheduleId, film: { id: filmId } },
      { taken },
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
