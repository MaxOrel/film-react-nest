import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
// Контроллер для маршрутов
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  findSchedule(@Param('id') id: string) {
    return this.filmsService.findSchedule(id);
  }
}
