//TODO описать DTO для запросов к /films
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
}

export class FilmsDetailsDto {
  readonly total: number;
  readonly items: FilmDto[];
}
