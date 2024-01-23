import Genome from "./Genome";
import { options, randomClamped } from "./Options";

export default class Generation {
  genomes = [];

  addGenome = (genome: Genome) => {
    let i = 0;
    for (i = 0; i < this.genomes.length; i++) {
      // Sort in descending order.
      if (options.scoreSort < 0) {
        if (genome.score > this.genomes[i].score) {
          break;
        }
        // Sort in ascending order.
      } else {
        if (genome.score < this.genomes[i].score) {
          break;
        }
      }
    }
    // Insert genome into correct position.
    this.genomes.splice(i, 0, genome);
  };

  breed = (g1, g2, nbChilds) => {
    let datas = [];
    for (let nb = 0; nb < nbChilds; nb++) {
      // Deep clone of genome 1.
      let data = JSON.parse(JSON.stringify(g1));
      for (let i in g2.network.weights) {
        // Genetic crossover
        // 0.5 is the crossover factor.
        // FIXME Really should be a predefined constant.
        if (Math.random() <= 0.5) {
          data.network.weights[i] = g2.network.weights[i];
        }
      }

      // Perform mutation on some weights.
      for (let i in data.network.weights) {
        if (Math.random() <= options.mutationRate) {
          data.network.weights[i] +=
            Math.random() * options.mutationRange * 2 - options.mutationRange;
        }
      }
      datas.push(data);
    }

    return datas;
  };

  generateNextGeneration = () => {
    let nexts = [];
    for (let i = 0; i < Math.round(options.elitism * options.population); i++) {
      if (nexts.length < options.population) {
        // Push a deep copy of ith Genome's Nethwork.
        nexts.push(JSON.parse(JSON.stringify(this.genomes[i].network)));
      }
    }

    for (
      let i = 0;
      i < Math.round(options.randomBehaviour * options.population);
      i++
    ) {
      let n = JSON.parse(JSON.stringify(this.genomes[0].network));
      for (let k in n.weights) {
        n.weights[k] = randomClamped();
      }
      if (nexts.length < options.population) {
        nexts.push(n);
      }
    }

    let max = 0;
    while (true) {
      for (let i = 0; i < max; i++) {
        // Create the children and push them to the nexts array.
        let childs = this.breed(
          this.genomes[i],
          this.genomes[max],
          options.nbChild > 0 ? options.nbChild : 1
        );
        for (let c in childs) {
          nexts.push(childs[c].network);
          if (nexts.length >= options.population) {
            // Return once number of children is equal to the
            // population by generatino value.
            return nexts;
          }
        }
      }
      max++;
      if (max >= this.genomes.length - 1) {
        max = 0;
      }
    }
  };
}
