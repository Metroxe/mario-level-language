import {ChildCheck, StatementType} from "./typeCheck";
import {drawableSprites, scenarySprite, SpriteCommand} from "shared";

function checkCoordinateStatement(statement: string[], variableNames: string[][]): ChildCheck {

	const firstCoordValid = validCoord(statement);
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
	if (!(spriteName in SpriteCommand)) {
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

function validCoord(coord: string[]): boolean {
	// left brace
	if (coord[0] !== "(") return false;

	// first number
	if (!isFloat(coord[1])) return false;

	// comma
	if (coord[2] !== ",") return false;

	// second number
	if (!isFloat(coord[3])) return false;

	// right brace
	if (coord[4] !== ")") return false;

	return true;
}

function isFloat(value: string): boolean {
	try {
		parseFloat(value);
		return true;
	} catch {
		return  false;
	}
}

export default checkCoordinateStatement;