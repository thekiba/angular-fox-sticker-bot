import { read, measureText, measureTextHeight } from 'jimp';
import * as Jimp from 'jimp';
import { Font, loadCustomFont } from './font';
import * as sharp from 'sharp';

const maskTypeMap = {
  fox: 'assets/mask-fox.png',
  dragon: 'assets/mask-dragon.png',
  witch: 'assets/mask-witch.png',
  raspberry: 'assets/mask-raspberry.png',
  loli: 'assets/mask-loli.png',
  prince: 'assets/mask-prince.png',
  chii: 'assets/mask-chii-cat.png',
  tesla: 'assets/mask-tesla.png',
  guepard: 'assets/mask-guepard.png',
  cat: 'assets/mask-cat.png',
  nikita: 'assets/mask-nikita.png',
  dog: 'assets/mask-dog.png',
  giraffe: 'assets/mask-giraffe.png',
  tanya: 'assets/mask-tanya.png',
  snail: 'assets/mask-snail.png',
  kisya: 'assets/mask-kisya.png',
  dogStupid: 'assets/mask-dog-stupid.png',
  cheetah: 'assets/mask-cheetah.png',
  miralina: 'assets/mask-miralina.png',
  coffee: 'assets/mask-coffee.png',
  pilaf: 'assets/mask-pilaf.png',
  jerry: 'assets/mask-jerry.png',
} as const;

export type MaskType = keyof typeof maskTypeMap;

export async function loadBaseImageByType(type: MaskType) {
  const path = maskTypeMap[type];
  return loadBaseImage(path);
}

export async function loadBaseImage(path: string) {
  return await read(path);
}

export async function printText(image: Jimp, fontName: Font, text: string): Promise<Jimp> {
  const font = await loadCustomFont(fontName);
  const borderX = 10;
  const borderY = 10;
  const paddingY = 3;
  const imageWidth = image.getWidth();
  const maxWidth = imageWidth - borderX * 2;
  const textHeight = measureTextHeight(font, text, Infinity);

  const splitted = splitText(font, text, maxWidth);
  for (let i = 0; i < splitted.length; i++) {
    text = splitted[i];
    const textWidth = measureText(font, text);

    const offsetX = imageWidth - borderX - textWidth;
    const offsetY = paddingY + i * (textHeight + borderY);

    image.print(font, offsetX, offsetY, text);
  }

  return image;
}

function splitText(font, text: string, maxWidth: number): string[] {
  const output = [];

  const words = text.split(' ');
  let compText = [];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const textWidth = measureText(font, [...compText, word].join(' '));

    if (textWidth <= maxWidth) {
      compText.push(word);
      continue;
    }

    if (textWidth > maxWidth) {
      if (compText.length === 0) {
        output.push(word);
        continue;
      } else {
        output.push(compText.join(' '));
        compText = [word];
        continue;
      }
    }

    compText.push(word);
  }

  if (compText.length > 0) {
    output.push(compText.join(' '));
  }

  return output;
}

export async function convertToWebp(image: Buffer): Promise<Buffer> {
  return sharp(image)
    .toFormat('webp')
    .toBuffer();
}
