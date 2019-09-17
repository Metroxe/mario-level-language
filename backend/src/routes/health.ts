import {app} from "../index";

app.get("/health", (req, res) => {
	res.sendStatus(200);
});