export enum Sprite {
	GROUND,
	QUESTION_MARK,
	BRICK,
	PIPE,
}

export interface IElement {
	x: number,
	y: number,
	sprite: Sprite
}