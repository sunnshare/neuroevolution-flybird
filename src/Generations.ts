import Generation from "./Generation";
import Network from "./Network";
import { options } from "./Options";

export default class Generations {
  generations = [];
  currentGeneration: Generation;

  constructor() {
    this.currentGeneration = new Generation(); // 初始化Generation
  }

  firstGeneration = () => {
    // FIXME input, hiddens, output unused.

    let out = [];
    for (let i = 0; i < options.population; i++) {
      // Generate the Network and save it.
      let nn = new Network();
      nn.perceptronGeneration(
        options.network[0],
        options.network[1],
        options.network[2]
      );
      out.push(nn.getSave());
    }
    this.generations.push(new Generation());
    console.log("out", out);
    return out;
  };

  nextGeneration = () => {
    if (this.generations.length == 0) {
      // Need to create first generation.
      return false;
    }

    let gen =
      this.generations[this.generations.length - 1].generateNextGeneration();
    this.generations.push(new Generation());
    return gen;
  };

  addGenome = (genome) => {
    // Can't add to a Generation if there are no Generations.
    if (this.generations.length == 0) return false;

    // FIXME addGenome returns void.
    return this.generations[this.generations.length - 1].addGenome(genome);
  };
}
