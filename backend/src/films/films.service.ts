import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from 'src/repository/films.repository';

// обработка запросов, бизнес логика, взаимодействие с mongoose, но не напрямую
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

  async createFilm(dto: any) {
    return this.repo.create(dto);
  }

  async getFilmSchedule(id: string) {
    const film = await this.repo.findScheduleByFilmId(id);

    if (!film) {
      throw new NotFoundException({
        error: 'film not found',
      });
    }

    const items = (film.schedule || []).map((session) => ({
      id: session.id,
      daytime: session.daytime,
      hall: String(session.hall),
      rows: session.rows,
      seats: session.seats,
      price: session.price,
      taken: session.taken || [],
    }));

    return {
      total: items.length,
      items,
    };
  }
}
