const PIXEL_SIZE = 10;
const HEIGHT = 50;
const WIDTH = 50;
const INITIAL_TEMPERATURE = 15;
const TICK_MS = 400;
const DISSIPATION_RATE = 0.1;

const canvas = document.querySelector(".simulation-box");
canvas.height = HEIGHT * PIXEL_SIZE;
canvas.width = WIDTH * PIXEL_SIZE;

const grid = []
for (let y = 0; y < HEIGHT; y++) {
  grid.push([]);
  for (let x = 0; x < WIDTH; x++) {
    grid[y].push(INITIAL_TEMPERATURE);
  }
}

const ctx = canvas.getContext("2d");

function drawPixel(x, y, r, g, b) {
  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
}

function temperatureToColor(temperature) {
  return [temperature,
          30 + Math.floor((255 - temperature) / 3),
          127 - (temperature / 2)];
}

function draw() {
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      drawPixel(x, y, ...temperatureToColor(grid[y][x]));
    }
  }
}

function randomNeighbor(x, y) {
  const options = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]].filter(([x, y]) => {
    return x >= 0 && y >= 0 && x < WIDTH && y < HEIGHT;
  });
  
  return options[Math.floor(Math.random() * options.length)];
}

const reverseEntropyCheckBox = document.getElementById('reverse-entropy');

function ensureBounds(x) {
  return Math.max(0, Math.min(255, x));
}

function dissipateHeat() {
  let neighborX, neighborY, temporature, neighborTemporature, delta;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      [neighborX, neighborY] = randomNeighbor(x, y);
      temporature = grid[y][x];
      neighborTemporature = grid[neighborY][neighborX];
      delta = (temporature - neighborTemporature) * DISSIPATION_RATE;
      if (reverseEntropyCheckBox.checked) delta *= -1;
      grid[y][x] = ensureBounds(grid[y][x] - delta);
      grid[neighborY][neighborX] = ensureBounds(grid[neighborY][neighborX] + delta);
    }
  }
}

function loop() {
  dissipateHeat();
  draw();
  setTimeout(loop, TICK_MS);
}

loop();

function heat(x, y) {
  grid[y][x] = Math.min(grid[y][x] + 200, 255);
  drawPixel(x, y, ...temperatureToColor(grid[y][x]));
  
}

let previousX = null;
let previousY = null;
let mouseIsDown = false;

function mouseClear() {
  mouseIsDown = false;
  previousX = null;
  previousY = null;
};

canvas.addEventListener('mousedown', (event) => {
  mouseIsDown = true;
  const [x, y] = [Math.floor(event.offsetX / PIXEL_SIZE),
                  Math.floor(event.offsetY / PIXEL_SIZE)];
  heat(x, y);
  [previousX, previousY] = [x,y];
});

canvas.addEventListener('mouseup', mouseClear);
canvas.addEventListener('mouseout', mouseClear);

canvas.addEventListener('mousemove', (event) => {
  if (!mouseIsDown) return;
  
  const [x, y] = [Math.floor(event.offsetX / PIXEL_SIZE),
                  Math.floor(event.offsetY / PIXEL_SIZE)];
  if (previousX === x && previousY === y) return;

  heat(x, y);
  [previousX, previousY] = [x,y];
});
