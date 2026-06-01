import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../films/schemas/film.schema';
import { FilmDto, ScheduleDto } from '../films/dto/films.dto';

@Injectable()
export class FilmsRepository {
  // Конструктор с внедрением модели Mongoose для документов типа Film
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<FilmDocument>,
  ) {}

  async findAll(): Promise<FilmDto[]> {
    // Выполняем поиск всех фильмов; поля schedule исключены
    const films = await this.filmModel.find({}, { schedule: 0 }).lean().exec();
    // Проходим по списку фильмов и возвращаем массив объектов только с нужными полями
    return films.map(
      ({
        id,
        rating,
        director,
        tags,
        title,
        about,
        description,
        image,
        cover,
      }) => ({
        id,
        rating,
        director,
        tags,
        title,
        about,
        description,
        image,
        cover,
      }),
    );
  }
  // Расписание конкретного фильма по его ID
  async findSchedule(id: string): Promise<ScheduleDto[]> {
    const film = await this.filmModel.findOne({ id }).lean().exec();
    // Ошибка, если такой фильм не найден
    if (!film) {
      throw new NotFoundException(`Film with id ${id} not found`);
    }
    // Расписание
    return (film.schedule || []).map(
      ({ id: sessionId, daytime, hall, rows, seats, price, taken }) => ({
        id: sessionId,
        daytime: new Date(daytime),
        hall,
        rows,
        seats,
        price,
        taken,
      }),
    );
  }
  // Бронирование билета
  async bookTicket(
    filmId: string,
    sessionId: string,
    row: number,
    seat: number,
  ): Promise<boolean> {
    const seatKey = `${row}:${seat}`;

    const result = await this.filmModel
      .findOneAndUpdate(
        {
          id: filmId,
          'schedule.id': sessionId,
          'schedule.taken': { $ne: seatKey },
        },
        {
          $push: { 'schedule.$.taken': seatKey },
        },
        { new: true },
      )
      .exec();
    // Маркер того, что бронирование прошло успешно
    return result !== null;
  }
}
