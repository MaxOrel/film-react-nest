import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderResponseItemDto } from './dto/order.dto';
import { ApiResponseDto } from '../films/dto/films.dto';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  // Генерация уникального ID
  private generateUUID(): string {
    // Простая альтернатива: текущие миллисекунды + случайное число
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
  }

  async create(
    dto: CreateOrderDto,
  ): Promise<ApiResponseDto<OrderResponseItemDto>> {
    // Проверка дублирующих билетов
    const seenSeats = new Set<string>();
    for (const ticket of dto.tickets) {
      const key = `${ticket.film}:${ticket.session}:${ticket.row}:${ticket.seat}`;
      if (seenSeats.has(key)) {
        throw new BadRequestException(
          `Дублирующийся билет для места ${ticket.row}:${ticket.seat}`,
        );
      }
      seenSeats.add(key);
    }

    // Обработка бронирования билетов параллельно
    const bookingPromises = dto.tickets.map(async (ticket) => {
      const booked = await this.filmsRepository.bookTicket(
        ticket.film,
        ticket.session,
        ticket.row,
        ticket.seat,
      );

      if (!booked) {
        throw new BadRequestException(
          `Место ${ticket.row}:${ticket.seat} для сессии ${ticket.session} уже занято`,
        );
      }

      return { ...ticket, id: this.generateUUID() };
    });

    // Выполнение всех обещаний и сбор результатов
    const items: OrderResponseItemDto[] = await Promise.all(bookingPromises);

    return { total: items.length, items };
  }
}