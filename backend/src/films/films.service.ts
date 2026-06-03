import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiResponseDto, FilmDto, ScheduleDto } from './dto/films.dto';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  // Получение всего списка фильмов
  async findAll(): Promise<ApiResponseDto<FilmDto>> {
    const items = await this.filmsRepository.findAll();
    return { total: items.length, items };
  }

  // Получение расписания по ID фильма
  async findSchedule(id: string): Promise<ApiResponseDto<ScheduleDto>> {
    const items = await this.filmsRepository.findSchedule(id);
    if (!items || items.length === 0) {
      throw new NotFoundException(
        `Расписание для фильма с ID ${id} не найдено`,
      );
    }
    return { total: items.length, items };
  }
}
