export enum SpritesEnum {
  bird = "./img/bird.png",
  background = "./img/background.png",
  pipetop = "./img/pipetop.png",
  pipebottom = "./img/pipebottom.png",
}

export interface Sprites {
  bird: SpritesEnum.bird;
  background: SpritesEnum.background;
  pipetop: SpritesEnum.pipetop;
  pipebottom: SpritesEnum.pipebottom;
}

export const sprites: Sprites = {
  bird: SpritesEnum.bird,
  background: SpritesEnum.background,
  pipetop: SpritesEnum.pipetop,
  pipebottom: SpritesEnum.pipebottom,
};
