import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiResponseDto, FilmDto, ScheduleDto } from './dto/films.dto';
import { FilmsRepository } from '../repository/films.repository';
// Объявляем класс сервиса
@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}
  // Метод для получения полного списка фильмов
  async findAll(): Promise<ApiResponseDto<FilmDto>> {
    try {
      const items = await this.filmsRepository.findAll();
      // Возвращаем объект с общим количеством и списком фильмов
      return { total: items.length, items };
    } catch (error) {
      // Обработка ошибок, связанных с получением данных
      throw new Error('Ошибка при получении списка фильмов');
    }
  }
  // Метод для получения расписания сеансов по ID фильма
  async findSchedule(id: string): Promise<ApiResponseDto<ScheduleDto>> {
    const items = await this.filmsRepository.findSchedule(id);
    if (!items || items.length === 0) {
      throw new NotFoundException(
        // Проверка, что расписание есть
        `Расписание для фильма с ID ${id} не найдено`,
      );
    }
    return { total: items.length, items };
  }
}
