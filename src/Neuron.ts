import { randomClamped } from "./Options";

export default class Neuron {
  value: number = 0;
  weights = [];
  // 生成 nb 个 -1 到 1 的值
  populate = (nb) => {
    this.weights = [];
    for (let i = 0; i < nb; i++) {
      this.weights.push(randomClamped());
    }
  };
}
