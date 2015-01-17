if (!{var_name} || typeof {var_name} == 'undefined') throw new Error('{var_name} cannot be null or undefined');
var {var_name}_byte;
var {var_name}_size = {var_name}.length;
if ({var_name} instanceof Uint8Array){
	{var_name}_byte = injectBytes({var_name});
	toDealloc.push({var_name}_byte);
} else if (typeof {var_name} == 'string'){
	{var_name}_byte = injectBytes(string_to_Uint8Array({var_name}));
	toDealloc.push({var_name}_byte);
} else throw new TypeError('Illegal input type for {var_name}');
