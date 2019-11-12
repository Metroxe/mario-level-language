import {IWorld, ILevel} from "./makeGameFromLinter";
import {ILinterOutput} from "./linter";

async function organizeWorlds(input: ILinterOutput): Promise<IWorld> {

	// sort by directoryPath length
	const files = input.files.sort((a, b,) => (a.directoryPath.length - b.directoryPath.length));

	// find root name and check that every file has the same root name
	let rootName: string;
	files.forEach(({directoryPath}) => {
		const _rootName = directoryPath[0];
		if (!rootName) {
			rootName = _rootName;
		}
		if (_rootName.length < 1 || rootName !== _rootName) {
			throw new Error("There are multiple root names or an invalid root name.");
		}
	});

	const root: IWorld = {
		name: rootName,
	};

	files.forEach(f => {
		const level: ILevel = {
			marioMakerCode: null,
			linterResult: f,
		};
		findSpot(level, f.directoryPath, [root]);
	});

	return root;
}

function findSpot(level: ILevel, path: string[], node: IWorld[]): void {
	if (path.length < 1) {
		if (!node[0].levels) {
			node[0].levels = []
		}
		node[0].levels.push(level);
		return;
	}

	const current = path[0];
	const newPath = [...path];
	newPath.shift();
	if (!node[0].subWorlds) {
		node[0].subWorlds = [];
	}
	for (const world of node[0].subWorlds) {
		if (world.name === current) {
			findSpot(level, newPath, [world]);
			return;
		}
	}
	const world: IWorld = {
		name: current,
	};
	node[0].subWorlds.push(world);
	findSpot(level, newPath, [world]);
}

export default organizeWorlds;
