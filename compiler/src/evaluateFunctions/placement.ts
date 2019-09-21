import { IElement, Sprite, SpriteCommand } from "shared";

export default (statement: string[]): IElement[] => {
	return [
		{
			x: parseFloat(statement[1]),
			y: parseFloat(statement[3]),
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