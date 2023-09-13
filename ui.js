import { HEIGHT, WIDTH, PIXEL_SIZE } from './config.js';

const drawUI = ($parent) => {
	const $canvas = document.createElement('canvas');
	$canvas.height = HEIGHT * PIXEL_SIZE;
	$canvas.width = WIDTH * PIXEL_SIZE;
	$parent.append($canvas);

	const $controls = document.createElement('p');
	$controls.textContent = 'reverse entropy';
	const $reverseEntropyCheckBox = document.createElement('input');
	$reverseEntropyCheckBox.type = 'checkbox';
	$controls.append($reverseEntropyCheckBox);
	$parent.append($controls);

	return { $canvas, $controls, $reverseEntropyCheckBox };
};

export default drawUI;
