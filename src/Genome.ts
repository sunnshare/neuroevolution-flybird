export default class Genome {
  score: number = 0;
  network: null;
  constructor(score, network) {
    this.score = score;
    this.network = network;
  }
}
