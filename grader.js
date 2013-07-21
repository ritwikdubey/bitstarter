#!/usr/bin/env node
var fs = require("fs"); 
var cheerio = require("cheerio");
var program = require("commander");
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";

var assertFileExists = function(inFile){
var instr = inFile.toString();
if(!fs.existsSync(instr)){
console.log("%s isnt present, Exiting", instr);
process.exit(1);
}
return instr;
};

var clone = function(fn){
return fn.bind({});
};

var checkHtmlFile = function(htmlFile, checksFile){
$ = cheerioHtmlFile(htmlFile);
var checks = loadChecks(checksFile).sort();
var out = {};
for (var ii in checks){
var present = $(checks[ii]).length > 0;
out[checks[ii]] = present;
}
return out;
};

var cheerioHtmlFile = function(htmlFile){
    return cheerio.load(fs.readFileSync(htmlFile));
};

var loadChecks = function(checksFile){
    return JSON.parse(fs.readFileSync(checksFile));
};

if(require.main == module){
program
    .option('-c, --checks <check_file>','Path to json', clone(assertFileExists), CHECKSFILE_DEFAULT)
    .option('-f, --file <html_file>', 'path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
    .parse(process.argv);

var checkJson = checkHtmlFile(program.file, program.checks);
var outJson = JSON.stringify(checkJson, null, 4);
console.log(outJson);
}
else{
exports.checkHtmlFile = checkHtmlFile;
}
