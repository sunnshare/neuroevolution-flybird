import Pipe from "./Pipe";

export default class Bird {
  public x: number = 80;
  public y: number = 250;
  public width: number = 40;
  public height: number = 30;

  public alive: boolean = true;
  public gravity: number = 0;
  public velocity: number = 0.3;
  public jump: number = -6;

  public flap = (): void => {
    this.gravity = this.jump;
  };

  public update = (): void => {
    this.gravity += this.velocity;
    this.y += this.gravity;
  };

  public isDead = (height: number, pipes: Pipe[]): boolean => {
    // 往上或者往下就死了
    if (this.y >= height || this.y + this.height <= 0) {
      return true;
    }
    // 鸟撞到管道就死了
    for (let i in pipes) {
      if (
        !(
          this.x > pipes[i].x + pipes[i].width ||
          this.x + this.width < pipes[i].x ||
          this.y > pipes[i].y + pipes[i].height ||
          this.y + this.height < pipes[i].y
        )
      ) {
        return true;
      }
    }
  };
}
