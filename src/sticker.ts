import {Context, Telegraf} from 'telegraf';
import {Sticker} from 'telegraf/typings/telegram-types';
import {Font} from './font';
import {convertToWebp, loadBaseImageByType, MaskType, printText} from './image';
import {readStorage, updateStorage} from './file-storage';
import {TelegrafContext} from "telegraf/typings/context";
import {resolveUserSettings} from "./users";

export interface StickerConfig {
  stickerChannel: string;
}

export function getStickerName(mask: MaskType, font: Font, text: string): string {
  return `${mask}/${ Font[ font ].toLowerCase() }/${ text.toLowerCase() }.webp`;
}

export async function createSticker(mask: MaskType, font: Font, text: string): Promise<Buffer> {
  const baseImage = await loadBaseImageByType(mask);
  const sticker = await printText(baseImage, font, text);

  return await sticker.getBufferAsync('image/png');
}

export async function sendSticker(
    bot: Telegraf<TelegrafContext>,
    ctx: Context,
    sticker: Buffer,
    config: StickerConfig
): Promise<Sticker> {
  const message = await bot.telegram.sendSticker(
    config.stickerChannel, { source: sticker });

  return message.sticker;
}

export async function getTelegramSticker(
    bot: Telegraf<TelegrafContext>,
    ctx: Context,
    mask: MaskType,
    font: Font,
    text: string,
    config: StickerConfig
): Promise<Sticker> {
  const stickerName = getStickerName(mask, font, text);
  const sticker = readStorage(stickerName);

  if (!sticker) {
    const pngSticker = await createSticker(mask, font, text);
    const webpSticker = await convertToWebp(pngSticker);
    const telegramSticker = await sendSticker(bot, ctx, webpSticker, config);

    if (telegramSticker) {
      updateStorage(stickerName, telegramSticker);
    }
  }

  return readStorage(stickerName);
}

export async function getStickers(
    bot: Telegraf<TelegrafContext>,
    ctx: TelegrafContext,
    mask: MaskType,
    font: Font,
    text: string,
    config: StickerConfig
) {
  return Promise.all([
    getTelegramSticker(bot, ctx, mask, font, text, config)
  ]);
}

export function stickerHandler(bot: Telegraf<TelegrafContext>, config: StickerConfig) {
  return async (ctx) => {
    const text = ctx.inlineQuery.query;

    if (!text || text.length <= 0) {
      return;
    }

    if (!text || text.length > 32) {
      return;
    }

    const userSettings = resolveUserSettings(ctx);
    const stickers = await getStickers(bot, ctx, userSettings.mask, userSettings.font, text, config);
    const result = stickers.map((sticker, i) => ({
      id: i.toString(),
      type: 'sticker',
      title: text,
      sticker_file_id: sticker.file_id
    }));

    return ctx.answerInlineQuery(result, {is_personal: true});
  }
}
