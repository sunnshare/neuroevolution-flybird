class Options {
  network = [1, [1], 1];
  population = 50;
  elitism = 0.2;
  randomBehaviour = 0.2;
  mutationRate = 0.1;
  mutationRange = 0.5;
  historic = 0;
  lowHistoric = false;
  scoreSort = -1;
  nbChild = 1;

  constructor(options?: Options) {
    for (let i in options) {
      if (this[i] != undefined) {
        this[i] = options[i];
      }
    }
  }

  public activation = (a) => {
    return 1 / (1 + Math.exp(-a / 1));
  };

  public randomClamped = () => {
    return Math.random() * 2 - 1;
  };
}

export const options = new Options();
