# libsodium.js API Reference (Sumo)

JavaScript bindings for libsodium, compiled to WebAssembly.

For detailed documentation on each function, see the [libsodium documentation](https://doc.libsodium.org).

## Quick Start

```javascript
import sodium from 'libsodium-wrappers';

await sodium.ready;

const key = sodium.crypto_secretbox_keygen();
const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
const message = sodium.from_string('Hello, World!');
const ciphertext = sodium.crypto_secretbox_easy(message, nonce, key);
```

## Types

| Type | Description |
|------|-------------|
| `Uint8Array` | Binary data (keys, nonces, messages) |
| `Uint8Array \| string` | Binary data or UTF-8 string |
| `StateAddress` | Opaque state object for streaming operations |
| `OutputFormat` | `"uint8array"` \| `"hex"` \| `"base64"` \| `"text"` |

## Helper Functions

| Function | Description |
|----------|-------------|
| `from_string(str)` | Convert UTF-8 string to `Uint8Array` |
| `to_string(buf)` | Convert `Uint8Array` to UTF-8 string |
| `from_hex(hex)` | Decode hex string to `Uint8Array` |
| `to_hex(buf)` | Encode `Uint8Array` to hex string |
| `from_base64(b64, variant?)` | Decode base64 to `Uint8Array` |
| `to_base64(buf, variant?)` | Encode `Uint8Array` to base64 |
| `memzero(buf)` | Securely zero memory |
| `memcmp(a, b)` | Constant-time comparison |
| `increment(buf)` | Increment as little-endian number |
| `add(a, b)` | Add as little-endian numbers |
| `compare(a, b)` | Compare as little-endian numbers |
| `is_zero(buf)` | Check if all bytes are zero |
| `pad(buf, blocksize)` | Add ISO/IEC 7816-4 padding |
| `unpad(buf, blocksize)` | Remove padding |

## Table of Contents

- [AEAD Encryption](#aead-encryption) (25)
- [Secret-key Encryption](#secret-key-encryption) (15)
- [Public-key Encryption](#public-key-encryption) (24)
- [Signatures](#signatures) (14)
- [Hashing](#hashing) (18)
- [Password Hashing](#password-hashing) (8)
- [Key Derivation](#key-derivation) (2)
- [Key Exchange](#key-exchange) (12)
- [Message Authentication](#message-authentication) (27)
- [Secret Streams](#secret-streams) (6)
- [Random](#random) (7)
- [Utilities](#utilities) (32)
- [XOF (Extendable Output)](#xof-extendable-output-) (20)
- [IP Address Encryption](#ip-address-encryption) (12)
- [Constants](#constants)

## AEAD Encryption

Authenticated Encryption with Associated Data

### crypto_aead_aegis128l_decrypt

```typescript
crypto_aead_aegis128l_decrypt(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_AEGIS128L_NSECBYTES`
- `ciphertext`: `Uint8Array`
- `additional_data`: `Uint8Array | string | null`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_AEGIS128L_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_AEGIS128L_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_AEAD_AEGIS128L_ABYTES`

### crypto_aead_aegis128l_decrypt_detached

```typescript
crypto_aead_aegis128l_decrypt_detached(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array | string, mac: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_AEGIS128L_NSECBYTES`
- `ciphertext`: `Uint8Array | string`
- `mac`: `Uint8Array` — size: `CRYPTO_AEAD_AEGIS128L_ABYTES`
- `additional_data`: `Uint8Array | string | null`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_AEGIS128L_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_AEGIS128L_KEYBYTES`

**Returns:** `Uint8Array` — size: `ciphertext.length`

### crypto_aead_aegis128l_encrypt

```typescript
crypto_aead_aegis128l_encrypt(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `additional_data`: `Uint8Array | string | null`
- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_AEGIS128L_NSECBYTES`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_AEGIS128L_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_AEGIS128L_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_AEAD_AEGIS128L_ABYTES`

### crypto_aead_aegis128l_encrypt_detached

```typescript
crypto_aead_aegis128l_encrypt_detached(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): {ciphertext, mac}
```

**Parameters:**

- `message`: `Uint8Array | string`
- `additional_data`: `Uint8Array | string | null`
- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_AEGIS128L_NSECBYTES`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_AEGIS128L_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_AEGIS128L_KEYBYTES`

**Returns:** An object with:

- `ciphertext`: `Uint8Array | string`
- `mac`: `Uint8Array | string`

### crypto_aead_aegis128l_keygen

```typescript
crypto_aead_aegis128l_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_AEAD_AEGIS128L_KEYBYTES`

### crypto_aead_aegis256_decrypt

```typescript
crypto_aead_aegis256_decrypt(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_AEGIS256_NSECBYTES`
- `ciphertext`: `Uint8Array`
- `additional_data`: `Uint8Array | string | null`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_AEGIS256_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_AEGIS256_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_AEAD_AEGIS256_ABYTES`

### crypto_aead_aegis256_decrypt_detached

```typescript
crypto_aead_aegis256_decrypt_detached(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array | string, mac: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_AEGIS256_NSECBYTES`
- `ciphertext`: `Uint8Array | string`
- `mac`: `Uint8Array` — size: `CRYPTO_AEAD_AEGIS256_ABYTES`
- `additional_data`: `Uint8Array | string | null`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_AEGIS256_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_AEGIS256_KEYBYTES`

**Returns:** `Uint8Array` — size: `ciphertext.length`

### crypto_aead_aegis256_encrypt

```typescript
crypto_aead_aegis256_encrypt(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `additional_data`: `Uint8Array | string | null`
- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_AEGIS256_NSECBYTES`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_AEGIS256_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_AEGIS256_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_AEAD_AEGIS256_ABYTES`

### crypto_aead_aegis256_encrypt_detached

```typescript
crypto_aead_aegis256_encrypt_detached(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): {ciphertext, mac}
```

**Parameters:**

- `message`: `Uint8Array | string`
- `additional_data`: `Uint8Array | string | null`
- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_AEGIS256_NSECBYTES`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_AEGIS256_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_AEGIS256_KEYBYTES`

**Returns:** An object with:

- `ciphertext`: `Uint8Array | string`
- `mac`: `Uint8Array | string`

### crypto_aead_aegis256_keygen

```typescript
crypto_aead_aegis256_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_AEAD_AEGIS256_KEYBYTES`

### crypto_aead_chacha20poly1305_decrypt

```typescript
crypto_aead_chacha20poly1305_decrypt(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_CHACHA20POLY1305_NSECBYTES`
- `ciphertext`: `Uint8Array`
- `additional_data`: `Uint8Array | string | null`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_ABYTES`

### crypto_aead_chacha20poly1305_decrypt_detached

```typescript
crypto_aead_chacha20poly1305_decrypt_detached(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array | string, mac: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_CHACHA20POLY1305_NSECBYTES`
- `ciphertext`: `Uint8Array | string`
- `mac`: `Uint8Array` — size: `CRYPTO_BOX_MACBYTES`
- `additional_data`: `Uint8Array | string | null`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_KEYBYTES`

**Returns:** `Uint8Array` — size: `ciphertext.length`

### crypto_aead_chacha20poly1305_encrypt

```typescript
crypto_aead_chacha20poly1305_encrypt(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `additional_data`: `Uint8Array | string | null`
- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_CHACHA20POLY1305_NSECBYTES`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_ABYTES`

### crypto_aead_chacha20poly1305_encrypt_detached

```typescript
crypto_aead_chacha20poly1305_encrypt_detached(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): {ciphertext, mac}
```

**Parameters:**

- `message`: `Uint8Array | string`
- `additional_data`: `Uint8Array | string | null`
- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_CHACHA20POLY1305_NSECBYTES`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_KEYBYTES`

**Returns:** An object with:

- `ciphertext`: `Uint8Array | string`
- `mac`: `Uint8Array | string`

### crypto_aead_chacha20poly1305_ietf_decrypt

```typescript
crypto_aead_chacha20poly1305_ietf_decrypt(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_CHACHA20POLY1305_IETF_NSECBYTES`
- `ciphertext`: `Uint8Array`
- `additional_data`: `Uint8Array | string | null`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_IETF_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_IETF_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_IETF_ABYTES`

### crypto_aead_chacha20poly1305_ietf_decrypt_detached

```typescript
crypto_aead_chacha20poly1305_ietf_decrypt_detached(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array | string, mac: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_CHACHA20POLY1305_IETF_NSECBYTES`
- `ciphertext`: `Uint8Array | string`
- `mac`: `Uint8Array` — size: `CRYPTO_BOX_MACBYTES`
- `additional_data`: `Uint8Array | string | null`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_IETF_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_IETF_KEYBYTES`

**Returns:** `Uint8Array` — size: `ciphertext.length`

### crypto_aead_chacha20poly1305_ietf_encrypt

```typescript
crypto_aead_chacha20poly1305_ietf_encrypt(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `additional_data`: `Uint8Array | string | null`
- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_CHACHA20POLY1305_IETF_NSECBYTES`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_IETF_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_IETF_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_IETF_ABYTES`

### crypto_aead_chacha20poly1305_ietf_encrypt_detached

```typescript
crypto_aead_chacha20poly1305_ietf_encrypt_detached(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): {ciphertext, mac}
```

**Parameters:**

- `message`: `Uint8Array | string`
- `additional_data`: `Uint8Array | string | null`
- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_CHACHA20POLY1305_IETF_NSECBYTES`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_IETF_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_IETF_KEYBYTES`

**Returns:** An object with:

- `ciphertext`: `Uint8Array | string`
- `mac`: `Uint8Array | string`

### crypto_aead_chacha20poly1305_ietf_keygen

```typescript
crypto_aead_chacha20poly1305_ietf_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_IETF_KEYBYTES`

### crypto_aead_chacha20poly1305_keygen

```typescript
crypto_aead_chacha20poly1305_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_AEAD_CHACHA20POLY1305_KEYBYTES`

### crypto_aead_xchacha20poly1305_ietf_decrypt

```typescript
crypto_aead_xchacha20poly1305_ietf_decrypt(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_XCHACHA20POLY1305_IETF_NSECBYTES`
- `ciphertext`: `Uint8Array`
- `additional_data`: `Uint8Array | string | null`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_XCHACHA20POLY1305_IETF_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_XCHACHA20POLY1305_IETF_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_AEAD_XCHACHA20POLY1305_IETF_ABYTES`

### crypto_aead_xchacha20poly1305_ietf_decrypt_detached

```typescript
crypto_aead_xchacha20poly1305_ietf_decrypt_detached(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array | string, mac: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_XCHACHA20POLY1305_IETF_NSECBYTES`
- `ciphertext`: `Uint8Array | string`
- `mac`: `Uint8Array` — size: `CRYPTO_BOX_MACBYTES`
- `additional_data`: `Uint8Array | string | null`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_XCHACHA20POLY1305_IETF_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_XCHACHA20POLY1305_IETF_KEYBYTES`

**Returns:** `Uint8Array` — size: `ciphertext.length`

### crypto_aead_xchacha20poly1305_ietf_encrypt

```typescript
crypto_aead_xchacha20poly1305_ietf_encrypt(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `additional_data`: `Uint8Array | string | null`
- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_XCHACHA20POLY1305_IETF_NSECBYTES`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_XCHACHA20POLY1305_IETF_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_XCHACHA20POLY1305_IETF_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_AEAD_XCHACHA20POLY1305_IETF_ABYTES`

### crypto_aead_xchacha20poly1305_ietf_encrypt_detached

```typescript
crypto_aead_xchacha20poly1305_ietf_encrypt_detached(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): {ciphertext, mac}
```

**Parameters:**

- `message`: `Uint8Array | string`
- `additional_data`: `Uint8Array | string | null`
- `secret_nonce`: `Uint8Array | string | null` — size: `CRYPTO_AEAD_XCHACHA20POLY1305_IETF_NSECBYTES`
- `public_nonce`: `Uint8Array` — size: `CRYPTO_AEAD_XCHACHA20POLY1305_IETF_NPUBBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_AEAD_XCHACHA20POLY1305_IETF_KEYBYTES`

**Returns:** An object with:

- `ciphertext`: `Uint8Array | string`
- `mac`: `Uint8Array | string`

### crypto_aead_xchacha20poly1305_ietf_keygen

```typescript
crypto_aead_xchacha20poly1305_ietf_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_AEAD_XCHACHA20POLY1305_IETF_KEYBYTES`

## Secret-key Encryption

Symmetric encryption using a shared secret key

### crypto_secretbox_detached

```typescript
crypto_secretbox_detached(message: Uint8Array | string, nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): {mac, cipher}
```

**Parameters:**

- `message`: `Uint8Array | string`
- `nonce`: `Uint8Array` — size: `CRYPTO_SECRETBOX_NONCEBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_SECRETBOX_KEYBYTES`

**Returns:** An object with:

- `mac`: `Uint8Array | string`
- `cipher`: `Uint8Array | string`

### crypto_secretbox_easy

```typescript
crypto_secretbox_easy(message: Uint8Array | string, nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `nonce`: `Uint8Array` — size: `CRYPTO_SECRETBOX_NONCEBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_SECRETBOX_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_SECRETBOX_MACBYTES`

### crypto_secretbox_keygen

```typescript
crypto_secretbox_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_SECRETBOX_KEYBYTES`

### crypto_secretbox_open_detached

```typescript
crypto_secretbox_open_detached(ciphertext: Uint8Array | string, mac: Uint8Array, nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `ciphertext`: `Uint8Array | string`
- `mac`: `Uint8Array` — size: `CRYPTO_SECRETBOX_MACBYTES`
- `nonce`: `Uint8Array` — size: `CRYPTO_SECRETBOX_NONCEBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_SECRETBOX_KEYBYTES`

**Returns:** `Uint8Array` — size: `ciphertext.length`

### crypto_secretbox_open_easy

```typescript
crypto_secretbox_open_easy(ciphertext: Uint8Array, nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `ciphertext`: `Uint8Array`
- `nonce`: `Uint8Array` — size: `CRYPTO_SECRETBOX_NONCEBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_SECRETBOX_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_SECRETBOX_MACBYTES`

### crypto_stream_chacha20

```typescript
crypto_stream_chacha20(outLength: number, key: Uint8Array, nonce: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `outLength`: `number`
- `key`: `Uint8Array` — size: `CRYPTO_STREAM_CHACHA20_KEYBYTES`
- `nonce`: `Uint8Array` — size: `CRYPTO_STREAM_CHACHA20_NONCEBYTES`

**Returns:** `Uint8Array`

### crypto_stream_chacha20_ietf_xor

```typescript
crypto_stream_chacha20_ietf_xor(input_message: Uint8Array | string, nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `input_message`: `Uint8Array | string`
- `nonce`: `Uint8Array` — size: `CRYPTO_STREAM_CHACHA20_IETF_NONCEBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_STREAM_CHACHA20_IETF_KEYBYTES`

**Returns:** `Uint8Array` — size: `input_message.length`

### crypto_stream_chacha20_ietf_xor_ic

```typescript
crypto_stream_chacha20_ietf_xor_ic(input_message: Uint8Array | string, nonce: Uint8Array, nonce_increment: number, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `input_message`: `Uint8Array | string`
- `nonce`: `Uint8Array` — size: `CRYPTO_STREAM_CHACHA20_IETF_NONCEBYTES`
- `nonce_increment`: `number`
- `key`: `Uint8Array` — size: `CRYPTO_STREAM_CHACHA20_IETF_KEYBYTES`

**Returns:** `Uint8Array` — size: `input_message.length`

### crypto_stream_chacha20_keygen

```typescript
crypto_stream_chacha20_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_STREAM_CHACHA20_KEYBYTES`

### crypto_stream_chacha20_xor

```typescript
crypto_stream_chacha20_xor(input_message: Uint8Array | string, nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `input_message`: `Uint8Array | string`
- `nonce`: `Uint8Array` — size: `CRYPTO_STREAM_CHACHA20_NONCEBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_STREAM_CHACHA20_KEYBYTES`

**Returns:** `Uint8Array` — size: `input_message.length`

### crypto_stream_chacha20_xor_ic

```typescript
crypto_stream_chacha20_xor_ic(input_message: Uint8Array | string, nonce: Uint8Array, nonce_increment: number, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `input_message`: `Uint8Array | string`
- `nonce`: `Uint8Array` — size: `CRYPTO_STREAM_CHACHA20_NONCEBYTES`
- `nonce_increment`: `number`
- `key`: `Uint8Array` — size: `CRYPTO_STREAM_CHACHA20_KEYBYTES`

**Returns:** `Uint8Array` — size: `input_message.length`

### crypto_stream_keygen

```typescript
crypto_stream_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_STREAM_KEYBYTES`

### crypto_stream_xchacha20_keygen

```typescript
crypto_stream_xchacha20_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_STREAM_XCHACHA20_KEYBYTES`

### crypto_stream_xchacha20_xor

```typescript
crypto_stream_xchacha20_xor(input_message: Uint8Array | string, nonce: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `input_message`: `Uint8Array | string`
- `nonce`: `Uint8Array` — size: `CRYPTO_STREAM_XCHACHA20_NONCEBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_STREAM_XCHACHA20_KEYBYTES`

**Returns:** `Uint8Array` — size: `input_message.length`

### crypto_stream_xchacha20_xor_ic

```typescript
crypto_stream_xchacha20_xor_ic(input_message: Uint8Array | string, nonce: Uint8Array, nonce_increment: number, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `input_message`: `Uint8Array | string`
- `nonce`: `Uint8Array` — size: `CRYPTO_STREAM_XCHACHA20_NONCEBYTES`
- `nonce_increment`: `number`
- `key`: `Uint8Array` — size: `CRYPTO_STREAM_XCHACHA20_KEYBYTES`

**Returns:** `Uint8Array` — size: `input_message.length`

## Public-key Encryption

Asymmetric encryption using key pairs

### crypto_box_beforenm

```typescript
crypto_box_beforenm(publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `publicKey`: `Uint8Array` — size: `CRYPTO_BOX_PUBLICKEYBYTES`
- `privateKey`: `Uint8Array` — size: `CRYPTO_BOX_SECRETKEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_BOX_BEFORENMBYTES`

### crypto_box_curve25519xchacha20poly1305_beforenm

```typescript
crypto_box_curve25519xchacha20poly1305_beforenm(publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `publicKey`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_PUBLICKEYBYTES`
- `privateKey`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_SECRETKEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_BEFORENMBYTES`

### crypto_box_curve25519xchacha20poly1305_detached

```typescript
crypto_box_curve25519xchacha20poly1305_detached(message: Uint8Array | string, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: OutputFormat): {ciphertext, mac}
```

**Parameters:**

- `message`: `Uint8Array | string`
- `nonce`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_NONCEBYTES`
- `publicKey`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_PUBLICKEYBYTES`
- `privateKey`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_SECRETKEYBYTES`

**Returns:** An object with:

- `ciphertext`: `Uint8Array | string`
- `mac`: `Uint8Array | string`

### crypto_box_curve25519xchacha20poly1305_detached_afternm

```typescript
crypto_box_curve25519xchacha20poly1305_detached_afternm(message: Uint8Array | string, nonce: Uint8Array, sharedKey: Uint8Array, outputFormat?: OutputFormat): {ciphertext, mac}
```

**Parameters:**

- `message`: `Uint8Array | string`
- `nonce`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_NONCEBYTES`
- `sharedKey`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_BEFORENMBYTES`

**Returns:** An object with:

- `ciphertext`: `Uint8Array | string`
- `mac`: `Uint8Array | string`

### crypto_box_curve25519xchacha20poly1305_easy

```typescript
crypto_box_curve25519xchacha20poly1305_easy(message: Uint8Array | string, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `nonce`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_NONCEBYTES`
- `publicKey`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_PUBLICKEYBYTES`
- `privateKey`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_SECRETKEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_MACBYTES`

### crypto_box_curve25519xchacha20poly1305_easy_afternm

```typescript
crypto_box_curve25519xchacha20poly1305_easy_afternm(message: Uint8Array | string, nonce: Uint8Array, sharedKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `nonce`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_NONCEBYTES`
- `sharedKey`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_BEFORENMBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_MACBYTES`

### crypto_box_curve25519xchacha20poly1305_keypair

```typescript
crypto_box_curve25519xchacha20poly1305_keypair(outputFormat?: OutputFormat): {publicKey, privateKey, keyType}
```

**Returns:** An object with:

- `publicKey`: `Uint8Array | string`
- `privateKey`: `Uint8Array | string`
- `keyType`: `string`

### crypto_box_curve25519xchacha20poly1305_open_detached

```typescript
crypto_box_curve25519xchacha20poly1305_open_detached(ciphertext: Uint8Array | string, mac: Uint8Array, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `ciphertext`: `Uint8Array | string`
- `mac`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_MACBYTES`
- `nonce`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_NONCEBYTES`
- `publicKey`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_PUBLICKEYBYTES`
- `privateKey`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_SECRETKEYBYTES`

**Returns:** `Uint8Array` — size: `ciphertext.length`

### crypto_box_curve25519xchacha20poly1305_open_detached_afternm

```typescript
crypto_box_curve25519xchacha20poly1305_open_detached_afternm(ciphertext: Uint8Array | string, mac: Uint8Array, nonce: Uint8Array, sharedKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `ciphertext`: `Uint8Array | string`
- `mac`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_MACBYTES`
- `nonce`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_NONCEBYTES`
- `sharedKey`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_BEFORENMBYTES`

**Returns:** `Uint8Array` — size: `ciphertext.length`

### crypto_box_curve25519xchacha20poly1305_open_easy

```typescript
crypto_box_curve25519xchacha20poly1305_open_easy(ciphertext: Uint8Array, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `ciphertext`: `Uint8Array`
- `nonce`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_NONCEBYTES`
- `publicKey`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_PUBLICKEYBYTES`
- `privateKey`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_SECRETKEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_MACBYTES`

### crypto_box_curve25519xchacha20poly1305_open_easy_afternm

```typescript
crypto_box_curve25519xchacha20poly1305_open_easy_afternm(ciphertext: Uint8Array | string, nonce: Uint8Array, sharedKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `ciphertext`: `Uint8Array | string` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_MACBYTES`
- `nonce`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_NONCEBYTES`
- `sharedKey`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_BEFORENMBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_MACBYTES`

### crypto_box_curve25519xchacha20poly1305_seal

```typescript
crypto_box_curve25519xchacha20poly1305_seal(message: Uint8Array | string, publicKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `publicKey`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_PUBLICKEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_SEALBYTES`

### crypto_box_curve25519xchacha20poly1305_seal_open

```typescript
crypto_box_curve25519xchacha20poly1305_seal_open(ciphertext: Uint8Array, publicKey: Uint8Array, secretKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `ciphertext`: `Uint8Array`
- `publicKey`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_PUBLICKEYBYTES`
- `secretKey`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_SECRETKEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_SEALBYTES`

### crypto_box_curve25519xchacha20poly1305_seed_keypair

```typescript
crypto_box_curve25519xchacha20poly1305_seed_keypair(seed: Uint8Array, outputFormat?: OutputFormat): {publicKey, privateKey, keyType}
```

**Parameters:**

- `seed`: `Uint8Array` — size: `CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_SEEDBYTES`

**Returns:** An object with:

- `publicKey`: `Uint8Array | string`
- `privateKey`: `Uint8Array | string`
- `keyType`: `string`

### crypto_box_detached

```typescript
crypto_box_detached(message: Uint8Array | string, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: OutputFormat): {ciphertext, mac}
```

**Parameters:**

- `message`: `Uint8Array | string`
- `nonce`: `Uint8Array` — size: `CRYPTO_BOX_NONCEBYTES`
- `publicKey`: `Uint8Array` — size: `CRYPTO_BOX_PUBLICKEYBYTES`
- `privateKey`: `Uint8Array` — size: `CRYPTO_BOX_SECRETKEYBYTES`

**Returns:** An object with:

- `ciphertext`: `Uint8Array | string`
- `mac`: `Uint8Array | string`

### crypto_box_easy

```typescript
crypto_box_easy(message: Uint8Array | string, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `nonce`: `Uint8Array` — size: `CRYPTO_BOX_NONCEBYTES`
- `publicKey`: `Uint8Array` — size: `CRYPTO_BOX_PUBLICKEYBYTES`
- `privateKey`: `Uint8Array` — size: `CRYPTO_BOX_SECRETKEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_BOX_MACBYTES`

### crypto_box_easy_afternm

```typescript
crypto_box_easy_afternm(message: Uint8Array | string, nonce: Uint8Array, sharedKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `nonce`: `Uint8Array` — size: `CRYPTO_BOX_NONCEBYTES`
- `sharedKey`: `Uint8Array` — size: `CRYPTO_BOX_BEFORENMBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_BOX_MACBYTES`

### crypto_box_keypair

```typescript
crypto_box_keypair(outputFormat?: OutputFormat): {publicKey, privateKey, keyType}
```

**Returns:** An object with:

- `publicKey`: `Uint8Array | string`
- `privateKey`: `Uint8Array | string`
- `keyType`: `string`

### crypto_box_open_detached

```typescript
crypto_box_open_detached(ciphertext: Uint8Array | string, mac: Uint8Array, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `ciphertext`: `Uint8Array | string`
- `mac`: `Uint8Array` — size: `CRYPTO_BOX_MACBYTES`
- `nonce`: `Uint8Array` — size: `CRYPTO_BOX_NONCEBYTES`
- `publicKey`: `Uint8Array` — size: `CRYPTO_BOX_PUBLICKEYBYTES`
- `privateKey`: `Uint8Array` — size: `CRYPTO_BOX_SECRETKEYBYTES`

**Returns:** `Uint8Array` — size: `ciphertext.length`

### crypto_box_open_easy

```typescript
crypto_box_open_easy(ciphertext: Uint8Array, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `ciphertext`: `Uint8Array`
- `nonce`: `Uint8Array` — size: `CRYPTO_BOX_NONCEBYTES`
- `publicKey`: `Uint8Array` — size: `CRYPTO_BOX_PUBLICKEYBYTES`
- `privateKey`: `Uint8Array` — size: `CRYPTO_BOX_SECRETKEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_BOX_MACBYTES`

### crypto_box_open_easy_afternm

```typescript
crypto_box_open_easy_afternm(ciphertext: Uint8Array | string, nonce: Uint8Array, sharedKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `ciphertext`: `Uint8Array | string` — size: `CRYPTO_BOX_MACBYTES`
- `nonce`: `Uint8Array` — size: `CRYPTO_BOX_NONCEBYTES`
- `sharedKey`: `Uint8Array` — size: `CRYPTO_BOX_BEFORENMBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_BOX_MACBYTES`

### crypto_box_seal

```typescript
crypto_box_seal(message: Uint8Array | string, publicKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `publicKey`: `Uint8Array` — size: `CRYPTO_BOX_PUBLICKEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_BOX_SEALBYTES`

### crypto_box_seal_open

```typescript
crypto_box_seal_open(ciphertext: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `ciphertext`: `Uint8Array`
- `publicKey`: `Uint8Array` — size: `CRYPTO_BOX_PUBLICKEYBYTES`
- `privateKey`: `Uint8Array` — size: `CRYPTO_BOX_SECRETKEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_BOX_SEALBYTES`

### crypto_box_seed_keypair

```typescript
crypto_box_seed_keypair(seed: Uint8Array, outputFormat?: OutputFormat): {publicKey, privateKey, keyType}
```

**Parameters:**

- `seed`: `Uint8Array` — size: `CRYPTO_BOX_SEEDBYTES`

**Returns:** An object with:

- `publicKey`: `Uint8Array | string`
- `privateKey`: `Uint8Array | string`
- `keyType`: `string`

## Signatures

Digital signatures for message authentication

### crypto_sign

```typescript
crypto_sign(message: Uint8Array | string, privateKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `privateKey`: `Uint8Array` — size: `CRYPTO_SIGN_SECRETKEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_SIGN_BYTES`

### crypto_sign_detached

```typescript
crypto_sign_detached(message: Uint8Array | string, privateKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `privateKey`: `Uint8Array` — size: `CRYPTO_SIGN_SECRETKEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_SIGN_BYTES`

### crypto_sign_ed25519_pk_to_curve25519

```typescript
crypto_sign_ed25519_pk_to_curve25519(edPk: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `edPk`: `Uint8Array` — size: `CRYPTO_SIGN_PUBLICKEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_SCALARMULT_SCALARBYTES`

### crypto_sign_ed25519_sk_to_curve25519

```typescript
crypto_sign_ed25519_sk_to_curve25519(edSk: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `edSk`: `Uint8Array` — size: `CRYPTO_SIGN_SECRETKEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_SCALARMULT_SCALARBYTES`

### crypto_sign_ed25519_sk_to_pk

```typescript
crypto_sign_ed25519_sk_to_pk(privateKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `privateKey`: `Uint8Array` — size: `CRYPTO_SIGN_SECRETKEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_SIGN_PUBLICKEYBYTES`

### crypto_sign_ed25519_sk_to_seed

```typescript
crypto_sign_ed25519_sk_to_seed(privateKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `privateKey`: `Uint8Array` — size: `CRYPTO_SIGN_SECRETKEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_SIGN_SEEDBYTES`

### crypto_sign_final_create

```typescript
crypto_sign_final_create(state_address: StateAddress, privateKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `state_address`: `StateAddress`
- `privateKey`: `Uint8Array` — size: `CRYPTO_SIGN_SECRETKEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_SIGN_BYTES`

### crypto_sign_final_verify

```typescript
crypto_sign_final_verify(state_address: StateAddress, signature: Uint8Array, publicKey: Uint8Array): boolean
```

**Parameters:**

- `state_address`: `StateAddress`
- `signature`: `Uint8Array` — size: `CRYPTO_SIGN_BYTES`
- `publicKey`: `Uint8Array` — size: `CRYPTO_SIGN_PUBLICKEYBYTES`

**Returns:** `boolean`

### crypto_sign_init

```typescript
crypto_sign_init(): StateAddress
```

**Returns:** `StateAddress`

### crypto_sign_keypair

```typescript
crypto_sign_keypair(outputFormat?: OutputFormat): {publicKey, privateKey, keyType}
```

**Returns:** An object with:

- `publicKey`: `Uint8Array | string`
- `privateKey`: `Uint8Array | string`
- `keyType`: `string`

### crypto_sign_open

```typescript
crypto_sign_open(signedMessage: Uint8Array, publicKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `signedMessage`: `Uint8Array`
- `publicKey`: `Uint8Array` — size: `CRYPTO_SIGN_PUBLICKEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_SIGN_BYTES`

### crypto_sign_seed_keypair

```typescript
crypto_sign_seed_keypair(seed: Uint8Array, outputFormat?: OutputFormat): {publicKey, privateKey, keyType}
```

**Parameters:**

- `seed`: `Uint8Array` — size: `CRYPTO_SIGN_SEEDBYTES`

**Returns:** An object with:

- `publicKey`: `Uint8Array | string`
- `privateKey`: `Uint8Array | string`
- `keyType`: `string`

### crypto_sign_update

```typescript
crypto_sign_update(state_address: StateAddress, message_chunk: Uint8Array | string): void
```

**Parameters:**

- `state_address`: `StateAddress`
- `message_chunk`: `Uint8Array | string`

### crypto_sign_verify_detached

```typescript
crypto_sign_verify_detached(signature: Uint8Array, message: Uint8Array | string, publicKey: Uint8Array): boolean
```

**Parameters:**

- `signature`: `Uint8Array` — size: `CRYPTO_SIGN_BYTES`
- `message`: `Uint8Array | string`
- `publicKey`: `Uint8Array` — size: `CRYPTO_SIGN_PUBLICKEYBYTES`

**Returns:** `boolean`

## Hashing

Cryptographic hash functions

### crypto_generichash

```typescript
crypto_generichash(hash_length: number, message: Uint8Array | string, key: Uint8Array | string | null, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `hash_length`: `number`
- `message`: `Uint8Array | string`
- `key`: `Uint8Array | string | null`

**Returns:** `Uint8Array` — size: `hash.length`

### crypto_generichash_blake2b_salt_personal

```typescript
crypto_generichash_blake2b_salt_personal(subkey_len: number, key: Uint8Array | string | null, id: Uint8Array | null, ctx: Uint8Array | null, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `subkey_len`: `number`
- `key`: `Uint8Array | string | null`
- `id`: `Uint8Array | null` — size: `CRYPTO_GENERICHASH_BLAKE2B_SALTBYTES`
- `ctx`: `Uint8Array | null` — size: `CRYPTO_GENERICHASH_BLAKE2B_PERSONALBYTES`

**Returns:** `Uint8Array`

### crypto_generichash_final

```typescript
crypto_generichash_final(state_address: StateAddress, hash_length: number, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `state_address`: `StateAddress`
- `hash_length`: `number`

**Returns:** `Uint8Array` — size: `hash.length`

### crypto_generichash_init

```typescript
crypto_generichash_init(key: Uint8Array | string | null, hash_length: number): StateAddress
```

**Parameters:**

- `key`: `Uint8Array | string | null`
- `hash_length`: `number`

**Returns:** `StateAddress`

### crypto_generichash_keygen

```typescript
crypto_generichash_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_GENERICHASH_KEYBYTES`

### crypto_generichash_update

```typescript
crypto_generichash_update(state_address: StateAddress, message_chunk: Uint8Array | string): void
```

**Parameters:**

- `state_address`: `StateAddress`
- `message_chunk`: `Uint8Array | string`

### crypto_hash

```typescript
crypto_hash(message: Uint8Array | string, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`

**Returns:** `Uint8Array` — size: `CRYPTO_HASH_BYTES`

### crypto_hash_sha256

```typescript
crypto_hash_sha256(message: Uint8Array | string, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`

**Returns:** `Uint8Array` — size: `CRYPTO_HASH_SHA256_BYTES`

### crypto_hash_sha256_final

```typescript
crypto_hash_sha256_final(state_address: StateAddress, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `state_address`: `StateAddress`

**Returns:** `Uint8Array` — size: `CRYPTO_HASH_SHA256_BYTES`

### crypto_hash_sha256_init

```typescript
crypto_hash_sha256_init(): StateAddress
```

**Returns:** `StateAddress`

### crypto_hash_sha256_update

```typescript
crypto_hash_sha256_update(state_address: StateAddress, message_chunk: Uint8Array | string): void
```

**Parameters:**

- `state_address`: `StateAddress`
- `message_chunk`: `Uint8Array | string`

### crypto_hash_sha512

```typescript
crypto_hash_sha512(message: Uint8Array | string, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`

**Returns:** `Uint8Array` — size: `CRYPTO_HASH_SHA512_BYTES`

### crypto_hash_sha512_final

```typescript
crypto_hash_sha512_final(state_address: StateAddress, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `state_address`: `StateAddress`

**Returns:** `Uint8Array` — size: `CRYPTO_HASH_SHA512_BYTES`

### crypto_hash_sha512_init

```typescript
crypto_hash_sha512_init(): StateAddress
```

**Returns:** `StateAddress`

### crypto_hash_sha512_update

```typescript
crypto_hash_sha512_update(state_address: StateAddress, message_chunk: Uint8Array | string): void
```

**Parameters:**

- `state_address`: `StateAddress`
- `message_chunk`: `Uint8Array | string`

### crypto_shorthash

```typescript
crypto_shorthash(message: Uint8Array | string, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `key`: `Uint8Array` — size: `CRYPTO_SHORTHASH_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_SHORTHASH_BYTES`

### crypto_shorthash_keygen

```typescript
crypto_shorthash_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_SHORTHASH_KEYBYTES`

### crypto_shorthash_siphashx24

```typescript
crypto_shorthash_siphashx24(message: Uint8Array | string, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `key`: `Uint8Array` — size: `CRYPTO_SHORTHASH_SIPHASHX24_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_SHORTHASH_SIPHASHX24_BYTES`

## Password Hashing

Key derivation from passwords

### crypto_pwhash

```typescript
crypto_pwhash(keyLength: number, password: Uint8Array | string, salt: Uint8Array, opsLimit: number, memLimit: number, algorithm: number, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `keyLength`: `number`
- `password`: `Uint8Array | string`
- `salt`: `Uint8Array` — size: `CRYPTO_PWHASH_SALTBYTES`
- `opsLimit`: `number`
- `memLimit`: `number`
- `algorithm`: `number`

**Returns:** `Uint8Array`

### crypto_pwhash_scryptsalsa208sha256

```typescript
crypto_pwhash_scryptsalsa208sha256(keyLength: number, password: Uint8Array | string, salt: Uint8Array, opsLimit: number, memLimit: number, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `keyLength`: `number`
- `password`: `Uint8Array | string`
- `salt`: `Uint8Array` — size: `CRYPTO_PWHASH_SCRYPTSALSA208SHA256_SALTBYTES`
- `opsLimit`: `number`
- `memLimit`: `number`

**Returns:** `Uint8Array`

### crypto_pwhash_scryptsalsa208sha256_ll

```typescript
crypto_pwhash_scryptsalsa208sha256_ll(password: Uint8Array | string, salt: Uint8Array | string, opsLimit: number, r: number, p: number, keyLength: number, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `password`: `Uint8Array | string`
- `salt`: `Uint8Array | string`
- `opsLimit`: `number`
- `r`: `number`
- `p`: `number`
- `keyLength`: `number`

**Returns:** `Uint8Array`

### crypto_pwhash_scryptsalsa208sha256_str

```typescript
crypto_pwhash_scryptsalsa208sha256_str(password: Uint8Array | string, opsLimit: number, memLimit: number): Uint8Array
```

**Parameters:**

- `password`: `Uint8Array | string`
- `opsLimit`: `number`
- `memLimit`: `number`

**Returns:** `Uint8Array` — size: `CRYPTO_PWHASH_SCRYPTSALSA208SHA256_STRBYTES`

### crypto_pwhash_scryptsalsa208sha256_str_verify

```typescript
crypto_pwhash_scryptsalsa208sha256_str_verify(hashed_password: string, password: Uint8Array | string): boolean
```

**Parameters:**

- `hashed_password`: `string`
- `password`: `Uint8Array | string`

**Returns:** `boolean`

### crypto_pwhash_str

```typescript
crypto_pwhash_str(password: Uint8Array | string, opsLimit: number, memLimit: number): Uint8Array
```

**Parameters:**

- `password`: `Uint8Array | string`
- `opsLimit`: `number`
- `memLimit`: `number`

**Returns:** `Uint8Array` — size: `CRYPTO_PWHASH_STRBYTES`

### crypto_pwhash_str_needs_rehash

```typescript
crypto_pwhash_str_needs_rehash(hashed_password: string, opsLimit: number, memLimit: number): boolean
```

**Parameters:**

- `hashed_password`: `string`
- `opsLimit`: `number`
- `memLimit`: `number`

**Returns:** `boolean`

### crypto_pwhash_str_verify

```typescript
crypto_pwhash_str_verify(hashed_password: string, password: Uint8Array | string): boolean
```

**Parameters:**

- `hashed_password`: `string`
- `password`: `Uint8Array | string`

**Returns:** `boolean`

## Key Derivation

Deriving keys from a master key

### crypto_kdf_derive_from_key

```typescript
crypto_kdf_derive_from_key(subkey_len: number, subkey_id: number | bigint, ctx: string, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `subkey_len`: `number`
- `subkey_id`: `number | bigint`
- `ctx`: `string` — size: `CRYPTO_KDF_CONTEXTBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_KDF_KEYBYTES`

**Returns:** `Uint8Array`

### crypto_kdf_keygen

```typescript
crypto_kdf_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_KDF_KEYBYTES`

## Key Exchange

Shared secret computation from key pairs

### crypto_kx_client_session_keys

```typescript
crypto_kx_client_session_keys(clientPublicKey: Uint8Array, clientSecretKey: Uint8Array, serverPublicKey: Uint8Array, outputFormat?: OutputFormat): {sharedRx, sharedTx}
```

**Parameters:**

- `clientPublicKey`: `Uint8Array` — size: `CRYPTO_KX_PUBLICKEYBYTES`
- `clientSecretKey`: `Uint8Array` — size: `CRYPTO_KX_SECRETKEYBYTES`
- `serverPublicKey`: `Uint8Array` — size: `CRYPTO_KX_PUBLICKEYBYTES`

**Returns:** An object with:

- `sharedRx`: `Uint8Array | string`
- `sharedTx`: `Uint8Array | string`

### crypto_kx_keypair

```typescript
crypto_kx_keypair(outputFormat?: OutputFormat): {publicKey, privateKey, keyType}
```

**Returns:** An object with:

- `publicKey`: `Uint8Array | string`
- `privateKey`: `Uint8Array | string`
- `keyType`: `string`

### crypto_kx_seed_keypair

```typescript
crypto_kx_seed_keypair(seed: Uint8Array, outputFormat?: OutputFormat): {publicKey, privateKey, keyType}
```

**Parameters:**

- `seed`: `Uint8Array` — size: `CRYPTO_KX_SEEDBYTES`

**Returns:** An object with:

- `publicKey`: `Uint8Array | string`
- `privateKey`: `Uint8Array | string`
- `keyType`: `string`

### crypto_kx_server_session_keys

```typescript
crypto_kx_server_session_keys(serverPublicKey: Uint8Array, serverSecretKey: Uint8Array, clientPublicKey: Uint8Array, outputFormat?: OutputFormat): {sharedRx, sharedTx}
```

**Parameters:**

- `serverPublicKey`: `Uint8Array` — size: `CRYPTO_KX_PUBLICKEYBYTES`
- `serverSecretKey`: `Uint8Array` — size: `CRYPTO_KX_SECRETKEYBYTES`
- `clientPublicKey`: `Uint8Array` — size: `CRYPTO_KX_PUBLICKEYBYTES`

**Returns:** An object with:

- `sharedRx`: `Uint8Array | string`
- `sharedTx`: `Uint8Array | string`

### crypto_scalarmult

```typescript
crypto_scalarmult(privateKey: Uint8Array, publicKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `privateKey`: `Uint8Array` — size: `CRYPTO_SCALARMULT_SCALARBYTES`
- `publicKey`: `Uint8Array` — size: `CRYPTO_SCALARMULT_BYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_SCALARMULT_BYTES`

### crypto_scalarmult_base

```typescript
crypto_scalarmult_base(privateKey: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `privateKey`: `Uint8Array` — size: `CRYPTO_SCALARMULT_SCALARBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_SCALARMULT_BYTES`

### crypto_scalarmult_ed25519

```typescript
crypto_scalarmult_ed25519(n: Uint8Array, p: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `n`: `Uint8Array` — size: `CRYPTO_SCALARMULT_ED25519_SCALARBYTES`
- `p`: `Uint8Array` — size: `CRYPTO_SCALARMULT_ED25519_BYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_SCALARMULT_ED25519_BYTES`

### crypto_scalarmult_ed25519_base

```typescript
crypto_scalarmult_ed25519_base(scalar: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `scalar`: `Uint8Array` — size: `CRYPTO_SCALARMULT_ED25519_SCALARBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_SCALARMULT_ED25519_BYTES`

### crypto_scalarmult_ed25519_base_noclamp

```typescript
crypto_scalarmult_ed25519_base_noclamp(scalar: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `scalar`: `Uint8Array` — size: `CRYPTO_SCALARMULT_ED25519_SCALARBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_SCALARMULT_ED25519_BYTES`

### crypto_scalarmult_ed25519_noclamp

```typescript
crypto_scalarmult_ed25519_noclamp(n: Uint8Array, p: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `n`: `Uint8Array` — size: `CRYPTO_SCALARMULT_ED25519_SCALARBYTES`
- `p`: `Uint8Array` — size: `CRYPTO_SCALARMULT_ED25519_BYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_SCALARMULT_ED25519_BYTES`

### crypto_scalarmult_ristretto255

```typescript
crypto_scalarmult_ristretto255(scalar: Uint8Array, element: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `scalar`: `Uint8Array` — size: `CRYPTO_SCALARMULT_RISTRETTO255_SCALARBYTES`
- `element`: `Uint8Array` — size: `CRYPTO_SCALARMULT_RISTRETTO255_BYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_SCALARMULT_RISTRETTO255_BYTES`

### crypto_scalarmult_ristretto255_base

```typescript
crypto_scalarmult_ristretto255_base(scalar: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `scalar`: `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_SCALARBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_BYTES`

## Message Authentication

MAC computation and verification

### crypto_auth

```typescript
crypto_auth(message: Uint8Array | string, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `key`: `Uint8Array` — size: `CRYPTO_AUTH_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_AUTH_BYTES`

### crypto_auth_hmacsha256

```typescript
crypto_auth_hmacsha256(message: Uint8Array | string, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `key`: `Uint8Array` — size: `CRYPTO_AUTH_HMACSHA256_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_AUTH_HMACSHA256_BYTES`

### crypto_auth_hmacsha256_final

```typescript
crypto_auth_hmacsha256_final(state_address: StateAddress, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `state_address`: `StateAddress`

**Returns:** `Uint8Array` — size: `CRYPTO_AUTH_HMACSHA256_BYTES`

### crypto_auth_hmacsha256_init

```typescript
crypto_auth_hmacsha256_init(key: Uint8Array | string | null): StateAddress
```

**Parameters:**

- `key`: `Uint8Array | string | null`

**Returns:** `StateAddress`

### crypto_auth_hmacsha256_keygen

```typescript
crypto_auth_hmacsha256_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_AUTH_HMACSHA256_KEYBYTES`

### crypto_auth_hmacsha256_update

```typescript
crypto_auth_hmacsha256_update(state_address: StateAddress, message_chunk: Uint8Array | string): void
```

**Parameters:**

- `state_address`: `StateAddress`
- `message_chunk`: `Uint8Array | string`

### crypto_auth_hmacsha256_verify

```typescript
crypto_auth_hmacsha256_verify(tag: Uint8Array, message: Uint8Array | string, key: Uint8Array): boolean
```

**Parameters:**

- `tag`: `Uint8Array` — size: `CRYPTO_AUTH_HMACSHA256_BYTES`
- `message`: `Uint8Array | string`
- `key`: `Uint8Array` — size: `CRYPTO_AUTH_HMACSHA256_KEYBYTES`

**Returns:** `boolean`

### crypto_auth_hmacsha512

```typescript
crypto_auth_hmacsha512(message: Uint8Array | string, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `key`: `Uint8Array` — size: `CRYPTO_AUTH_HMACSHA512_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_AUTH_HMACSHA512_BYTES`

### crypto_auth_hmacsha512256

```typescript
crypto_auth_hmacsha512256(message: Uint8Array | string, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `key`: `Uint8Array` — size: `CRYPTO_AUTH_HMACSHA512256_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_AUTH_HMACSHA512256_BYTES`

### crypto_auth_hmacsha512256_final

```typescript
crypto_auth_hmacsha512256_final(state_address: StateAddress, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `state_address`: `StateAddress`

**Returns:** `Uint8Array` — size: `CRYPTO_AUTH_HMACSHA512256_BYTES`

### crypto_auth_hmacsha512256_init

```typescript
crypto_auth_hmacsha512256_init(key: Uint8Array | string | null): StateAddress
```

**Parameters:**

- `key`: `Uint8Array | string | null`

**Returns:** `StateAddress`

### crypto_auth_hmacsha512256_keygen

```typescript
crypto_auth_hmacsha512256_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_AUTH_HMACSHA512256_KEYBYTES`

### crypto_auth_hmacsha512256_update

```typescript
crypto_auth_hmacsha512256_update(state_address: StateAddress, message_chunk: Uint8Array | string): void
```

**Parameters:**

- `state_address`: `StateAddress`
- `message_chunk`: `Uint8Array | string`

### crypto_auth_hmacsha512256_verify

```typescript
crypto_auth_hmacsha512256_verify(tag: Uint8Array, message: Uint8Array | string, key: Uint8Array): boolean
```

**Parameters:**

- `tag`: `Uint8Array` — size: `CRYPTO_AUTH_HMACSHA512256_BYTES`
- `message`: `Uint8Array | string`
- `key`: `Uint8Array` — size: `CRYPTO_AUTH_HMACSHA512256_KEYBYTES`

**Returns:** `boolean`

### crypto_auth_hmacsha512_final

```typescript
crypto_auth_hmacsha512_final(state_address: StateAddress, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `state_address`: `StateAddress`

**Returns:** `Uint8Array` — size: `CRYPTO_AUTH_HMACSHA512_BYTES`

### crypto_auth_hmacsha512_init

```typescript
crypto_auth_hmacsha512_init(key: Uint8Array | string | null): StateAddress
```

**Parameters:**

- `key`: `Uint8Array | string | null`

**Returns:** `StateAddress`

### crypto_auth_hmacsha512_keygen

```typescript
crypto_auth_hmacsha512_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_AUTH_HMACSHA512_KEYBYTES`

### crypto_auth_hmacsha512_update

```typescript
crypto_auth_hmacsha512_update(state_address: StateAddress, message_chunk: Uint8Array | string): void
```

**Parameters:**

- `state_address`: `StateAddress`
- `message_chunk`: `Uint8Array | string`

### crypto_auth_hmacsha512_verify

```typescript
crypto_auth_hmacsha512_verify(tag: Uint8Array, message: Uint8Array | string, key: Uint8Array): boolean
```

**Parameters:**

- `tag`: `Uint8Array` — size: `CRYPTO_AUTH_HMACSHA512_BYTES`
- `message`: `Uint8Array | string`
- `key`: `Uint8Array` — size: `CRYPTO_AUTH_HMACSHA512_KEYBYTES`

**Returns:** `boolean`

### crypto_auth_keygen

```typescript
crypto_auth_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_AUTH_KEYBYTES`

### crypto_auth_verify

```typescript
crypto_auth_verify(tag: Uint8Array, message: Uint8Array | string, key: Uint8Array): boolean
```

**Parameters:**

- `tag`: `Uint8Array` — size: `CRYPTO_AUTH_BYTES`
- `message`: `Uint8Array | string`
- `key`: `Uint8Array` — size: `CRYPTO_AUTH_KEYBYTES`

**Returns:** `boolean`

### crypto_onetimeauth

```typescript
crypto_onetimeauth(message: Uint8Array | string, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `message`: `Uint8Array | string`
- `key`: `Uint8Array` — size: `CRYPTO_ONETIMEAUTH_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_ONETIMEAUTH_BYTES`

### crypto_onetimeauth_final

```typescript
crypto_onetimeauth_final(state_address: StateAddress, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `state_address`: `StateAddress`

**Returns:** `Uint8Array` — size: `CRYPTO_ONETIMEAUTH_BYTES`

### crypto_onetimeauth_init

```typescript
crypto_onetimeauth_init(key: Uint8Array | string | null): StateAddress
```

**Parameters:**

- `key`: `Uint8Array | string | null`

**Returns:** `StateAddress`

### crypto_onetimeauth_keygen

```typescript
crypto_onetimeauth_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_ONETIMEAUTH_KEYBYTES`

### crypto_onetimeauth_update

```typescript
crypto_onetimeauth_update(state_address: StateAddress, message_chunk: Uint8Array | string): void
```

**Parameters:**

- `state_address`: `StateAddress`
- `message_chunk`: `Uint8Array | string`

### crypto_onetimeauth_verify

```typescript
crypto_onetimeauth_verify(hash: Uint8Array, message: Uint8Array | string, key: Uint8Array): boolean
```

**Parameters:**

- `hash`: `Uint8Array` — size: `CRYPTO_ONETIMEAUTH_BYTES`
- `message`: `Uint8Array | string`
- `key`: `Uint8Array` — size: `CRYPTO_ONETIMEAUTH_KEYBYTES`

**Returns:** `boolean`

## Secret Streams

Streaming encryption for sequences of messages

### crypto_secretstream_xchacha20poly1305_init_pull

```typescript
crypto_secretstream_xchacha20poly1305_init_pull(header: Uint8Array, key: Uint8Array): StateAddress
```

**Parameters:**

- `header`: `Uint8Array` — size: `CRYPTO_SECRETSTREAM_XCHACHA20POLY1305_HEADERBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_SECRETSTREAM_XCHACHA20POLY1305_KEYBYTES`

**Returns:** `StateAddress`

### crypto_secretstream_xchacha20poly1305_init_push

```typescript
crypto_secretstream_xchacha20poly1305_init_push(key: Uint8Array, outputFormat?: OutputFormat): {state, header}
```

**Parameters:**

- `key`: `Uint8Array` — size: `CRYPTO_SECRETSTREAM_XCHACHA20POLY1305_KEYBYTES`

**Returns:** An object with:

- `state`: `StateAddress`
- `header`: `Uint8Array | string`

### crypto_secretstream_xchacha20poly1305_keygen

```typescript
crypto_secretstream_xchacha20poly1305_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_SECRETSTREAM_XCHACHA20POLY1305_KEYBYTES`

### crypto_secretstream_xchacha20poly1305_pull

```typescript
crypto_secretstream_xchacha20poly1305_pull(state_address: StateAddress, cipher: Uint8Array, ad: Uint8Array | string | null, outputFormat?: OutputFormat): {message, tag} | false
```

**Parameters:**

- `state_address`: `StateAddress`
- `cipher`: `Uint8Array`
- `ad`: `Uint8Array | string | null`

**Returns:** An object with:

- `message`: `Uint8Array | string`
- `tag`: `number`

### crypto_secretstream_xchacha20poly1305_push

```typescript
crypto_secretstream_xchacha20poly1305_push(state_address: StateAddress, message_chunk: Uint8Array | string, ad: Uint8Array | string | null, tag: number, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `state_address`: `StateAddress`
- `message_chunk`: `Uint8Array | string`
- `ad`: `Uint8Array | string | null`
- `tag`: `number`

**Returns:** `Uint8Array` — size: `CRYPTO_SECRETSTREAM_XCHACHA20POLY1305_ABYTES`

### crypto_secretstream_xchacha20poly1305_rekey

```typescript
crypto_secretstream_xchacha20poly1305_rekey(state_address: StateAddress): void
```

**Parameters:**

- `state_address`: `StateAddress`

## Random

Cryptographically secure random number generation

### randombytes_buf

```typescript
randombytes_buf(length: number, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `length`: `number`

**Returns:** `Uint8Array`

### randombytes_buf_deterministic

```typescript
randombytes_buf_deterministic(length: number, seed: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `length`: `number`
- `seed`: `Uint8Array` — size: `RANDOMBYTES_SEEDBYTES`

**Returns:** `Uint8Array`

### randombytes_close

```typescript
randombytes_close(): void
```

### randombytes_random

```typescript
randombytes_random(): number
```

**Returns:** `number`

### randombytes_set_implementation

```typescript
randombytes_set_implementation(implementation: object): void
```

**Parameters:**

- `implementation`: `object`

### randombytes_stir

```typescript
randombytes_stir(): void
```

### randombytes_uniform

```typescript
randombytes_uniform(upper_bound: number): number
```

**Parameters:**

- `upper_bound`: `number`

**Returns:** `number`

## Utilities

Memory operations and padding

### crypto_core_ed25519_add

```typescript
crypto_core_ed25519_add(p: Uint8Array, q: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `p`: `Uint8Array` — size: `CRYPTO_CORE_ED25519_BYTES`
- `q`: `Uint8Array` — size: `CRYPTO_CORE_ED25519_BYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_ED25519_BYTES`

### crypto_core_ed25519_from_hash

```typescript
crypto_core_ed25519_from_hash(r: Uint8Array | string, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `r`: `Uint8Array | string`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_ED25519_BYTES`

### crypto_core_ed25519_from_uniform

```typescript
crypto_core_ed25519_from_uniform(r: Uint8Array | string, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `r`: `Uint8Array | string`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_ED25519_BYTES`

### crypto_core_ed25519_is_valid_point

```typescript
crypto_core_ed25519_is_valid_point(repr: Uint8Array): boolean
```

**Parameters:**

- `repr`: `Uint8Array` — size: `CRYPTO_CORE_ED25519_BYTES`

**Returns:** `boolean`

### crypto_core_ed25519_random

```typescript
crypto_core_ed25519_random(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_ED25519_BYTES`

### crypto_core_ed25519_scalar_add

```typescript
crypto_core_ed25519_scalar_add(x: Uint8Array, y: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `x`: `Uint8Array` — size: `CRYPTO_CORE_ED25519_SCALARBYTES`
- `y`: `Uint8Array` — size: `CRYPTO_CORE_ED25519_SCALARBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_ED25519_SCALARBYTES`

### crypto_core_ed25519_scalar_complement

```typescript
crypto_core_ed25519_scalar_complement(s: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `s`: `Uint8Array` — size: `CRYPTO_CORE_ED25519_SCALARBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_ED25519_SCALARBYTES`

### crypto_core_ed25519_scalar_invert

```typescript
crypto_core_ed25519_scalar_invert(s: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `s`: `Uint8Array` — size: `CRYPTO_CORE_ED25519_SCALARBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_ED25519_SCALARBYTES`

### crypto_core_ed25519_scalar_mul

```typescript
crypto_core_ed25519_scalar_mul(x: Uint8Array, y: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `x`: `Uint8Array` — size: `CRYPTO_CORE_ED25519_SCALARBYTES`
- `y`: `Uint8Array` — size: `CRYPTO_CORE_ED25519_SCALARBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_ED25519_SCALARBYTES`

### crypto_core_ed25519_scalar_negate

```typescript
crypto_core_ed25519_scalar_negate(s: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `s`: `Uint8Array` — size: `CRYPTO_CORE_ED25519_SCALARBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_ED25519_SCALARBYTES`

### crypto_core_ed25519_scalar_random

```typescript
crypto_core_ed25519_scalar_random(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_ED25519_SCALARBYTES`

### crypto_core_ed25519_scalar_reduce

```typescript
crypto_core_ed25519_scalar_reduce(sample: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `sample`: `Uint8Array` — size: `CRYPTO_CORE_ED25519_NONREDUCEDSCALARBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_ED25519_SCALARBYTES`

### crypto_core_ed25519_scalar_sub

```typescript
crypto_core_ed25519_scalar_sub(x: Uint8Array, y: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `x`: `Uint8Array` — size: `CRYPTO_CORE_ED25519_SCALARBYTES`
- `y`: `Uint8Array` — size: `CRYPTO_CORE_ED25519_SCALARBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_ED25519_SCALARBYTES`

### crypto_core_ed25519_sub

```typescript
crypto_core_ed25519_sub(p: Uint8Array, q: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `p`: `Uint8Array` — size: `CRYPTO_CORE_ED25519_BYTES`
- `q`: `Uint8Array` — size: `CRYPTO_CORE_ED25519_BYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_ED25519_BYTES`

### crypto_core_hchacha20

```typescript
crypto_core_hchacha20(input: Uint8Array, privateKey: Uint8Array, constant: Uint8Array | string | null, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `input`: `Uint8Array` — size: `CRYPTO_CORE_HCHACHA20_INPUTBYTES`
- `privateKey`: `Uint8Array` — size: `CRYPTO_CORE_HCHACHA20_KEYBYTES`
- `constant`: `Uint8Array | string | null` — size: `CRYPTO_CORE_HCHACHA20_CONSTBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_HCHACHA20_OUTPUTBYTES`

### crypto_core_hsalsa20

```typescript
crypto_core_hsalsa20(input: Uint8Array, privateKey: Uint8Array, constant: Uint8Array | string | null, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `input`: `Uint8Array` — size: `CRYPTO_CORE_HSALSA20_INPUTBYTES`
- `privateKey`: `Uint8Array` — size: `CRYPTO_CORE_HSALSA20_KEYBYTES`
- `constant`: `Uint8Array | string | null` — size: `CRYPTO_CORE_HSALSA20_CONSTBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_HSALSA20_OUTPUTBYTES`

### crypto_core_ristretto255_add

```typescript
crypto_core_ristretto255_add(p: Uint8Array, q: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `p`: `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_BYTES`
- `q`: `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_BYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_BYTES`

### crypto_core_ristretto255_from_hash

```typescript
crypto_core_ristretto255_from_hash(r: Uint8Array | string, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `r`: `Uint8Array | string`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_BYTES`

### crypto_core_ristretto255_is_valid_point

```typescript
crypto_core_ristretto255_is_valid_point(repr: Uint8Array): boolean
```

**Parameters:**

- `repr`: `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_BYTES`

**Returns:** `boolean`

### crypto_core_ristretto255_random

```typescript
crypto_core_ristretto255_random(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_BYTES`

### crypto_core_ristretto255_scalar_add

```typescript
crypto_core_ristretto255_scalar_add(x: Uint8Array, y: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `x`: `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_SCALARBYTES`
- `y`: `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_SCALARBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_SCALARBYTES`

### crypto_core_ristretto255_scalar_complement

```typescript
crypto_core_ristretto255_scalar_complement(s: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `s`: `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_SCALARBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_SCALARBYTES`

### crypto_core_ristretto255_scalar_invert

```typescript
crypto_core_ristretto255_scalar_invert(s: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `s`: `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_SCALARBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_SCALARBYTES`

### crypto_core_ristretto255_scalar_mul

```typescript
crypto_core_ristretto255_scalar_mul(x: Uint8Array, y: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `x`: `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_SCALARBYTES`
- `y`: `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_SCALARBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_SCALARBYTES`

### crypto_core_ristretto255_scalar_negate

```typescript
crypto_core_ristretto255_scalar_negate(s: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `s`: `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_SCALARBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_SCALARBYTES`

### crypto_core_ristretto255_scalar_random

```typescript
crypto_core_ristretto255_scalar_random(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_SCALARBYTES`

### crypto_core_ristretto255_scalar_reduce

```typescript
crypto_core_ristretto255_scalar_reduce(sample: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `sample`: `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_NONREDUCEDSCALARBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_SCALARBYTES`

### crypto_core_ristretto255_scalar_sub

```typescript
crypto_core_ristretto255_scalar_sub(x: Uint8Array, y: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `x`: `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_SCALARBYTES`
- `y`: `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_SCALARBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_SCALARBYTES`

### crypto_core_ristretto255_sub

```typescript
crypto_core_ristretto255_sub(p: Uint8Array, q: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `p`: `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_BYTES`
- `q`: `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_BYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_CORE_RISTRETTO255_BYTES`

### sodium_bin2ip

```typescript
sodium_bin2ip(bin: Uint8Array): Uint8Array
```

**Parameters:**

- `bin`: `Uint8Array`

**Returns:** `Uint8Array`

### sodium_ip2bin

```typescript
sodium_ip2bin(ip: string, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `ip`: `string`

**Returns:** `Uint8Array`

### sodium_version_string

```typescript
sodium_version_string(): string
```

**Returns:** `string`

## XOF (Extendable Output)

Extendable-output functions (SHAKE, TurboSHAKE)

### crypto_xof_shake128

```typescript
crypto_xof_shake128(out_length: number, message: Uint8Array | string, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `out_length`: `number`
- `message`: `Uint8Array | string`

**Returns:** `Uint8Array` — size: `out.length`

### crypto_xof_shake128_init

```typescript
crypto_xof_shake128_init(): StateAddress
```

**Returns:** `StateAddress`

### crypto_xof_shake128_init_with_domain

```typescript
crypto_xof_shake128_init_with_domain(domain: number): StateAddress
```

**Parameters:**

- `domain`: `number`

**Returns:** `StateAddress`

### crypto_xof_shake128_squeeze

```typescript
crypto_xof_shake128_squeeze(state_address: StateAddress, out_length: number, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `state_address`: `StateAddress`
- `out_length`: `number`

**Returns:** `Uint8Array` — size: `out.length`

### crypto_xof_shake128_update

```typescript
crypto_xof_shake128_update(state_address: StateAddress, message_chunk: Uint8Array | string): void
```

**Parameters:**

- `state_address`: `StateAddress`
- `message_chunk`: `Uint8Array | string`

### crypto_xof_shake256

```typescript
crypto_xof_shake256(out_length: number, message: Uint8Array | string, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `out_length`: `number`
- `message`: `Uint8Array | string`

**Returns:** `Uint8Array` — size: `out.length`

### crypto_xof_shake256_init

```typescript
crypto_xof_shake256_init(): StateAddress
```

**Returns:** `StateAddress`

### crypto_xof_shake256_init_with_domain

```typescript
crypto_xof_shake256_init_with_domain(domain: number): StateAddress
```

**Parameters:**

- `domain`: `number`

**Returns:** `StateAddress`

### crypto_xof_shake256_squeeze

```typescript
crypto_xof_shake256_squeeze(state_address: StateAddress, out_length: number, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `state_address`: `StateAddress`
- `out_length`: `number`

**Returns:** `Uint8Array` — size: `out.length`

### crypto_xof_shake256_update

```typescript
crypto_xof_shake256_update(state_address: StateAddress, message_chunk: Uint8Array | string): void
```

**Parameters:**

- `state_address`: `StateAddress`
- `message_chunk`: `Uint8Array | string`

### crypto_xof_turboshake128

```typescript
crypto_xof_turboshake128(out_length: number, message: Uint8Array | string, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `out_length`: `number`
- `message`: `Uint8Array | string`

**Returns:** `Uint8Array` — size: `out.length`

### crypto_xof_turboshake128_init

```typescript
crypto_xof_turboshake128_init(): StateAddress
```

**Returns:** `StateAddress`

### crypto_xof_turboshake128_init_with_domain

```typescript
crypto_xof_turboshake128_init_with_domain(domain: number): StateAddress
```

**Parameters:**

- `domain`: `number`

**Returns:** `StateAddress`

### crypto_xof_turboshake128_squeeze

```typescript
crypto_xof_turboshake128_squeeze(state_address: StateAddress, out_length: number, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `state_address`: `StateAddress`
- `out_length`: `number`

**Returns:** `Uint8Array` — size: `out.length`

### crypto_xof_turboshake128_update

```typescript
crypto_xof_turboshake128_update(state_address: StateAddress, message_chunk: Uint8Array | string): void
```

**Parameters:**

- `state_address`: `StateAddress`
- `message_chunk`: `Uint8Array | string`

### crypto_xof_turboshake256

```typescript
crypto_xof_turboshake256(out_length: number, message: Uint8Array | string, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `out_length`: `number`
- `message`: `Uint8Array | string`

**Returns:** `Uint8Array` — size: `out.length`

### crypto_xof_turboshake256_init

```typescript
crypto_xof_turboshake256_init(): StateAddress
```

**Returns:** `StateAddress`

### crypto_xof_turboshake256_init_with_domain

```typescript
crypto_xof_turboshake256_init_with_domain(domain: number): StateAddress
```

**Parameters:**

- `domain`: `number`

**Returns:** `StateAddress`

### crypto_xof_turboshake256_squeeze

```typescript
crypto_xof_turboshake256_squeeze(state_address: StateAddress, out_length: number, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `state_address`: `StateAddress`
- `out_length`: `number`

**Returns:** `Uint8Array` — size: `out.length`

### crypto_xof_turboshake256_update

```typescript
crypto_xof_turboshake256_update(state_address: StateAddress, message_chunk: Uint8Array | string): void
```

**Parameters:**

- `state_address`: `StateAddress`
- `message_chunk`: `Uint8Array | string`

## IP Address Encryption

Format-preserving encryption for IP addresses

### crypto_ipcrypt_decrypt

```typescript
crypto_ipcrypt_decrypt(input: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `input`: `Uint8Array` — size: `CRYPTO_IPCRYPT_BYTES`
- `key`: `Uint8Array` — size: `CRYPTO_IPCRYPT_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_IPCRYPT_BYTES`

### crypto_ipcrypt_encrypt

```typescript
crypto_ipcrypt_encrypt(input: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `input`: `Uint8Array` — size: `CRYPTO_IPCRYPT_BYTES`
- `key`: `Uint8Array` — size: `CRYPTO_IPCRYPT_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_IPCRYPT_BYTES`

### crypto_ipcrypt_keygen

```typescript
crypto_ipcrypt_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_IPCRYPT_KEYBYTES`

### crypto_ipcrypt_nd_decrypt

```typescript
crypto_ipcrypt_nd_decrypt(input: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `input`: `Uint8Array` — size: `CRYPTO_IPCRYPT_ND_OUTPUTBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_IPCRYPT_ND_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_IPCRYPT_ND_INPUTBYTES`

### crypto_ipcrypt_nd_encrypt

```typescript
crypto_ipcrypt_nd_encrypt(input: Uint8Array, tweak: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `input`: `Uint8Array` — size: `CRYPTO_IPCRYPT_ND_INPUTBYTES`
- `tweak`: `Uint8Array` — size: `CRYPTO_IPCRYPT_ND_TWEAKBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_IPCRYPT_ND_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_IPCRYPT_ND_OUTPUTBYTES`

### crypto_ipcrypt_nd_keygen

```typescript
crypto_ipcrypt_nd_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_IPCRYPT_ND_KEYBYTES`

### crypto_ipcrypt_ndx_decrypt

```typescript
crypto_ipcrypt_ndx_decrypt(input: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `input`: `Uint8Array` — size: `CRYPTO_IPCRYPT_NDX_OUTPUTBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_IPCRYPT_NDX_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_IPCRYPT_NDX_INPUTBYTES`

### crypto_ipcrypt_ndx_encrypt

```typescript
crypto_ipcrypt_ndx_encrypt(input: Uint8Array, tweak: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `input`: `Uint8Array` — size: `CRYPTO_IPCRYPT_NDX_INPUTBYTES`
- `tweak`: `Uint8Array` — size: `CRYPTO_IPCRYPT_NDX_TWEAKBYTES`
- `key`: `Uint8Array` — size: `CRYPTO_IPCRYPT_NDX_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_IPCRYPT_NDX_OUTPUTBYTES`

### crypto_ipcrypt_ndx_keygen

```typescript
crypto_ipcrypt_ndx_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_IPCRYPT_NDX_KEYBYTES`

### crypto_ipcrypt_pfx_decrypt

```typescript
crypto_ipcrypt_pfx_decrypt(input: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `input`: `Uint8Array` — size: `CRYPTO_IPCRYPT_PFX_BYTES`
- `key`: `Uint8Array` — size: `CRYPTO_IPCRYPT_PFX_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_IPCRYPT_PFX_BYTES`

### crypto_ipcrypt_pfx_encrypt

```typescript
crypto_ipcrypt_pfx_encrypt(input: Uint8Array, key: Uint8Array, outputFormat?: OutputFormat): Uint8Array | string
```

**Parameters:**

- `input`: `Uint8Array` — size: `CRYPTO_IPCRYPT_PFX_BYTES`
- `key`: `Uint8Array` — size: `CRYPTO_IPCRYPT_PFX_KEYBYTES`

**Returns:** `Uint8Array` — size: `CRYPTO_IPCRYPT_PFX_BYTES`

### crypto_ipcrypt_pfx_keygen

```typescript
crypto_ipcrypt_pfx_keygen(outputFormat?: OutputFormat): Uint8Array | string
```

**Returns:** `Uint8Array` — size: `CRYPTO_IPCRYPT_PFX_KEYBYTES`

## Constants

Constants define sizes for keys, nonces, and other parameters.

### CRYPTO_AEAD_AEGIS128L

| Constant | Type |
|----------|------|
| `crypto_aead_aegis128l_ABYTES` | number |
| `crypto_aead_aegis128l_KEYBYTES` | number |
| `crypto_aead_aegis128l_MESSAGEBYTES_MAX` | number |
| `crypto_aead_aegis128l_NPUBBYTES` | number |
| `crypto_aead_aegis128l_NSECBYTES` | number |

### CRYPTO_AEAD_AEGIS256

| Constant | Type |
|----------|------|
| `crypto_aead_aegis256_ABYTES` | number |
| `crypto_aead_aegis256_KEYBYTES` | number |
| `crypto_aead_aegis256_MESSAGEBYTES_MAX` | number |
| `crypto_aead_aegis256_NPUBBYTES` | number |
| `crypto_aead_aegis256_NSECBYTES` | number |

### CRYPTO_AEAD_AES256GCM

| Constant | Type |
|----------|------|
| `crypto_aead_aes256gcm_ABYTES` | number |
| `crypto_aead_aes256gcm_KEYBYTES` | number |
| `crypto_aead_aes256gcm_MESSAGEBYTES_MAX` | number |
| `crypto_aead_aes256gcm_NPUBBYTES` | number |
| `crypto_aead_aes256gcm_NSECBYTES` | number |

### CRYPTO_AEAD_CHACHA20POLY1305

| Constant | Type |
|----------|------|
| `crypto_aead_chacha20poly1305_ABYTES` | number |
| `crypto_aead_chacha20poly1305_IETF_ABYTES` | number |
| `crypto_aead_chacha20poly1305_IETF_KEYBYTES` | number |
| `crypto_aead_chacha20poly1305_IETF_MESSAGEBYTES_MAX` | number |
| `crypto_aead_chacha20poly1305_IETF_NPUBBYTES` | number |
| `crypto_aead_chacha20poly1305_IETF_NSECBYTES` | number |
| `crypto_aead_chacha20poly1305_KEYBYTES` | number |
| `crypto_aead_chacha20poly1305_MESSAGEBYTES_MAX` | number |
| `crypto_aead_chacha20poly1305_NPUBBYTES` | number |
| `crypto_aead_chacha20poly1305_NSECBYTES` | number |
| `crypto_aead_chacha20poly1305_ietf_ABYTES` | number |
| `crypto_aead_chacha20poly1305_ietf_KEYBYTES` | number |
| `crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX` | number |
| `crypto_aead_chacha20poly1305_ietf_NPUBBYTES` | number |
| `crypto_aead_chacha20poly1305_ietf_NSECBYTES` | number |

### CRYPTO_AEAD_XCHACHA20POLY1305

| Constant | Type |
|----------|------|
| `crypto_aead_xchacha20poly1305_IETF_ABYTES` | number |
| `crypto_aead_xchacha20poly1305_IETF_KEYBYTES` | number |
| `crypto_aead_xchacha20poly1305_IETF_MESSAGEBYTES_MAX` | number |
| `crypto_aead_xchacha20poly1305_IETF_NPUBBYTES` | number |
| `crypto_aead_xchacha20poly1305_IETF_NSECBYTES` | number |
| `crypto_aead_xchacha20poly1305_ietf_ABYTES` | number |
| `crypto_aead_xchacha20poly1305_ietf_KEYBYTES` | number |
| `crypto_aead_xchacha20poly1305_ietf_MESSAGEBYTES_MAX` | number |
| `crypto_aead_xchacha20poly1305_ietf_NPUBBYTES` | number |
| `crypto_aead_xchacha20poly1305_ietf_NSECBYTES` | number |

### CRYPTO_AUTH_BYTES

| Constant | Type |
|----------|------|
| `crypto_auth_BYTES` | number |

### CRYPTO_AUTH_HMACSHA256

| Constant | Type |
|----------|------|
| `crypto_auth_hmacsha256_BYTES` | number |
| `crypto_auth_hmacsha256_KEYBYTES` | number |

### CRYPTO_AUTH_HMACSHA512

| Constant | Type |
|----------|------|
| `crypto_auth_hmacsha512_BYTES` | number |
| `crypto_auth_hmacsha512_KEYBYTES` | number |

### CRYPTO_AUTH_HMACSHA512256

| Constant | Type |
|----------|------|
| `crypto_auth_hmacsha512256_BYTES` | number |
| `crypto_auth_hmacsha512256_KEYBYTES` | number |

### CRYPTO_AUTH_KEYBYTES

| Constant | Type |
|----------|------|
| `crypto_auth_KEYBYTES` | number |

### CRYPTO_BOX_BEFORENMBYTES

| Constant | Type |
|----------|------|
| `crypto_box_BEFORENMBYTES` | number |

### CRYPTO_BOX_CURVE25519XCHACHA20POLY1305

| Constant | Type |
|----------|------|
| `crypto_box_curve25519xchacha20poly1305_BEFORENMBYTES` | number |
| `crypto_box_curve25519xchacha20poly1305_MACBYTES` | number |
| `crypto_box_curve25519xchacha20poly1305_MESSAGEBYTES_MAX` | number |
| `crypto_box_curve25519xchacha20poly1305_NONCEBYTES` | number |
| `crypto_box_curve25519xchacha20poly1305_PUBLICKEYBYTES` | number |
| `crypto_box_curve25519xchacha20poly1305_SEALBYTES` | number |
| `crypto_box_curve25519xchacha20poly1305_SECRETKEYBYTES` | number |
| `crypto_box_curve25519xchacha20poly1305_SEEDBYTES` | number |

### CRYPTO_BOX_CURVE25519XSALSA20POLY1305

| Constant | Type |
|----------|------|
| `crypto_box_curve25519xsalsa20poly1305_BEFORENMBYTES` | number |
| `crypto_box_curve25519xsalsa20poly1305_MACBYTES` | number |
| `crypto_box_curve25519xsalsa20poly1305_MESSAGEBYTES_MAX` | number |
| `crypto_box_curve25519xsalsa20poly1305_NONCEBYTES` | number |
| `crypto_box_curve25519xsalsa20poly1305_PUBLICKEYBYTES` | number |
| `crypto_box_curve25519xsalsa20poly1305_SECRETKEYBYTES` | number |
| `crypto_box_curve25519xsalsa20poly1305_SEEDBYTES` | number |

### CRYPTO_BOX_MACBYTES

| Constant | Type |
|----------|------|
| `crypto_box_MACBYTES` | number |

### CRYPTO_BOX_MESSAGEBYTES

| Constant | Type |
|----------|------|
| `crypto_box_MESSAGEBYTES_MAX` | number |

### CRYPTO_BOX_NONCEBYTES

| Constant | Type |
|----------|------|
| `crypto_box_NONCEBYTES` | number |

### CRYPTO_BOX_PUBLICKEYBYTES

| Constant | Type |
|----------|------|
| `crypto_box_PUBLICKEYBYTES` | number |

### CRYPTO_BOX_SEALBYTES

| Constant | Type |
|----------|------|
| `crypto_box_SEALBYTES` | number |

### CRYPTO_BOX_SECRETKEYBYTES

| Constant | Type |
|----------|------|
| `crypto_box_SECRETKEYBYTES` | number |

### CRYPTO_BOX_SEEDBYTES

| Constant | Type |
|----------|------|
| `crypto_box_SEEDBYTES` | number |

### CRYPTO_CORE_ED25519

| Constant | Type |
|----------|------|
| `crypto_core_ed25519_BYTES` | number |
| `crypto_core_ed25519_HASHBYTES` | number |
| `crypto_core_ed25519_NONREDUCEDSCALARBYTES` | number |
| `crypto_core_ed25519_SCALARBYTES` | number |
| `crypto_core_ed25519_UNIFORMBYTES` | number |

### CRYPTO_CORE_HCHACHA20

| Constant | Type |
|----------|------|
| `crypto_core_hchacha20_CONSTBYTES` | number |
| `crypto_core_hchacha20_INPUTBYTES` | number |
| `crypto_core_hchacha20_KEYBYTES` | number |
| `crypto_core_hchacha20_OUTPUTBYTES` | number |

### CRYPTO_CORE_HSALSA20

| Constant | Type |
|----------|------|
| `crypto_core_hsalsa20_CONSTBYTES` | number |
| `crypto_core_hsalsa20_INPUTBYTES` | number |
| `crypto_core_hsalsa20_KEYBYTES` | number |
| `crypto_core_hsalsa20_OUTPUTBYTES` | number |

### CRYPTO_CORE_RISTRETTO255

| Constant | Type |
|----------|------|
| `crypto_core_ristretto255_BYTES` | number |
| `crypto_core_ristretto255_HASHBYTES` | number |
| `crypto_core_ristretto255_NONREDUCEDSCALARBYTES` | number |
| `crypto_core_ristretto255_SCALARBYTES` | number |

### CRYPTO_CORE_SALSA20

| Constant | Type |
|----------|------|
| `crypto_core_salsa20_CONSTBYTES` | number |
| `crypto_core_salsa20_INPUTBYTES` | number |
| `crypto_core_salsa20_KEYBYTES` | number |
| `crypto_core_salsa20_OUTPUTBYTES` | number |

### CRYPTO_CORE_SALSA2012

| Constant | Type |
|----------|------|
| `crypto_core_salsa2012_CONSTBYTES` | number |
| `crypto_core_salsa2012_INPUTBYTES` | number |
| `crypto_core_salsa2012_KEYBYTES` | number |
| `crypto_core_salsa2012_OUTPUTBYTES` | number |

### CRYPTO_CORE_SALSA208

| Constant | Type |
|----------|------|
| `crypto_core_salsa208_CONSTBYTES` | number |
| `crypto_core_salsa208_INPUTBYTES` | number |
| `crypto_core_salsa208_KEYBYTES` | number |
| `crypto_core_salsa208_OUTPUTBYTES` | number |

### CRYPTO_GENERICHASH_BLAKE2B

| Constant | Type |
|----------|------|
| `crypto_generichash_blake2b_BYTES` | number |
| `crypto_generichash_blake2b_BYTES_MAX` | number |
| `crypto_generichash_blake2b_BYTES_MIN` | number |
| `crypto_generichash_blake2b_KEYBYTES` | number |
| `crypto_generichash_blake2b_KEYBYTES_MAX` | number |
| `crypto_generichash_blake2b_KEYBYTES_MIN` | number |
| `crypto_generichash_blake2b_PERSONALBYTES` | number |
| `crypto_generichash_blake2b_SALTBYTES` | number |

### CRYPTO_GENERICHASH_BYTES

| Constant | Type |
|----------|------|
| `crypto_generichash_BYTES` | number |
| `crypto_generichash_BYTES_MAX` | number |
| `crypto_generichash_BYTES_MIN` | number |

### CRYPTO_GENERICHASH_KEYBYTES

| Constant | Type |
|----------|------|
| `crypto_generichash_KEYBYTES` | number |
| `crypto_generichash_KEYBYTES_MAX` | number |
| `crypto_generichash_KEYBYTES_MIN` | number |

### CRYPTO_HASH_BYTES

| Constant | Type |
|----------|------|
| `crypto_hash_BYTES` | number |

### CRYPTO_HASH_SHA256

| Constant | Type |
|----------|------|
| `crypto_hash_sha256_BYTES` | number |

### CRYPTO_HASH_SHA512

| Constant | Type |
|----------|------|
| `crypto_hash_sha512_BYTES` | number |

### CRYPTO_IPCRYPT_BYTES

| Constant | Type |
|----------|------|
| `crypto_ipcrypt_BYTES` | number |

### CRYPTO_IPCRYPT_KEYBYTES

| Constant | Type |
|----------|------|
| `crypto_ipcrypt_KEYBYTES` | number |

### CRYPTO_IPCRYPT_ND

| Constant | Type |
|----------|------|
| `crypto_ipcrypt_ND_INPUTBYTES` | number |
| `crypto_ipcrypt_ND_KEYBYTES` | number |
| `crypto_ipcrypt_ND_OUTPUTBYTES` | number |
| `crypto_ipcrypt_ND_TWEAKBYTES` | number |

### CRYPTO_IPCRYPT_NDX

| Constant | Type |
|----------|------|
| `crypto_ipcrypt_NDX_INPUTBYTES` | number |
| `crypto_ipcrypt_NDX_KEYBYTES` | number |
| `crypto_ipcrypt_NDX_OUTPUTBYTES` | number |
| `crypto_ipcrypt_NDX_TWEAKBYTES` | number |

### CRYPTO_IPCRYPT_PFX

| Constant | Type |
|----------|------|
| `crypto_ipcrypt_PFX_BYTES` | number |
| `crypto_ipcrypt_PFX_KEYBYTES` | number |

### CRYPTO_KDF_BLAKE2B

| Constant | Type |
|----------|------|
| `crypto_kdf_blake2b_BYTES_MAX` | number |
| `crypto_kdf_blake2b_BYTES_MIN` | number |
| `crypto_kdf_blake2b_CONTEXTBYTES` | number |
| `crypto_kdf_blake2b_KEYBYTES` | number |

### CRYPTO_KDF_BYTES

| Constant | Type |
|----------|------|
| `crypto_kdf_BYTES_MAX` | number |
| `crypto_kdf_BYTES_MIN` | number |

### CRYPTO_KDF_CONTEXTBYTES

| Constant | Type |
|----------|------|
| `crypto_kdf_CONTEXTBYTES` | number |

### CRYPTO_KDF_HKDF

| Constant | Type |
|----------|------|
| `crypto_kdf_hkdf_sha256_BYTES_MAX` | number |
| `crypto_kdf_hkdf_sha256_BYTES_MIN` | number |
| `crypto_kdf_hkdf_sha256_KEYBYTES` | number |
| `crypto_kdf_hkdf_sha512_BYTES_MAX` | number |
| `crypto_kdf_hkdf_sha512_BYTES_MIN` | number |
| `crypto_kdf_hkdf_sha512_KEYBYTES` | number |

### CRYPTO_KDF_KEYBYTES

| Constant | Type |
|----------|------|
| `crypto_kdf_KEYBYTES` | number |

### CRYPTO_KX_PUBLICKEYBYTES

| Constant | Type |
|----------|------|
| `crypto_kx_PUBLICKEYBYTES` | number |

### CRYPTO_KX_SECRETKEYBYTES

| Constant | Type |
|----------|------|
| `crypto_kx_SECRETKEYBYTES` | number |

### CRYPTO_KX_SEEDBYTES

| Constant | Type |
|----------|------|
| `crypto_kx_SEEDBYTES` | number |

### CRYPTO_KX_SESSIONKEYBYTES

| Constant | Type |
|----------|------|
| `crypto_kx_SESSIONKEYBYTES` | number |

### CRYPTO_ONETIMEAUTH_BYTES

| Constant | Type |
|----------|------|
| `crypto_onetimeauth_BYTES` | number |

### CRYPTO_ONETIMEAUTH_KEYBYTES

| Constant | Type |
|----------|------|
| `crypto_onetimeauth_KEYBYTES` | number |

### CRYPTO_ONETIMEAUTH_POLY1305

| Constant | Type |
|----------|------|
| `crypto_onetimeauth_poly1305_BYTES` | number |
| `crypto_onetimeauth_poly1305_KEYBYTES` | number |

### CRYPTO_PWHASH_ALG

| Constant | Type |
|----------|------|
| `crypto_pwhash_ALG_ARGON2I13` | number |
| `crypto_pwhash_ALG_ARGON2ID13` | number |
| `crypto_pwhash_ALG_DEFAULT` | number |

### CRYPTO_PWHASH_ARGON2I

| Constant | Type |
|----------|------|
| `crypto_pwhash_argon2i_BYTES_MAX` | number |
| `crypto_pwhash_argon2i_BYTES_MIN` | number |
| `crypto_pwhash_argon2i_MEMLIMIT_INTERACTIVE` | number |
| `crypto_pwhash_argon2i_MEMLIMIT_MAX` | number |
| `crypto_pwhash_argon2i_MEMLIMIT_MIN` | number |
| `crypto_pwhash_argon2i_MEMLIMIT_MODERATE` | number |
| `crypto_pwhash_argon2i_MEMLIMIT_SENSITIVE` | number |
| `crypto_pwhash_argon2i_OPSLIMIT_INTERACTIVE` | number |
| `crypto_pwhash_argon2i_OPSLIMIT_MAX` | number |
| `crypto_pwhash_argon2i_OPSLIMIT_MIN` | number |
| `crypto_pwhash_argon2i_OPSLIMIT_MODERATE` | number |
| `crypto_pwhash_argon2i_OPSLIMIT_SENSITIVE` | number |
| `crypto_pwhash_argon2i_PASSWD_MAX` | number |
| `crypto_pwhash_argon2i_PASSWD_MIN` | number |
| `crypto_pwhash_argon2i_SALTBYTES` | number |
| `crypto_pwhash_argon2i_STRBYTES` | number |
| `crypto_pwhash_argon2i_STRPREFIX` | string |

### CRYPTO_PWHASH_ARGON2ID

| Constant | Type |
|----------|------|
| `crypto_pwhash_argon2id_BYTES_MAX` | number |
| `crypto_pwhash_argon2id_BYTES_MIN` | number |
| `crypto_pwhash_argon2id_MEMLIMIT_INTERACTIVE` | number |
| `crypto_pwhash_argon2id_MEMLIMIT_MAX` | number |
| `crypto_pwhash_argon2id_MEMLIMIT_MIN` | number |
| `crypto_pwhash_argon2id_MEMLIMIT_MODERATE` | number |
| `crypto_pwhash_argon2id_MEMLIMIT_SENSITIVE` | number |
| `crypto_pwhash_argon2id_OPSLIMIT_INTERACTIVE` | number |
| `crypto_pwhash_argon2id_OPSLIMIT_MAX` | number |
| `crypto_pwhash_argon2id_OPSLIMIT_MIN` | number |
| `crypto_pwhash_argon2id_OPSLIMIT_MODERATE` | number |
| `crypto_pwhash_argon2id_OPSLIMIT_SENSITIVE` | number |
| `crypto_pwhash_argon2id_PASSWD_MAX` | number |
| `crypto_pwhash_argon2id_PASSWD_MIN` | number |
| `crypto_pwhash_argon2id_SALTBYTES` | number |
| `crypto_pwhash_argon2id_STRBYTES` | number |
| `crypto_pwhash_argon2id_STRPREFIX` | string |

### CRYPTO_PWHASH_BYTES

| Constant | Type |
|----------|------|
| `crypto_pwhash_BYTES_MAX` | number |
| `crypto_pwhash_BYTES_MIN` | number |

### CRYPTO_PWHASH_MEMLIMIT

| Constant | Type |
|----------|------|
| `crypto_pwhash_MEMLIMIT_INTERACTIVE` | number |
| `crypto_pwhash_MEMLIMIT_MAX` | number |
| `crypto_pwhash_MEMLIMIT_MIN` | number |
| `crypto_pwhash_MEMLIMIT_MODERATE` | number |
| `crypto_pwhash_MEMLIMIT_SENSITIVE` | number |

### CRYPTO_PWHASH_OPSLIMIT

| Constant | Type |
|----------|------|
| `crypto_pwhash_OPSLIMIT_INTERACTIVE` | number |
| `crypto_pwhash_OPSLIMIT_MAX` | number |
| `crypto_pwhash_OPSLIMIT_MIN` | number |
| `crypto_pwhash_OPSLIMIT_MODERATE` | number |
| `crypto_pwhash_OPSLIMIT_SENSITIVE` | number |

### CRYPTO_PWHASH_PASSWD

| Constant | Type |
|----------|------|
| `crypto_pwhash_PASSWD_MAX` | number |
| `crypto_pwhash_PASSWD_MIN` | number |

### CRYPTO_PWHASH_SALTBYTES

| Constant | Type |
|----------|------|
| `crypto_pwhash_SALTBYTES` | number |

### CRYPTO_PWHASH_SCRYPTSALSA208SHA256

| Constant | Type |
|----------|------|
| `crypto_pwhash_scryptsalsa208sha256_BYTES_MAX` | number |
| `crypto_pwhash_scryptsalsa208sha256_BYTES_MIN` | number |
| `crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_INTERACTIVE` | number |
| `crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_MAX` | number |
| `crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_MIN` | number |
| `crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_SENSITIVE` | number |
| `crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_INTERACTIVE` | number |
| `crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_MAX` | number |
| `crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_MIN` | number |
| `crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_SENSITIVE` | number |
| `crypto_pwhash_scryptsalsa208sha256_PASSWD_MAX` | number |
| `crypto_pwhash_scryptsalsa208sha256_PASSWD_MIN` | number |
| `crypto_pwhash_scryptsalsa208sha256_SALTBYTES` | number |
| `crypto_pwhash_scryptsalsa208sha256_STRBYTES` | number |
| `crypto_pwhash_scryptsalsa208sha256_STRPREFIX` | string |

### CRYPTO_PWHASH_STRBYTES

| Constant | Type |
|----------|------|
| `crypto_pwhash_STRBYTES` | number |

### CRYPTO_PWHASH_STRPREFIX

| Constant | Type |
|----------|------|
| `crypto_pwhash_STRPREFIX` | string |

### CRYPTO_SCALARMULT_BYTES

| Constant | Type |
|----------|------|
| `crypto_scalarmult_BYTES` | number |

### CRYPTO_SCALARMULT_CURVE25519

| Constant | Type |
|----------|------|
| `crypto_scalarmult_curve25519_BYTES` | number |
| `crypto_scalarmult_curve25519_SCALARBYTES` | number |

### CRYPTO_SCALARMULT_ED25519

| Constant | Type |
|----------|------|
| `crypto_scalarmult_ed25519_BYTES` | number |
| `crypto_scalarmult_ed25519_SCALARBYTES` | number |

### CRYPTO_SCALARMULT_RISTRETTO255

| Constant | Type |
|----------|------|
| `crypto_scalarmult_ristretto255_BYTES` | number |
| `crypto_scalarmult_ristretto255_SCALARBYTES` | number |

### CRYPTO_SCALARMULT_SCALARBYTES

| Constant | Type |
|----------|------|
| `crypto_scalarmult_SCALARBYTES` | number |

### CRYPTO_SECRETBOX_KEYBYTES

| Constant | Type |
|----------|------|
| `crypto_secretbox_KEYBYTES` | number |

### CRYPTO_SECRETBOX_MACBYTES

| Constant | Type |
|----------|------|
| `crypto_secretbox_MACBYTES` | number |

### CRYPTO_SECRETBOX_MESSAGEBYTES

| Constant | Type |
|----------|------|
| `crypto_secretbox_MESSAGEBYTES_MAX` | number |

### CRYPTO_SECRETBOX_NONCEBYTES

| Constant | Type |
|----------|------|
| `crypto_secretbox_NONCEBYTES` | number |

### CRYPTO_SECRETBOX_XCHACHA20POLY1305

| Constant | Type |
|----------|------|
| `crypto_secretbox_xchacha20poly1305_KEYBYTES` | number |
| `crypto_secretbox_xchacha20poly1305_MACBYTES` | number |
| `crypto_secretbox_xchacha20poly1305_MESSAGEBYTES_MAX` | number |
| `crypto_secretbox_xchacha20poly1305_NONCEBYTES` | number |

### CRYPTO_SECRETBOX_XSALSA20POLY1305

| Constant | Type |
|----------|------|
| `crypto_secretbox_xsalsa20poly1305_KEYBYTES` | number |
| `crypto_secretbox_xsalsa20poly1305_MACBYTES` | number |
| `crypto_secretbox_xsalsa20poly1305_MESSAGEBYTES_MAX` | number |
| `crypto_secretbox_xsalsa20poly1305_NONCEBYTES` | number |

### CRYPTO_SECRETSTREAM_XCHACHA20POLY1305

| Constant | Type |
|----------|------|
| `crypto_secretstream_xchacha20poly1305_ABYTES` | number |
| `crypto_secretstream_xchacha20poly1305_HEADERBYTES` | number |
| `crypto_secretstream_xchacha20poly1305_KEYBYTES` | number |
| `crypto_secretstream_xchacha20poly1305_MESSAGEBYTES_MAX` | number |
| `crypto_secretstream_xchacha20poly1305_TAG_FINAL` | number |
| `crypto_secretstream_xchacha20poly1305_TAG_MESSAGE` | number |
| `crypto_secretstream_xchacha20poly1305_TAG_PUSH` | number |
| `crypto_secretstream_xchacha20poly1305_TAG_REKEY` | number |

### CRYPTO_SHORTHASH_BYTES

| Constant | Type |
|----------|------|
| `crypto_shorthash_BYTES` | number |

### CRYPTO_SHORTHASH_KEYBYTES

| Constant | Type |
|----------|------|
| `crypto_shorthash_KEYBYTES` | number |

### CRYPTO_SHORTHASH_SIPHASH24

| Constant | Type |
|----------|------|
| `crypto_shorthash_siphash24_BYTES` | number |
| `crypto_shorthash_siphash24_KEYBYTES` | number |

### CRYPTO_SHORTHASH_SIPHASHX24

| Constant | Type |
|----------|------|
| `crypto_shorthash_siphashx24_BYTES` | number |
| `crypto_shorthash_siphashx24_KEYBYTES` | number |

### CRYPTO_SIGN_BYTES

| Constant | Type |
|----------|------|
| `crypto_sign_BYTES` | number |

### CRYPTO_SIGN_ED25519

| Constant | Type |
|----------|------|
| `crypto_sign_ed25519_BYTES` | number |
| `crypto_sign_ed25519_MESSAGEBYTES_MAX` | number |
| `crypto_sign_ed25519_PUBLICKEYBYTES` | number |
| `crypto_sign_ed25519_SECRETKEYBYTES` | number |
| `crypto_sign_ed25519_SEEDBYTES` | number |

### CRYPTO_SIGN_MESSAGEBYTES

| Constant | Type |
|----------|------|
| `crypto_sign_MESSAGEBYTES_MAX` | number |

### CRYPTO_SIGN_PUBLICKEYBYTES

| Constant | Type |
|----------|------|
| `crypto_sign_PUBLICKEYBYTES` | number |

### CRYPTO_SIGN_SECRETKEYBYTES

| Constant | Type |
|----------|------|
| `crypto_sign_SECRETKEYBYTES` | number |

### CRYPTO_SIGN_SEEDBYTES

| Constant | Type |
|----------|------|
| `crypto_sign_SEEDBYTES` | number |

### CRYPTO_STREAM_CHACHA20

| Constant | Type |
|----------|------|
| `crypto_stream_chacha20_IETF_KEYBYTES` | number |
| `crypto_stream_chacha20_IETF_MESSAGEBYTES_MAX` | number |
| `crypto_stream_chacha20_IETF_NONCEBYTES` | number |
| `crypto_stream_chacha20_KEYBYTES` | number |
| `crypto_stream_chacha20_MESSAGEBYTES_MAX` | number |
| `crypto_stream_chacha20_NONCEBYTES` | number |
| `crypto_stream_chacha20_ietf_KEYBYTES` | number |
| `crypto_stream_chacha20_ietf_MESSAGEBYTES_MAX` | number |
| `crypto_stream_chacha20_ietf_NONCEBYTES` | number |

### CRYPTO_STREAM_KEYBYTES

| Constant | Type |
|----------|------|
| `crypto_stream_KEYBYTES` | number |

### CRYPTO_STREAM_MESSAGEBYTES

| Constant | Type |
|----------|------|
| `crypto_stream_MESSAGEBYTES_MAX` | number |

### CRYPTO_STREAM_NONCEBYTES

| Constant | Type |
|----------|------|
| `crypto_stream_NONCEBYTES` | number |

### CRYPTO_STREAM_SALSA20

| Constant | Type |
|----------|------|
| `crypto_stream_salsa20_KEYBYTES` | number |
| `crypto_stream_salsa20_MESSAGEBYTES_MAX` | number |
| `crypto_stream_salsa20_NONCEBYTES` | number |

### CRYPTO_STREAM_SALSA2012

| Constant | Type |
|----------|------|
| `crypto_stream_salsa2012_KEYBYTES` | number |
| `crypto_stream_salsa2012_MESSAGEBYTES_MAX` | number |
| `crypto_stream_salsa2012_NONCEBYTES` | number |

### CRYPTO_STREAM_SALSA208

| Constant | Type |
|----------|------|
| `crypto_stream_salsa208_KEYBYTES` | number |
| `crypto_stream_salsa208_MESSAGEBYTES_MAX` | number |
| `crypto_stream_salsa208_NONCEBYTES` | number |

### CRYPTO_STREAM_XCHACHA20

| Constant | Type |
|----------|------|
| `crypto_stream_xchacha20_KEYBYTES` | number |
| `crypto_stream_xchacha20_MESSAGEBYTES_MAX` | number |
| `crypto_stream_xchacha20_NONCEBYTES` | number |

### CRYPTO_STREAM_XSALSA20

| Constant | Type |
|----------|------|
| `crypto_stream_xsalsa20_KEYBYTES` | number |
| `crypto_stream_xsalsa20_MESSAGEBYTES_MAX` | number |
| `crypto_stream_xsalsa20_NONCEBYTES` | number |

### CRYPTO_VERIFY_16

| Constant | Type |
|----------|------|
| `crypto_verify_16_BYTES` | number |

### CRYPTO_VERIFY_32

| Constant | Type |
|----------|------|
| `crypto_verify_32_BYTES` | number |

### CRYPTO_VERIFY_64

| Constant | Type |
|----------|------|
| `crypto_verify_64_BYTES` | number |

### CRYPTO_XOF_SHAKE128

| Constant | Type |
|----------|------|
| `crypto_xof_shake128_BLOCKBYTES` | number |
| `crypto_xof_shake128_STATEBYTES` | number |

### CRYPTO_XOF_SHAKE256

| Constant | Type |
|----------|------|
| `crypto_xof_shake256_BLOCKBYTES` | number |
| `crypto_xof_shake256_STATEBYTES` | number |

### CRYPTO_XOF_TURBOSHAKE128

| Constant | Type |
|----------|------|
| `crypto_xof_turboshake128_BLOCKBYTES` | number |
| `crypto_xof_turboshake128_STATEBYTES` | number |

### CRYPTO_XOF_TURBOSHAKE256

| Constant | Type |
|----------|------|
| `crypto_xof_turboshake256_BLOCKBYTES` | number |
| `crypto_xof_turboshake256_STATEBYTES` | number |

### SODIUM

| Constant | Type |
|----------|------|
| `SODIUM_LIBRARY_VERSION_MAJOR` | number |
| `SODIUM_LIBRARY_VERSION_MINOR` | number |
| `SODIUM_VERSION_STRING` | string |
