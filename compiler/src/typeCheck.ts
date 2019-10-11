import checkCoordinateStatement from "./checkCoordinateStatement";
import checkVariableStatement from "./checkVariableStatement";
import checkCoordinateVariableStatement from "./checkCoordVariableStatement";

export type TypeErr = {message: string, statement: string}
export type Command = {statement: string[], type: StatementType}
export type ChildCheck = [TypeErr | undefined, Command | undefined]

export enum StatementType {
	PLACEMENT,
	DRAW,
	PIPE,
	FLAG,
	SCENERY,
	VARIABLE,
	VARIABLE_PLACEMENT,
	VARIABLE_COORD
}

function typeCheck(statements: string[][]): [TypeErr[], Command[]]  {
	const errs: TypeErr[] = [];
	const commands: Command[] = [];
	const variableNames: string[][] = [[]];
	const coordNames: string[][] = [[]];
	for (let i = 0; i < statements.length; i++) {
		const statement = statements[i];

		try {
			// determine starting
			const startingCoord = statement[0] === "(";
			const startingVar = statement[0] === "VAR";
			const startingVarCoord = statement[0] === "COORD";
			let childCheck: ChildCheck;

			// invalid start
			if (!startingCoord && !startingVar && !startingVarCoord) {
				errs.push({
					message: "A statement can only begin with 'VAR', 'COORD' or a coordinate.",
					statement: statement.join(" "),
				});
				continue;
			}

			// starting with coordinate
			if (startingCoord) {
				childCheck = checkCoordinateStatement(statement, variableNames);
			} else

			// starting with variable
			if (startingVar) {
				childCheck = checkVariableStatement(statement, variableNames);
			}

			// stating with coord variable
			if (startingVarCoord) {
				childCheck = checkCoordinateVariableStatement(statement, coordNames)
			}

			const [err, command] = childCheck;
			if (err) {
				errs.push(err);
				continue;
			}

			commands.push(command);
		} catch (err) {
			errs.push({
				message: "There was an unspecified error. Most likely caused from a malformed statement",
				statement: statement.join(" "),
			})
		}
	}

	return [errs, commands];
}

export default typeCheck;