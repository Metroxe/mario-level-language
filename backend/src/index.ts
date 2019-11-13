import express from "express";
import * as core from "express-serve-static-core";
import sourceMapSupport from "source-map-support";
import * as path from "path";

sourceMapSupport.install();
let app: core.Express;
const port = process.env.PORT ? process.env.PORT : 8080;
(async () => {
	app = express();

	// middleware
	require("./middleware");

	// routes
	require("./routes");

	// website
	app.use(express.static(path.join(`${__dirname}/../../frontend`, 'build')));
	app.get('/*', function (req, res) {
		res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
	});

	app.listen(port, () => {
		console.log(`Server started on port ${port}.`)
	});
})();

export {app};