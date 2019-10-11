import {IElement} from "shared";
import parse from "./parse";
import tokenize from "./tokenize";
import typeCheck, {Command, TypeErr} from "./typeCheck";
import evaluate from "./evaluate";
import coordinateFlip from "./coordinateFlip";

function compile(input: string): {elements: IElement[], err?: TypeErr[], history: IElement[][]} {
	const uppercase = input.toUpperCase();
	const tokens = tokenize(uppercase);
	const statements = parse(tokens);
	const [err, commands] = typeCheck(statements);
	const history: IElement[][] = [[]];
	let runningCommands: Command[] = [];
	for (const command of commands) {
		runningCommands.push(command);
		let elements = evaluate(runningCommands);
		elements = coordinateFlip(elements);
		history.push(elements);
	}
	return {elements: history[history.length - 1], err, history};
}

export default compile;