import {ILinterOutput} from "./linter";

const exampleLinterOut: ILinterOutput = {
	files: [
		{
			fileName: "index.js",
			filePath: "projectName/index.js",
			linesOfCode: 50,
			directoryPath: ["projectName"],
			lintingErrors: [
				{
					lineNumber: 15,
					errors: ["i don't know what a linting error will look like yet"]
				},
			]
		},
		{
			fileName: "code.js",
			filePath: "projectName/exampleDir/code.js",
			linesOfCode: 200,
			directoryPath: ["projectName", "exampleDir", "level.js"],
			lintingErrors: [
				{
					lineNumber: 25,
					errors: ["i don't know what a linting error will look like yet", "ditto"]
				},
				{
					lineNumber: 115,
					errors: ["i don't know what a linting error will look like yet"]
				},
			]
		},
	],
};

export default exampleLinterOut;