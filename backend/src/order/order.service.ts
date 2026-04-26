import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderItemDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  private takenSeats: Record<string, string[]> = {};

  createOrder(dto: OrderItemDto[]) {
    if (!Array.isArray(dto) || dto.length === 0) {
      throw new BadRequestException({
        error: 'order is not a list or the order is an empty list',
      });
    }

    this.bookSeats(dto);
    return {
      total: dto.length,
      items: dto.map((item, index) => ({
        ...item,
        id: `order-${index}`,
      })),
    };
  }

  bookSeats(dto: OrderItemDto[]) {
    for (const item of dto) {
      const key = item.film + '_' + item.session;
      const seatKey = `${item.row}:${item.seat}`;

      if (!this.takenSeats[key]) {
        this.takenSeats[key] = [];
      }

      if (this.takenSeats[key].includes(seatKey)) {
        throw new BadRequestException({
          error: 'the seat is already taken',
        });
      }

      this.takenSeats[key].push(seatKey);
    }
  }
}
