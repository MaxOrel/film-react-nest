//TODO реализовать DTO для /orders
export class CreateOrderDto {
  readonly film: string;
  readonly session: string;
  readonly daytime: string;
  readonly row: number;
  readonly seat: number;
  readonly price: number;
}
