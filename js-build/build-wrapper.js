var fs = require('fs');
var path = require('path');
var docBuilder = require('./build-doc');

//Loading preset macros
var macros = {};
var macrosFiles = fs.readdirSync(path.join(__dirname, 'macros'));
for (var i = 0; i < macrosFiles.length; i++){
	var macroName = macrosFiles[i].replace('.js', '');
	var macroCode = fs.readFileSync(path.join(__dirname, 'macros', macrosFiles[i]), {encoding: 'utf8'});
	macros[macroName] = macroCode;
}

var templateCode = fs.readFileSync(path.join(__dirname, 'wrap-template.js'), {encoding: 'utf8'});

var scriptBuf = templateCode;
var functionsCode = '';
var exportsCode = '';

//Load symbols. Write their wrapping code without checking their existence in emcc-built library
var symbols = [];
var symbolsFiles = fs.readdirSync(path.join(__dirname, 'symbols')).sort();
for (var i = 0; i < symbolsFiles.length; i++){
	if (!symbolsFiles[i].endsWith('.json')) {
		continue;
	}
	var currentSymbol = fs.readFileSync(path.join(__dirname, 'symbols', symbolsFiles[i]), {encoding: 'utf8'});
	try {
		currentSymbol = JSON.parse(currentSymbol);
	} catch (e){
		console.error('Invalid symbol file for ' + symbolsFiles[i]);
		process.exit(1);
	}
	symbols.push(currentSymbol);
}

//Load constants symbols
loadConstants();

for (var i = 0; i < symbols.length; i++){
	buildSymbol(symbols[i]);
}
finalizeWrapper();

function buildSymbol(symbolDescription){
	if (typeof symbolDescription != 'object') throw new TypeError('symbolDescription must be a function');
	if (symbolDescription.type == 'function'){
		var targetName = 'libsodium._' + symbolDescription.name;
		//Add encoding parameter to input list if encodingChoice is true
		if (!symbolDescription.noEncoding){
			symbolDescription.inputs.push({name: "resultEncoding", type: "encoding"})
		}
		var funcCode = '\n\tfunction ' + symbolDescription.name + '(';
		var funcBody = '';
		//Adding parameters array in function's interface, their conversions in the function's body
		var paramsArray = '';
		for (var i = 0; i < symbolDescription.inputs.length; i++){
			//Adding parameter in function's parameter list
			var currentParameter = symbolDescription.inputs[i];
			var currentParameterCode;
			paramsArray += currentParameter.name;
			if (i != symbolDescription.inputs.length - 1) paramsArray += ', ';
			//Adding the correspondant parameter handling macro, into the function body
			if (currentParameter.type == 'buf'){
				currentParameterCode = macros['input_buf'];
				currentParameterCode = applyMacro(currentParameterCode, ['{var_name}', '{var_size}'], [currentParameter.name, currentParameter.size]);
			} else if (currentParameter.type == 'uint' ||
					   currentParameter.type == 'unsized_buf' ||
					   currentParameter.type == 'encoding') {
				currentParameterCode = macros['input_' + currentParameter.type];
				currentParameterCode = applyMacro(currentParameterCode, ['{var_name}'], [currentParameter.name]);
			} else {
				//Unknown parameter type. What to do?
				console.error('What is the input type ' + currentParameter.type + '?');
				process.exit(1);
			}
			funcBody += currentParameterCode + '\n';
		}
		funcCode += paramsArray + '){\n\t\tvar toDealloc = [];\n\t';

		//Writing the outputs declaration code
		for (var i = 0; i < symbolDescription.outputs.length; i++){
			var currentOutput = symbolDescription.outputs[i];
			var currentOutputCode;
			if (currentOutput.type == 'buf'){
				currentOutputCode = macros['output_buf'];
				currentOutputCode = applyMacro(currentOutputCode, ['{var_name}', '{var_size}'], [currentOutput.name, currentOutput.size]);
			} else {
				console.error('What is the output type ' + currentOutput.type + '?');
				process.exit(1);
			}
			funcBody += currentOutputCode + '\n';
		}
		//Writing the target call
		if (symbolDescription.expect !== undefined && symbolDescription.return !== undefined) {
			funcBody += 'if (' + symbolDescription.target + ' ' + symbolDescription.expect + ') {\n';
			funcBody += '\tvar ret = ' + symbolDescription.return + ';\n';
			funcBody += '\tfree_all(toDealloc);\n';
			funcBody += '\treturn ret;\n';
			funcBody += '}\n';
			funcBody += 'free_all(toDealloc);\n';
			funcBody += 'throw new Error();\n';
		} else if (symbolDescription.expect !== undefined) {
			funcBody += 'if (' + symbolDescription.target + ' ' + symbolDescription.expect + ') {\n';
			funcBody += '\tfree_all(toDealloc);\n';
			funcBody += '\treturn;\n';
			funcBody += '}\n';
			funcBody += 'free_all(toDealloc);\n';
			funcBody += 'throw new Error();\n';
		} else if (symbolDescription.return !== undefined) {
			funcBody += sc(symbolDescription.target) + '\n';
			funcBody += 'var ret = (' + symbolDescription.return + ');\n';
			funcBody += 'free_all(toDealloc);\n';
			funcBody += 'return ret;\n';
		} else {
			funcBody += sc(symbolDescription.target) + '\n';
		}
		funcBody = injectTabs(funcBody);
		funcCode += funcBody + '\n\t}\n';

		functionsCode += funcCode;
		exportsCode += '\n\tif (typeof ' + targetName + ' == \'function\')  exports.' + symbolDescription.name + ' = ' + symbolDescription.name + ';';
	} else if (symbolDescription.type === 'uint'){
		var constVal = symbolDescription.target;
		var symbolName = symbolDescription.target.replace(new RegExp(/\(\)$/), '');
		if (!(/\(\)$/.test(constVal))) constVal += '()'; //Add the () for a function call
		exportsCode += '\n\tif (typeof ' + symbolName + ' ==\'function\') exports.' + symbolDescription.name + ' = ' + constVal + ' | 0;';
	} else {
		console.error('What is the symbol type ' + symbolDescription.type + '?');
		process.exit(1);
	}
	docBuilder.buildDocForSymbol(symbolDescription);
}

