import { Update, On, Start, Ctx } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { BotService } from './bot.service';
@Update()
export class BotUpdate {
  private user: any;
  private car: any;
  private step: any;
  private step1: any;
  private step2: any;

  constructor(private readonly botService: BotService) {
    this.user = {};
    this.car = {};
    this.step = 0;
    this.step1 = 0;
    this.step2 = 0;
  }

  @Start()
  async onStart(@Ctx() ctx) {
    this.botService.start(ctx);

    console.log('start bolildi');
    this.step = 0;
    this.step1 = 0;
    this.step2 = 0;
    await ctx.reply(
      'Assalomu alaykum  ' +
        ctx.update.message.from.first_name +
        '\n' +
        "Avtomobil yuvish uchun ro'yxatdan o'tish uchun ekranning pastki qismidagi (Ro'yxatdan o'tish) tugmasini bosing.",
      {
        reply_markup: {
          keyboard: [
            [
              { text: "Ro'yxatdan o'tish" },
              { text: "Biz haqimizda ma'lumotlar" },
            ],
            [
              { text: 'Bizning manzil 📍', text_id: 123 },
              { text: "Biz bilan bog'lanish 📲" },
            ],
          ],
          resize_keyboard: true,
        },
      },
    );
  }
  // console.log("dadad")
  @On('message')
  async onLocation(ctx) {
    if (ctx.update.message.text == 'Bizning manzil 📍') {
      await ctx.sendLocation(35.804819, 51.43407, {
        live_period: 86400,
      });
    }
    if (this.step == 0) {
      if (ctx.update.message.text == "Biz bilan bog'lanish 📲") {
        this.user.id = ctx.update.message.from.id;
        this.step = ++this.step;
        await ctx.reply('Ismingizni kiritining', {
          reply_markup: {
            keyboard: [[{ text: 'Ortga qaytish' }]],
            resize_keyboard: true,
          },
        });
      }
    } else if (this.step == 1 && this.user.id == ctx.update.message.from.id) {
      // Foydalanuvchi ismini saqlash
      this.user.name = ctx.update.message.text;

      this.step = ++this.step; // boshqaga o'tish
      await ctx.reply(`Yoshingizdi kiritining`, {
        reply_markup: {
          keyboard: [[{ text: 'Ortga qaytish' }]],
          resize_keyboard: true,
        },
      });
    } else if (this.step == 2 && this.user.id == ctx.update.message.from.id) {
      // Foydalanuvchi age saqlash
      this.user.age = ctx.update.message.text;
      this.step = ++this.step; // boshqaga o'tish
      await ctx.reply(`Moshina nomi`, {
        reply_markup: {
          keyboard: [[{ text: 'Ortga qaytish' }]],
          resize_keyboard: true,
        },
      });
    } else if (this.step == 3 && this.user.id == ctx.update.message.from.id) {
      // Foydalanuvchi ismini saqlash
      this.user.car_name = ctx.update.message.text;

      await ctx.reply(
        `user_id:${this.user.id}  
      Name:${this.user.name},
      Age:${this.user.age},
      Mashena:${this.user.car_name} `,
      );
    }
    if (ctx.update.message.text == "Biz haqimizda ma'lumotlar") {
      await ctx.reply(
        'Avtomobillarga xizmat ko’rsatish har doim daromadli xizmat ko’rsatish sohalaridan biri bo’lib kelmoqda. Ayniqsa har bir avtomobil egasi o’z mashinasiga o’zi xizmat ko’rsatsa bu ajoyib imkoniyatdan boshqa narsa emas.',
      );
    }
    if (ctx.update.message.text == "Ro'yxatdan o'tish") {
      await ctx.reply('Mashinagizdi turini aytining', {
        reply_markup: {
          keyboard: [[{ text: 'Yengil mashina' }, { text: 'Yuk mashinasi' }]],
          resize_keyboard: true,
        },
      });
    }
    if (this.step1 == 0) {
      if (ctx.update.message.text == 'Yengil mashina') {
        console.log(ctx, 'Yengil mashina');

        this.car.id = ctx.update.message.from.id;

        this.step1 = ++this.step1;
        await ctx.reply('Mashina nomi', {
          reply_markup: {
            keyboard: [[{ text: 'Ortga qaytish' }]],
            resize_keyboard: true,
          },
        });
      }
    }
    // ****************************************
    else if (this.step1 == 1 && this.car.id == ctx.update.message.from.id) {
      this.car.name2 = ctx.update.message.text;
      this.step1 = ++this.step1;
      await ctx.reply(`ikkinchi bosa uniyam moshinani kiriting`, {
        reply_markup: {
          keyboard: [[{ text: 'Ortga qaytish' }]],
          resize_keyboard: true,
        },
      });
    } else if (this.step1 == 2 && this.car.id == ctx.update.message.from.id) {
      this.car.name = ctx.update.message.text;
      this.step1 = ++this.step1;
      await ctx.reply(`Qanday yuvish kerek`, {
        reply_markup: {
          keyboard: [[{ text: 'Ortga qaytish' }]],
          resize_keyboard: true,
        },
      });
    } else if (this.car.id == ctx.update.message.from.id) {
      console.log(ctx.update.message.text);
      this.car.yuvish = ctx.update.message.text;
      this.step1 = ++this.step1;

      const data = {
        id: this.car.id,
        name: this.car.name,
        name2: this.car.name2,
        yuvish: this.car.yuvish,
      };
      console.log('data', data);
      this.botService.startCard(data);

      await ctx.reply(
        `id:${this.car.id}  
      :${this.car.name},
      :${this.car.name2},
      :${this.car.yuvish},
     `,
      );
    }
    // ************* yuk mashinasi uchun hisoblanadi;
    if (this.step2 == 0) {
      if (ctx.update.message.text == 'Yuk mashinasi') {
        console.log(ctx, 'Yuk mashinasi');

        this.car.id = ctx.update.message.from.id;
        this.step2 = ++this.step2;
        await ctx.reply('Mashina nomi', {
          reply_markup: {
            keyboard: [[{ text: 'Ortga qaytish' }]],
            resize_keyboard: true,
          },
        });
      }
    } else if (this.step2 == 1 && this.car.id == ctx.update.message.from.id) {
      this.car.name = ctx.update.message.text;
      this.step2 = ++this.step2;
      await ctx.reply(`Qanday yuvish kerek`, {
        reply_markup: {
          keyboard: [[{ text: 'Ortga qaytish' }]],
          resize_keyboard: true,
        },
      });
    } else if (this.car.id == ctx.update.message.from.id) {
      console.log(ctx.update.message.text);
      this.car.yuvish = ctx.update.message.text;
      this.step2 = ++this.step2;
      await ctx.reply(
        `id:${this.car.id}  
      :${this.car.name},
      :${this.car.yuvish},
     `,
      );
    }
  }
}
