var docStr = '# Libsodium.js wrapper - API usage' + newParagraph();
docStr += 'To learn about the role of each method, please refer to the original [documentation](http://doc.libsodium.org) of libsodium' + newParagraph();
docStr += 'List of existing types:' + newLine();
docStr += '* Buffer : An Uint8Array of a determined size. Used for keys, nonces, etc...' + newLine();
docStr += '* Unsized Buffer : An Uint8Array of an arbitrary size. Used for messages to sign, encrypt, hash, etc...' + newLine();
docStr += '* Uint : An unsigned integer' + newLine();
docStr += '* Encoding : A string indicating in which encoding you want the result to be returned. Supported values are "uint8array", "utf8", "hex", "base64". Optional parameter. Not available on all functions. Defaults to uint8array. Note that you can change the default encoding by calling `libsodium.set_encoding(encodingName)`' + newParagraph();
docStr += 'Please note that a function that returns more than one variable will in fact return an object, which will contain the outputs in question and whose attributes will be named after the outputs\' names' + newParagraph();
docStr += 'Please also note that these are the function available "in general" in the wrapper. The actual number of availble functions in given build may be inferior to that, depending on what functions you choose to build to JS.' + newParagraph();

exports.buildDocForSymbol = function(s){
	if (typeof s != 'object') throw new TypeError('s must be a object');
	if (!(s.type && (s.type == 'function' || s.type == 'uint'))) throw new Error('Invalid symbol type');
	var sDoc = '## ' + s.name + newLine();

	if (s.type == 'function'){
		if (!Array.isArray(s.inputs)) throw new Error('Invalid type for symbol.inputs. Symbol: ' + JSON.stringify(s));
		if (!Array.isArray(s.outputs)) throw new Error('Invalid type for symbol.outputs. Symbol: ' + JSON.stringify(s));
		sDoc += 'Function' + newParagraph();
		sDoc += '__Parameters:__' + newLine();
		for (var i = 0; i < s.inputs.length; i++){
			sDoc += '* `' + s.inputs[i].name + '`: ';
			var paramType = s.inputs[i].type;
			if (paramType == 'buffer'){
				sDoc += 'Buffer (size: ' + s.inputs[i].size + ')';
			} else if (paramType == 'unsized_buffer'){
				sDoc += 'Unsized buffer';
			} else if (paramType == 'uint'){
				sDoc += 'Unsigned Integer';
			} else if (paramType == 'encoding'){
				sDoc += 'Encoding type';
			} else throw new Error('Unknown parameter type: ' + paramType);
			sDoc += newLine();
		}
		sDoc += newLine() + '__Outputs:__' + newLine();
		if (s.outputs.length > 0){
			for (var i = 0; i < s.outputs.length; i++){
				sDoc += '* `' + s.outputs[i].name + '`: ';
				var outputType = s.outputs[i].type;
				if (outputType == 'buffer'){
					sDoc += 'Buffer (size: ' + s.outputs[i].size + ')';
				} else if (outputType == 'uint'){
					sDoc += 'Unsigned Integer';
				} else throw new Error('Unknown output type: ' + outputType);
				sDoc += newLine();
			}
		} else {
			sDoc += 'Boolean. True if method executed with success; false otherwise' + newLine();
		}
	} else {
		sDoc += 'Constant' + newParagraph();
	}

	sDoc += newParagraph();

	docStr += sDoc;
}

exports.getResultDoc = function(){
	return docStr;
}

function newLine(){
	return '\r\n';
}

function newParagraph(){
	return '\r\n\r\n';
}
