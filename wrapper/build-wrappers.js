var fs = require('fs');
var path = require('path');
var docBuilder = require('./build-doc');

//Parse arguments
const argv = process.argv;
if (argv.length != 5) {
    console.error('Usage: build-wrappers.js <libsodium module name> <API.md path> <wrappers path>');
    process.exit(1);
}
const libsodiumModuleName = argv[2], apiPath = argv[3], wrappersPath = argv[4];

//Loading preset macros
var macros = {};
var macrosFiles = fs.readdirSync(path.join(__dirname, 'macros'));
for (var i = 0; i < macrosFiles.length; i++) {
        var macroName = macrosFiles[i].replace('.js', '');
        if (! macroName.match(/^[a-z0-9_]+$/)) {
                continue;
        }
        var macroCode = fs.readFileSync(path.join(__dirname, 'macros', macrosFiles[i]), {
                encoding: 'utf8'
        });
        macros[macroName] = macroCode;
}

var templateCode = fs.readFileSync(path.join(__dirname, 'wrap-template.js'), {
        encoding: 'utf8'
});

var scriptBuf = templateCode;
var functionsCode = '';
var exportsCode = '';

//Load symbols. Write their wrapping code without checking their existence in emcc-built library
var symbols = [];
var symbolsFiles = fs.readdirSync(path.join(__dirname, 'symbols')).sort();
for (var i = 0; i < symbolsFiles.length; i++) {
        if (symbolsFiles[i].lastIndexOf('.json') !== symbolsFiles[i].length - 5) {
                continue;
        }
        var currentSymbol = fs.readFileSync(path.join(__dirname, 'symbols', symbolsFiles[i]), {
                encoding: 'utf8'
        });
        try {
                currentSymbol = JSON.parse(currentSymbol);
        } catch (e) {
                console.error('Invalid symbol file for ' + symbolsFiles[i]);
                process.exit(1);
        }
        symbols.push(currentSymbol);
}

for (var i = 0; i < symbols.length; i++) {
        buildSymbol(symbols[i]);
}
exportsCode += "\n";
exportFunctions(symbols);
exportConstants(loadConstants());
finalizeWrapper();

function exportFunctions(symbols) {
        var keys = [ ], functions = [ ];
        for (var i = 0; i < symbols.length; i++) {
                keys.push('"' + symbols[i].name + '"');
                functions.push(symbols[i].name);
        }
        exportsCode += "\tvar exported_functions = [" + keys.sort().join(", ") + "],\n";
        exportsCode += "\t      functions = [" + functions.sort().join(", ") + "];\n";
        exportsCode += "\tfor (var i = 0; i < functions.length; i++) {\n";
        exportsCode += "\t\tif (typeof libsodium[\"_\" + exported_functions[i]] === \"function\") {\n";
        exportsCode += "\t\t\texports[exported_functions[i]] = functions[i];\n";
        exportsCode += "\t\t}\n";
        exportsCode += "\t}\n";
}

function exportConstants(constSymbols) {
        var keys = [ ];
        for (var i = 0; i < constSymbols.length; i++) {
                if (constSymbols[i].type === 'uint') {
                        keys.push('"' + constSymbols[i].name + '"');
                }
        }
        exportsCode += "\tvar constants = [" + keys.sort().join(", ") + "];\n";
        exportsCode += "\tfor (var i = 0; i < constants.length; i++) {\n";
        exportsCode += "\t\tvar raw = libsodium[\"_\" + constants[i].toLowerCase()];\n";
        exportsCode += "\t\tif (typeof raw === \"function\") exports[constants[i]] = raw()|0;\n";
        exportsCode += "\t}\n";

        keys = [ ];
        for (i = 0; i < constSymbols.length; i++) {
                if (constSymbols[i].type === 'string') {
                        keys.push('"' + constSymbols[i].name + '"');
                }
        }
        exportsCode += "\tvar constants_str = [" + keys.sort().join(", ") + "];\n";
        exportsCode += "\tfor (var i = 0; i < constants_str.length; i++) {\n";
        exportsCode += "\t\tvar raw = libsodium[\"_\" + constants_str[i].toLowerCase()];\n";
        exportsCode += "\t\tif (typeof raw === \"function\") exports[constants_str[i]] = libsodium.Pointer_stringify(raw());\n";
        exportsCode += "\t}\n";
}

