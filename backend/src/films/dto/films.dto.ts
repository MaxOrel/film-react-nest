//Ответ API с результатами и общей информацией
export class ApiResponseDto<T> {
  total: number;
  items: T[];
}
// Описание DTO для фильма
export class FilmDto {
  id: string;
  title: string;
  rating: number;
  director: string;
  tags: string[];
  about: string;
  description: string;
  image: string;
  cover: string;
}
// Описание DTO для расписания сеансов кинотеатра
export class ScheduleDto {
  id: string;
  daytime: Date;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}
