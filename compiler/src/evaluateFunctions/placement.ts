import { IElement, Sprite, SpriteCommand } from "shared";

export default (statement: string[], coords: {[key: string]: [number, number]} = {}): IElement[] => {
	return [
		{
			x: coordValue(true, statement[1], coords),
			y: coordValue(false, statement[3], coords),
			sprite: determineSprite(statement[5] as SpriteCommand)
		}
	]
}

export function determineSprite(s: SpriteCommand): Sprite {
	switch (s) {
		case(SpriteCommand.GROUND):
			return Sprite.GROUND;
		case(SpriteCommand.QUESTION_MARK):
			return Sprite.QUESTION_MARK;
		case(SpriteCommand.BRICK):
			return Sprite.BRICK;
		case(SpriteCommand.DIAMOND_BRICK):
			return Sprite.DIAMOND_BRICK;
		default:
			return Sprite.INVALID;
	}
}

export function coordValue(isX: boolean, input: string, coords: {[key: string]: [number, number]}): number {
	const coord = coords[input];
	if (!coord) {
		return parseFloat(input);
	} else {
		return isX ? coord[0] : coord[1]
	}
}