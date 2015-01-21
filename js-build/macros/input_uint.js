// ---------- input: {var_name} (uint)

_require_defined(toDealloc, {var_name}, "{var_name}");

if (!(typeof {var_name} === 'number' && ({var_name} | 0) === {var_name}) && ({var_name} | 0) > 0) {
	_throw_type_error(toDealloc, '{var_name} must be an unsigned integer');
}
