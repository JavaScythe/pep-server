const fs = require("fs");
let gblstore;
let meta = {};
let config;
function init(c){
	config=c;
}
var walk = function(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            /* Recurse into a subdirectory */
            results = results.concat(walk(file));
        } else { 
            /* Is a file */
            results.push(file);
        }
    });
    return results;
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
			fn = walk(__dirname+config["data"]["target"]);
		} catch(e){
			throw e;
		}
		for(var i in fn){
			let n = fn[i];
			n=n.split("/")[n.split("/").length-1];
			n=n.replace(/_/g, " ");
			n=n.replace(/-/g, " ");
			n=n.split(".")
			n.pop();
			n=n.join(".");
			bd.push({
				"title": n,
				"location": fn[i].replace(__dirname, "")
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