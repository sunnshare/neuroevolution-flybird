import { randomClamped } from "./Options";

export default class Neuron {
  value: number = 0;
  weights = [];

  populate = (nb) => {
    this.weights = [];
    for (let i = 0; i < nb; i++) {
      this.weights.push(randomClamped());
    }
  };
}