function buildSymbol(symbolDescription) {
        if (typeof symbolDescription != 'object') throw new TypeError('symbolDescription must be a function');
        if (symbolDescription.type == 'function') {
                var targetName = 'libsodium._' + symbolDescription.name;
                var funcCode = '\n\tfunction ' + symbolDescription.name + '(';
                var funcBody = '';
                //Adding parameters array in function's interface, their conversions in the function's body
                var paramsArray = [];
                symbolDescription.inputs = symbolDescription.inputs || [];
                for (var i = 0; i < symbolDescription.inputs.length; i++) {
                        //Adding parameter in function's parameter list
                        var currentParameter = symbolDescription.inputs[i];
                        var currentParameterCode;
                        paramsArray.push(currentParameter.name);
                        //Adding the correspondant parameter handling macro, into the function body
                        if (currentParameter.type == 'buf') {
                                currentParameterCode = macros.input_buf;
                                currentParameterCode = applyMacro(currentParameterCode, ['{var_name}', '{var_size}'], [currentParameter.name, currentParameter.size]);
                        } else if (macros['input_' + currentParameter.type]) {
                                currentParameterCode = macros['input_' + currentParameter.type];
                                currentParameterCode = applyMacro(currentParameterCode, ['{var_name}'], [currentParameter.name]);
                        } else {
                                console.error('Unsupported input type ' + currentParameter.type + '?');
                                process.exit(1);
                        }
                        funcBody += currentParameterCode + '\n';
                }
                if (!symbolDescription.noOutputFormat) {
                        paramsArray.push('outputFormat');
                }
                funcCode += paramsArray.join(', ') + ') {\n';
                funcCode += '\t\tvar address_pool = [];\n';
                if (!symbolDescription.noOutputFormat) {
                        funcCode += '\t\t_check_output_format(outputFormat);\n';
                }
                //Writing the outputs declaration code
                symbolDescription.outputs = symbolDescription.outputs || [];
                for (i = 0; i < symbolDescription.outputs.length; i++) {
                        var currentOutput = symbolDescription.outputs[i];
                        var currentOutputCode;
                        if (currentOutput.type === 'buf') {
                                currentOutputCode = macros.output_buf;
                                currentOutputCode = applyMacro(currentOutputCode, ['{var_name}', '{var_size}'], [currentOutput.name, currentOutput.size]);
                        } else if (macros['output_' + currentOutput.type]) {
                                currentOutputCode = macros['output_' + currentOutput.type];
                                currentOutputCode = applyMacro(currentOutputCode, ['{var_name}'], [currentOutput.name]);
                        } else {
                                console.error('What is the output type ' + currentOutput.type + '?');
                                process.exit(1);
                        }
                        funcBody += currentOutputCode + '\n';
                }
                //Writing the target call
                if (symbolDescription.expect !== undefined && symbolDescription.return !== undefined) {
                        funcBody += 'if ((' + symbolDescription.target + ') ' + symbolDescription.expect + ') {\n';
                        funcBody += '\tvar ret = ' + symbolDescription.return+';\n';
                        funcBody += '\t_free_all(address_pool);\n';
                        funcBody += '\treturn ret;\n';
                        funcBody += '}\n';
                        funcBody += '_free_and_throw_error(address_pool);\n';
                } else if (symbolDescription.expect !== undefined) {
                        funcBody += 'if ((' + symbolDescription.target + ') ' + symbolDescription.expect + ') {\n';
                        funcBody += '\t_free_all(address_pool);\n';
                        funcBody += '\treturn;\n';
                        funcBody += '}\n';
                        funcBody += '_free_and_throw_error(address_pool);\n';
                } else if (symbolDescription.return !== undefined) {
                        funcBody += sc(symbolDescription.target) + '\n';
                        funcBody += 'var ret = (' + symbolDescription.return+');\n';
                        funcBody += '_free_all(address_pool);\n';
                        funcBody += 'return ret;\n';
                } else {
                        funcBody += sc(symbolDescription.target) + '\n';
                }
                funcBody = injectTabs(funcBody);
                funcCode += funcBody + '\n\t}\n';

                functionsCode += funcCode;
        } else {
                console.error('What is the symbol type ' + symbolDescription.type + '?');
                process.exit(1);
        }
        docBuilder.buildDocForSymbol(symbolDescription);
}

function applyMacro(macroCode, symbols, substitutes) {
        if (typeof macroCode != 'string') throw new TypeError('macroCode must be a string, not ' + typeof macroCode);
        if (!(Array.isArray(symbols) && checkStrArray(symbols))) throw new TypeError('symbols must be an array of strings');
        if (!(Array.isArray(substitutes) && checkStrArray(substitutes))) throw new TypeError('substitutes must be an array of strings for [' + macroCode + '] [' + substitutes + ']');
        if (symbols.length > substitutes.length) throw new TypeError('invalid array length for substitutes');

        for (var i = 0; i < symbols.length; i++) {
                macroCode = macroCode.replace(new RegExp(symbols[i], 'g'), substitutes[i]);
        }
        return macroCode;
}

function finalizeWrapper() {
        scriptBuf = applyMacro(scriptBuf, ['{{wraps_here}}', '{{exports_here}}', '{{libsodium}}'], [functionsCode, exportsCode, libsodiumModuleName]);
        fs.writeFileSync(wrappersPath, scriptBuf);
        fs.writeFileSync(apiPath, docBuilder.getResultDoc());
}

function injectTabs(code) {
        return ('\n' + code).replace(/\n/g, '\n\t\t');
}

function loadConstants() {
        var constList = fs.readFileSync(path.join(__dirname, 'constants.json'), {
                encoding: 'utf8'
        });
        try {
                constList = JSON.parse(constList);
        } catch (e) {
                console.error('Invalid constants list');
                process.exit(1);
        }
        if (!(Array.isArray(constList) && checkObjectArray(constList))) {
                console.error('constants file must contain an array of objects');
                process.exit(1);
        }
        var constSymbols = [ ];
        for (var i = 0; i < constList.length; i++) {
                var currentConstant = {
                        name: constList[i].name,
                        type: constList[i].type
                };
                constSymbols.push(currentConstant);
        }
        return constSymbols;
}

function checkStrArray(a) {
        for (var i = 0; i < a.length; i++)
                if (typeof a[i] !== 'string') return false;
        return true;
}

function checkObjectArray(a) {
        for (var i = 0; i < a.length; i++)
                if (typeof a[i] !== 'object') return false;
        return true;
}

//Inject a semi-colon at the end of the line, if one is missing
function sc(s) {
        if (s.lastIndexOf(';') != s.length - 1) return s + ';';
        else return s;
}
