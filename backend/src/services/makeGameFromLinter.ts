import {ILinterOutput} from "./linter";

export interface IMakeGameOutput {
	world: Array<{
		name: string,
		code: string,
	}>
}

/**
 * given the results from the linter create all of the code necessary to export the game
 * @param input
 */
async function makeGameFromLinter(input: ILinterOutput): Promise<IMakeGameOutput> {

	return null;
}

export default makeGameFromLinter;