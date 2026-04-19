import { Controller, Get } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('api/afisha/films')
export class FilmsController {
  constructor(private readonly filmService: FilmsService) {}

  @Get()
  getFilms() {
    const films = [
      {
        id: '1',
        rating: 8.5,
        director: 'Итан Райт',
        tags: ['Документальный'],
        title: 'Архитекторы общества',
        about: 'Короткое описание',
        description: 'Полное описание',
        image: '/content/afisha/images/bg1s.jpg',
        cover: '/content/afisha/images/bg1c.jpg',
      },
    ];

    return {
      total: films.length,
      items: films,
    };
  }

  @Get(':id/shedule')
  getFilmSchedule() {
    const schedule = [
      {
        id: '1',
        daytime: new Date().toISOString(),
        hall: '2',
        rows: 5,
        seats: 10,
        price: 350,
        taken: ['1:2'],
      },
    ];

    return {
      total: schedule.length,
      items: schedule,
    };
  }
}
