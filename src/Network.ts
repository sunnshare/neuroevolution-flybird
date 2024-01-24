import Layer from "./Layer";
import { activation } from "./Options";

export default class Network {
  layers = [];
  // 生成感知器 2,[2],1
  perceptronGeneration = (input, hiddens, output) => {
    let index = 0;
    let previousNeurons = 0; // 前神经元
    let layer = new Layer(index);
    layer.populate(input, previousNeurons);

    previousNeurons = input;
    this.layers.push(layer);
    index++;
    for (let i in hiddens) {
      let layer = new Layer(index);
      layer.populate(hiddens[i], previousNeurons);
      previousNeurons = hiddens[i];
      this.layers.push(layer);
      index++;
    }
    layer = new Layer(index);
    layer.populate(output, previousNeurons);
    this.layers.push(layer);
  };

  getSave = () => {
    let datas = {
      neurons: [],
      weights: [],
    };
    for (let i in this.layers) {
      datas.neurons.push(this.layers[i].neurons.length);
      for (let j in this.layers[i].neurons) {
        for (let k in this.layers[i].neurons[j].weights) {
          // push all input weights of each Neuron of each Layer into a flat
          // array.
          datas.weights.push(this.layers[i].neurons[j].weights[k]);
        }
      }
    }
    console.log("getSave", datas);
    return datas;
  };

  setSave = (save) => {
    let previousNeurons = 0;
    let index = 0;
    let indexWeights = 0;
    this.layers = [];
    for (let i in save.neurons) {
      let layer = new Layer(index);
      layer.populate(save.neurons[i], previousNeurons);
      for (let j in layer.neurons) {
        for (let k in layer.neurons[j].weights) {
          layer.neurons[j].weights[k] = save.weights[indexWeights];

          indexWeights++;
        }
      }
      previousNeurons = save.neurons[i];
      index++;
      this.layers.push(layer);
    }
  };

  compute = (inputs) => {
    // Set the value of each Neuron in the input layer.
    for (let i in inputs) {
      if (this.layers[0] && this.layers[0].neurons[i]) {
        this.layers[0].neurons[i].value = inputs[i];
      }
    }

    let prevLayer = this.layers[0]; // Previous layer is input layer.
    for (let i = 1; i < this.layers.length; i++) {
      for (let j in this.layers[i].neurons) {
        // For each Neuron in each layer.
        let sum = 0;
        for (let k in prevLayer.neurons) {
          // Every Neuron in the previous layer is an input to each Neuron in
          // the next layer.
          sum +=
            prevLayer.neurons[k].value * this.layers[i].neurons[j].weights[k];
        }

        // Compute the activation of the Neuron.
        this.layers[i].neurons[j].value = activation(sum);
      }
      prevLayer = this.layers[i];
    }

    // All outputs of the Network.
    let out = [];
    let lastLayer = this.layers[this.layers.length - 1];
    for (let i in lastLayer.neurons) {
      out.push(lastLayer.neurons[i].value);
    }
    out[0] > 0.5 ? console.log("跳") : console.log(out);
    return out;
  };
}
