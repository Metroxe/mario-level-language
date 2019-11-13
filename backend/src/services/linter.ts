/**
 * Given the directory of a javascript project, run a lint on the entire project and return the
 * a list of files with their specific linting errors/warnings. You can ignore not js files.
 * You will also need to export the directory structure.
 * https://eslint.org/docs/developer-guide/nodejs-api
 */
import fs from 'fs-extra'; // might need to read files
import {readFiles} from "./repoFunctions";
import exampleLinterOut from "./exampleLinterOutput"; // use this of make one yourself *NOT TESTED*


interface ILinterInput {
	directory: string
}

// this should be a list of js files, not directories, and not other files that are not js.
export interface IFileLint {
	fileName: string,
	filePath: string, // the top level directory should be called 'root'
	linesOfCode: number // the number of lines of code
	directoryPath: string[] // this should be a list of the directories in order from root to file. project/src/level.js => [project, src, level]
	lintingErrors: Array<{
		lineNumber: number, // the line number the linting error was on
		errors: any[] // use an interface from the library or make one that holds the linting info. i made this an array in case there are > 1 linting error on a line.
	}>
}

export interface ILinterOutput {
	files: Array<IFileLint>
}

async function linter(input: ILinterInput): Promise<ILinterOutput> {
	return exampleLinterOut; // this is an example I made just for testing, remove when done.
}

export default linter;