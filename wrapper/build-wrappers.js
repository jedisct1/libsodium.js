var fs = require("fs");
var path = require("path");
var docBuilder = require("./build-doc");

//Parse arguments
const argv = process.argv;
if (argv.length != 5) {
  console.error(
    "Usage: build-wrappers.js <libsodium module name> <API.md path> <wrappers path>"
  );
  process.exit(1);
}
const libsodiumModuleName = argv[2],
  apiPath = argv[3],
  wrappersPath = argv[4];

//Loading preset macros
var macros = {};
var macrosFiles = fs.readdirSync(path.join(__dirname, "macros"));
for (var i = 0; i < macrosFiles.length; i++) {
  var macroName = macrosFiles[i].replace(".js", "");
  if (!macroName.match(/^[a-z0-9_]+$/)) {
    continue;
  }
  var macroCode = fs.readFileSync(
    path.join(__dirname, "macros", macrosFiles[i]), {
    encoding: "utf8"
  }
  );
  macros[macroName] = macroCode;
}

var templateCode = fs.readFileSync(path.join(__dirname, "wrap-template.js"), {
  encoding: "utf8"
});

var scriptBuf = templateCode;
var functionsCode = "";
var exportsCode = "";

//Load symbols. Write their wrapping code without checking their existence in emcc-built library
var symbols = [];
var symbolsFiles = fs.readdirSync(path.join(__dirname, "symbols")).sort();
for (var i = 0; i < symbolsFiles.length; i++) {
  if (symbolsFiles[i].lastIndexOf(".json") !== symbolsFiles[i].length - 5) {
    continue;
  }
  var currentSymbol = fs.readFileSync(
    path.join(__dirname, "symbols", symbolsFiles[i]), {
    encoding: "utf8"
  }
  );
  try {
    currentSymbol = JSON.parse(currentSymbol);
  } catch (e) {
    console.error("Invalid symbol file for " + symbolsFiles[i]);
    process.exit(1);
  }
  symbols.push(currentSymbol);
}

for (var i = 0; i < symbols.length; i++) {
  buildSymbol(symbols[i]);
}
exportFunctions(symbols);
exportConstants(loadConstants());
finalizeWrapper();

function exportFunctions(symbols) {
  var keys = [],
    functions = [];
  for (var i = 0; i < symbols.length; i++) {
    keys.push('"' + symbols[i].name + '"');
    functions.push(symbols[i].name);
  }
  exportsCode += "var exported_functions = [" + keys.sort().join(", ") + "];\n";
  exportsCode += "var functions = [" + functions.sort().join(", ") + "];\n";
  exportsCode += "for (var i = 0; i < functions.length; i++) {\n";
  exportsCode += '  if (typeof libsodium["_" + exported_functions[i]] === "function") {\n';
  exportsCode += "    exports[exported_functions[i]] = functions[i];\n";
  exportsCode += "  }\n";
  exportsCode += "}\n";
}

function exportConstants(constSymbols) {
  var keys = [];
  for (var i = 0; i < constSymbols.length; i++) {
    if (constSymbols[i].type === "uint") {
      keys.push('"' + constSymbols[i].name + '"');
    }
  }
  exportsCode += "var constants = [" + keys.sort().join(", ") + "];\n";
  exportsCode += "for (var i = 0; i < constants.length; i++) {\n";
  exportsCode += '  var raw = libsodium["_" + constants[i].toLowerCase()];\n';
  exportsCode += '  if (typeof raw === "function") exports[constants[i]] = raw();\n';
  exportsCode += "}\n";

  keys = [];
  for (i = 0; i < constSymbols.length; i++) {
    if (constSymbols[i].type === "string") {
      keys.push('"' + constSymbols[i].name + '"');
    }
  }
  exportsCode += "var constants_str = [" + keys.sort().join(", ") + "];\n";
  exportsCode += "for (var i = 0; i < constants_str.length; i++) {\n";
  exportsCode += '  var raw = libsodium["_" + constants_str[i].toLowerCase()];\n';
  exportsCode += '  if (typeof raw === "function") exports[constants_str[i]] = libsodium.UTF8ToString(raw());\n';
  exportsCode += "}\n";
}

