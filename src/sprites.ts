enum SpritesEnum {
  bird = "./img/bird.png",
  background = "./img/background.png",
  pipetop = "./img/pipetop.png",
  pipebottom = "./img/pipebottom.png",
}

interface Sprites {
  bird: string;
  background: string;
  pipetop: string;
  pipebottom: string;
}

const sprites: Sprites = {
  bird: SpritesEnum.bird,
  background: SpritesEnum.background,
  pipetop: SpritesEnum.pipetop,
  pipebottom: SpritesEnum.pipebottom,
};

const loadImage = (src: string) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve(img);
    };
  });
};

export const loadImages = (images, cb: () => void) => {
  const promiseArr = [];
  for (const key in sprites) {
    promiseArr.push(loadImage(sprites[key]).then((res) => (images[key] = res)));
  }
  Promise.all(promiseArr).then(() => {
    cb();
  });
};
