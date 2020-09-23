filename = "InputProxy.java";

fs = require('fs');
fs.readFile(filename, 'utf8', function (err, data) {
	if (err) throw err;
	processData(data);
});

function processData(javaCode) {
	javaCode = javaCode.replace(/final /g, "")
		.replace(/public( abstract)* class/g, "export default class")
		.replace(/ObjectMap/g, "Map")
		.replace(/^\t(public|private) ([a-z1-9A-Z ]+)(<.*?>)* ([a-z1-9A-Z ]+)(;|=)/gm, "\t$1 $4:$2$3$5")
		.replace(/^\t(public|private) ([a-z1-9A-Z ]+) (.*) {$/gm, "\t$1 $3:$2 {")
		.replace(/([a-z1-9A-Z]+) ([a-z1-9A-Z]+),/gm, "$2:$1,")
		.replace(/([a-z1-9A-Z]+) ([a-z1-9A-Z]+)\)/gm, "$2:$1)")
		.replace(/(\t+)public/g, "$1")
		.replace(/String/g, "string")
		.replace(/(float|int)/g, "number")
		.replace(/(Float|Integer)/g, "Number")
		.replace(/containsKey/g, "has");


	fs.writeFile('exported ts.testing', javaCode, function (err) {
		if (err) return console.log(err);
	});
}