function buildSymbol(symbolDescription) {
  if (typeof symbolDescription != "object")
    throw new TypeError("symbolDescription must be a function");
  if (symbolDescription.type == "function") {
    var targetName = "libsodium._" + symbolDescription.name;
    var funcCode = "function " + symbolDescription.name + "(";
    var funcBody = "";
    //Adding parameters array in function's interface, their conversions in the function's body
    var paramsArray = [];
    symbolDescription.inputs = symbolDescription.inputs || [];
    for (var i = 0; i < symbolDescription.inputs.length; i++) {
      //Adding parameter in function's parameter list
      var currentParameter = symbolDescription.inputs[i];
      paramsArray.push(currentParameter.name);
      //Adding the correspondant parameter handling macro, into the function body
      var currentParameterCode = macros["input_" + currentParameter.type];
      if (!currentParameterCode) {
        console.error("Unsupported input type " + currentParameter.type + "?");
        process.exit(1);
      }
      var substitutions = [{ from: "{var_name}", to: currentParameter.name }];
      if (currentParameter.length !== undefined) {
        substitutions.push({ from: "{var_length}", to: currentParameter.length });
      }
      if (currentParameter.min_length !== undefined) {
        substitutions.push({ from: "{var_min_length}", to: currentParameter.min_length });
      }
      currentParameterCode = applyMacro(
        currentParameterCode, substitutions.map((s) => s.from), substitutions.map((s) => s.to)
      );
      funcBody += currentParameterCode + "\n";
    }
    if (!symbolDescription.noOutputFormat) {
      paramsArray.push("outputFormat");
    }
    funcCode += paramsArray.join(", ") + ") {\n";
    funcCode += "  var address_pool = [];\n";
    funcCode += "\n";
    if (!symbolDescription.noOutputFormat) {
      funcCode += "  _check_output_format(outputFormat);\n";
    }
    //Writing the outputs declaration code
    symbolDescription.outputs = symbolDescription.outputs || [];
    for (i = 0; i < symbolDescription.outputs.length; i++) {
      var currentOutput = symbolDescription.outputs[i];
      var currentOutputCode = currentOutputCode = macros["output_" + currentOutput.type];
      if (!currentOutputCode) {
        console.error("What is the output type " + currentOutput.type + "?");
        process.exit(1);
      }
      var substitutions = [{ from: "{var_name}", to: currentOutput.name }];
      if (currentOutput.length !== undefined) {
        substitutions.push({ from: "{var_length}", to: currentOutput.length });
      }
      if (currentOutput.min_length !== undefined) {
        substitutions.push({ from: "{var_min_length}", to: currentOutput.min_length });
      }
      currentOutputCode = applyMacro(
        currentOutputCode, substitutions.map((s) => s.from), substitutions.map((s) => s.to)
      );
      funcBody += currentOutputCode + "\n";
    }
    //Writing the target call
    if (symbolDescription.assert_retval !== undefined) {
      var target = symbolDescription.target;
      if (symbolDescription.assert_retval.length > 1) {
        funcBody += "var _ret = " + target + ";\n";
        target = "_ret";
      }

      if (symbolDescription.return !== undefined) {
        symbolDescription.assert_retval.forEach(function (assert) {
          funcBody += "if ((" + target + ") " + assert.condition + ") {\n";
          funcBody += "\tvar ret = " + symbolDescription.return + ";\n";
          funcBody += "\t_free_all(address_pool);\n";
          funcBody += "\treturn ret;\n";
          funcBody += "}\n";
          funcBody +=
            "_free_and_throw_error(address_pool, " +
            '"' + assert.or_else_throw + '"' + ");\n";
        });
      } else {
        symbolDescription.assert_retval.forEach(function (assert) {
          funcBody += "if (!((" + target + ") " + assert.condition + ")) {\n";
          funcBody +=
            "\t_free_and_throw_error(address_pool, " +
            '"' + assert.or_else_throw + '"' + ");\n";
          funcBody += "}\n";
          funcBody += "_free_all(address_pool);\n";
        });
      }
    } else if (symbolDescription.return !== undefined) {
      funcBody += sc(symbolDescription.target) + "\n";
      funcBody += "var ret = (" + symbolDescription.return + ");\n";
      funcBody += "_free_all(address_pool);\n";
      funcBody += "return ret;\n";
    } else {
      funcBody += sc(symbolDescription.target) + "\n";
    }
    funcCode += injectTabs(funcBody);
    funcCode += "}\n";

    functionsCode += funcCode;
    functionsCode += "\n";
  } else {
    console.error("Unknown symbol type " + symbolDescription.type);
    process.exit(1);
  }
  docBuilder.buildDocForSymbol(symbolDescription);
}

function applyMacro(macroCode, symbols, substitutes) {
  if (typeof macroCode != "string")
    throw new TypeError("macroCode must be a string, not " + typeof macroCode);
  if (!(Array.isArray(symbols) && checkStrArray(symbols)))
    throw new TypeError("symbols must be an array of strings (found: " + typeof (symbols) + ")");
  if (!(Array.isArray(substitutes) && checkStrArray(substitutes)))
    throw new TypeError(
      "substitutes must be an array of strings for [" +
      macroCode +
      "] [" +
      substitutes +
      "] (found: " + typeof (substitutes) + ")"
    );
  if (symbols.length > substitutes.length)
    throw new TypeError("invalid array length for substitutes");

  for (var i = 0; i < symbols.length; i++) {
    macroCode = macroCode.split(symbols[i]).join(substitutes[i]);
  }
  return macroCode;
}

function finalizeWrapper() {
  scriptBuf = applyMacro(
    scriptBuf, ["/*{{wraps_here}}*/", "/*{{exports_here}}*/", "/*{{libsodium}}*/"], [injectTabs(functionsCode, 2), injectTabs(exportsCode, 3), libsodiumModuleName]
  );
  fs.writeFileSync(wrappersPath, scriptBuf);
  fs.writeFileSync(apiPath, docBuilder.getResultDoc());
}

function injectTabs(code, count) {
  if (count == undefined) count = 1;

  var out = "";
  code = code.replace(/\r?\n$/, "") // remove trailing line break to avoid split result past the code end
  var lines = code.split(/\r?\n/g);
  for (var i = 0; i < lines.length; ++i) {
    if (lines[i] !== "") {
      out += "  ".repeat(count) + lines[i];
    }
    out += "\n";
  }
  return out;
}

function loadConstants() {
  var constList = fs.readFileSync(path.join(__dirname, "constants.json"), {
    encoding: "utf8"
  });
  try {
    constList = JSON.parse(constList);
  } catch (e) {
    console.error("Invalid constants list");
    process.exit(1);
  }
  if (!(Array.isArray(constList) && checkObjectArray(constList))) {
    console.error("constants file must contain an array of objects");
    process.exit(1);
  }
  var constSymbols = [];
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
    if (typeof a[i] !== "string") return false;
  return true;
}

function checkObjectArray(a) {
  for (var i = 0; i < a.length; i++)
    if (typeof a[i] !== "object") return false;
  return true;
}

//Inject a semi-colon at the end of the line, if one is missing
function sc(s) {
  if (s.lastIndexOf(";") != s.length - 1) return s + ";";
  else return s;
}
