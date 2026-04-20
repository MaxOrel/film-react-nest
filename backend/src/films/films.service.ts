import { Injectable } from '@nestjs/common';
import { FilmsRepository } from 'src/repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly repo: FilmsRepository) {}

  async getFilms() {
    const films = await this.repo.findAll();

    return {
      total: films.length,
      items: films,
    };
  }

  async getFilmSchedule(id: string) {
    const film = await this.repo.findScheduleByFilmId(id);

    return {
      total: film?.calendar?.length || 0,
      items: film?.calendar || [],
    };
  }
}
