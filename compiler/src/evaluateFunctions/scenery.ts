import { IElement, SpriteCommand, Sprite } from "shared";

export default (statement: string[]): IElement[] => {
	const elements: IElement[] = [];
	const x = parseFloat(statement[1]);
	const y = parseFloat(statement[3]);
	let cloud: boolean = false;
	if (statement[5] === SpriteCommand.CLOUD) {
		cloud = true;
	}
	if (cloud)
	return elements;
}