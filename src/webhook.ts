import {Telegraf} from "telegraf";
import {TelegrafContext} from "telegraf/typings/context";
import {readFileSync} from "fs";

export interface WebhookConfig {
    path: string;
    port: number;
    key: string;
    cert: string;
    host: string;
}

export function startWebhook(bot: Telegraf<TelegrafContext>, config: WebhookConfig) {
    const protocol = 'https';
    const host = config.host;
    const port = config.port;
    const path = config.path;
    const tlsOptions = {
        key: readFileSync(config.key),
        cert: readFileSync(config.cert),
    };

    bot.startWebhook('/' + path, tlsOptions, port, '0.0.0.0');

    const webHookUrl = `${protocol}://${host}:${port}/${path}`;
    const webHookCert = {
        source: tlsOptions.cert
    };

    bot.telegram.setWebhook(webHookUrl, webHookCert, 100, ['inline_query', 'message', 'callback_query']);
    console.log(`Web Hook exposed on ${protocol}://${host}:${port}/${path}`);
    bot.telegram.getWebhookInfo().then(console.log);
}
