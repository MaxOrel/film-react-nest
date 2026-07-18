import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmListItemDto, ScheduleItemDto } from './dto/films.dto';
import { RepositoryService } from '../repository/repository.service';

@Injectable()
export class FilmsService {
  constructor(private readonly repositoryService: RepositoryService) {}

  async getAll(): Promise<FilmListItemDto[]> {
    return this.repositoryService.getAll();
  }

  async getSchedule(id: string): Promise<ScheduleItemDto[]> {
    const schedule = await this.repositoryService.getSchedule(id);
    if (!schedule) {
      throw new NotFoundException('Film not found');
    }
    return schedule;
  }
}
