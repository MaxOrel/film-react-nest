import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmListResponseDto, ScheduleListResponseDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAll(): Promise<FilmListResponseDto> {
    const items = await this.filmsService.getAll();
    return { total: items.length, items };
  }

  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string): Promise<ScheduleListResponseDto> {
    const items = await this.filmsService.getSchedule(id);
    return { total: items.length, items };
  }
}
