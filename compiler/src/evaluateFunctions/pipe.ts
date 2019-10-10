import { IElement, Sprite } from "shared";
import coordinateFlip from "../coordinateFlip";

export default (statement: string[]): IElement[] => {
	let elements: IElement[] = [];
	const x = parseFloat(statement[1]);
	const y = parseFloat(statement[3]);
	const h = Math.abs(parseFloat(statement[6]));
	const top = y + h;

	// create top pieces
	elements.push({x, y: top, sprite: Sprite.PIPE_TL});
	elements.push({x: x + 1, y: top, sprite: Sprite.PIPE_TR});

	// create bottom pieces
	for (let _y = y; _y < top; _y++) {
		elements.push({x, y: _y, sprite: Sprite.PIPE_BL});
		elements.push({x: x + 1, y: _y, sprite: Sprite.PIPE_BR});
	}

	return elements;
}