import {ChildCheck, StatementType} from "./typeCheck";
import {drawableSprites, scenarySprite, SpriteCommand} from "shared";
import {removeMath} from "./checkCoordVariableStatement";

function checkCoordinateStatement(statement: string[], variableNames: string[][], coordNames: string[][]): ChildCheck {

	const firstCoordValid = validCoord(statement, coordNames[0]);
	let spriteName: SpriteCommand;

	// check first coordinate is valid
	if (!firstCoordValid) {
		return [{
			message: "The coordinate is invalid.",
			statement: statement.join(" "),
		}, undefined];
	}

	// check if a draw statement
	const isDraw = statement[5] === "->";

	// check second coordinate for draw statement
	if (isDraw) {
		const secondCoordValid = validCoord(statement.slice(6,11));
		if (!secondCoordValid) {
			return [{
				message: "The second coordinate is invalid for the draw statement.",
				statement: statement.join(" "),
			}, undefined];
		}
	}

	// get sprite name
	if (isDraw) {
		spriteName = statement[11] as SpriteCommand;
	} else {
		spriteName = statement[5] as SpriteCommand;
	}

	// check for invalid sprite command
	if (!(spriteName in SpriteCommand) && !variableNames[0].includes(spriteName)) {
		return [{
			message: `The sprite '${spriteName}' is not a valid sprite.`,
			statement: statement.join(" "),
		}, undefined];
	}

	// check that sprite is drawable if isDraw === true
	if (isDraw) {
		if (![...drawableSprites, ...variableNames[0]].includes(spriteName)) {
			return [{
				message: `The sprite ${spriteName} is not drawable. Only ${drawableSprites.toString()} are drawable.`,
				statement: statement.join(" "),
			}, undefined];
		}
	}

	// check for flag
	let isFlag = false;
	if (spriteName === SpriteCommand.FLAG) {
		isFlag = true;
	}

	// isPipe
	let isPipe = false;
	if (spriteName === SpriteCommand.PIPE) {
		isPipe = true;
	}

	// isScenery
	let isScenery = false;
	if (scenarySprite.includes(spriteName)) {
		isScenery = true;
	}

	//isVariable
	let isVariable = false;
	if (variableNames[0].includes(spriteName)) {
		isVariable = true;
	}

	// check for float and end of statement
	if (isPipe || isScenery) {
		if (!isFloat(statement[6])) {
			return [{
				message: `The ${spriteName} command requires a valid float number.`,
				statement: statement.join(" "),
			}, undefined];
		}
	}

	let type: StatementType;

	if (isDraw) {
		type = StatementType.DRAW;
	} else if (isScenery) {
		type = StatementType.SCENERY;
	} else if (isPipe) {
		type = StatementType.PIPE;
	} else if (isFlag) {
		type = StatementType.FLAG;
	} else if (isVariable) {
		type = StatementType.VARIABLE_PLACEMENT;
	} else {
		type = StatementType.PLACEMENT;
	}

	return [ undefined, {statement, type}]
}

export function validCoord(coord: string[], coordNames: string[] = []): boolean {
	// left brace
	if (coord[0] !== "(") return false;

	// first number
	if (!isFloat(coord[1]) && !coordNames.includes(removeMath(coord[1])[1])) return false;

	// comma
	if (coord[2] !== ",") return false;

	// second number
	if (!isFloat(coord[3]) && !coordNames.includes(removeMath(coord[3])[1])) return false;

	// right brace
	if (coord[4] !== ")") return false;

	return true;
}

export function isFloat(value: string): boolean {
	return /^\-?[0-9]+(e[0-9]+)?(\.[0-9]+)?$/.test(value)
}

export default checkCoordinateStatement;