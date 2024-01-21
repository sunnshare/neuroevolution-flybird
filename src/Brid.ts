import Pipe from "./Pipe";

export default class Bird {
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;

  public alive: boolean = true;
  public gravity: number = 0;
  public velocity: number = 0;
  public jump: number = 0;

  public flap = (): void => {};
  public update = (): void => {};
  public isDead = (height: number, pipes: Pipe[]): boolean => {
    return;
  };
}
