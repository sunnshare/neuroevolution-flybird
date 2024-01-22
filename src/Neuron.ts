import { options } from "./Options";

export default class Neuron {
  public value: number = 0;
  public weights = [];

  public populate = (nb) => {
    this.weights = [];
    for (let i = 0; i < nb; i++) {
      this.weights.push(options.randomClamped());
    }
  };
}
