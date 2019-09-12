import {IElement} from "shared";
import parse from "./parse";
import tokenize from "./tokenize";
import typeCheck, {TypeErr} from "./typeCheck";
import evaluate from "./evaluate";

function compile(input: string): {elements: IElement[], err?: TypeErr[]} {
	const tokens = tokenize(input);
	const nodes = parse(tokens);
	const err = typeCheck(nodes);
	if (err && err.length < 1) {
		return {elements: [], err}
	}

	const elements = evaluate(nodes);
	return {elements};
}

export default compile;