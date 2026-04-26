import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilmDocument = Film & Document;

// описание структуры документа в monogoose определяет поля фильма, их типы
@Schema({ timestamps: true })
export class Film {
  @Prop()
  id: string;

  @Prop()
  rating: number;

  @Prop()
  director: string;

  @Prop({ type: [String] })
  tags: string[];

  @Prop()
  image: string;

  @Prop()
  cover: string;

  @Prop()
  title: string;

  @Prop()
  about: string;

  @Prop()
  description: string;

  @Prop({
    type: [
      {
        id: String,
        daytime: String,
        hall: Number,
        rows: Number,
        seats: Number,
        price: Number,
        taken: [String],
      },
    ],
  })
  schedule: any[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
