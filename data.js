const fs = require("fs");
let config;
function init(c){
	config=c;
	let bd = [];
	if(config["data"]["source"] == "folder"){
		let fn;
		try{
			fn = fs.readdirSync(__dirname+config["data"]["target"]);
		} catch(e){
			throw e;
		}
		for(var i in fn){
			let n = fn[i];
			n=n.replace(/_/g, " ");
			n=n.replace(/-/g, " ");
			n=n.split(".")
			n.pop();
			n=n.join(".");
			bd.push({
				"title": n,
				"location": config["data"]["location"]+fn[i]
			});
		}
	}
	console.log(bd);
}
module.exports = {
	init: init
}