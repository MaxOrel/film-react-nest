import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll() {
    const result = await this.filmsService.findAll(); // получаем результат
    return {
      ...result,
      code: 200, // добавляем свойство `code`
    };
  }

  @Get(':id/schedule')
  async findSchedule(@Param('id') id: string) {
    const schedule = await this.filmsService.findSchedule(id);
    return {
      ...schedule,
      code: 200, // если захотите, тоже можно добавить сюда
    };
  }
}
