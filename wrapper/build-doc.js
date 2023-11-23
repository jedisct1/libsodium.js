var docStr = "# Libsodium.js wrapper - API usage" + newParagraph();
docStr +=
  "To learn about the role of each method, please refer to the original [documentation](https://doc.libsodium.org) of libsodium" +
  newParagraph();
docStr += "List of existing types:" + newLine();
docStr +=
  "* `Buf`: An Uint8Array of a determined size. Used for keys, nonces, etc..." +
  newLine();
docStr +=
  "* `Unsized Buf`: An Uint8Array of an arbitrary size. Used for messages to sign, encrypt, hash, etc..." +
  newLine();
docStr +=
  "* `Minsized Buf`: An Uint8Array of a minimum size. Used for ciphertexts" +
  newLine();
docStr += "* `Optional unsized buf`" + newLine();
docStr += "* `Unsigned Integer`" + newLine();
docStr += "* `Generichash state`" + newLine();
docStr += "* `OneTimeAuth state`" + newLine();
docStr += "* `Secretstream XChaCha20Poly1305 state`" + newLine();
docStr += "* `Signature state`" + newLine();
docStr += "* `Randombytes implementation`" + newLine();
docStr += "* `String`" + newLine();
docStr +=
  '* outputFormat: A string indicating in which output format you want the result to be returned. Supported values are "uint8array", "text", "hex", "base64". Optional parameter. Not available on all functions. Defaults to uint8array.' +
  newParagraph();
docStr +=
  "Please note that a function that returns more than one variable will in fact return an object, which will contain the outputs in question and whose attributes will be named after the outputs' names" +
  newParagraph();
docStr +=
  'Please also note that these are the function available "in general" in the wrapper. The actual number of available functions in given build may be inferior to that, depending on what functions you choose to build to JS.' +
  newParagraph();
docStr +=
  "In addition to the main functions listed below, the library comes with a short list of helper methods. And here they are:" +
  newLine();
docStr +=
  "* `from_string(string)`: converts a standard string into a Uint8Array" +
  newLine();
docStr +=
  "* `to_string(buf)`: converts a Uint8Array to a standard string" +
  newLine();
docStr +=
  "* `to_hex(buf)`: returns the hexadecimal representation of the provided buf" +
  newLine();
docStr +=
  "* `from_hex(string)`: converts the provided hex-string into a Uint8Array and returns it" +
  newLine();
docStr +=
  "* `to_base64(buf, variant)`: returns the base64 representation of the provided buf" +
  newLine();
docStr +=
  "* `from_base64(string, variant)`: tries to convert the supposedly base64 string into a Uint8Array" +
  newLine();
docStr +=
  "* `symbols()`: returns a list of the currently methods and constants" +
  newLine();
docStr +=
  "* `raw`: attribute referencing the raw emscripten-built libsodium library that we are wrapping" +
  newParagraph();

exports.buildDocForSymbol = function (s) {
  if (typeof s != "object") throw new TypeError("s must be a object");
  if (!(s.type && (s.type == "function" || s.type == "uint")))
    throw new Error("Invalid symbol type");
  var sDoc = "## " + s.name + newLine();

  if (s.type == "function") {
    if (!Array.isArray(s.inputs))
      throw new Error(
        "Invalid type for symbol.inputs. Symbol: " + JSON.stringify(s)
      );
    if (!Array.isArray(s.outputs))
      throw new Error(
        "Invalid type for symbol.outputs. Symbol: " + JSON.stringify(s)
      );
    sDoc += "Function" + newParagraph();
    sDoc += "__Parameters:__" + newLine();
    for (var i = 0; i < s.inputs.length; i++) {
      sDoc += "* `" + s.inputs[i].name + "`: ";
      var paramType = s.inputs[i].type;
      if (paramType == "buf") {
        sDoc += "Buf (size: " + s.inputs[i].size + ")";
      } else if (paramType == "unsized_buf") {
        sDoc += "Unsized buf";
      } else if (paramType == "minsized_buf") {
        sDoc += "Minsized buf";
      } else if (paramType == "unsized_buf_optional") {
        sDoc += "Optional unsized buf";
      } else if (paramType == "buf_optional") {
        sDoc += "Optional buf";
      } else if (paramType == "uint") {
        sDoc += "Unsigned Integer";
      } else if (paramType == "generichash_state_address") {
        sDoc += "Generichash state address";
      } else if (paramType == "hash_sha256_state_address") {
        sDoc += "Sha256 state address";
      } else if (paramType == "hash_sha512_state_address") {
        sDoc += "Sha512 state address";
      } else if (paramType == "auth_hmacsha256_state_address") {
        sDoc += "Hmac Sha256 state address";
      } else if (paramType == "auth_hmacsha512_state_address") {
        sDoc += "Hmac Sha512 state address";
      } else if (paramType == "onetimeauth_state_address") {
        sDoc += "OneTimeAuth state address";
      } else if (paramType == "sign_state_address") {
        sDoc += "Signature state address";
      } else if (paramType == "secretstream_xchacha20poly1305_state_address") {
        sDoc += "Secretstream XChaCha20Poly1305 state address";
      } else if (paramType == "randombytes_implementation") {
        sDoc += "Randombytes implementation";
      } else if (paramType == "string") {
        sDoc += "A string";
      } else if (paramType == "u64") {
        sDoc += "An unsigned int or 64-bit BigInt";
      } else throw new Error("Unknown parameter type: " + paramType);
      sDoc += newLine();
    }
    sDoc += newLine() + "__Outputs:__" + newLine();
    if (s.outputs.length > 0) {
      for (i = 0; i < s.outputs.length; i++) {
        sDoc += "* `" + s.outputs[i].name + "`: ";
        var outputType = s.outputs[i].type;
        if (outputType == "buf") {
          sDoc += "Buf (size: " + s.outputs[i].size + ")";
        } else if (outputType == "uint") {
          sDoc += "Unsigned Integer";
        } else if (outputType == "generichash_state") {
          sDoc += "Generichash state";
        } else if (outputType == "hash_sha256_state") {
          sDoc += "Sha256 state";
        } else if (outputType == "hash_sha512_state") {
          sDoc += "Sha512 state";
        } else if (outputType == "auth_hmacsha256_state") {
          sDoc += "Hmac Sha256 state";
        } else if (outputType == "auth_hmacsha512_state") {
          sDoc += "Hmac Sha512 state";
        } else if (outputType == "onetimeauth_state") {
          sDoc += "OneTimeAuth state";
        } else if (outputType == "sign_state") {
          sDoc += "Signature state";
        } else if (outputType == "secretstream_xchacha20poly1305_state") {
          sDoc += "Secretstream XChaCha20Poly1305 state";
        } else throw new Error("Unknown output type: " + outputType);
        sDoc += newLine();
      }
    } else {
      sDoc +=
        "Boolean. True if method executed with success; false otherwise" +
        newLine();
    }
  } else {
    sDoc += "Constant" + newParagraph();
  }

  sDoc += newParagraph();

  docStr += sDoc;
};

exports.getResultDoc = function () {
  return docStr;
};

function newLine() {
  return "\r\n";
}

function newParagraph() {
  return "\r\n\r\n";
}
