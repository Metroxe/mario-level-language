import {app} from "../index";
import generateImage from "mario-level-generator";
import compile from "compiler";

app.post("/compile", async (req, res) => {
	if (!req.body.input) {
		res.sendStatus(401);
		return;
	}
	try {
		const {elements, err} = compile(req.body.input);
		const base64 = (await generateImage([elements]))[0];
		res.status(200).send({base64, err});
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});