import { Gen } from "./Game";

export default class Neuroevolution {
  protected population: number;
  protected network: Array<number | number[]>;
  public options: any;

  constructor({ population, network }) {
    this.population = population;
    this.network = network;
  }
  public nextGeneration = () => {
    return;
  };
  public networkScore = (gen: Gen, score: number): void => {};
}
