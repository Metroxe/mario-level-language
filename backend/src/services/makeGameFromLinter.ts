import {IFileLint, ILinterOutput} from "./linter";
import organizeWorlds from "./organizeWorlds";
import compileCodeFromLint from "./compileCodeFromLint";

export interface ILevel {
	marioMakerCode: string;
	linterResult: IFileLint;
}

export interface IWorld {
	name: string;
	subWorlds?: IWorld[];
	levels?: ILevel[];
}

export type IMakeGameOutput = IWorld;

/**
 * given the results from the linter create all of the code necessary to export the game
 * @param input
 */
async function makeGameFromLinter(input: ILinterOutput): Promise<IMakeGameOutput> {
	const root = await organizeWorlds(input);
	recurseAndCompile([root]);
	return root;
}

function recurseAndCompile(world: IWorld[]) {
	if (world[0].levels) {
		for (let i = 0; i < world[0].levels.length; i++) {
			world[0].levels[i].marioMakerCode = compileCodeFromLint(world[0].levels[i].linterResult)
		}
	}
	if (world[0].subWorlds) {
		for (let i = 0; i < world[0].subWorlds.length; i++) {
			recurseAndCompile([world[0].subWorlds[i]]);
		}
	}
}

export default makeGameFromLinter;