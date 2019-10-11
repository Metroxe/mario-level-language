import {ChildCheck, StatementType, TypeErr} from "./typeCheck";
import {validCoord} from "./checkCoordinateStatement";

function checkCoordinateVariableStatement(statement: string[], coordNames: string[][]): ChildCheck {
	const valid = validCoord(statement.slice(2, 7), coordNames[0]);
	if (!valid) {
		return [{
			message: "The coordinate is invalid.",
			statement: statement.join(" "),
		}, undefined];
	}
	const [err, name] = removeMath(statement[1], statement);
	if (err) {
		return [err, undefined]
	}
	coordNames[0].push(name);
	return [undefined, {type: StatementType.VARIABLE_COORD, statement}];
}

export type IMath = [boolean, number]; // [is+?, number]

export function removeMath(s: string, statement: string[] = []): [TypeErr | undefined, string, IMath | undefined] {
	const numberOfPlus = s.split("+").length - 1;
	const numberOfMinus = s.split("-").length - 1;

	if ((numberOfPlus > 0 && numberOfMinus > 0) || numberOfPlus > 1 || numberOfMinus > 1) {
		return [{message: "cannot do more than 1 math operation in a coord", statement: statement.join(" ")}, s, undefined]
	}

	if (numberOfPlus > 0) {
		const _s = s.split("+");
		return [undefined, _s[0], [true, parseFloat(_s[1])]]
	}

	if (numberOfMinus > 0) {
		const _s = s.split("-");
		return [undefined, _s[0], [false, parseFloat(_s[1])]]
	}

	return [undefined, s, undefined];
}

export default checkCoordinateVariableStatement;