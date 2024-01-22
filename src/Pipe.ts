export default class Pipe {
  public x: number = 0;
  public y: number = 0;
  public height: number = 50;
  public width: number = 40;
  public speed: number = 3;

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
