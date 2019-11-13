import {IElement} from "shared";
import typeCheck, {StatementType} from "../typeCheck";
import parse from "../parse";
import placement from "./placement";
import flatten from "lodash/flatten";
import draw from "./draw";
import scenery from "./scenery";
import flag from "./flag";
import pipe from "./pipe";

export default (statement: string[]): [string, IElement[]] => {
	const newParseStatement = statement.slice(3, statement.length - 1);
	const parsedValues = parse(newParseStatement);
	const [, commands] = typeCheck(parsedValues);
	const elements = flatten(commands.map(c => {
			if (c.type === StatementType.PLACEMENT) {
				return placement(c.statement);
			} else if (c.type === StatementType.DRAW) {
				return draw(c.statement);
			} else if (c.type === StatementType.SCENERY) {
				return scenery(c.statement);
			} else if (c.type === StatementType.FLAG) {
				return flag(c.statement);
			} else if (c.type === StatementType.PIPE) {
				return pipe(c.statement);
			} else {
				return [];
			}
		}
	));
	const variableName = statement[1];
	return [variableName, elements];
}