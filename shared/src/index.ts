import justGround from "./mockLevels/justGround";
import level1_1 from "./mockLevels/level1_1";
import examples from "./mockLevels/examples";

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

export const levels = {
	justGround,
	level1_1,
	examples,
};