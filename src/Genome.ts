export default class Genome {
  public score: number = 0;
  public network: null;
  constructor(score, network) {
    this.score = score;
    this.network = network;
  }
}
