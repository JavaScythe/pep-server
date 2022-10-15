const app = require("express")();
const config = require("./config.js");
const api = require("./api.js");
api.init(config);
app.use("/api/v0/:method", (req, res, next) => {
	res.send(req.params.method);
	console.log(api.consume(req.params.method, req.query));
});
app.get("/", (req, res) => {
	res.send("l bozo");
});
app.listen(3000);