import {IElement} from "shared";
import parse from "./parse";
import tokenize from "./tokenize";
import typeCheck, {TypeErr} from "./typeCheck";
import evaluate from "./evaluate";

function compile(input: string): {elements: IElement[], err?: TypeErr[]} {
	const uppercase = input.toUpperCase();
	const tokens = tokenize(uppercase);
	const statements = parse(tokens);
	const [err, commands] = typeCheck(statements);
	console.log("typeCheck", err, commands);
	const elements = evaluate(commands);
	console.log("evaluate", elements);
	return {elements, err};
}

export default compile;