import JSZip from "jszip";
import {IMakeGameOutput, IWorld} from "./makeGameFromLinter";
import compile from "compiler";
import generateImage from "mario-level-generator";


async function compileImages(input: IMakeGameOutput) {
	const zip = new JSZip();
	await recurseAndCompile(zip, input);

	async function recurseAndCompile(currentDir: JSZip, world: IWorld) {
		const newDir = currentDir.folder("world "  + world.name);
		if (world.levels) {
			for (const level of world.levels) {
				console.log("compiling " + level.linterResult.fileName);
				const {elements} = compile(level.marioMakerCode);
				const base64 = (await generateImage([elements]))[0];
				newDir.file("level - " + level.linterResult.fileName + ".png", base64.slice("data:image/png;base64,".length), {base64: true})
			}
		}
		if (world.subWorlds) {
			for (let i = 0; i < world.subWorlds.length; i++) {
				await recurseAndCompile(newDir, world.subWorlds[i]);
			}
		}
	}

	return await zip.generateAsync({type:"nodebuffer"})
}

export default compileImages;