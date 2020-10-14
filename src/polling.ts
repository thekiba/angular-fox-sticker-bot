import {Telegraf} from "telegraf";
import {TelegrafContext} from "telegraf/typings/context";

export function startPolling(bot: Telegraf<TelegrafContext>) {
    bot.startPolling();
}
