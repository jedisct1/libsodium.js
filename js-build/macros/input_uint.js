// ---------- input: {var_name} (uint)

if (!(typeof {var_name} === 'number' && Math.floor({var_name}) === {var_name})) {
	free_all(toDealloc);
	throw new TypeError('{var_name} must be an unsigned integer');
}
