import level1_1 from "./mockLevels/level1_1";
import examples from "./mockLevels/examples";

export enum Sprite {
	INVALID = "INVALID",
	GROUND = "GROUND",
	QUESTION_MARK = "QUESTION_MARK",
	BRICK = "BRICK",
	PIPE_TR = "PIPE_TR",
	PIPE_TL = "PIPE_TL",
	PIPE_BR = "PIPE_BR",
	PIPE_BL = "PIPE_BL",
	CLOUD_TR = "CLOUD_TR",
	CLOUD_TM = "CLOUD_TM",
	CLOUD_TL = "CLOUD_TL",
	CLOUD_BR = "CLOUD_BR",
	CLOUD_BM = "CLOUD_BM",
	CLOUD_BL = "CLOUD_BL",
	BUSH_L = "BUSH_L",
	BUSH_M = "BUSH_M",
	BUSH_R = "BUSH_R",
	DIAMOND_BRICK = "DIAMOND_BRICK",
	FLAG_BODY = "FLAG_BODY",
	FLAG_TOP = "FLAG_TOP"
}

export enum SpriteCommand {
	GROUND = "GROUND",
	QUESTION_MARK = "QUESTION_MARK",
	BRICK = "BRICK",
	DIAMOND_BRICK = "DIAMOND_BRICK",
	PIPE = "PIPE",
	CLOUD = "CLOUD",
	BUSH = "BUSH",
	FLAG = "FLAG",
}

export const drawableSprites: SpriteCommand[] = [
	SpriteCommand.GROUND,
	SpriteCommand.QUESTION_MARK,
	SpriteCommand.BRICK,
	SpriteCommand.DIAMOND_BRICK
];

export const scenarySprite: SpriteCommand[] = [
	SpriteCommand.CLOUD,
	SpriteCommand.BUSH,
];

export interface IElement {
	x: number,
	y: number,
	sprite: Sprite
}

export const levels = {
	level1_1,
	examples,
};