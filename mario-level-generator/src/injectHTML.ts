import {IElement, Sprite} from "shared";

import {createGround, testElements} from "./example";

const DIMENSION_RATIO = 10;

function injectHTML(elements: IElement[]): string {
	// for testing
	createGround();
	elements = testElements;
	console.log(elements);

	// start of real code
	let max = grabMax(elements);

	let html = `<div style="width: ${max.x + DIMENSION_RATIO}; height: ${max.y};">`;

	for (let element of elements) {
		html += drawSprite(element);
	}

	html += '</div>';
	return html;
}

function drawSprite(element: IElement) {
	let x = element.x * DIMENSION_RATIO;
	let y = element.y * DIMENSION_RATIO;
	switch (element.sprite) {
		case Sprite.GROUND:
			return `<div class="ground" style="left:${x}px; top:${y - DIMENSION_RATIO}px;"></div>`;
		default:
			return ``;
	}
}

/**
 * Grabs the max x and y pos of the elements
 * @param elements
 */
function grabMax(elements: IElement[]) {
	let maxX = 0;
	let maxY = 0;

	for (let element of elements) {
		if (element.x > maxX) {
			maxX = element.x;
		}
		if (element.y > maxY) {
			maxY = element.y;
		}
	}

	return {x: maxX * DIMENSION_RATIO, y: maxY * DIMENSION_RATIO};
}

export default injectHTML;
