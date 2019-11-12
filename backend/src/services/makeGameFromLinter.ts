import {IFileLint, ILinterOutput} from "./linter";

interface ILevel {
	marioMakerCode: string;
	linterResult: IFileLint;
}

interface IWorld {
	name: string;
	subWorlds: IWorld[];
	levels: ILevel[];
}

export type IMakeGameOutput = IWorld;

/**
 * given the results from the linter create all of the code necessary to export the game
 * @param input
 */
async function makeGameFromLinter(input: ILinterOutput): Promise<IMakeGameOutput> {

	return null;
}

export default makeGameFromLinter;