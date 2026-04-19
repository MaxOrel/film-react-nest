import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  createOrder(dto: CreateOrderDto[]) {
    if (!Array.isArray(dto) || dto.length === 0) {
      throw new BadRequestException({
        error: 'order is not a list or the order is an empty list',
      });
    }

    return {
      total: dto.length,
      items: dto.map((item, index) => ({
        ...item,
        id: `order-${index}`,
      })),
    };
  }

  private takenSeats: Record<string, string[]> = {};
  bookSeats(dto: CreateOrderDto[]) {
    for (const item of dto) {
      const key = item.film + '_' + item.session;
      const seatKey = `${item.row}:${item.seat}`;
      if (!this.takenSeats[key]) {
        this.bookSeats[key] = [];
      }
      if (this.bookSeats[key].includes(seatKey)) {
        throw new BadRequestException({
          error: ' the seat is already taken',
        });
      }
      this.takenSeats[key].push(seatKey);
    }
    return {
      total: dto.length,
      items: dto.map((item, index) => ({
        ...item,
        id: `order-${index}`,
      })),
    };
  }
}
