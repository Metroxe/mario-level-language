import {IElement} from "shared";
import parse from "./parse";
import tokenize from "./tokenize";
import typeCheck, {TypeErr} from "./typeCheck";
import evaluate from "./evaluate";
import coordinateFlip from "./coordinateFlip";

function compile(input: string): {elements: IElement[], err?: TypeErr[]} {
	const uppercase = input.toUpperCase();
	const tokens = tokenize(uppercase);
	const statements = parse(tokens);
	const [err, commands] = typeCheck(statements);
	let elements = evaluate(commands);
	elements = coordinateFlip(elements);
	console.log(elements);
	return {elements, err};
}

export default compile;