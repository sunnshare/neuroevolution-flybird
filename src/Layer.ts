import Neuron from "./Neuron";

export default class Layer {
  id: number = 0;
  neurons = [];

  constructor(index: number) {
    this.id = index;
  }
  // / 生成 nbNeurons 个 -1 到 1 的值 放入 neurons
  populate = (nbNeurons, nbInputs) => {
    this.neurons = [];
    for (let i = 0; i < nbNeurons; i++) {
      let n = new Neuron();
      n.populate(nbInputs);
      this.neurons.push(n);
    }
  };
}
