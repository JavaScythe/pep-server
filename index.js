let startTime = new Date().getTime();
const app = require("express")();
const config = require("./config.js");
const api = require("./api.js");
console.log(`Loaded ${api.init(config)} games in ${new Date().getTime()-startTime}ms`);
app.use("/api/:method", (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	let d = api.consume(req.params.method, req.query);
	res.type('json');
	res.send(d);
});
app.get("/", (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.send("l bozo");
});
app.listen(3000);