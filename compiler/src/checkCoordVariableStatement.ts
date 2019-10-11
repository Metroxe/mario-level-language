import {ChildCheck, StatementType} from "./typeCheck";
import {validCoord} from "./checkCoordinateStatement";

function checkCoordinateVariableStatement(statement: string[], coordNames: string[][]): ChildCheck {
	const valid = validCoord(statement.slice(2, 7), coordNames[0]);
	if (!valid) {
		return [{
			message: "The coordinate is invalid.",
			statement: statement.join(" "),
		}, undefined];
	}
	coordNames[0].push(statement[1]);
	return [undefined, {type: StatementType.VARIABLE_COORD, statement}];
}

export default checkCoordinateVariableStatement;