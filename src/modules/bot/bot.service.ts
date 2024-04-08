import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { InjectModel } from '@nestjs/sequelize';
import { BotName } from '../../app.constants';
import { Bot } from './models/bot.models';
import { Car } from './models/car';

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private botRepo: typeof Bot,
    @InjectModel(Car) private carRepo: typeof Car,
    @InjectBot(BotName) private readonly bot: Telegraf<Context>,
  ) {}

  async start(ctx: Context) {
    try {
      const userId = ctx.from.id;
      const user = await this.botRepo.findByPk(userId);
      if (!user) {
        await this.botRepo.create({
          user_id: userId,
          username: ctx.from.username,
          first_name: ctx.from.first_name,
          last_name: ctx.from.last_name,
        });
      }
    } catch (error) {
      console.error('Error in starting bot:', error);
    }
  }

  async startCard(carData: any) {
    try {
      console.log('carData name:', carData.name);
      console.log('carData id', carData.id);
      console.log('carData yuvish', carData.yuvish);
      console.log('carData name2', carData.name2);

      const user = await this.carRepo.findByPk(carData.user_id);

      if (!user) {
        await this.carRepo.create({
          car_id: carData.id,
          car_name: carData.name,
          yuvish: carData.yuvish,
          car_name2: carData.name2,
        });
      }
    } catch (error) {
      console.error('Error in starting bot:', error);
    }
  }
}
