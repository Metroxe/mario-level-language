/**
 * Given the directory of a javascript project, run a lint on the entire project and return the
 * a list of files with their specific linting errors/warnings. You can ignore not js files.
 * You will also need to export the directory structure.
 * https://eslint.org/docs/developer-guide/nodejs-api
 */

interface ILinterInput {
	directory: string
}

export interface ILinterOutput {
	files: Array<{
		fileName: string,
		filePath: string, // the top level directory should be called 'root'
		directoryPath: string[] // this should be a list of the directories in order back to root.
		lintingErrors: any[] // use an interface from the library or make one that holds the linting info
	}>
}

async function linter(input: ILinterInput): Promise<ILinterOutput> {
	return null;
}

export default linter;