import {Telegraf} from "telegraf";
import {TelegrafContext} from "telegraf/typings/context";

const PHOTO = 'AgACAgIAAxkBAANLXrkM7EW26pBPLNz60OuLUWF1fy0AAtSvMRui68lJl5ruNn5YCqFVGrmSLgADAQADAgADeAADQ9wBAAEZBA';

const CAPTION = `🦊 <b>Хочешь сделать себе стикер?</b>

Просто начни писать мое имя и текст стикера в любом чате:

  @angular_fox_sticker_bot <b>текст твоего стикера</b>

👇 Или нажми на кнопку ниже, выбери чат и начни писать сообщение`;

const ACTION = '🦊 Сделать стикер и отправить в чат';

export function welcomeHandler(bot: Telegraf<TelegrafContext>) {
    return async (ctx) => {
        if (ctx.from.id !== ctx.chat.id) {
            return false;
        }

        await bot.telegram.sendPhoto(ctx.from.id, PHOTO, {
            caption: CAPTION, parse_mode: 'HTML', reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: ACTION,
                            switch_inline_query: ''
                        }
                    ]
                ]
            }
        });
    }
}
