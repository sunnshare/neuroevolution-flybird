import Generations from "./Generations";
import Genome from "./Genome";
import Network from "./Network";
import { options, setOptions } from "./Options";

export default class Neuroevolution {
  generations: Generations;

  constructor(data) {
    setOptions(data); // 初始化设置option参数
    this.generations = new Generations(); // 初始化generations
  }

  restart = () => {
    this.generations = new Generations();
  };

  nextGeneration = () => {
    let networks = [];

    if (this.generations.generations.length == 0) {
      // If no Generations, create first.
      networks = this.generations.firstGeneration();
    } else {
      // Otherwise, create next one.
      networks = this.generations.nextGeneration();
    }

    // Create Networks from the current Generation.
    let nns = [];
    for (let i in networks) {
      let nn = new Network();
      nn.setSave(networks[i]);
      nns.push(nn);
    }

    if (options.lowHistoric) {
      // Remove old Networks.
      if (this.generations.generations.length >= 2) {
        let genomes =
          this.generations.generations[this.generations.generations.length - 2]
            .genomes;
        for (let i in genomes) {
          delete genomes[i].network;
        }
      }
    }

    if (options.historic != -1) {
      // Remove older generations.
      if (this.generations.generations.length > options.historic + 1) {
        this.generations.generations.splice(
          0,
          this.generations.generations.length - (options.historic + 1)
        );
      }
    }

    return nns;
  };

  networkScore = (network, score) => {
    this.generations.addGenome(new Genome(score, network.getSave()));
  };
}
