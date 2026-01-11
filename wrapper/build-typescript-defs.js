#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Type mappings from libsodium.js types to TypeScript types
const typeMap = {
  'buf': 'Uint8Array',
  'unsized_buf': 'Uint8Array | string',
  'unsized_buf_optional': 'Uint8Array | string | null',
  'minsized_buf': 'Uint8Array',
  'buf_optional': 'Uint8Array | null',
  'uint': 'number',
  'u64': 'number',
  'string': 'string',
  'unsized_string': 'string',
  'randombytes_implementation': 'any',
  // State types for streaming APIs (both with and without _address suffix)
  'generichash_state': 'StateAddress',
  'generichash_state_address': 'StateAddress',
  'onetimeauth_state': 'StateAddress',
  'onetimeauth_state_address': 'StateAddress',
  'secretstream_xchacha20poly1305_state': 'StateAddress',
  'secretstream_xchacha20poly1305_state_address': 'StateAddress',
  'sign_state': 'StateAddress',
  'sign_state_address': 'StateAddress',
  'hash_sha256_state': 'StateAddress',
  'hash_sha256_state_address': 'StateAddress',
  'hash_sha512_state': 'StateAddress',
  'hash_sha512_state_address': 'StateAddress',
  'auth_hmacsha256_state': 'StateAddress',
  'auth_hmacsha256_state_address': 'StateAddress',
  'auth_hmacsha512256_state': 'StateAddress',
  'auth_hmacsha512256_state_address': 'StateAddress',
  'auth_hmacsha512_state': 'StateAddress',
  'auth_hmacsha512_state_address': 'StateAddress',
  'xof_shake128_state': 'StateAddress',
  'xof_shake128_state_address': 'StateAddress',
  'xof_shake256_state': 'StateAddress',
  'xof_shake256_state_address': 'StateAddress',
  'xof_turboshake128_state': 'StateAddress',
  'xof_turboshake128_state_address': 'StateAddress',
  'xof_turboshake256_state': 'StateAddress',
  'xof_turboshake256_state_address': 'StateAddress',
};

// Output format union type
const outputFormatType = '"uint8array" | "text" | "hex" | "base64"';

// Return type based on format
const returnTypeWithFormat = 'Uint8Array | string';

// Helper functions with their signatures
const helperFunctions = `
// Helper functions
export function from_base64(input: string, variant?: base64_variants): Uint8Array;
export function to_base64(input: Uint8Array | string, variant?: base64_variants): string;
export function from_hex(input: string): Uint8Array;
export function to_hex(input: Uint8Array | string): string;
export function from_string(input: string): Uint8Array;
export function to_string(input: Uint8Array): string;
export function pad(buf: Uint8Array, blocksize: number): Uint8Array;
export function unpad(buf: Uint8Array, blocksize: number): Uint8Array;
export function memcmp(b1: Uint8Array, b2: Uint8Array): boolean;
export function memzero(bytes: Uint8Array): void;
export function increment(bytes: Uint8Array): void;
export function add(a: Uint8Array, b: Uint8Array): void;
export function compare(b1: Uint8Array, b2: Uint8Array): number;
export function is_zero(bytes: Uint8Array): boolean;
`;

// Base64 variants enum
const base64Variants = `
export const base64_variants: {
  ORIGINAL: number;
  ORIGINAL_NO_PADDING: number;
  URLSAFE: number;
  URLSAFE_NO_PADDING: number;
};

export type base64_variants = number;
`;

// Output formats enum
const outputFormats = `
export const output_formats: string[];
`;

// StateAddress type for streaming APIs
const stateAddressType = `
export type StateAddress = {
  name: string;
  address: number;
};
`;

