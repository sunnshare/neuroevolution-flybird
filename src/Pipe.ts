export default class Pipe {
  x: number = 0;
  y: number = 0;
  height: number = 50;
  width: number = 40;
  speed: number = 3;

  constructor({ x, y, height }) {
    this.x = x;
    this.y = y;
    this.height = height;
  }

  update = (): void => {
    this.x -= this.speed;
  };

  isOut = (): boolean => {
    return this.x + this.width < 0;
  };
}
