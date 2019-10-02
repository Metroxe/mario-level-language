import { IElement } from "shared";

export default (statement: string[], variables: {[key: string]: IElement[]}): IElement[] => {

	const reference: IElement[] = variables[statement[5]];
	const x = parseFloat(statement[1]);
	const y = parseFloat(statement[3]);

	return reference.map(e => ({
		x: e.x + x,
		y: e.y + y,
		sprite: e.sprite,
	}))
}