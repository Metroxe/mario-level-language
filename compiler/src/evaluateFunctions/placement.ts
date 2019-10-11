import { IElement, Sprite, SpriteCommand } from "shared";
import {removeMath} from "../checkCoordVariableStatement";
import {isFloat} from "../checkCoordinateStatement";

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
	if (isFloat(input)) {
		return parseFloat(input)
	}

	console.log(removeMath(input));
	const [err, name, math] = removeMath(input);

	const coord = coords[name];

	if (!coord || err) {
		return parseFloat(name);
	}

	const val = isX ? coord[0] : coord[1];

	if (!math) {
		return val;
	}

	if (math[0]) {
		return val + math[1];
	} else {
		return val - math[1];
	}
}