import {TelegrafContext} from "telegraf/typings/context";
import {Telegraf} from "telegraf";

export interface LoggerConfig {
    loggerChannel: string;
}

export function loggerHandler(bot: Telegraf<TelegrafContext>, config: LoggerConfig) {
    return async (ctx: TelegrafContext, next) => {
        await next();

        if (ctx.inlineQuery) {
            const id = `#${ctx.from.id}`;
            const user = `@${ctx.from.username}`;
            const name = `${ctx.from.first_name} ${ctx.from.last_name}`;
            const query = ctx.inlineQuery.query;
            const chatId = config.loggerChannel;
            await bot.telegram.sendMessage(chatId, `
      ${name}: ${user} ${id}\r\n
      inline query: ${query}
    `);
        }

        if (ctx.callbackQuery) {
            const id = `#${ctx.from.id}`;
            const user = `@${ctx.from.username}`;
            const name = `${ctx.from.first_name} ${ctx.from.last_name}`;
            const query = ctx.callbackQuery.data;
            const chatId = config.loggerChannel;
            await bot.telegram.sendMessage(chatId, `
      ${name}: ${user} ${id}\r\n
      action: ${query}
    `);
        }

        if (ctx.message) {
            const id = `#${ctx.from.id}`;
            const user = `@${ctx.from.username}`;
            const name = `${ctx.from.first_name} ${ctx.from.last_name}`;
            const message = ctx.message.text;
            const chatId = config.loggerChannel;
            await bot.telegram.sendMessage(chatId, `
      ${name}: ${user} ${id}\r\n
      message: ${message}
    `);
        }
    }
}
