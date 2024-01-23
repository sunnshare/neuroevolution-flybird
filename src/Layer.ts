import Neuron from "./Neuron";

export default class Layer {
  id: number = 0;
  neurons = [];

  constructor(index: number) {
    this.id = index;
  }

  populate = (nbNeurons, nbInputs) => {
    this.neurons = [];
    for (let i = 0; i < nbNeurons; i++) {
      let n = new Neuron();
      n.populate(nbInputs);
      this.neurons.push(n);
    }
  };
}
