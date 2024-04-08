import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bot } from './models/bot.models';
import { Car } from './models/car';

@Module({
  imports: [SequelizeModule.forFeature([Bot, Car])],
  providers: [BotService, BotUpdate],
})
export class BotModule {}
