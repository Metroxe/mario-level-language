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
        envs: ["browser", "mocha"],
        useEslintrc: false,
        rules: {
            semi: 2,
            quotes: [2, "double"],
	    curly: "error"
        }
        });

	const report: LintReport = cli.executeOnFiles([input.directory]);
	//TODO: turn report into ILinterOutput
    let output: ILinterOutput = {files: []};
    let file: IFileLint = {
        fileName: '',
        filePath: '',
        linesOfCode: 0,
        directoryPath: [''],
        lintingErrors: [{
            lineNumber: 0,
        	errors: ['']
        }]
    };

    for(let i=0; i<report.results.length;i++){
        //let file: IFileLint;
        file.fileName = report.results[i].filePath.split("/").pop();
        file.filePath = report.results[i].filePath;
        file.linesOfCode = 10000 // missing info?

        let directoryPath = [''];
        directoryPath[0] = input.directory;
        directoryPath[1] = report.results[i].filePath.substring(report.results[i].filePath.indexOf('/'), report.results[i].filePath.lastIndexOf('/'));
        directoryPath[2] = file.fileName;
        file.directoryPath = directoryPath;

        for (let j=0; j<report.results[i].messages.length; j++){
            file.lintingErrors[j].lineNumber = report.results[i].messages[j].line;
            file.lintingErrors[j].errors[0] = report.results[i].messages[j].message;
        }

        output.files.push();
    }
	return output;

}

export default linter;
