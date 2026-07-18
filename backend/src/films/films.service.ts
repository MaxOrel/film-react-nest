import { Injectable } from '@nestjs/common';
import { FilmListItemDto, ScheduleItemDto } from './dto/films.dto';
import { RepositoryService } from '../repository/repository.service';

@Injectable()
export class FilmsService {
  constructor(private readonly repositoryService: RepositoryService) {}

  async getAll(): Promise<FilmListItemDto[]> {
    return this.repositoryService.getAll();
  }

  async getSchedule(id: string): Promise<ScheduleItemDto[]> {
    return this.repositoryService.getSchedule(id);
  }
}
