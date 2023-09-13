import { HEIGHT, WIDTH, INITIAL_TEMPERATURE, DISSIPATION_RATE } from './config.js'

const grid = [];
for (let y = 0; y < HEIGHT; y++) {
  grid.push([]);
  for (let x = 0; x < WIDTH; x++) {
    grid[y].push(INITIAL_TEMPERATURE);
  }
}

function randomNeighbor(x, y) {
  const options = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]].filter(([x, y]) => {
    return x >= 0 && y >= 0 && x < WIDTH && y < HEIGHT;
  });
  
  return options[Math.floor(Math.random() * options.length)];
}

function ensureBounds(x) {
  return Math.max(0, Math.min(255, x));
}

export function dissipateHeat({ reverseEntropy }) {
  let neighborX, neighborY, temporature, neighborTemporature, delta;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      [neighborX, neighborY] = randomNeighbor(x, y);
      temporature = grid[y][x];
      neighborTemporature = grid[neighborY][neighborX];
      delta = (temporature - neighborTemporature) * DISSIPATION_RATE;
      if (reverseEntropy) delta *= -1;
      grid[y][x] = ensureBounds(grid[y][x] - delta);
      grid[neighborY][neighborX] = ensureBounds(grid[neighborY][neighborX] + delta);
    }
  }
}

export default grid;
