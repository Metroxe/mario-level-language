import {CLIEngine, Linter} from "eslint";
import LintReport = CLIEngine.LintReport;
import fs from 'fs-extra';
import p from 'path';

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
        },
        configFile: './.eslintrc.js'
    });

    const report: LintReport = cli.executeOnFiles([input.directory]);

    // Map of path to number
    let lines = new Map<string, number>();
	
    let output: ILinterOutput = {files: []};

    for(let result of report.results){
        let file: IFileLint = {
            fileName: '',
            filePath: '',
            linesOfCode: 0,
            directoryPath: [],
            lintingErrors: [{
                lineNumber: 0,
            	errors: ['']
            },]
        };
        file.directoryPath = result.filePath.replace(`${__dirname}/`, "").split('/');
        file.fileName = file.directoryPath.slice(-1).pop();
        file.directoryPath[file.directoryPath.length-1] = p.basename(file.fileName, '.js');
        file.filePath = result.filePath;
        file.linesOfCode = await getNumberOfLines(file.filePath, lines);

        for (let j=0; j<result.messages.length; j++){
            file.lintingErrors[j] = {lineNumber: 0, errors: ['']};
            file.lintingErrors[j].lineNumber = result.messages[j].line;
            file.lintingErrors[j].errors[0] = result.messages[j].message;
        }

        // console.log("This is a file object: "+JSON.stringify(file));
        output.files.push(file);
    }
	return output;
}

async function getNumberOfLines (path: string, lines: Map<string, number>): Promise<number>{
    if (lines.has(path)) {
        return lines.get(path);
    }

    return new Promise((resolve, reject) => {
        let lineCount = 0;

        fs.createReadStream(path)
            .on('data', buffer => {
                let idx = -1;
                lineCount--;
                do {
                    idx = buffer.indexOf(10, idx+1);
                    lineCount++;
                } while (idx !== -1);
            })
            .on('end', () => {
                lines.set(path, lineCount);
                resolve(lineCount);
            })
            .on('error', reject);
    });
}

export default linter;
