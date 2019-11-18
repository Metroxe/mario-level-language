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
	
    var files = new Array();
    const fs1 = require('fs');
    async function getFiles (dir:any, files_:any){
        files_ = files_ || [];
        var files = fs1.readdirSync(dir);
        for (var i in files){
            var name = dir + '/' + files[i];
            if (fs1.statSync(name).isDirectory()){
                getFiles(name, files_);
            } else {
                files_.push(name);
            }
        }
        return files_;
    }
    
    getFiles(input.directory,files);
    let numLineOfCode = new Array();
    // `files` is an array of file paths
    for (let k=0; k<files.length;k++){
        var fs = require('fs');
        var filePath = files[k];
        var fileBuffer =  fs.readFileSync(filePath);
        var to_string = fileBuffer.toString();
        var split_lines = to_string.split("\n");
        numLineOfCode.push(split_lines.length-1);
    }
	
    let output: ILinterOutput = {files: []};

    for(let i=0; i<report.results.length;i++){
        let file: IFileLint = {
            fileName: '',
            filePath: '',
            linesOfCode: 0,
            directoryPath: ["projectName", "directoryPath", "fileName"],
            lintingErrors: [{
                "lineNumber": 0,
            	"errors": ['']
            },]
        };

        file.fileName = report.results[i].filePath.split("/").pop();
        file.filePath = report.results[i].filePath.substring(31);
        file.linesOfCode = numLineOfCode[i];

        file.directoryPath[0] = file.filePath.substring(0,file.filePath.indexOf('/'));
        file.directoryPath[2] = file.fileName;
        file.directoryPath[1] = file.filePath.replace(file.directoryPath[0],'');
        file.directoryPath[1] = file.directoryPath[1].replace(file.directoryPath[2],'');
        file.directoryPath[1] = file.directoryPath[1].substring(1,file.directoryPath[1].length-1);
        if(file.directoryPath[1].length == 1){
            file.directoryPath[1] = '';
        }

        for (let j=0; j<report.results[i].messages.length; j++){
            file.lintingErrors[j] = {lineNumber: 0, errors: ['']};
            file.lintingErrors[j].lineNumber = report.results[i].messages[j].line;
            file.lintingErrors[j].errors[0] = report.results[i].messages[j].message;
        }

        //console.log("This is a file object: "+JSON.stringify(file));
        output.files.push(file);
    }
	return output;
}

export default linter;
