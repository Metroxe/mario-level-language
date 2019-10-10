import {IElement} from "shared";

function coordinateFlip(elements: IElement[]): IElement[] {
	let highestPoint: number;

	elements.forEach(({y}) => {
		if (y > highestPoint || highestPoint === undefined) { highestPoint = y; }
	});

	return elements.map(e => {
		return {
			...e,
			y: highestPoint - e.y
		}
	});
}

export default coordinateFlip;