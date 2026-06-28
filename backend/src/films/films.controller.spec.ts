import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { ApiResponseDto } from './dto/films.dto'; // Проверьте правильный путь
import { FilmDto } from './dto/films.dto';
import { ScheduleDto } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: jest.Mocked<FilmsService>;

  // Моки данных
  const mockFilmsResponse: ApiResponseDto<FilmDto> = {
    total: 2,
    items: [
      {
        id: '1',
        title: 'Film 1',
        rating: 4.5,
        director: 'Director 1',
        tags: ['action', 'adventure'],
        about: 'About film 1',
        description: 'Description of film 1',
        image: 'image1.jpg',
        cover: 'cover1.jpg',
      },
      {
        id: '2',
        title: 'Film 2',
        rating: 4.0,
        director: 'Director 2',
        tags: ['comedy'],
        about: 'About film 2',
        description: 'Description of film 2',
        image: 'image2.jpg',
        cover: 'cover2.jpg',
      },
    ],
  };

  const mockScheduleResponse: ApiResponseDto<ScheduleDto> = {
    total: 2,
    items: [
      {
        id: 'sched1',
        daytime: new Date('2024-07-01T10:00:00'),
        hall: 1,
        rows: 10,
        seats: 15,
        price: 300,
        taken: ['A1', 'A2'],
      },
      {
        id: 'sched2',
        daytime: new Date('2024-07-01T12:00:00'),
        hall: 2,
        rows: 8,
        seats: 12,
        price: 350,
        taken: ['B3', 'B4'],
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            findAll: jest.fn(),
            findSchedule: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<jest.Mocked<FilmsService>>(FilmsService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('findAll', () => {
    it('должен возвращать список фильмов с total и кодом 200', async () => {
      service.findAll.mockResolvedValue(mockFilmsResponse);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual({
        total: mockFilmsResponse.total,
        items: mockFilmsResponse.items,
        code: 200,
      });
    });
  });

  describe('findSchedule', () => {
    it('должен возвращать расписание по id с total, items и кодом 200', async () => {
      const filmId = '123';
      service.findSchedule.mockResolvedValue(mockScheduleResponse);

      const result = await controller.findSchedule(filmId);

      expect(service.findSchedule).toHaveBeenCalledWith(filmId);
      expect(result).toEqual({
        total: mockScheduleResponse.total,
        items: mockScheduleResponse.items,
        code: 200,
      });
    });

    it('должен возвращать пустое расписание с total=0 и кодом 200', async () => {
      const filmId = '999';
      const emptySchedule: ApiResponseDto<ScheduleDto> = { total: 0, items: [] };
      service.findSchedule.mockResolvedValue(emptySchedule);

      const result = await controller.findSchedule(filmId);

      expect(service.findSchedule).toHaveBeenCalledWith(filmId);
      expect(result).toEqual({
        total: 0,
        items: [],
        code: 200,
      });
    });
  });
});