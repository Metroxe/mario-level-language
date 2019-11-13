import { IFileLint } from "./linter";
import { levels } from "shared";

function compileCodeFromLint(file: IFileLint): string {
	return levels.examples;
}

export default compileCodeFromLint;