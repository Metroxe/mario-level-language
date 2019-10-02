import {IElement} from "shared";
import typeCheck from "../typeCheck";
import parse from "../parse";
import placement from "./placement";
import flatten from "lodash/flatten";

export default (statement: string[]): [string, IElement[]] => {
	const newParseStatement = statement.slice(3, statement.length - 1);
	const parsedValues = parse(newParseStatement);
	const [, commands] = typeCheck(parsedValues);
	const elements =  flatten(commands.map(c => (placement(c.statement))));
	const variableName = statement[1];
	return [variableName, elements];
}