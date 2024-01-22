import { Sprites } from "./sprites";

export type Images = Map<string, HTMLImageElement>;

type InitialFn = (img: HTMLImageElement, key: string) => void;

type LoadImages = (sources: Sprites, callback: InitialFn) => void;

export const loadImages: LoadImages = (sources, callback) => {
  for (let i in sources) {
    const img = new Image();
    img.src = sources[i];
    img.onload = () => {
      callback(img, i);
    };
  }
};
