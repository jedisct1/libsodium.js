// ---------- input: {var_name} (uint)

requireDefined(toDealloc, {var_name}, "{var_name}");

if (!(typeof {var_name} === 'number' && ({var_name} | 0) === {var_name}) && ({var_name} | 0) > 0) {
	throwTypeError(toDealloc, '{var_name} must be an unsigned integer');
}
