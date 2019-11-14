import { IFileLint } from "./linter";
import gameVariables from "../game_variables";
import {hardNames} from "../game_variables/hard";
import {easyNames} from "../game_variables/easy";

function compileCodeFromLint(file: IFileLint): string {
	let code = "#" + file.fileName + "\n";
	code += gameVariables + "\n";
	code += "(0,0) START;\n";
	let lineCount = 50;
	let startingRandomHard = Math.floor(Math.random() * 100000000000000);
	let startingRandomEasy = Math.floor(Math.random() * 100000000000000);
	do {
		code += `(${lineCount - 50 + 10}, 0) `;
		let foundError = false;
		for (const err of file.lintingErrors) {
			if (err.lineNumber >= lineCount - 50 && err.lineNumber < lineCount) {
				foundError = true;
				break;
			}
		}
		if (foundError) {
			code += `${hardNames[startingRandomHard % hardNames.length]};\n`;
			startingRandomHard++;
		} else {
			code += `${easyNames[startingRandomEasy % easyNames.length]};\n`;
			startingRandomEasy++;
		}
		lineCount += 50;
	} while(lineCount < file.linesOfCode);
	code += `(${lineCount - 50 + 10}, 0) END;`;
	return code;
}

export default compileCodeFromLint;