import { IElement, SpriteCommand } from "shared";
import {coordValue, determineSprite} from "./placement";

export default (statement: string[], coords: {[key: string]: [number, number]}): IElement[] => {
	const elements: IElement[] = [];
	const fromX = coordValue(true, statement[1], coords);
	const fromY = coordValue(false, statement[3], coords);
	const toX = coordValue(true, statement[7], coords);
	const toY = coordValue(false, statement[9], coords);
	const sprite = determineSprite(statement[11] as SpriteCommand);

	for (let x = fromX; x <= toX; x++) {
		for (let y = fromY; y <= toY; y++) {
			elements.push({x, y, sprite})
		}
	}

	return elements;
}