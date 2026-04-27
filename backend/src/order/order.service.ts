import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderItemDto } from './dto/order.dto';
import { FilmsRepository } from 'src/repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepo: FilmsRepository) {}

  async createOrder(dto: OrderItemDto[]) {
    if (!Array.isArray(dto) || dto.length === 0) {
      throw new BadRequestException({
        error: 'order is not a list or the order is an empty list',
      });
    }

    for (const item of dto) {
      const film = await this.filmsRepo.findScheduleByFilmId(item.film);

      if (!film) {
        throw new BadRequestException({ error: 'film not found' });
      }

      const session = film.schedule.find(
      (s) => String(s.id) === String(item.session),
      );

      if (!session) {
        throw new BadRequestException({ error: 'session not found' });
      }

      const seatKey = `${item.row}:${item.seat}`;

      if (session.taken.includes(seatKey)) {
        throw new BadRequestException({
          error: 'the seat is already taken',
        });
      }

      session.taken.push(seatKey);

      await film.save();
    }

    return {
      total: dto.length,
      items: dto.map((item) => ({
        ...item,
        id: crypto.randomUUID(),
      })),
    };
  }
}
