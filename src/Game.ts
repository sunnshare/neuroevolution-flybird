import Bird from "./Brid";
import Pipe from "./Pipe";
import { FPS } from "./speed";
import { options } from "./Options";
import Neuroevolution from "./Neuroevolution";
import { Images } from "./images";

(function () {
  let timeouts = [];
  const messageName = "zero-timeout-message";

  function setZeroTimeout(fn) {
    timeouts.push(fn);
    window.postMessage(messageName, "*");
  }

  function handleMessage(event) {
    if (event.source == window && event.data == messageName) {
      event.stopPropagation();
      if (timeouts.length > 0) {
        const fn = timeouts.shift();
        fn();
      }
    }
  }

  window.addEventListener("message", handleMessage, true);

  window.setZeroTimeout = setZeroTimeout;
})();

export interface Gen {
  compute: (inputs: number[]) => number;
  getSave: () => number;
}

export let images: Images = {};

let Neuvol: Neuroevolution;

class Game {
  protected pipes: Pipe[] = [];
  protected birds: Array<Bird> = [];
  protected score: number = 0;

  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  protected width: number;
  protected height: number;

  protected spawnInterval: number = 90;
  protected interval: number = 0;
  protected gen: Array<Gen> = [];
  protected alives: number = 0;
  protected generation: number = 0;
  protected backgroundSpeed: number = 0.5;
  protected backgroundx: number = 0;
  protected maxScore: number = 0;

  constructor() {
    this.canvas = document.querySelector("#flappy");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  public start = () => {
    this.interval = 0;
    this.score = 0;
    this.pipes = [];
    this.birds = [];

    this.gen = Neuvol.nextGeneration();

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

    let self = this;
    if (FPS == 0) {
      setZeroTimeout(function () {
        self.update();
      });
    } else {
      setTimeout(function () {
        self.update();
      }, 1000 / FPS);
    }
  };

  public isItEnd = () => {
    for (let i in this.birds) {
      if (this.birds[i].alive) {
        return false;
      }
    }
    return true;
  };

  public display = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (
      let i = 0;
      i < Math.ceil(this.width / images["background"].width) + 1;
      i++
    ) {
      this.ctx.drawImage(
        images["background"],
        i * images["background"].width -
          Math.floor(this.backgroundx % images["background"].width),
        0
      );
    }

    for (let i in this.pipes) {
      if (Number(i) % 2 == 0) {
        this.ctx.drawImage(
          images["pipetop"],
          this.pipes[i].x,
          this.pipes[i].y + this.pipes[i].height - images["pipetop"].height,
          this.pipes[i].width,
          images["pipetop"].height
        );
      } else {
        this.ctx.drawImage(
          images["pipebottom"],
          this.pipes[i].x,
          this.pipes[i].y,
          this.pipes[i].width,
          images["pipetop"].height
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
          images["bird"],
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
      "Alive : " + this.alives + " / " + options.population,
      10,
      100
    );

    let self = this;
    requestAnimationFrame(function () {
      self.display();
    });
  };
}

export const start = () => {
  Neuvol = new Neuroevolution({
    population: 50,
    network: [2, [2], 1],
  });
  const game = new Game();
  game.start();
  game.update();
  game.display();
};
