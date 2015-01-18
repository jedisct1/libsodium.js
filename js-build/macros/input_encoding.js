// ---------- input: {var_name} (encoding)

if ({var_name} && typeof {var_name} !== 'string') {
	free_all(toDealloc);
	throw new TypeError('When defined, {var_name} must be a string');
}
if ({var_name} && !is_encoding({var_name})) {
	free_all(toDealloc);
	throw new Error('{var_name} is not a valid encoding');
}
