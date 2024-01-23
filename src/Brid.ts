import Pipe from "./Pipe";

export default class Bird {
  x: number = 80;
  y: number = 250;
  width: number = 40;
  height: number = 30;

  alive: boolean = true;
  gravity: number = 0;
  velocity: number = 0.3;
  jump: number = -6;

  flap = (): void => {
    this.gravity = this.jump;
  };

  update = (): void => {
    this.gravity += this.velocity;
    this.y += this.gravity;
  };

  isDead = (height: number, pipes: Pipe[]): boolean => {
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
