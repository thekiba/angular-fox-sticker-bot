import {TelegrafContext} from "telegraf/typings/context";
import {Telegraf} from "telegraf";

export interface ErrorsConfig {
    errorsChannel: string;
}

export function errorsHandler(bot: Telegraf<TelegrafContext>, config: ErrorsConfig) {
    return async (ctx: TelegrafContext, next) => {
        try {
            await next();
        } catch (e) {
            const errorMessage = `${e.message}: \r\n ${e.stack}`;
            console.error(errorMessage);
            await bot.telegram.sendMessage(config.errorsChannel, errorMessage);
        }
    };
}
