import { Module } from '@nestjs/common';
import { BotModule } from './modules/bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotName } from './app.constants';
import { Bot } from './modules/bot/models/bot.models';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BotName,
      useFactory: () => ({
        token: '7083283383:AAHOmpBTvQLXmSaoDli5yoD4aFAk_-oLi4c',
        middlewares: [],
        include: [BotModule, Bot],
      }),
    }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Bot],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    BotModule,
  ],
})
export class AppModule {}
