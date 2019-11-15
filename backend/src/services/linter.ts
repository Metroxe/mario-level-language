import {promisify} from "util";
import {CLIEngine, Linter} from "eslint";
import exampleLinterOut from "./exampleLinterOutput";
import LintReport = CLIEngine.LintReport;

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
	const cli = new CLIEngine({
		useEslintrc: false,
	});

	const report: LintReport = cli.executeOnFiles([input.directory]);
	//TODO: turn report into ILinterOutput

	return exampleLinterOut;
}

export default linter;

