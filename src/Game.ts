import { Neuvol, images } from "./index";
import Bird from "./Brid";
import { SpritesEnum } from "./sprites";
import Pipe from "./Pipe";

export interface Gen {
  compute: (inputs: number[]) => number;
}

class Game {
  protected pipes: Pipe[] = [];
  protected birds: Array<Bird> = [];
  protected score: number = 0;

  protected canvas: HTMLCanvasElement = document.querySelector("#flappy");
  protected ctx: CanvasRenderingContext2D = this.canvas.getContext("2d");
  protected width: number = this.canvas.width;
  protected height: number = this.canvas.height;

  protected spawnInterval: number = 90;
  protected interval: number = 0;
  protected gen: Array<Gen> = [];
  protected alives: number = 0;
  protected generation: number = 0;
  protected backgroundSpeed: number = 0.5;
  protected backgroundx: number = 0;
  protected maxScore: number = 0;

  public start = () => {
    this.interval = 0;
    this.score = 0;
    this.pipes = [];
    this.birds = [];

    // this.gen = Neuvol.nextGeneration();
    for (let i in this.gen) {
      let b = new Bird();
      this.birds.push(b);
    }
    this.generation++;
    this.alives = this.birds.length;
  };
  public update = () => {
    this.backgroundx += this.backgroundSpeed;
    let nextHoll = 0;
    if (this.birds.length > 0) {
      for (let i = 0; i < this.pipes.length; i += 2) {
        if (this.pipes[i].x + this.pipes[i].width > this.birds[0].x) {
          nextHoll = this.pipes[i].height / this.height;
          break;
        }
      }
    }

    for (let i in this.birds) {
      if (this.birds[i].alive) {
        let inputs = [this.birds[i].y / this.height, nextHoll];

        let res = this.gen[i].compute(inputs);
        if (res > 0.5) {
          this.birds[i].flap();
        }

        this.birds[i].update();
        if (this.birds[i].isDead(this.height, this.pipes)) {
          this.birds[i].alive = false;
          this.alives--;
          //console.log(this.alives);
          Neuvol.networkScore(this.gen[i], this.score);
          if (this.isItEnd()) {
            this.start();
          }
        }
      }
    }

    for (let i = 0; i < this.pipes.length; i++) {
      this.pipes[i].update();
      if (this.pipes[i].isOut()) {
        this.pipes.splice(i, 1);
        i--;
      }
    }

    if (this.interval == 0) {
      let deltaBord = 50;
      let pipeHoll = 120;
      let hollPosition =
        Math.round(Math.random() * (this.height - deltaBord * 2 - pipeHoll)) +
        deltaBord;
      this.pipes.push(new Pipe({ x: this.width, y: 0, height: hollPosition }));
      this.pipes.push(
        new Pipe({
          x: this.width,
          y: hollPosition + pipeHoll,
          height: this.height,
        })
      );
    }

    this.interval++;
    if (this.interval == this.spawnInterval) {
      this.interval = 0;
    }

    this.score++;
    this.maxScore = this.score > this.maxScore ? this.score : this.maxScore;
  };
  public display = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (
      let i = 0;
      i < Math.ceil(this.width / images[SpritesEnum.background].width) + 1;
      i++
    ) {
      this.ctx.drawImage(
        images[SpritesEnum.background],
        i * images[SpritesEnum.background].width -
          Math.floor(this.backgroundx % images[SpritesEnum.background].width),
        0
      );
    }

    for (let i in this.pipes) {
      if (Number(i) % 2 == 0) {
        this.ctx.drawImage(
          images[SpritesEnum.pipetop],
          this.pipes[i].x,
          this.pipes[i].y +
            this.pipes[i].height -
            images[SpritesEnum.pipetop].height,
          this.pipes[i].width,
          images[SpritesEnum.pipetop].height
        );
      } else {
        this.ctx.drawImage(
          images[SpritesEnum.pipebottom],
          this.pipes[i].x,
          this.pipes[i].y,
          this.pipes[i].width,
          images[SpritesEnum.pipetop].height
        );
      }
    }

    this.ctx.fillStyle = "#FFC600";
    this.ctx.strokeStyle = "#CE9E00";
    for (let i in this.birds) {
      if (this.birds[i].alive) {
        this.ctx.save();
        this.ctx.translate(
          this.birds[i].x + this.birds[i].width / 2,
          this.birds[i].y + this.birds[i].height / 2
        );
        this.ctx.rotate(((Math.PI / 2) * this.birds[i].gravity) / 20);
        this.ctx.drawImage(
          images[SpritesEnum.bird],
          -this.birds[i].width / 2,
          -this.birds[i].height / 2,
          this.birds[i].width,
          this.birds[i].height
        );
        this.ctx.restore();
      }
    }

    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Oswald, sans-serif";
    this.ctx.fillText("Score : " + this.score, 10, 25);
    this.ctx.fillText("Max Score : " + this.maxScore, 10, 50);
    this.ctx.fillText("Generation : " + this.generation, 10, 75);
    this.ctx.fillText(
      "Alive : " + this.alives + " / " + Neuvol.options.population,
      10,
      100
    );

    let self = this;
    requestAnimationFrame(function () {
      self.display();
    });
  };
  public isItEnd = (): boolean => {
    return;
  };
}

export const start = () => {
  const game = new Game();
  game.start();
  game.update();
  game.display();
};