function generateTypeScriptDefs(symbolsDir, constantsFile, outputFile, isSumo = false) {
  let dts = `// TypeScript definitions for libsodium-wrappers${isSumo ? '-sumo' : ''}
// Auto-generated - do not edit manually

`;

  // Add ready promise
  dts += `/**
 * Promise that resolves when the library is ready to use.
 * All crypto operations must wait for this promise to resolve.
 */
export const ready: Promise<void>;

`;

  // Add types and helper functions
  dts += stateAddressType + '\n';
  dts += base64Variants + '\n';
  dts += outputFormats + '\n';
  dts += helperFunctions + '\n';

  // Read and add constants
  const constants = JSON.parse(fs.readFileSync(constantsFile, 'utf8'));
  dts += '// Constants\n';
  for (const constant of constants) {
    const tsType = constant.type === 'string' ? 'string' : 'number';
    dts += `export const ${constant.name}: ${tsType};\n`;
  }
  dts += '\n';

  // Read and process all symbol files
  const symbolFiles = fs.readdirSync(symbolsDir).filter(f => f.endsWith('.json'));

  // Check if this is sumo variant by looking for sumo-only symbols
  const sumoOnlySymbols = [
    'crypto_pwhash_scryptsalsa208sha256',
    'crypto_pwhash_scryptsalsa208sha256_str',
    'crypto_pwhash_scryptsalsa208sha256_str_verify',
  ];

  dts += '// Crypto functions\n';

  for (const file of symbolFiles.sort()) {
    const symbolPath = path.join(symbolsDir, file);
    const symbol = JSON.parse(fs.readFileSync(symbolPath, 'utf8'));

    if (symbol.type !== 'function') continue;

    // Skip sumo-only symbols in standard build
    if (!isSumo && sumoOnlySymbols.some(s => symbol.name.startsWith(s))) {
      continue;
    }

    const funcName = symbol.name;
    const inputs = symbol.inputs || [];
    const outputs = symbol.outputs || [];

    // Build parameter list
    const params = [];

    for (const input of inputs) {
      const tsType = typeMap[input.type] || 'any';
      params.push(`${input.name}: ${tsType}`);
    }

    // Add optional outputFormat parameter if function returns formatted output
    const hasFormattedOutput = symbol.return && symbol.return.includes('_format_output');
    if (hasFormattedOutput) {
      params.push(`outputFormat?: ${outputFormatType}`);
    }

    // Determine return type
    let returnType = 'void';

    // First check if the function returns an object (keypair, detached, etc.)
    const objectReturnType = parseObjectReturnType(symbol.return);
    if (objectReturnType) {
      returnType = objectReturnType;
    } else if (outputs.length > 0) {
      const outputType = outputs[0].type;

      // Check if it's a state type
      if (outputType && (outputType.includes('_state') || outputType.includes('state_address'))) {
        returnType = 'StateAddress';
      } else if (hasFormattedOutput) {
        returnType = returnTypeWithFormat;
      } else if (typeMap[outputType]) {
        returnType = typeMap[outputType];
      } else {
        returnType = 'Uint8Array';
      }
    } else if (symbol.return) {
      // Check if function returns a boolean (e.g., "result === 0")
      if (symbol.return.includes('===') || symbol.return.includes('!==') ||
          symbol.return.includes('==') || symbol.return.includes('!=') ||
          funcName.includes('_verify')) {
        returnType = 'boolean';
      } else if (hasFormattedOutput) {
        returnType = returnTypeWithFormat;
      } else if (symbol.return.includes('UTF8ToString') || symbol.return.includes('_string')) {
        // Functions that return strings
        returnType = 'string';
      } else if (symbol.return.includes('random_value') || symbol.return.includes('>>> 0') ||
                 symbol.return.match(/\b(value|result|ret|retval)\b/) && !symbol.return.includes('_format_output')) {
        // Functions that return numeric values
        returnType = 'number';
      }
    }

    // Generate JSDoc comment if needed
    const jsdoc = generateJSDoc(symbol);
    if (jsdoc) {
      dts += jsdoc;
    }

    dts += `export function ${funcName}(${params.join(', ')}): ${returnType};\n`;
  }

  // Add symbols array
  dts += '\n// Internal: list of all exported symbols\n';
  dts += 'export function symbols(): string[];\n';

  // Write output file
  fs.writeFileSync(outputFile, dts);
  console.log(`Generated TypeScript definitions: ${outputFile}`);
}

function generateJSDoc(symbol) {
  // Could be enhanced to extract more documentation
  // For now, keeping it simple
  return '';
}

// Parse object return types from return statements
function parseObjectReturnType(returnStatement) {
  if (!returnStatement || !returnStatement.includes('{')) {
    return null;
  }

  const objTypes = {};

  // Pattern 1: {publicKey: _format_output(...), privateKey: _format_output(...), keyType: '...'}
  const keypairMatch = returnStatement.match(/\{publicKey:.*privateKey:.*keyType:/);
  if (keypairMatch) {
    return `{publicKey: ${returnTypeWithFormat}, privateKey: ${returnTypeWithFormat}, keyType: string}`;
  }

  // Pattern 2: _format_output({ciphertext: ..., mac: ...}, outputFormat)
  const detachedCipherMatch = returnStatement.match(/_format_output\(\{ciphertext:.*mac:.*\}/);
  if (detachedCipherMatch) {
    return `{ciphertext: ${returnTypeWithFormat}, mac: ${returnTypeWithFormat}}`;
  }

  // Pattern 3: _format_output({mac: ..., cipher: ...}, outputFormat)
  const detachedMacCipherMatch = returnStatement.match(/_format_output\(\{mac:.*cipher:.*\}/);
  if (detachedMacCipherMatch) {
    return `{mac: ${returnTypeWithFormat}, cipher: ${returnTypeWithFormat}}`;
  }

  // Pattern 4: _format_output({sharedRx: ..., sharedTx: ...}, outputFormat)
  const sessionKeysMatch = returnStatement.match(/_format_output\(\{sharedRx:.*sharedTx:.*\}/);
  if (sessionKeysMatch) {
    return `{sharedRx: ${returnTypeWithFormat}, sharedTx: ${returnTypeWithFormat}}`;
  }

  // Pattern 5: { state: state_address, header: _format_output(...) }
  const stateHeaderMatch = returnStatement.match(/\{\s*state:\s*state_address,\s*header:/);
  if (stateHeaderMatch) {
    return `{state: StateAddress, header: ${returnTypeWithFormat}}`;
  }

  // Pattern 6: ret && {message: _format_output(ret.message, outputFormat), tag: ret.tag}
  const pullMatch = returnStatement.match(/ret\s*&&\s*\{message:.*tag:/);
  if (pullMatch) {
    return `{message: ${returnTypeWithFormat}, tag: number} | void`;
  }

  return null;
}

// Main execution
const args = process.argv.slice(2);
const isSumo = args.includes('--sumo');

const symbolsDir = path.join(__dirname, 'symbols');
const constantsFile = path.join(__dirname, 'constants.json');

// Generate standard definitions
if (!isSumo || args.includes('--all')) {
  const outputFile = path.join(__dirname, '..', 'dist', 'modules', 'libsodium-wrappers.d.ts');
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  generateTypeScriptDefs(symbolsDir, constantsFile, outputFile, false);
}

// Generate sumo definitions
if (isSumo || args.includes('--all')) {
  const outputFile = path.join(__dirname, '..', 'dist', 'modules-sumo', 'libsodium-wrappers.d.ts');
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  generateTypeScriptDefs(symbolsDir, constantsFile, outputFile, true);
}
