import {coordValue} from "./placement";

function variableCoord(statement: string[], coords: {[key: string]: [number, number]}): [string, number, number] {
	const name = statement[1];
	const x = coordValue(true, statement[3], coords);
	const y = coordValue(false, statement[5], coords);

	return [name, x , y];
}

export default variableCoord;