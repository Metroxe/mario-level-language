import { IElement, SpriteCommand } from "shared";
import {determineSprite} from "./placement";

export default (statement: string[]): IElement[] => {
	const elements: IElement[] = [];
	const fromX = parseFloat(statement[1]);
	const fromY = parseFloat(statement[3]);
	const toX = parseFloat(statement[7]);
	const toY = parseFloat(statement[9]);
	const sprite = determineSprite(statement[11] as SpriteCommand);

	for (let x = fromX; x <= toX; x++) {
		for (let y = fromY; y <= toY; y++) {
			elements.push({x, y, sprite})
		}
	}

	return elements;
}