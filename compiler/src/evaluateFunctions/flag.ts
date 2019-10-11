import { IElement, Sprite } from "shared";
import reverseElement from "../reverseElement";
import {coordValue} from "./placement";

export default (statement: string[], coords: {[key: string]: [number, number]}): IElement[] => {
	const elements: IElement[] = [];
	const x = coordValue(true, statement[1], coords);
	const y = coordValue(false, statement[3], coords);
	elements.push({x, y: y + 9, sprite: Sprite.DIAMOND_BRICK});
	let i = 8;
	while (i > 0) {
		elements.push({x, y: y + i, sprite: Sprite.FLAG_BODY});
		i--;
	}
	elements.push({x, y, sprite: Sprite.FLAG_TOP});
	return reverseElement(elements);
}