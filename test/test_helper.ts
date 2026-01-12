// For local testing, we use the browser bundle which is self-contained
// (doesn't depend on external libsodium package)
// biome-ignore lint/suspicious/noExplicitAny: Dynamic require of sodium library
let _sodium: any;

try {
	_sodium = require("../dist/browsers-sumo/sodium");
} catch (_e) {
	_sodium = require("../dist/browsers/sodium");
}

async function init() {
	await _sodium.ready;
	return _sodium;
}

module.exports = { init };
