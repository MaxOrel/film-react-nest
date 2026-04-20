import { Schema, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

export const FilmSchema = new Schema({
  id: String,
  rating: Number,
  director: String,
  tags: [String],
  title: String,
  about: String,
  description: String,
  image: String,
  cover: String,
});

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel('Film') private filmModel: Model<any>,
  ) {}

  async findAll() {
    return this.filmModel.find();
  }

  async findScheduleByFilmId(filmId: string) {
    return this.filmModel.findOne({ id: filmId });
  }
}