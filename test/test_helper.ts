// biome-ignore lint/suspicious/noExplicitAny: Dynamic require of sodium library
let _sodium: any;

try {
	_sodium = require("../dist/browsers-sumo/sodium");
} catch {
	_sodium = require("../dist/browsers/sodium");
}

export async function init(): Promise<typeof _sodium> {
	await _sodium.ready;
	return _sodium;
}
