import {
  FilmListItemDto,
  FilmDto,
  ScheduleItemDto,
} from '../films/dto/films.dto';

export interface FilmsRepository {
  getAll(): Promise<FilmListItemDto[]>;
  getById(id: string): Promise<FilmDto | null>;
  getSchedule(filmId: string): Promise<ScheduleItemDto[] | null>;
  updateFilmSchedule(
    filmId: string,
    scheduleId: string,
    taken: string[],
  ): Promise<void>;
}
