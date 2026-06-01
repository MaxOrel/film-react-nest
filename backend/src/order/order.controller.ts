import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderResponseItemDto } from './dto/order.dto';
import { ApiResponseDto } from '../films/dto/films.dto';
// Группировка эндпоинта и документации по тегу 'order'
@ApiTags('order')
// Контроллер для маршрутов
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Создание заказа' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Заказ успешно создан',
    type: ApiResponseDto,
  })
  async create(
    @Body() dto: CreateOrderDto,
  ): Promise<ApiResponseDto<OrderResponseItemDto>> {
    return this.orderService.create(dto);
  }
}
