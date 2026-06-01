// DTO для информации о билете
export class TicketDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}
// DTO для создания заказа
export class CreateOrderDto {
  email: string;
  phone: string;
  tickets: TicketDto[];
}
// DTO для ответа с информацией о заказе
export class OrderResponseItemDto extends TicketDto {
  id: string;
}
