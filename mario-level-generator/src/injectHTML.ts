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
		},
		{
			x: 3,
			y: 2,
			sprite: SpriteEnum.PIPE_TL
		},
		{
			x: 4,
			y: 2,
			sprite: SpriteEnum.PIPE_TR
		},
		{
			x: 3,
			y: 3,
			sprite: SpriteEnum.PIPE_BL
		},
		{
			x: 4,
			y: 3,
			sprite: SpriteEnum.PIPE_BR
		},
		{
			x: 4,
			y: 0,
			sprite: SpriteEnum.CLOUD_TR
		},
		{
			x: 3,
			y: 0,
			sprite: SpriteEnum.CLOUD_TM
		},
		{
			x: 2,
			y: 0,
			sprite: SpriteEnum.CLOUD_TL
		},
		{
			x: 4,
			y: 1,
			sprite: SpriteEnum.CLOUD_BR
		},
		{
			x: 3,
			y: 1,
			sprite: SpriteEnum.CLOUD_BM
		},
		{
			x: 2,
			y: 1,
			sprite: SpriteEnum.CLOUD_BL
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
				case SpriteEnum.PIPE_TR:
					sprite = SPRITE.PIPE_TR;
					break;
				case SpriteEnum.PIPE_TL:
					sprite = SPRITE.PIPE_TL;
					break;
				case SpriteEnum.PIPE_BR:
					sprite = SPRITE.PIPE_BR;
					break;
				case SpriteEnum.PIPE_BL:
					sprite = SPRITE.PIPE_BL;
					break;
				case SpriteEnum.CLOUD_TR:
					sprite = SPRITE.CLOUD_TR;
					break;
				case SpriteEnum.CLOUD_TM:
					sprite = SPRITE.CLOUD_TM;
					break;
				case SpriteEnum.CLOUD_TL:
					sprite = SPRITE.CLOUD_TL;
					break;
				case SpriteEnum.CLOUD_BR:
					sprite = SPRITE.CLOUD_BR;
					break;
				case SpriteEnum.CLOUD_BM:
					sprite = SPRITE.CLOUD_BM;
					break;
				case SpriteEnum.CLOUD_BL:
					sprite = SPRITE.CLOUD_BL;
					break;
				default:
					break;
			}
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
