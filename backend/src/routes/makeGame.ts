import {app} from "../index";
import {deleteRepo, saveRepo} from "../services/repoFunctions";
import linter from "../services/linter";
import makeGameFromLinter from "../services/makeGameFromLinter";
import compileImages from "../services/compileImages";

var directory: string;

app.post("/makeWorld", async ({body}, res) => {
	if (!body.repoURL) {
		res.sendStatus(401);
		return;
	}

	//directory: string;
	try {
		directory = await saveRepo(body.repoURL);
		console.log(directory);
		const lint = await linter({directory});
		console.log(lint);
		const game = await makeGameFromLinter(lint);
		console.log(game);
		const data = await compileImages(game);
		res.setHeader('Content-type', 'application/zip');
		res.setHeader('Content-disposition', 'attachment; filename=mario_level_language.zip');
		res.end(data, "binary")
		res.status(200);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
	await deleteRepo(directory);
});

export {directory};