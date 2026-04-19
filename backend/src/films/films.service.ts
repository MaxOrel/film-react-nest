import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmsService {
  getFilms() {
    return {
      items: [],
      total: 0,
    };
  }
  getFilmSchedule(id: string) {
    return {
      filmId: id,
      schedule: [],
    };
  }
}
