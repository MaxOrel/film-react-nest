import { Test, TestingModule } from '@nestjs/testing';

import { TicketDto, CreateOrderDto, OrderResponseItemDto } from './dto/order.dto';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: jest.Mocked<Pick<OrderService, 'create'>>;

  beforeEach(async () => {
    const mockService: jest.Mocked<Pick<OrderService, 'create'>> = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: mockService }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<jest.Mocked<OrderService>>(OrderService);
  });

  describe('create', () => {
    it('должен вызвать сервис с правильными данными и вернуть результат', async () => {
      const tickets: TicketDto[] = [
        {
          film: 'filmA',
          session: 'sessA',
          daytime: '2024-07-01T10:00:00',
          row: 1,
          seat: 1,
          price: 10,
        },
        {
          film: 'filmB',
          session: 'sessB',
          daytime: '2024-07-02T12:00:00',
          row: 2,
          seat: 2,
          price: 12,
        },
      ];

      const response: { total: number; items: OrderResponseItemDto[] } = {
        total: 2,
        items: [
          { id: 'uuid1', film: 'filmA', session: 'sessA', daytime: '2024-07-01T10:00:00', row: 1, seat: 1, price: 10 },
          { id: 'uuid2', film: 'filmB', session: 'sessB', daytime: '2024-07-02T12:00:00', row: 2, seat: 2, price: 12 },
        ],
      };

      service.create.mockResolvedValue(response);

      const dto: CreateOrderDto = {
        email: 'test@mail.com',
        phone: '1234567890',
        tickets,
      };

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      // Проверяем, что возвращаем только total и items (без code)
      expect(result).toEqual({
        total: response.total,
        items: response.items,
      });
    });
  });
});