import { existsSync, readFileSync, writeFileSync } from 'fs';
import { Sticker } from 'telegraf/typings/telegram-types';

export function loadStorage(uniqueName: string): Record<string, Sticker> {
  const hash = Buffer.from(uniqueName, 'utf8').toString('hex');
  const storeFile = `data/${ hash }.json`;
  if (!existsSync(storeFile)) {
    writeFileSync(storeFile, `{}`);
  }

  return JSON.parse(readFileSync(storeFile).toString());
}

export function updateStorage(uniqueName: string, sticker: Sticker): void {
  const hash = Buffer.from(uniqueName, 'utf8').toString('hex');
  const storeFile = `data/${ hash }.json`;

  writeFileSync(storeFile, JSON.stringify({ [ uniqueName ]: sticker }, null, 2));
}

export function readStorage(uniqueName: string): Sticker {
  const store = loadStorage(uniqueName);
  return store[ uniqueName ];
}
