import drawUI from './ui.js';
import grid, { dissipateHeat } from './grid.js';
import { HEIGHT, WIDTH, PIXEL_SIZE, TICK_MS } from './config.js';
import { listenForMouseEvents } from './mouse.js'

const {
	$canvas,
	$reverseEntropyCheckBox,
	$freezeTimeCheckbox
} = drawUI({ $parent: document.body });

const ctx = $canvas.getContext("2d");

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

function loop() {
	if (!$freezeTimeCheckbox.checked) {
		dissipateHeat({ reverseEntropy: $reverseEntropyCheckBox.checked });
	}
  draw();
  setTimeout(loop, TICK_MS);
}

loop();

function heat(x, y) {
  grid[y][x] = Math.min(grid[y][x] + 200, 255);
  drawPixel(x, y, ...temperatureToColor(grid[y][x]));
}

listenForMouseEvents({ $canvas, effect: heat });