function applyMacro(macroCode, symbols, substitutes){
	if (typeof macroCode != 'string') throw new TypeError('macroCode must be a string');
	if (!(Array.isArray(symbols) && checkStrArray(symbols))) throw new TypeError('symbols must be an array of strings');
	if (!(Array.isArray(substitutes) && checkStrArray(substitutes))) throw new TypeError('substitutes must be an array of strings');
	if (symbols.length > substitutes.length) throw new TypeError('invalid array length for substitutes');

	for (var i = 0; i < symbols.length; i++){
		macroCode = macroCode.replace(new RegExp(symbols[i], 'g'), substitutes[i]);
	}

	return macroCode;
}

function finalizeWrapper(){
	scriptBuf = applyMacro(scriptBuf, ['{wraps_here}', '{exports_here}'], [functionsCode, exportsCode]);
	fs.writeFileSync(path.join(__dirname, '../libsodium/libsodium-js/lib', 'sodium.js'), scriptBuf);
	fs.writeFileSync(path.join(__dirname, '../API.md'), docBuilder.getResultDoc());
}

function injectTabs(code){
	return ('\n' + code).replace(/\n/g, '\n\t\t');
}

function loadConstants(){
	var constList = fs.readFileSync(path.join(__dirname, 'constants_uint.json'), {encoding: 'utf8'});
	try {
		constList = JSON.parse(constList);
	} catch (e){
		console.error('Invalid constants list');
		process.exit(1);
	}
	if (!(Array.isArray(constList) && checkStrArray(constList))){
		console.error('constants file must contain an array of strings');
		process.exit(1);
	}
	var constSymbolsArray = [];
	for (var i = 0; i < constList.length; i++){
		var currentConstant = {
			name: constList[i],
			type: "uint",
			target: "libsodium._" + constList[i] + '()'
		}
		constSymbolsArray.push(currentConstant);
	}
	constSymbolsArray.sort(function(a, b){
		if (a.name < b.name) return -1;
		else if (a.name > b.name) return 1;
		else return 0;
	});
	constSymbolsArray.forEach(function(s){
		if (s) symbols.push(s);
	});
}

function checkStrArray(a){
	for (var i = 0; i < a.length; i++) if (typeof a[i] != 'string') return false;
	return true;
}

//Inject a semi-colon at the end of the line, if one is missing
function sc(s){
	if (s.lastIndexOf(';') != s.length - 1) return s + ';';
	else return s;
}
