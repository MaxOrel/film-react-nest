//TODO описать DTO для запросов к /films

// описывает структуру данных, которые возвращаются наружу
export class FilmDto {
  readonly id: string;
  readonly rating: number;
  readonly director: string;
  readonly tags: string[];
  readonly title: string;
  readonly about: string;
  readonly description: string;
  readonly image: string;
  readonly cover: string;
  readonly schedule: any[];
}

// ответ, который ждет фронт
export class FilmsDetailsDto {
  readonly total: number;
  readonly items: FilmDto[];
}
