import {app} from "../index";
import generateImage from "mario-level-generator";
import compile from "compiler";

app.post("/compile", async (req, res) => {
	if (!req.body.input) {
		res.sendStatus(401);
		return;
	}
	const compiled = compile(req.body.input);
	if (compiled.err && compiled.err.length > 0) {
		res.status(500).send(compiled.err);
		return;
	}
	const image = await generateImage(compiled.elements);
	res.writeHead(200, {
		'Content-Type': "image/png",
		'Content-Length': image.length
	});
	res.status(200);
	res.end(image);
});