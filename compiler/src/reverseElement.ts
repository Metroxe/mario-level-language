import {IElement} from "shared";

function reverseElement(elements: IElement[]): IElement[] {
	let lowestPoint: number;
	let highestPoint: number;

	elements.forEach(({y}) => {
		if (y < highestPoint || highestPoint === undefined) { highestPoint = y; }
		if (y > lowestPoint || lowestPoint === undefined) { lowestPoint = y; }
	});

	return elements.map(e => {
		return {
			...e,
			y: highestPoint - e.y + lowestPoint
		}
	});
}

export default reverseElement;