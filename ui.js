import { HEIGHT, WIDTH, PIXEL_SIZE } from './config.js';

function drawLabeledInput({ labelText, type, $parent }) {
	const $label = document.createElement('label');
	$label.textContent = labelText;
	const $input = document.createElement('input');
	$input.type = type;
	$label.append($input);
	$parent.append($label)

	return $input;
}

const drawUI = ({ $parent }) => {
	const $canvas = document.createElement('canvas');
	$canvas.height = HEIGHT * PIXEL_SIZE;
	$canvas.width = WIDTH * PIXEL_SIZE;
	$parent.append($canvas);

	const $controls = document.createElement('p');
	$parent.append($controls);

	const $reverseEntropyCheckBox = drawLabeledInput({
		$parent: $controls,
		labelText: 'reverse entropy',
		type: 'checkbox',
	});

	$controls.append(document.createElement('br'));

	const $freezeTimeCheckbox = drawLabeledInput({
		$parent: $controls,
		labelText: 'freeze time',
		type: 'checkbox',
	});

	return { $canvas, $controls, $reverseEntropyCheckBox, $freezeTimeCheckbox };
};

export default drawUI;
