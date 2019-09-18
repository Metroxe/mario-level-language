import {IElement} from "shared";
import parse from "./parse";
import tokenize from "./tokenize";
import typeCheck, {TypeErr} from "./typeCheck";
import evaluate from "./evaluate";

function compile(input: string): {elements: IElement[], err?: TypeErr[]} {
	const tokens = tokenize(input);
	const statements = parse(tokens);
	console.log("parse", statements);
	const err = typeCheck(statements);
	console.log("typeCheck", err);
	if (err && err.length < 1) {
		return {elements: [], err}
	}
	const elements = evaluate(statements);
	console.log("evaluate", elements);
	return {elements};
}

export default compile;