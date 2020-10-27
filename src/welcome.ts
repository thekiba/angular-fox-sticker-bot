import {Telegraf, Extra} from "telegraf";
import {TelegrafContext} from "telegraf/typings/context";

const PHOTO = 'AgACAgIAAxkBAANLXrkM7EW26pBPLNz60OuLUWF1fy0AAtSvMRui68lJl5ruNn5YCqFVGrmSLgADAQADAgADeAADQ9wBAAEZBA';

const HOW_IT_WORKS = `🦊 <b>Как бот работает?</b>

Просто начни писать мое имя и текст стикера в любом чате:

  @angular_fox_sticker_bot <b>текст твоего стикера</b>

👇 Или нажми на кнопку ниже, выбери чат и начни писать сообщение`;

const HOW_TO_ADD_IMAGE = `🙌 <b>Хочешь поставить свою картинку?</b>

Просто сделай <a href="https://github.com/thekiba/angular-fox-sticker-bot">pr</a>, или отправь картинку @thekiba.

Картинка для стикера должна быть:
  — в формате <b>PNG</b>;
  — с прозрачным фоном (по желанию);
  — одна из сторон картинки <b>минимум 512px</b>;
  — <b>отправить картинку файлом</b>.
`;

const SEND_STICKER_TO_CHAT_BUTTON = '🦊 Сделать стикер и отправить в чат';
const SEND_STICKER_TO_CHAT_INLINE = 'привет';

const ADD_CUSTOM_IMAGE_BUTTON = '👉 Добавить свою картинку';
const HOW_IT_WORKS_BUTTON = '😹 Как еще раз отправить стикер?';

export function welcomeHandler(bot: Telegraf<TelegrafContext>) {
    bot.action(ADD_CUSTOM_IMAGE_BUTTON, ctx =>
        sendAddCustomImage(bot, ctx));

    bot.action(HOW_IT_WORKS_BUTTON, ctx =>
        sendHowItWorksMessage(bot, ctx));

    return (ctx) => sendHowItWorksMessage(bot, ctx);
}

async function sendHowItWorksMessage(bot: Telegraf<TelegrafContext>, ctx: TelegrafContext) {
    if (ctx.from.id !== ctx.chat.id) {
        return false;
    }

    return bot.telegram.sendPhoto(ctx.from.id, PHOTO, {
        caption: HOW_IT_WORKS, parse_mode: 'HTML', reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: SEND_STICKER_TO_CHAT_BUTTON,
                        switch_inline_query: SEND_STICKER_TO_CHAT_INLINE
                    }
                ],
                [
                    {
                        text: ADD_CUSTOM_IMAGE_BUTTON,
                        callback_data: ADD_CUSTOM_IMAGE_BUTTON
                    }
                ]
            ]
        }
    });
}

async function sendAddCustomImage(bot: Telegraf<TelegrafContext>, ctx: TelegrafContext) {
    if (ctx.from.id !== ctx.chat.id) {
        return false;
    }

    return bot.telegram.sendPhoto(ctx.from.id, PHOTO, {
        caption: HOW_TO_ADD_IMAGE, parse_mode: 'HTML', reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: SEND_STICKER_TO_CHAT_BUTTON,
                        switch_inline_query: SEND_STICKER_TO_CHAT_INLINE
                    }
                ],
                [
                    {
                        text: HOW_IT_WORKS_BUTTON,
                        callback_data: HOW_IT_WORKS_BUTTON
                    }
                ]
            ]
        }
    });
}
