import { IElement } from "shared";
import {coordValue} from "./placement";

export default (statement: string[], variables: {[key: string]: IElement[]}, coords: {[key: string]: [number, number]}): IElement[] => {

	const reference: IElement[] = variables[statement[5]];
	const x = coordValue(true, statement[1], coords);
	const y = coordValue(false, statement[3], coords);

	return reference.map(e => ({
		x: e.x + x,
		y: e.y + y,
		sprite: e.sprite,
	}))
}