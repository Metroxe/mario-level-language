// check for valid valid
import typeCheck, {ChildCheck, StatementType} from "./typeCheck";
import parse from "./parse";

function checkVariableStatement(statement: string[], variableNames: string[][]): ChildCheck {
	const newParseStatement = statement.slice(3, statement.length - 1);
	const parsedValues = parse(newParseStatement);
	const [errs, commands] = typeCheck(parsedValues);
	const retCommand = {statement, type: StatementType.VARIABLE};
	if (errs && errs.length > 0) {
		return [errs[0][0], retCommand]
	}
	for (const command of commands) {
		if (![StatementType.PLACEMENT, StatementType.SCENERY, StatementType.DRAW, StatementType.FLAG, StatementType.PIPE].includes(command.type)) {
			return [{
				statement: command.statement.join(" "),
				message: "You cannot declare variables in a variable."
			}, command]
		}
	}
	variableNames[0].push(statement[1]);
	return [undefined, retCommand]
}

export default checkVariableStatement;