import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';
// Для информации о расписаниях билета  
export class ScheduleDto {
  id: string;
  daytime: Date;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}
// Для информации о фильмах
export class FilmDto {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
}
// Объявление класса
@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  // Получение всех фильмов без расписаний
  async findAll(): Promise<FilmDto[]> {
    const films = await this.filmRepository.find({
      select: ['id', 'rating', 'director', 'tags', 'title', 'about', 'description', 'image', 'cover'],
    });
    return films;
  }

  // Получение расписания конкретного фильма по его ID
  async findSchedule(id: string): Promise<ScheduleDto[] | null> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedules'],
    });
    if (!film || !film.schedules) {
      return null;
    }
    return film.schedules.map((schedule) => ({
      id: schedule.id,
      daytime: new Date(schedule.daytime),
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken,
    }));
  }

  // Бронирование билета
  async bookTicket(
    filmId: string,
    sessionId: string,
    row: number,
    seat: number,
  ): Promise<boolean> {
    const seatKey = `${row}:${seat}`;
    const schedule = await this.scheduleRepository.findOne({
      where: {
        id: sessionId,
        film: { id: filmId },
      },
    });
    if (!schedule) {
      return false;
    }

    if (schedule.taken.includes(seatKey)) {
      return false; // Место уже занято
    }

    // Добавляем место в занятые и сохраняем
    schedule.taken = [...schedule.taken, seatKey];
    await this.scheduleRepository.save(schedule);
    return true;
  }
}