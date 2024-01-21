import Neuroevolution from "./Neuroevolution";

import { start } from "./Game";
import { Images, loadImages } from "./images";
import { sprites } from "./sprites";

export let images: Images = new Map();

export let Neuvol: Neuroevolution;

window.onload = function () {
  // 初始化神经进化
  Neuvol = new Neuroevolution({
    population: 50,
    network: [2, [2], 1],
  });

  // 初始化加载图片
  loadImages(sprites, (imgs, key) => {
    images.set(key, imgs);
  });
  start(); // 开始游戏
};
