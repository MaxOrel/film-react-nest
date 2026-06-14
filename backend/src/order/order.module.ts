import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from 'src/entities/schedule.entity';
import { Film } from 'src/entities/film.entity';
import { FilmsRepository} from '../repository/films.repository'
// Главный класс модуля OrderModule
@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [OrderController],
  providers: [OrderService, FilmsRepository,],
})
export class OrderModule {}