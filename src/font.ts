import { loadFont } from 'jimp';

export enum Font {
  PixelBeige,
  PixelColor,
  PixelGradient,
  PixelWhite,
  DragonWhite
}

const fontMap: Record<Font, string> = {
  [ Font.PixelBeige ]: 'assets/fonts/pixel-beige-96/pixel-beige-96.fnt',
  [ Font.PixelColor ]: 'assets/fonts/pixel-color-96/pixel-color-96.fnt',
  [ Font.PixelGradient ]: 'assets/fonts/pixel-gradient-96/pixel-gradient-96.fnt',
  [ Font.PixelWhite ]: 'assets/fonts/pixel-white-96/pixel-white-96.fnt',
  [ Font.DragonWhite ]: 'assets/fonts/dragon-white-96/font.fnt'
};

export async function loadCustomFont(font: Font) {
  return loadFont(fontMap[ font ]);
}
