const fs = require("fs");
let gblstore;
let meta = {};
let config;
function init(c){
	config=c;
}
function readyData(){
	let bd = [];
	let sdo = config["data"]["cache"];
	let nd = true;
	let coe = false;
	if(sdo){
		if(fs.existsSync(__dirname+config["data"]["cache_target"])){
			bd = fs.readFileSync(__dirname+config["data"]["cache_target"], "utf-8");
			nd = false;
			bd=JSON.parse(bd);
		} else {
			coe = true;
		}
	}
	if(config["data"]["source"] == "folder" && nd){
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
	gblstore = bd;
	if(coe){
		fs.writeFileSync(__dirname+config["data"]["cache_target"], JSON.stringify(bd));
	}
	meta["length"] = bd.length;
	meta["size"] = bd.join("").length;
	return bd.length;
}
function exportData(){
	return gblstore;
}
function getMeta(){
	return meta;
}
module.exports = {
	init: init,
	readyData: readyData,
	exportData: exportData,
	getMeta: getMeta
}