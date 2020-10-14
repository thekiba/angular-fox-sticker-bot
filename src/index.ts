import assert = require("assert");
import {Telegraf} from 'telegraf';

import {stickerHandler} from './sticker';
import {errorsHandler} from "./errors";
import {loggerHandler} from "./logger";
import {welcomeHandler} from "./welcome";
import {startPolling} from "./polling";
import {startWebhook} from "./webhook";

const WEBHOOK_IS_ENABLED_STATUS = 'true';
const WEBHOOK_IS_DISABLED_STATUS = 'false';

assert(process.env.TELEGRAM_API_TOKEN, 'Please add TELEGRAM_API_TOKEN to .env');
assert(process.env.TELEGRAM_STICKERS_CHANNEL, 'Please add TELEGRAM_STICKERS_CHANNEL to .env');
assert(process.env.TELEGRAM_LOGGER_CHANNEL, 'Please add TELEGRAM_LOGGER_CHANNEL to .env');
assert(process.env.TELEGRAM_ERRORS_CHANNEL, 'Please add TELEGRAM_ERRORS_CHANNEL to .env');
assert(process.env.TELEGRAM_WEBHOOK_ENABLED, 'Please add TELEGRAM_WEBHOOK_ENABLED to .env');
assert([WEBHOOK_IS_ENABLED_STATUS, WEBHOOK_IS_DISABLED_STATUS].includes(process.env.TELEGRAM_WEBHOOK_ENABLED),
    `TELEGRAM_WEBHOOK_ENABLED should be true or false instead of ${process.env.TELEGRAM_WEBHOOK_ENABLED}`)

if (process.env.TELEGRAM_WEBHOOK_ENABLED === WEBHOOK_IS_ENABLED_STATUS) {
    assert(process.env.TELEGRAM_WEBHOOK_PATH, 'Please add TELEGRAM_WEBHOOK_PATH to .env');
    assert(process.env.TELEGRAM_WEBHOOK_PORT, 'Please add TELEGRAM_WEBHOOK_PORT to .env');
    assert(process.env.TELEGRAM_WEBHOOK_HOST, 'Please add TELEGRAM_WEBHOOK_HOST to .env');
    assert(process.env.TELEGRAM_WEBHOOK_KEY, 'Please add TELEGRAM_WEBHOOK_KEY to .env');
    assert(process.env.TELEGRAM_WEBHOOK_PEM, 'Please add TELEGRAM_WEBHOOK_PEM to .env');
}


const token = process.env.TELEGRAM_API_TOKEN;
const bot = new Telegraf(token);

bot.use(errorsHandler(bot, { errorsChannel: process.env.TELEGRAM_ERRORS_CHANNEL }));
bot.use(loggerHandler(bot, { loggerChannel: process.env.TELEGRAM_LOGGER_CHANNEL }));

bot.on('message', welcomeHandler(bot));
bot.on('inline_query', stickerHandler(bot, { stickerChannel: process.env.TELEGRAM_STICKERS_CHANNEL }));

if (process.env.TELEGRAM_WEBHOOK_ENABLED === WEBHOOK_IS_ENABLED_STATUS) {
    startWebhook(bot, {
        host: process.env.TELEGRAM_WEBHOOK_HOST,
        port: Number(process.env.TELEGRAM_WEBHOOK_PORT),
        path: process.env.TELEGRAM_WEBHOOK_PATH,
        cert: process.env.TELEGRAM_WEBHOOK_PEM,
        key: process.env.TELEGRAM_WEBHOOK_KEY,
    });
}

if (process.env.TELEGRAM_WEBHOOK_ENABLED === WEBHOOK_IS_DISABLED_STATUS) {
    startPolling(bot);
}
