// ---------- input: {var_name} (uint)

requireDefined(toDealloc, {var_name}, "{var_name}");

if (!(typeof {var_name} === 'number' && Math.floor({var_name}) === {var_name})) {
	throwTypeError(toDealloc, '{var_name} must be an unsigned integer');
}
