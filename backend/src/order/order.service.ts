import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { RepositoryService } from '../repository/repository.service';
import {
  CreateOrderRequestDto,
  OrderResponseDto,
  OrderTicketResponseDto,
} from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly repositoryService: RepositoryService) {}

  async create(dto: CreateOrderRequestDto): Promise<OrderResponseDto> {
    const items: OrderTicketResponseDto[] = [];

    for (const ticket of dto.tickets) {
      const film = await this.repositoryService.getById(ticket.film);
      if (!film) {
        throw new NotFoundException(`Film ${ticket.film} not found`);
      }

      const schedule = film.schedule.find((s) => s.id === ticket.session);
      if (!schedule) {
        throw new NotFoundException(
          `Session ${ticket.session} not found in film ${ticket.film}`,
        );
      }

      const seatKey = `${ticket.row}:${ticket.seat}`;
      if (schedule.taken.includes(seatKey)) {
        throw new ConflictException(
          `Seat ${seatKey} is already taken in session ${ticket.session}`,
        );
      }

      schedule.taken.push(seatKey);

      await this.repositoryService.updateFilmSchedule(
        ticket.film,
        ticket.session,
        schedule.taken,
      );

      items.push({
        film: ticket.film,
        session: ticket.session,
        daytime: ticket.daytime,
        row: ticket.row,
        seat: ticket.seat,
        price: ticket.price,
        id: uuidv4(),
      });
    }

    return { total: items.length, items };
  }
}
