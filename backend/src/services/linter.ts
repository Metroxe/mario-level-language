/**
 * Given the directory of a javascript project, run a lint on the entire project and return the
 * a list of files with their specific linting errors/warnings. You can ignore not js files.
 * You will also need to export the directory structure.
 * https://eslint.org/docs/developer-guide/nodejs-api
 */
import fs from 'fs-extra'; // might need to read files
import {readFiles} from "./repoFunctions";
import exampleLinterOut from "./exampleLinterOutput"; // use this of make one yourself *NOT TESTED*
import {directory} from "../routes/makeGame"

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
	return exampleLinterOut; // replace the var with the new json array
}

export default linter;


console.log(directory);

/*
const exec = require('child_process').exec;
// need to check directory path
var yourscript = exec('sh eslint.sh ${directory}',
        (error, stdout, stderr) => {
            console.log(stdout); //json array output
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }

            // parsing
            for (var i = 0; i<stdout.length; i++){
                var obj = stdout[i];
                console.log(obj);
                var fileNanme;
                var filePath;
                var linesOfCode;
                var directoryPath;
                var lintingErrors;
                var lineNumber;
                var errors;

                var lintResult = {
                    fileName: obj.filePath.split("/").pop(),
                    filePath: obj.filePath,
                    //linesOfCode: stdout.lines,
                    //directoryPath: string[]
                    lintingErrors: Array<{
                        lineNumber: obj.message[0].line,
                        errors: obj.message[0].message
                    }>
                 };
            }

        });*/
