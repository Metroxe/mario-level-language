import { IElement, Sprite } from "shared";
import reverseElement from "../reverseElement";
export default (statement: string[]): IElement[] => {
	const elements: IElement[] = [];
	const x = parseFloat(statement[1]);
	const y = parseFloat(statement[3]);
	elements.push({x, y: y + 9, sprite: Sprite.DIAMOND_BRICK});
	let i = 8;
	while (i > 0) {
		elements.push({x, y: y + i, sprite: Sprite.FLAG_BODY});
		i--;
	}
	elements.push({x, y, sprite: Sprite.FLAG_TOP});
	return reverseElement(elements);
}