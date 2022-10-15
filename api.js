const data = require("./data.js");
let config;
function consume(method, query){
	if(method == "list"){
		return data.exportData();
	} else if(method == "meta"){
		return data.getMeta();
	} else {
		return {"code": 404, "message": "nonexistant method"};
	}
}
function init(c){
	config=c;
	data.init(c);
	return data.readyData();
}
module.exports = {
	consume: consume,
	init: init
}