import {IElement, Sprite} from "shared";


async function injectHTML(elements: IElement[], SpriteEnum: typeof Sprite, spriteSheet) {
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
			sy: 0 * DIMENSION_RATIO,
			sw: DIMENSION_RATIO,
			sh: DIMENSION_RATIO,
			image: blockSprite
		},
		QUESTION_MARK: {
			sx: 24 * DIMENSION_RATIO,
			sy: 0 * DIMENSION_RATIO,
			sw: DIMENSION_RATIO,
			sh: DIMENSION_RATIO,
			image: blockSprite
		},
		BRICK: {
			sx: 1 * DIMENSION_RATIO,
			sy: 0 * DIMENSION_RATIO,
			sw: DIMENSION_RATIO,
			sh: DIMENSION_RATIO,
			image: blockSprite
		},
		PIPE: {
			sx: 0 * DIMENSION_RATIO,
			sy: 8 * DIMENSION_RATIO,
			sw: 2 * DIMENSION_RATIO,
			sh: 2 * DIMENSION_RATIO,
			image: blockSprite
		}
	};

	// DELETE AFTER
	let testElements = [
		{
			x: 0,
			y: 4,
			sprite: SpriteEnum.GROUND
		},
		{
			x: 1,
			y: 4,
			sprite: SpriteEnum.GROUND
		},
		{
			x: 2,
			y: 4,
			sprite: SpriteEnum.GROUND
		},
		{
			x: 3,
			y: 4,
			sprite: SpriteEnum.GROUND
		},
		{
			x: 4,
			y: 4,
			sprite: SpriteEnum.GROUND
		},
		{
			x: 2,
			y: 2,
			sprite: SpriteEnum.QUESTION_MARK
		}
	];
	elements = testElements;

	// start of real code
	let max = grabMax(elements);

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
			let sprite;
			switch (element.sprite) {
				case SpriteEnum.GROUND:
					sprite = SPRITE.GROUND;
					break;
				case SpriteEnum.QUESTION_MARK:
					sprite = SPRITE.QUESTION_MARK;
					break;
				default:
					break;
			}
			context.drawImage(sprite.image, sprite.sx, sprite.sy, sprite.sw, sprite.sh, element.x * DIMENSION_RATIO, element.y * DIMENSION_RATIO, DIMENSION_RATIO, DIMENSION_RATIO);

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
