import { Sprites } from "./sprites";

export type Images = Record<string, HTMLImageElement>;

type InitialFn = (img: HTMLImageElement, key: string) => void;

type LoadImages = (
  sources: Sprites,
  callback: InitialFn,
  start: () => void
) => void;

export const loadImages: LoadImages = (sources, callback, start) => {
  let index = 0;
  for (let i in sources) {
    const img = new Image();
    img.src = sources[i];
    img.onload = () => {
      index++;
      callback(img, i);
      if (index === Object.keys(sources).length) start();
    };
  }
};
