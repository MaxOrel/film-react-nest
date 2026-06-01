import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FilmDocument = HydratedDocument<Film>;

// Схема сеанса
@Schema({ _id: false })
export class Schedule {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  daytime: string;

  @Prop({ required: true })
  hall: number;

  @Prop({ required: true })
  rows: number;

  @Prop({ required: true })
  seats: number;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [String], required: true })
  taken: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

// Схема фильма
@Schema()
export class Film {
  @Prop({ required: true })
  readonly id: string;

  @Prop({ required: true })
  readonly title: string;

  @Prop({ required: true })
  readonly rating: number;

  @Prop({ required: true })
  readonly director: string;

  @Prop({ type: [String], required: true })
  readonly tags: string[];

  @Prop({ required: true })
  readonly about: string;

  @Prop({ required: true })
  readonly description: string;

  @Prop({ required: true })
  readonly image: string;

  @Prop({ required: true })
  readonly cover: string;

  @Prop({ type: [ScheduleSchema], required: true })
  readonly schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
