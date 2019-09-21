import {IElement} from "shared";
import {Command, StatementType} from "./typeCheck";
import flatten from "lodash/flatten";
import placement from "./evaluateFunctions/placement";
import draw from "./evaluateFunctions/draw";
import pipe from "./evaluateFunctions/pipe";
import flag from "./evaluateFunctions/flag";
import scenery from "./evaluateFunctions/scenery";
import variable from "./evaluateFunctions/variable";

function evaluate(commands: Command[]): IElement[] {
	let elementArrays: IElement[][] = [];
	for (const {type, statement} of commands) {
		let elements: IElement[] = [];
		switch (type) {
			case StatementType.PLACEMENT:
				elements = placement(statement);
				break;
			case StatementType.DRAW:
				elements = draw(statement);
				break;
			case StatementType.PIPE:
				elements = pipe(statement);
				break;
			case StatementType.FLAG:
				elements = flag(statement);
				break;
			case StatementType.SCENERY:
				elements = scenery(statement);
				break;
			case StatementType.VARIABLE:
				elements = variable(statement);
				break;
		}
		elementArrays.push(elements);
	}
	return flatten(elementArrays);
}

export default evaluate;