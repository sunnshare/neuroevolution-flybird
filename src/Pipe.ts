export default class Pipe {
  public x: number = 0;
  public y: number = 0;
  public height: number = 0;
  public width: number = 0;
  constructor({ x, y, height }) {
    this.x = x;
    this.y = y;
    this.height = height;
  }
  update = (): void => {};
  isOut = (): boolean => {
    return;
  };
}
