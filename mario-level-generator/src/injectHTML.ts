import {IElement, Sprite} from "shared";


async function injectHTML(elements: IElement[], SpriteEnum: typeof Sprite, spriteSheet, max: {x: number, y: number}) {
	// Global constants here
	const DIMENSION_RATIO = 16;

	// ADD IMAGES HERE
	let blockSprite = new Image();
	let promise = [blockSprite.onload];
	Promise.all(promise).then(() => {
		draw();
	});
	blockSprite.src = spriteSheet;
	const SPRITE = {
		GROUND: {
			sx: 0 * DIMENSION_RATIO,
			sy: 0 * DIMENSION_RATIO
		},
		QUESTION_MARK: {
			sx: 24 * DIMENSION_RATIO,
			sy: 0 * DIMENSION_RATIO
		},
		BRICK: {
			sx: 1 * DIMENSION_RATIO,
			sy: 0 * DIMENSION_RATIO
		},
		PIPE_TR: {
			sx: 1 * DIMENSION_RATIO,
			sy: 8 * DIMENSION_RATIO
		},
		PIPE_TL: {
			sx: 0 * DIMENSION_RATIO,
			sy: 8 * DIMENSION_RATIO
		},
		PIPE_BR: {
			sx: 1 * DIMENSION_RATIO,
			sy: 9 * DIMENSION_RATIO
		},
		PIPE_BL: {
			sx: 0 * DIMENSION_RATIO,
			sy: 9 * DIMENSION_RATIO
		},
		CLOUD_TR: {
			sx: 2 * DIMENSION_RATIO,
			sy: 20 * DIMENSION_RATIO
		},
		CLOUD_TM: {
			sx: 1 * DIMENSION_RATIO,
			sy: 20 * DIMENSION_RATIO
		},
		CLOUD_TL: {
			sx: 0 * DIMENSION_RATIO,
			sy: 20 * DIMENSION_RATIO
		},
		CLOUD_BR: {
			sx: 2 * DIMENSION_RATIO,
			sy: 21 * DIMENSION_RATIO
		},
		CLOUD_BM: {
			sx: 1 * DIMENSION_RATIO,
			sy: 21 * DIMENSION_RATIO
		},
		CLOUD_BL: {
			sx: 0 * DIMENSION_RATIO,
			sy: 21 * DIMENSION_RATIO
		},
		BUSH_L: {
			sx: 11 * DIMENSION_RATIO,
			sy: 9 * DIMENSION_RATIO
		},
		BUSH_M: {
			sx: 12 * DIMENSION_RATIO,
			sy: 9 * DIMENSION_RATIO
		},
		BUSH_R: {
			sx: 13 * DIMENSION_RATIO,
			sy: 9 * DIMENSION_RATIO
		},
		DIAMOND_BRICK: {
			sx: 0 * DIMENSION_RATIO,
			sy: 1 * DIMENSION_RATIO
		},
		FLAG_TOP: {
			sx: 16 * DIMENSION_RATIO,
			sy: 8 * DIMENSION_RATIO,
		},
		FLAG_BODY: {
			sx: 16 * DIMENSION_RATIO,
			sy: 9 * DIMENSION_RATIO
		}
	};

	// start of real code
	// let max = grabMax(elements);

	// CANVAS
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	canvas.width = max.x;
	canvas.height = max.y;

	document.getElementById('level').appendChild(canvas);

	/**
	 * Draws the images onto canvas
	 */
	function draw() {
		for (let element of elements) {
			let sprite = SPRITE[element.sprite];
			context.drawImage(blockSprite, sprite.sx, sprite.sy, DIMENSION_RATIO, DIMENSION_RATIO, element.x * DIMENSION_RATIO, element.y * DIMENSION_RATIO, DIMENSION_RATIO, DIMENSION_RATIO);
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

		return {x: (maxX + 1) * DIMENSION_RATIO, y: (maxY + 1) * DIMENSION_RATIO};
	}
}



export default injectHTML;
