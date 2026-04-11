import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const generatedEsmWrappers = [
	"dist/modules-esm/libsodium-wrappers.mjs",
	"dist/modules-sumo-esm/libsodium-wrappers.mjs",
];

for (const wrapperPath of generatedEsmWrappers) {
	test(`${wrapperPath} supports both ESM export shapes`, () => {
		const wrapper = readFileSync(wrapperPath, "utf8");

		expect(wrapper).toContain('Unsupported libsodium ESM export shape');
		expect(wrapper).toContain('.default');
		expect(wrapper).toContain('.default.ready');
		expect(wrapper).toContain('.ready.then(function');
		expect(wrapper).toMatch(/return (n|moduleInstance)/);
	});
}
