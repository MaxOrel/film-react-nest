import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

// работа с бд, делает запросы в mongoose
@Injectable()
export class FilmsRepository {
  constructor(@InjectModel('Film') private filmModel: Model<any>) {}

  async findAll() {
    const films = await this.filmModel.find();
    return films;
  }

  async create(data: any) {
    return this.filmModel.create(data);
  }

  async findScheduleByFilmId(filmId: string) {
    return this.filmModel.findOne({ id: filmId });
  }
}
