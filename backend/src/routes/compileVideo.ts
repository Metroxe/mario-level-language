import {app} from "../index";
import generateImage from "mario-level-generator";
import compile from "compiler";
import JSZip from "jszip";

app.post("/compile-zip", async (req, res) => {
	if (!req.body.input) {
		res.sendStatus(401);
		return;
	}
	try {
		const {elements, err, history} = compile(req.body.input);
		const zip = new JSZip();
		for (let i = 0; i < history.length; i++) {
			const base64 = (await generateImage([history[i]]))[0];
			zip.file(i+".png", base64.slice("data:image/png;base64,".length), {base64: true});
		}
		const data = await zip.generateAsync({type:"nodebuffer"});
		res.setHeader('Content-type', 'application/zip');
		res.setHeader('Content-disposition', 'attachment; filename=mario_level_language.zip');
		res.end(data, "binary")
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});