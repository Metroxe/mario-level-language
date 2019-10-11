import { IElement, SpriteCommand, Sprite } from "shared";
import {coordValue} from "./placement";

export default (statement: string[], coords: {[key: string]: [number, number]}): IElement[] => {
	const elements: IElement[] = [];
	const x = coordValue(true, statement[1], coords);
	const y = coordValue(false, statement[3], coords);
	const w = Math.abs(parseFloat(statement[6])) + 1;
	let i;
	const end = x + w;

	if (statement[5] === SpriteCommand.CLOUD) {
		elements.push({x, y, sprite: Sprite.CLOUD_BL});
		elements.push({x, y: y + 1, sprite: Sprite.CLOUD_TL});
		for (i = x + 1; i < end; i++) {
			elements.push({x: i, y, sprite: Sprite.CLOUD_BM});
			elements.push({x: i, y: y + 1, sprite: Sprite.CLOUD_TM});
		}
		elements.push({x: i, y, sprite: Sprite.CLOUD_BR});
		elements.push({x: i, y: y + 1, sprite: Sprite.CLOUD_TR});

	} else if (statement[5] === SpriteCommand.BUSH) {
		elements.push({x, y, sprite: Sprite.BUSH_L});
		for (i = x + 1; i < end; i++) {
			elements.push({x: i, y, sprite: Sprite.BUSH_M});
		}
		elements.push({x: i, y, sprite: Sprite.BUSH_R});
	}
	return elements;
}