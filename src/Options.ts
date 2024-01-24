export const options = {
  network: [1, [1], 1],
  population: 50,
  elitism: 0.2,
  randomBehaviour: 0.2,
  mutationRate: 0.1,
  mutationRange: 0.5,
  historic: 0,
  lowHistoric: false,
  scoreSort: -1,
  nbChild: 1,
};

export const setOptions = (data) => {
  for (let i in data) {
    if (data[i] != undefined) {
      options[i] = data[i];
    }
  }
};

export const activation = (a) => {
  return 1 / (1 + Math.exp(-a / 1));
};

export const randomClamped = () => {
  return Math.random() * 2 - 1; // -1 -- 1
};
