import checkCoordinateStatement from "./checkCoordinateStatement";

export type TypeErr = {message: string, statement: string}
export type Command = {statement: string[], type: StatementType}
export type ChildCheck = [TypeErr | undefined, Command | undefined]

export enum StatementType {
	PLACEMENT,
	DRAW,
	PIPE,
	FLAG,
	SCENERY,
	VARIABLE
}

function typeCheck(statements: string[][]): [TypeErr[], Command[]]  {
	const errs: TypeErr[] = [];
	const commands: Command[] = [];
	for (let i = 0; i < statements.length; i++) {
		const statement = statements[i];

		try {
			// determine starting
			const startingCoord = statement[0] === "(";
			const startingVar = statement[0] === "VAR";
			let childCheck: ChildCheck;

			// invalid start
			if (!startingCoord && !startingVar) {
				errs.push({
					message: "A statement can only begin with 'VAR' or a coordinate.",
					statement: statement.join(" "),
				});
				continue;
			}

			// starting with coordinate
			if (startingCoord) {
				childCheck = checkCoordinateStatement(statement);
			} else

			// starting with variable
			if (startingVar) {
				childCheck = checkVariableStatement(statement);
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

// check for valid valid
function checkVariableStatement(statement: string[]): ChildCheck {
	return [ undefined, {statement, type: StatementType.VARIABLE}]
}

export default typeCheck;