/**
 * Given the directory of a javascript project, run a lint on the entire project and return the
 * a list of files with their specific linting errors/warnings. You can ignore not js files.
 * You will also need to export the directory structure.
 * https://eslint.org/docs/developer-guide/nodejs-api
 */
import fs from 'fs-extra'; // might need to read files
import {readFiles} from "./repoFunctions"; // use this of make one yourself *NOT TESTED*


interface ILinterInput {
	directory: string
}

export interface ILinterOutput {
	files: Array<{
		fileName: string,
		filePath: string, // the top level directory should be called 'root'
		linesOfCode: string // the number of lines of code
		directoryPath: string[] // this should be a list of the directories in order back to root. project/src/level => [level, src, project]
		lintingErrors: Array<{
			lineNumber: number, // the line number the linting error was on
			errors: any[] // use an interface from the library or make one that holds the linting info
		}>
	}>
}

async function linter(input: ILinterInput): Promise<ILinterOutput> {
	return null;
}

export default linter;