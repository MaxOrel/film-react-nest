//TODO реализовать DTO для /orders
export class OrderItemDto {
  readonly film: string;
  readonly session: string;
  readonly daytime: string;
  readonly row: number;
  readonly seat: number;
  readonly price: number;
  readonly id: string;
}

export class CreateOrderDto {
  email: string;
  phone: string;
  tickets: OrderItemDto[];
}
