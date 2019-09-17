import {app} from "../index";
import generateImage from "mario-level-generator";
import compile from "compiler";

app.post("/compile", async (req, res) => {
	if (!req.body.input) {
		res.sendStatus(401);
		return;
	}
	const elements = compile(req.body.input);
	const image = await generateImage(elements);
});