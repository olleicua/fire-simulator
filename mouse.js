import { PIXEL_SIZE } from './config.js'

let previousX = null;
let previousY = null;
let mouseIsDown = false;

function mouseClear() {
  mouseIsDown = false;
  previousX = null;
  previousY = null;
};

function applyEffect({ mouseEvent, effect }) {
	const [x, y] = [
		mouseEvent.offsetX,
		mouseEvent.offsetY
	].map(i => Math.floor(i / PIXEL_SIZE));

	if (previousX === x && previousY === y) return;

	effect(x, y);
	[previousX, previousY] = [x,y];
}

export function listenForMouseEvents({ $canvas, effect }) {
	$canvas.addEventListener('mousedown', (mouseEvent) => {
		mouseIsDown = true;
		applyEffect({ mouseEvent, effect });
	});

	$canvas.addEventListener('mouseup', mouseClear);
	$canvas.addEventListener('mouseout', mouseClear);

	$canvas.addEventListener('mousemove', (mouseEvent) => {
		if (!mouseIsDown) return;
  
		applyEffect({ mouseEvent, effect });
	});
}
