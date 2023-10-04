// colorthief.d.ts

declare module "colorthief" {
  type Color = [number, number, number];

  class ColorThief {
    getColor(
      sourceImage: HTMLImageElement | HTMLCanvasElement,
      quality?: number
    ): Color;
    getPalette(
      sourceImage: HTMLImageElement | HTMLCanvasElement,
      colorCount?: number,
      quality?: number
    ): Color[];
  }

  export = ColorThief;
}
