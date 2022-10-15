const data = require("./data.js");
let config;
function consume(method, query){
	if(method == "list"){
		
	} else {
		return "nonexistant method";
	}
}
function init(c){
	config=c;
	data.init(c);
}
module.exports = {
	consume: consume,
	init: init
}