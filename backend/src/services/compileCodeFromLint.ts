import { IFileLint } from "./linter";
import { levels } from "shared";
import gameVariables from "../game_variables";

function compileCodeFromLint(file: IFileLint): string {
	let code = "#" + file.fileName + "\n";
	code += gameVariables + "\n";
	code += "(0,0) START\n";
	let lineCount = 0;
	do {
		code += `(${lineCount + 10}, 0)`
	} while(lineCount < file.linesOfCode);
	return levels.examples;
}

export default compileCodeFromLint;