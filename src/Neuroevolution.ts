import Generations from "./Generations";
import Genome from "./Genome";
import Network from "./Network";
import { options } from "./Options";

export default class Neuroevolution {
  protected population: number;
  protected network: Array<number | number[]>;
  protected generations: Generations;

  constructor({ population, network }) {
    this.population = population;
    this.network = network;
    this.generations = new Generations();
  }

  public restart = () => {
    this.generations = new Generations();
  };

  public nextGeneration = () => {
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

  public networkScore = (network, score) => {
    this.generations.addGenome(new Genome(score, network.getSave()));
  };
}
