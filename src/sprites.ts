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
  // 返回一个promise,图片加载完成后调用resolve
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
    // 循环加载每一个图片，加载后完成后将图片放入images对象中
    promiseArr.push(loadImage(sprites[key]).then((res) => (images[key] = res)));
  }
  Promise.all(promiseArr).then(() => {
    cb(); // 所有图片加载完成调用回调函数
  });
};
