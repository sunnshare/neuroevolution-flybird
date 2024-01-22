import { images, start } from "./Game";
import { loadImages } from "./images";
import { sprites } from "./sprites";

window.onload = () => {
  loadImages(
    sprites,
    (img, key) => {
      images[key] = img;
    },
    start
  );
};
