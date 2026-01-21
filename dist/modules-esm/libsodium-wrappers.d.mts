// TypeScript definitions for libsodium-wrappers
// Auto-generated - do not edit manually

/**
 * Promise that resolves when the library is ready to use.
 * All crypto operations must wait for this promise to resolve.
 */
export const ready: Promise<void>;

export type StateAddress = {
  name: string;
  address: number;
};

export const base64_variants: {
  ORIGINAL: number;
  ORIGINAL_NO_PADDING: number;
  URLSAFE: number;
  URLSAFE_NO_PADDING: number;
};

export type base64_variants = number;

export const output_formats: string[];

export type Uint8ArrayOutputFormat = "uint8array";
export type StringOutputFormat = "text" | "hex" | "base64";

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

// Constants
export const SODIUM_LIBRARY_VERSION_MAJOR: number;
export const SODIUM_LIBRARY_VERSION_MINOR: number;
export const SODIUM_VERSION_STRING: string;
export const crypto_aead_aegis128l_ABYTES: number;
export const crypto_aead_aegis128l_KEYBYTES: number;
export const crypto_aead_aegis128l_MESSAGEBYTES_MAX: number;
export const crypto_aead_aegis128l_NPUBBYTES: number;
export const crypto_aead_aegis128l_NSECBYTES: number;
export const crypto_aead_aegis256_ABYTES: number;
export const crypto_aead_aegis256_KEYBYTES: number;
export const crypto_aead_aegis256_MESSAGEBYTES_MAX: number;
export const crypto_aead_aegis256_NPUBBYTES: number;
export const crypto_aead_aegis256_NSECBYTES: number;
export const crypto_aead_aes256gcm_ABYTES: number;
export const crypto_aead_aes256gcm_KEYBYTES: number;
export const crypto_aead_aes256gcm_MESSAGEBYTES_MAX: number;
export const crypto_aead_aes256gcm_NPUBBYTES: number;
export const crypto_aead_aes256gcm_NSECBYTES: number;
export const crypto_aead_chacha20poly1305_ABYTES: number;
export const crypto_aead_chacha20poly1305_IETF_ABYTES: number;
export const crypto_aead_chacha20poly1305_IETF_KEYBYTES: number;
export const crypto_aead_chacha20poly1305_IETF_MESSAGEBYTES_MAX: number;
export const crypto_aead_chacha20poly1305_IETF_NPUBBYTES: number;
export const crypto_aead_chacha20poly1305_IETF_NSECBYTES: number;
export const crypto_aead_chacha20poly1305_KEYBYTES: number;
export const crypto_aead_chacha20poly1305_MESSAGEBYTES_MAX: number;
export const crypto_aead_chacha20poly1305_NPUBBYTES: number;
export const crypto_aead_chacha20poly1305_NSECBYTES: number;
export const crypto_aead_chacha20poly1305_ietf_ABYTES: number;
export const crypto_aead_chacha20poly1305_ietf_KEYBYTES: number;
export const crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX: number;
export const crypto_aead_chacha20poly1305_ietf_NPUBBYTES: number;
export const crypto_aead_chacha20poly1305_ietf_NSECBYTES: number;
export const crypto_aead_xchacha20poly1305_IETF_ABYTES: number;
export const crypto_aead_xchacha20poly1305_IETF_KEYBYTES: number;
export const crypto_aead_xchacha20poly1305_IETF_MESSAGEBYTES_MAX: number;
export const crypto_aead_xchacha20poly1305_IETF_NPUBBYTES: number;
export const crypto_aead_xchacha20poly1305_IETF_NSECBYTES: number;
export const crypto_aead_xchacha20poly1305_ietf_ABYTES: number;
export const crypto_aead_xchacha20poly1305_ietf_KEYBYTES: number;
export const crypto_aead_xchacha20poly1305_ietf_MESSAGEBYTES_MAX: number;
export const crypto_aead_xchacha20poly1305_ietf_NPUBBYTES: number;
export const crypto_aead_xchacha20poly1305_ietf_NSECBYTES: number;
export const crypto_auth_BYTES: number;
export const crypto_auth_KEYBYTES: number;
export const crypto_auth_hmacsha256_BYTES: number;
export const crypto_auth_hmacsha256_KEYBYTES: number;
export const crypto_auth_hmacsha512256_BYTES: number;
export const crypto_auth_hmacsha512256_KEYBYTES: number;
export const crypto_auth_hmacsha512_BYTES: number;
export const crypto_auth_hmacsha512_KEYBYTES: number;
export const crypto_box_BEFORENMBYTES: number;
export const crypto_box_MACBYTES: number;
export const crypto_box_MESSAGEBYTES_MAX: number;
export const crypto_box_NONCEBYTES: number;
export const crypto_box_PUBLICKEYBYTES: number;
export const crypto_box_SEALBYTES: number;
export const crypto_box_SECRETKEYBYTES: number;
export const crypto_box_SEEDBYTES: number;
export const crypto_box_curve25519xchacha20poly1305_BEFORENMBYTES: number;
export const crypto_box_curve25519xchacha20poly1305_MACBYTES: number;
export const crypto_box_curve25519xchacha20poly1305_MESSAGEBYTES_MAX: number;
export const crypto_box_curve25519xchacha20poly1305_NONCEBYTES: number;
export const crypto_box_curve25519xchacha20poly1305_PUBLICKEYBYTES: number;
export const crypto_box_curve25519xchacha20poly1305_SEALBYTES: number;
export const crypto_box_curve25519xchacha20poly1305_SECRETKEYBYTES: number;
export const crypto_box_curve25519xchacha20poly1305_SEEDBYTES: number;
export const crypto_box_curve25519xsalsa20poly1305_BEFORENMBYTES: number;
export const crypto_box_curve25519xsalsa20poly1305_MACBYTES: number;
export const crypto_box_curve25519xsalsa20poly1305_MESSAGEBYTES_MAX: number;
export const crypto_box_curve25519xsalsa20poly1305_NONCEBYTES: number;
export const crypto_box_curve25519xsalsa20poly1305_PUBLICKEYBYTES: number;
export const crypto_box_curve25519xsalsa20poly1305_SECRETKEYBYTES: number;
export const crypto_box_curve25519xsalsa20poly1305_SEEDBYTES: number;
export const crypto_core_ed25519_BYTES: number;
export const crypto_core_ed25519_HASHBYTES: number;
export const crypto_core_ed25519_NONREDUCEDSCALARBYTES: number;
export const crypto_core_ed25519_SCALARBYTES: number;
export const crypto_core_ed25519_UNIFORMBYTES: number;
export const crypto_core_hchacha20_CONSTBYTES: number;
export const crypto_core_hchacha20_INPUTBYTES: number;
export const crypto_core_hchacha20_KEYBYTES: number;
export const crypto_core_hchacha20_OUTPUTBYTES: number;
export const crypto_core_hsalsa20_CONSTBYTES: number;
export const crypto_core_hsalsa20_INPUTBYTES: number;
export const crypto_core_hsalsa20_KEYBYTES: number;
export const crypto_core_hsalsa20_OUTPUTBYTES: number;
export const crypto_core_ristretto255_BYTES: number;
export const crypto_core_ristretto255_HASHBYTES: number;
export const crypto_core_ristretto255_NONREDUCEDSCALARBYTES: number;
export const crypto_core_ristretto255_SCALARBYTES: number;
export const crypto_core_salsa2012_CONSTBYTES: number;
export const crypto_core_salsa2012_INPUTBYTES: number;
export const crypto_core_salsa2012_KEYBYTES: number;
export const crypto_core_salsa2012_OUTPUTBYTES: number;
export const crypto_core_salsa208_CONSTBYTES: number;
export const crypto_core_salsa208_INPUTBYTES: number;
export const crypto_core_salsa208_KEYBYTES: number;
export const crypto_core_salsa208_OUTPUTBYTES: number;
export const crypto_core_salsa20_CONSTBYTES: number;
export const crypto_core_salsa20_INPUTBYTES: number;
export const crypto_core_salsa20_KEYBYTES: number;
export const crypto_core_salsa20_OUTPUTBYTES: number;
export const crypto_generichash_BYTES: number;
export const crypto_generichash_BYTES_MAX: number;
export const crypto_generichash_BYTES_MIN: number;
export const crypto_generichash_KEYBYTES: number;
export const crypto_generichash_KEYBYTES_MAX: number;
export const crypto_generichash_KEYBYTES_MIN: number;
export const crypto_generichash_blake2b_BYTES: number;
export const crypto_generichash_blake2b_BYTES_MAX: number;
export const crypto_generichash_blake2b_BYTES_MIN: number;
export const crypto_generichash_blake2b_KEYBYTES: number;
export const crypto_generichash_blake2b_KEYBYTES_MAX: number;
export const crypto_generichash_blake2b_KEYBYTES_MIN: number;
export const crypto_generichash_blake2b_PERSONALBYTES: number;
export const crypto_generichash_blake2b_SALTBYTES: number;
export const crypto_hash_BYTES: number;
export const crypto_hash_sha256_BYTES: number;
export const crypto_hash_sha512_BYTES: number;
export const crypto_ipcrypt_BYTES: number;
export const crypto_ipcrypt_KEYBYTES: number;
export const crypto_ipcrypt_ND_INPUTBYTES: number;
export const crypto_ipcrypt_ND_KEYBYTES: number;
export const crypto_ipcrypt_ND_OUTPUTBYTES: number;
export const crypto_ipcrypt_ND_TWEAKBYTES: number;
export const crypto_ipcrypt_NDX_INPUTBYTES: number;
export const crypto_ipcrypt_NDX_KEYBYTES: number;
export const crypto_ipcrypt_NDX_OUTPUTBYTES: number;
export const crypto_ipcrypt_NDX_TWEAKBYTES: number;
export const crypto_ipcrypt_PFX_BYTES: number;
export const crypto_ipcrypt_PFX_KEYBYTES: number;
export const crypto_kdf_BYTES_MAX: number;
export const crypto_kdf_BYTES_MIN: number;
export const crypto_kdf_CONTEXTBYTES: number;
export const crypto_kdf_KEYBYTES: number;
export const crypto_kdf_blake2b_BYTES_MAX: number;
export const crypto_kdf_blake2b_BYTES_MIN: number;
export const crypto_kdf_blake2b_CONTEXTBYTES: number;
export const crypto_kdf_blake2b_KEYBYTES: number;
export const crypto_kdf_hkdf_sha256_BYTES_MAX: number;
export const crypto_kdf_hkdf_sha256_BYTES_MIN: number;
export const crypto_kdf_hkdf_sha256_KEYBYTES: number;
export const crypto_kdf_hkdf_sha512_BYTES_MAX: number;
export const crypto_kdf_hkdf_sha512_BYTES_MIN: number;
export const crypto_kdf_hkdf_sha512_KEYBYTES: number;
export const crypto_kx_PUBLICKEYBYTES: number;
export const crypto_kx_SECRETKEYBYTES: number;
export const crypto_kx_SEEDBYTES: number;
export const crypto_kx_SESSIONKEYBYTES: number;
export const crypto_onetimeauth_BYTES: number;
export const crypto_onetimeauth_KEYBYTES: number;
export const crypto_onetimeauth_poly1305_BYTES: number;
export const crypto_onetimeauth_poly1305_KEYBYTES: number;
export const crypto_pwhash_ALG_ARGON2I13: number;
export const crypto_pwhash_ALG_ARGON2ID13: number;
export const crypto_pwhash_ALG_DEFAULT: number;
export const crypto_pwhash_BYTES_MAX: number;
export const crypto_pwhash_BYTES_MIN: number;
export const crypto_pwhash_MEMLIMIT_INTERACTIVE: number;
export const crypto_pwhash_MEMLIMIT_MAX: number;
export const crypto_pwhash_MEMLIMIT_MIN: number;
export const crypto_pwhash_MEMLIMIT_MODERATE: number;
export const crypto_pwhash_MEMLIMIT_SENSITIVE: number;
export const crypto_pwhash_OPSLIMIT_INTERACTIVE: number;
export const crypto_pwhash_OPSLIMIT_MAX: number;
export const crypto_pwhash_OPSLIMIT_MIN: number;
export const crypto_pwhash_OPSLIMIT_MODERATE: number;
export const crypto_pwhash_OPSLIMIT_SENSITIVE: number;
export const crypto_pwhash_PASSWD_MAX: number;
export const crypto_pwhash_PASSWD_MIN: number;
export const crypto_pwhash_SALTBYTES: number;
export const crypto_pwhash_STRBYTES: number;
export const crypto_pwhash_STRPREFIX: string;
export const crypto_pwhash_argon2i_BYTES_MAX: number;
export const crypto_pwhash_argon2i_BYTES_MIN: number;
export const crypto_pwhash_argon2i_MEMLIMIT_INTERACTIVE: number;
export const crypto_pwhash_argon2i_MEMLIMIT_MAX: number;
export const crypto_pwhash_argon2i_MEMLIMIT_MIN: number;
export const crypto_pwhash_argon2i_MEMLIMIT_MODERATE: number;
export const crypto_pwhash_argon2i_MEMLIMIT_SENSITIVE: number;
export const crypto_pwhash_argon2i_OPSLIMIT_INTERACTIVE: number;
export const crypto_pwhash_argon2i_OPSLIMIT_MAX: number;
export const crypto_pwhash_argon2i_OPSLIMIT_MIN: number;
export const crypto_pwhash_argon2i_OPSLIMIT_MODERATE: number;
export const crypto_pwhash_argon2i_OPSLIMIT_SENSITIVE: number;
export const crypto_pwhash_argon2i_PASSWD_MAX: number;
export const crypto_pwhash_argon2i_PASSWD_MIN: number;
export const crypto_pwhash_argon2i_SALTBYTES: number;
export const crypto_pwhash_argon2i_STRBYTES: number;
export const crypto_pwhash_argon2i_STRPREFIX: string;
export const crypto_pwhash_argon2id_BYTES_MAX: number;
export const crypto_pwhash_argon2id_BYTES_MIN: number;
export const crypto_pwhash_argon2id_MEMLIMIT_INTERACTIVE: number;
export const crypto_pwhash_argon2id_MEMLIMIT_MAX: number;
export const crypto_pwhash_argon2id_MEMLIMIT_MIN: number;
export const crypto_pwhash_argon2id_MEMLIMIT_MODERATE: number;
export const crypto_pwhash_argon2id_MEMLIMIT_SENSITIVE: number;
export const crypto_pwhash_argon2id_OPSLIMIT_INTERACTIVE: number;
export const crypto_pwhash_argon2id_OPSLIMIT_MAX: number;
export const crypto_pwhash_argon2id_OPSLIMIT_MIN: number;
export const crypto_pwhash_argon2id_OPSLIMIT_MODERATE: number;
export const crypto_pwhash_argon2id_OPSLIMIT_SENSITIVE: number;
export const crypto_pwhash_argon2id_PASSWD_MAX: number;
export const crypto_pwhash_argon2id_PASSWD_MIN: number;
export const crypto_pwhash_argon2id_SALTBYTES: number;
export const crypto_pwhash_argon2id_STRBYTES: number;
export const crypto_pwhash_argon2id_STRPREFIX: string;
export const crypto_pwhash_scryptsalsa208sha256_BYTES_MAX: number;
export const crypto_pwhash_scryptsalsa208sha256_BYTES_MIN: number;
export const crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_INTERACTIVE: number;
export const crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_MAX: number;
export const crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_MIN: number;
export const crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_SENSITIVE: number;
export const crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_INTERACTIVE: number;
export const crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_MAX: number;
export const crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_MIN: number;
export const crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_SENSITIVE: number;
export const crypto_pwhash_scryptsalsa208sha256_PASSWD_MAX: number;
export const crypto_pwhash_scryptsalsa208sha256_PASSWD_MIN: number;
export const crypto_pwhash_scryptsalsa208sha256_SALTBYTES: number;
export const crypto_pwhash_scryptsalsa208sha256_STRBYTES: number;
export const crypto_pwhash_scryptsalsa208sha256_STRPREFIX: string;
export const crypto_scalarmult_BYTES: number;
export const crypto_scalarmult_SCALARBYTES: number;
export const crypto_scalarmult_curve25519_BYTES: number;
export const crypto_scalarmult_curve25519_SCALARBYTES: number;
export const crypto_scalarmult_ed25519_BYTES: number;
export const crypto_scalarmult_ed25519_SCALARBYTES: number;
export const crypto_scalarmult_ristretto255_BYTES: number;
export const crypto_scalarmult_ristretto255_SCALARBYTES: number;
export const crypto_secretbox_KEYBYTES: number;
export const crypto_secretbox_MACBYTES: number;
export const crypto_secretbox_MESSAGEBYTES_MAX: number;
export const crypto_secretbox_NONCEBYTES: number;
export const crypto_secretbox_xchacha20poly1305_KEYBYTES: number;
export const crypto_secretbox_xchacha20poly1305_MACBYTES: number;
export const crypto_secretbox_xchacha20poly1305_MESSAGEBYTES_MAX: number;
export const crypto_secretbox_xchacha20poly1305_NONCEBYTES: number;
export const crypto_secretbox_xsalsa20poly1305_KEYBYTES: number;
export const crypto_secretbox_xsalsa20poly1305_MACBYTES: number;
export const crypto_secretbox_xsalsa20poly1305_MESSAGEBYTES_MAX: number;
export const crypto_secretbox_xsalsa20poly1305_NONCEBYTES: number;
export const crypto_secretstream_xchacha20poly1305_ABYTES: number;
export const crypto_secretstream_xchacha20poly1305_HEADERBYTES: number;
export const crypto_secretstream_xchacha20poly1305_KEYBYTES: number;
export const crypto_secretstream_xchacha20poly1305_MESSAGEBYTES_MAX: number;
export const crypto_secretstream_xchacha20poly1305_TAG_FINAL: number;
export const crypto_secretstream_xchacha20poly1305_TAG_MESSAGE: number;
export const crypto_secretstream_xchacha20poly1305_TAG_PUSH: number;
export const crypto_secretstream_xchacha20poly1305_TAG_REKEY: number;
export const crypto_shorthash_BYTES: number;
export const crypto_shorthash_KEYBYTES: number;
export const crypto_shorthash_siphash24_BYTES: number;
export const crypto_shorthash_siphash24_KEYBYTES: number;
export const crypto_shorthash_siphashx24_BYTES: number;
export const crypto_shorthash_siphashx24_KEYBYTES: number;
export const crypto_sign_BYTES: number;
export const crypto_sign_MESSAGEBYTES_MAX: number;
export const crypto_sign_PUBLICKEYBYTES: number;
export const crypto_sign_SECRETKEYBYTES: number;
export const crypto_sign_SEEDBYTES: number;
export const crypto_sign_ed25519_BYTES: number;
export const crypto_sign_ed25519_MESSAGEBYTES_MAX: number;
export const crypto_sign_ed25519_PUBLICKEYBYTES: number;
export const crypto_sign_ed25519_SECRETKEYBYTES: number;
export const crypto_sign_ed25519_SEEDBYTES: number;
export const crypto_stream_KEYBYTES: number;
export const crypto_stream_MESSAGEBYTES_MAX: number;
export const crypto_stream_NONCEBYTES: number;
export const crypto_stream_chacha20_IETF_KEYBYTES: number;
export const crypto_stream_chacha20_IETF_MESSAGEBYTES_MAX: number;
export const crypto_stream_chacha20_IETF_NONCEBYTES: number;
export const crypto_stream_chacha20_KEYBYTES: number;
export const crypto_stream_chacha20_MESSAGEBYTES_MAX: number;
export const crypto_stream_chacha20_NONCEBYTES: number;
export const crypto_stream_chacha20_ietf_KEYBYTES: number;
export const crypto_stream_chacha20_ietf_MESSAGEBYTES_MAX: number;
export const crypto_stream_chacha20_ietf_NONCEBYTES: number;
export const crypto_stream_salsa2012_KEYBYTES: number;
export const crypto_stream_salsa2012_MESSAGEBYTES_MAX: number;
export const crypto_stream_salsa2012_NONCEBYTES: number;
export const crypto_stream_salsa208_KEYBYTES: number;
export const crypto_stream_salsa208_MESSAGEBYTES_MAX: number;
export const crypto_stream_salsa208_NONCEBYTES: number;
export const crypto_stream_salsa20_KEYBYTES: number;
export const crypto_stream_salsa20_MESSAGEBYTES_MAX: number;
export const crypto_stream_salsa20_NONCEBYTES: number;
export const crypto_stream_xchacha20_KEYBYTES: number;
export const crypto_stream_xchacha20_MESSAGEBYTES_MAX: number;
export const crypto_stream_xchacha20_NONCEBYTES: number;
export const crypto_stream_xsalsa20_KEYBYTES: number;
export const crypto_stream_xsalsa20_MESSAGEBYTES_MAX: number;
export const crypto_stream_xsalsa20_NONCEBYTES: number;
export const crypto_xof_shake128_BLOCKBYTES: number;
export const crypto_xof_shake128_STATEBYTES: number;
export const crypto_xof_shake256_BLOCKBYTES: number;
export const crypto_xof_shake256_STATEBYTES: number;
export const crypto_xof_turboshake128_BLOCKBYTES: number;
export const crypto_xof_turboshake128_STATEBYTES: number;
export const crypto_xof_turboshake256_BLOCKBYTES: number;
export const crypto_xof_turboshake256_STATEBYTES: number;
export const crypto_verify_16_BYTES: number;
export const crypto_verify_32_BYTES: number;
export const crypto_verify_64_BYTES: number;

// Crypto functions
/**
 * @param secret_nonce (CRYPTO_AEAD_AEGIS128L_NSECBYTES bytes)
 * @param ciphertext
 * @param additional_data
 * @param public_nonce (CRYPTO_AEAD_AEGIS128L_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_AEGIS128L_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AEAD_AEGIS128L_ABYTES bytes)
 */
export function crypto_aead_aegis128l_decrypt(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_aegis128l_decrypt(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param secret_nonce (CRYPTO_AEAD_AEGIS128L_NSECBYTES bytes)
 * @param ciphertext
 * @param mac (CRYPTO_AEAD_AEGIS128L_ABYTES bytes)
 * @param additional_data
 * @param public_nonce (CRYPTO_AEAD_AEGIS128L_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_AEGIS128L_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_aead_aegis128l_decrypt_detached(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array | string, mac: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_aegis128l_decrypt_detached(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array | string, mac: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param additional_data
 * @param secret_nonce (CRYPTO_AEAD_AEGIS128L_NSECBYTES bytes)
 * @param public_nonce (CRYPTO_AEAD_AEGIS128L_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_AEGIS128L_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AEAD_AEGIS128L_ABYTES bytes)
 */
export function crypto_aead_aegis128l_encrypt(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_aegis128l_encrypt(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param additional_data
 * @param secret_nonce (CRYPTO_AEAD_AEGIS128L_NSECBYTES bytes)
 * @param public_nonce (CRYPTO_AEAD_AEGIS128L_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_AEGIS128L_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {ciphertext, mac}
 */
export function crypto_aead_aegis128l_encrypt_detached(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): { ciphertext: Uint8Array; mac: Uint8Array };
export function crypto_aead_aegis128l_encrypt_detached(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): { ciphertext: string; mac: string };
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AEAD_AEGIS128L_KEYBYTES bytes)
 */
export function crypto_aead_aegis128l_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_aegis128l_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param secret_nonce (CRYPTO_AEAD_AEGIS256_NSECBYTES bytes)
 * @param ciphertext
 * @param additional_data
 * @param public_nonce (CRYPTO_AEAD_AEGIS256_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_AEGIS256_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AEAD_AEGIS256_ABYTES bytes)
 */
export function crypto_aead_aegis256_decrypt(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_aegis256_decrypt(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param secret_nonce (CRYPTO_AEAD_AEGIS256_NSECBYTES bytes)
 * @param ciphertext
 * @param mac (CRYPTO_AEAD_AEGIS256_ABYTES bytes)
 * @param additional_data
 * @param public_nonce (CRYPTO_AEAD_AEGIS256_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_AEGIS256_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_aead_aegis256_decrypt_detached(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array | string, mac: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_aegis256_decrypt_detached(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array | string, mac: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param additional_data
 * @param secret_nonce (CRYPTO_AEAD_AEGIS256_NSECBYTES bytes)
 * @param public_nonce (CRYPTO_AEAD_AEGIS256_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_AEGIS256_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AEAD_AEGIS256_ABYTES bytes)
 */
export function crypto_aead_aegis256_encrypt(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_aegis256_encrypt(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param additional_data
 * @param secret_nonce (CRYPTO_AEAD_AEGIS256_NSECBYTES bytes)
 * @param public_nonce (CRYPTO_AEAD_AEGIS256_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_AEGIS256_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {ciphertext, mac}
 */
export function crypto_aead_aegis256_encrypt_detached(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): { ciphertext: Uint8Array; mac: Uint8Array };
export function crypto_aead_aegis256_encrypt_detached(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): { ciphertext: string; mac: string };
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AEAD_AEGIS256_KEYBYTES bytes)
 */
export function crypto_aead_aegis256_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_aegis256_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param secret_nonce (CRYPTO_AEAD_CHACHA20POLY1305_NSECBYTES bytes)
 * @param ciphertext
 * @param additional_data
 * @param public_nonce (CRYPTO_AEAD_CHACHA20POLY1305_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_CHACHA20POLY1305_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AEAD_CHACHA20POLY1305_ABYTES bytes)
 */
export function crypto_aead_chacha20poly1305_decrypt(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_chacha20poly1305_decrypt(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param secret_nonce (CRYPTO_AEAD_CHACHA20POLY1305_NSECBYTES bytes)
 * @param ciphertext
 * @param mac (CRYPTO_BOX_MACBYTES bytes)
 * @param additional_data
 * @param public_nonce (CRYPTO_AEAD_CHACHA20POLY1305_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_CHACHA20POLY1305_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_aead_chacha20poly1305_decrypt_detached(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array | string, mac: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_chacha20poly1305_decrypt_detached(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array | string, mac: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param additional_data
 * @param secret_nonce (CRYPTO_AEAD_CHACHA20POLY1305_NSECBYTES bytes)
 * @param public_nonce (CRYPTO_AEAD_CHACHA20POLY1305_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_CHACHA20POLY1305_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AEAD_CHACHA20POLY1305_ABYTES bytes)
 */
export function crypto_aead_chacha20poly1305_encrypt(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_chacha20poly1305_encrypt(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param additional_data
 * @param secret_nonce (CRYPTO_AEAD_CHACHA20POLY1305_NSECBYTES bytes)
 * @param public_nonce (CRYPTO_AEAD_CHACHA20POLY1305_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_CHACHA20POLY1305_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {ciphertext, mac}
 */
export function crypto_aead_chacha20poly1305_encrypt_detached(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): { ciphertext: Uint8Array; mac: Uint8Array };
export function crypto_aead_chacha20poly1305_encrypt_detached(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): { ciphertext: string; mac: string };
/**
 * @param secret_nonce (CRYPTO_AEAD_CHACHA20POLY1305_IETF_NSECBYTES bytes)
 * @param ciphertext
 * @param additional_data
 * @param public_nonce (CRYPTO_AEAD_CHACHA20POLY1305_IETF_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_CHACHA20POLY1305_IETF_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AEAD_CHACHA20POLY1305_IETF_ABYTES bytes)
 */
export function crypto_aead_chacha20poly1305_ietf_decrypt(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_chacha20poly1305_ietf_decrypt(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param secret_nonce (CRYPTO_AEAD_CHACHA20POLY1305_IETF_NSECBYTES bytes)
 * @param ciphertext
 * @param mac (CRYPTO_BOX_MACBYTES bytes)
 * @param additional_data
 * @param public_nonce (CRYPTO_AEAD_CHACHA20POLY1305_IETF_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_CHACHA20POLY1305_IETF_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_aead_chacha20poly1305_ietf_decrypt_detached(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array | string, mac: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_chacha20poly1305_ietf_decrypt_detached(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array | string, mac: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param additional_data
 * @param secret_nonce (CRYPTO_AEAD_CHACHA20POLY1305_IETF_NSECBYTES bytes)
 * @param public_nonce (CRYPTO_AEAD_CHACHA20POLY1305_IETF_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_CHACHA20POLY1305_IETF_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AEAD_CHACHA20POLY1305_IETF_ABYTES bytes)
 */
export function crypto_aead_chacha20poly1305_ietf_encrypt(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_chacha20poly1305_ietf_encrypt(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param additional_data
 * @param secret_nonce (CRYPTO_AEAD_CHACHA20POLY1305_IETF_NSECBYTES bytes)
 * @param public_nonce (CRYPTO_AEAD_CHACHA20POLY1305_IETF_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_CHACHA20POLY1305_IETF_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {ciphertext, mac}
 */
export function crypto_aead_chacha20poly1305_ietf_encrypt_detached(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): { ciphertext: Uint8Array; mac: Uint8Array };
export function crypto_aead_chacha20poly1305_ietf_encrypt_detached(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): { ciphertext: string; mac: string };
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AEAD_CHACHA20POLY1305_IETF_KEYBYTES bytes)
 */
export function crypto_aead_chacha20poly1305_ietf_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_chacha20poly1305_ietf_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AEAD_CHACHA20POLY1305_KEYBYTES bytes)
 */
export function crypto_aead_chacha20poly1305_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_chacha20poly1305_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param secret_nonce (CRYPTO_AEAD_XCHACHA20POLY1305_IETF_NSECBYTES bytes)
 * @param ciphertext
 * @param additional_data
 * @param public_nonce (CRYPTO_AEAD_XCHACHA20POLY1305_IETF_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_XCHACHA20POLY1305_IETF_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AEAD_XCHACHA20POLY1305_IETF_ABYTES bytes)
 */
export function crypto_aead_xchacha20poly1305_ietf_decrypt(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_xchacha20poly1305_ietf_decrypt(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param secret_nonce (CRYPTO_AEAD_XCHACHA20POLY1305_IETF_NSECBYTES bytes)
 * @param ciphertext
 * @param mac (CRYPTO_BOX_MACBYTES bytes)
 * @param additional_data
 * @param public_nonce (CRYPTO_AEAD_XCHACHA20POLY1305_IETF_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_XCHACHA20POLY1305_IETF_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_aead_xchacha20poly1305_ietf_decrypt_detached(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array | string, mac: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_xchacha20poly1305_ietf_decrypt_detached(secret_nonce: Uint8Array | string | null, ciphertext: Uint8Array | string, mac: Uint8Array, additional_data: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param additional_data
 * @param secret_nonce (CRYPTO_AEAD_XCHACHA20POLY1305_IETF_NSECBYTES bytes)
 * @param public_nonce (CRYPTO_AEAD_XCHACHA20POLY1305_IETF_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_XCHACHA20POLY1305_IETF_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AEAD_XCHACHA20POLY1305_IETF_ABYTES bytes)
 */
export function crypto_aead_xchacha20poly1305_ietf_encrypt(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_xchacha20poly1305_ietf_encrypt(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param additional_data
 * @param secret_nonce (CRYPTO_AEAD_XCHACHA20POLY1305_IETF_NSECBYTES bytes)
 * @param public_nonce (CRYPTO_AEAD_XCHACHA20POLY1305_IETF_NPUBBYTES bytes)
 * @param key (CRYPTO_AEAD_XCHACHA20POLY1305_IETF_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {ciphertext, mac}
 */
export function crypto_aead_xchacha20poly1305_ietf_encrypt_detached(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): { ciphertext: Uint8Array; mac: Uint8Array };
export function crypto_aead_xchacha20poly1305_ietf_encrypt_detached(message: Uint8Array | string, additional_data: Uint8Array | string | null, secret_nonce: Uint8Array | string | null, public_nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): { ciphertext: string; mac: string };
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AEAD_XCHACHA20POLY1305_IETF_KEYBYTES bytes)
 */
export function crypto_aead_xchacha20poly1305_ietf_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_aead_xchacha20poly1305_ietf_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param key (CRYPTO_AUTH_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AUTH_BYTES bytes)
 */
export function crypto_auth(message: Uint8Array | string, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_auth(message: Uint8Array | string, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param key (CRYPTO_AUTH_HMACSHA256_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AUTH_HMACSHA256_BYTES bytes)
 */
export function crypto_auth_hmacsha256(message: Uint8Array | string, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_auth_hmacsha256(message: Uint8Array | string, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param state_address
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AUTH_HMACSHA256_BYTES bytes)
 */
export function crypto_auth_hmacsha256_final(state_address: StateAddress, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_auth_hmacsha256_final(state_address: StateAddress, outputFormat: StringOutputFormat): string;
/**
 * @param key
 * @returns StateAddress
 */
export function crypto_auth_hmacsha256_init(key: Uint8Array | string | null): StateAddress;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AUTH_HMACSHA256_KEYBYTES bytes)
 */
export function crypto_auth_hmacsha256_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_auth_hmacsha256_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param state_address
 * @param message_chunk
 */
export function crypto_auth_hmacsha256_update(state_address: StateAddress, message_chunk: Uint8Array | string): void;
/**
 * @param tag (CRYPTO_AUTH_HMACSHA256_BYTES bytes)
 * @param message
 * @param key (CRYPTO_AUTH_HMACSHA256_KEYBYTES bytes)
 * @returns boolean
 */
export function crypto_auth_hmacsha256_verify(tag: Uint8Array, message: Uint8Array | string, key: Uint8Array): boolean;
/**
 * @param message
 * @param key (CRYPTO_AUTH_HMACSHA512_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AUTH_HMACSHA512_BYTES bytes)
 */
export function crypto_auth_hmacsha512(message: Uint8Array | string, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_auth_hmacsha512(message: Uint8Array | string, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param key (CRYPTO_AUTH_HMACSHA512256_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AUTH_HMACSHA512256_BYTES bytes)
 */
export function crypto_auth_hmacsha512256(message: Uint8Array | string, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_auth_hmacsha512256(message: Uint8Array | string, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param state_address
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AUTH_HMACSHA512256_BYTES bytes)
 */
export function crypto_auth_hmacsha512256_final(state_address: StateAddress, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_auth_hmacsha512256_final(state_address: StateAddress, outputFormat: StringOutputFormat): string;
/**
 * @param key
 * @returns StateAddress
 */
export function crypto_auth_hmacsha512256_init(key: Uint8Array | string | null): StateAddress;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AUTH_HMACSHA512256_KEYBYTES bytes)
 */
export function crypto_auth_hmacsha512256_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_auth_hmacsha512256_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param state_address
 * @param message_chunk
 */
export function crypto_auth_hmacsha512256_update(state_address: StateAddress, message_chunk: Uint8Array | string): void;
/**
 * @param tag (CRYPTO_AUTH_HMACSHA512256_BYTES bytes)
 * @param message
 * @param key (CRYPTO_AUTH_HMACSHA512256_KEYBYTES bytes)
 * @returns boolean
 */
export function crypto_auth_hmacsha512256_verify(tag: Uint8Array, message: Uint8Array | string, key: Uint8Array): boolean;
/**
 * @param state_address
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AUTH_HMACSHA512_BYTES bytes)
 */
export function crypto_auth_hmacsha512_final(state_address: StateAddress, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_auth_hmacsha512_final(state_address: StateAddress, outputFormat: StringOutputFormat): string;
/**
 * @param key
 * @returns StateAddress
 */
export function crypto_auth_hmacsha512_init(key: Uint8Array | string | null): StateAddress;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AUTH_HMACSHA512_KEYBYTES bytes)
 */
export function crypto_auth_hmacsha512_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_auth_hmacsha512_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param state_address
 * @param message_chunk
 */
export function crypto_auth_hmacsha512_update(state_address: StateAddress, message_chunk: Uint8Array | string): void;
/**
 * @param tag (CRYPTO_AUTH_HMACSHA512_BYTES bytes)
 * @param message
 * @param key (CRYPTO_AUTH_HMACSHA512_KEYBYTES bytes)
 * @returns boolean
 */
export function crypto_auth_hmacsha512_verify(tag: Uint8Array, message: Uint8Array | string, key: Uint8Array): boolean;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_AUTH_KEYBYTES bytes)
 */
export function crypto_auth_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_auth_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param tag (CRYPTO_AUTH_BYTES bytes)
 * @param message
 * @param key (CRYPTO_AUTH_KEYBYTES bytes)
 * @returns boolean
 */
export function crypto_auth_verify(tag: Uint8Array, message: Uint8Array | string, key: Uint8Array): boolean;
/**
 * @param publicKey (CRYPTO_BOX_PUBLICKEYBYTES bytes)
 * @param privateKey (CRYPTO_BOX_SECRETKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_BOX_BEFORENMBYTES bytes)
 */
export function crypto_box_beforenm(publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_box_beforenm(publicKey: Uint8Array, privateKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param publicKey (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_PUBLICKEYBYTES bytes)
 * @param privateKey (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_SECRETKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_BEFORENMBYTES bytes)
 */
export function crypto_box_curve25519xchacha20poly1305_beforenm(publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_box_curve25519xchacha20poly1305_beforenm(publicKey: Uint8Array, privateKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param nonce (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_NONCEBYTES bytes)
 * @param publicKey (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_PUBLICKEYBYTES bytes)
 * @param privateKey (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_SECRETKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {ciphertext, mac}
 */
export function crypto_box_curve25519xchacha20poly1305_detached(message: Uint8Array | string, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): { ciphertext: Uint8Array; mac: Uint8Array };
export function crypto_box_curve25519xchacha20poly1305_detached(message: Uint8Array | string, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat: StringOutputFormat): { ciphertext: string; mac: string };
/**
 * @param message
 * @param nonce (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_NONCEBYTES bytes)
 * @param sharedKey (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_BEFORENMBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {ciphertext, mac}
 */
export function crypto_box_curve25519xchacha20poly1305_detached_afternm(message: Uint8Array | string, nonce: Uint8Array, sharedKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): { ciphertext: Uint8Array; mac: Uint8Array };
export function crypto_box_curve25519xchacha20poly1305_detached_afternm(message: Uint8Array | string, nonce: Uint8Array, sharedKey: Uint8Array, outputFormat: StringOutputFormat): { ciphertext: string; mac: string };
/**
 * @param message
 * @param nonce (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_NONCEBYTES bytes)
 * @param publicKey (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_PUBLICKEYBYTES bytes)
 * @param privateKey (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_SECRETKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_MACBYTES bytes)
 */
export function crypto_box_curve25519xchacha20poly1305_easy(message: Uint8Array | string, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_box_curve25519xchacha20poly1305_easy(message: Uint8Array | string, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param nonce (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_NONCEBYTES bytes)
 * @param sharedKey (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_BEFORENMBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_MACBYTES bytes)
 */
export function crypto_box_curve25519xchacha20poly1305_easy_afternm(message: Uint8Array | string, nonce: Uint8Array, sharedKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_box_curve25519xchacha20poly1305_easy_afternm(message: Uint8Array | string, nonce: Uint8Array, sharedKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {publicKey, privateKey, keyType} (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_PUBLICKEYBYTES bytes)
 */
export function crypto_box_curve25519xchacha20poly1305_keypair(outputFormat?: Uint8ArrayOutputFormat | null): { publicKey: Uint8Array; privateKey: Uint8Array; keyType: string };
export function crypto_box_curve25519xchacha20poly1305_keypair(outputFormat: StringOutputFormat): { publicKey: string; privateKey: string; keyType: string };
/**
 * @param ciphertext
 * @param mac (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_MACBYTES bytes)
 * @param nonce (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_NONCEBYTES bytes)
 * @param publicKey (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_PUBLICKEYBYTES bytes)
 * @param privateKey (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_SECRETKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_box_curve25519xchacha20poly1305_open_detached(ciphertext: Uint8Array | string, mac: Uint8Array, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_box_curve25519xchacha20poly1305_open_detached(ciphertext: Uint8Array | string, mac: Uint8Array, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param ciphertext
 * @param mac (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_MACBYTES bytes)
 * @param nonce (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_NONCEBYTES bytes)
 * @param sharedKey (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_BEFORENMBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_box_curve25519xchacha20poly1305_open_detached_afternm(ciphertext: Uint8Array | string, mac: Uint8Array, nonce: Uint8Array, sharedKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_box_curve25519xchacha20poly1305_open_detached_afternm(ciphertext: Uint8Array | string, mac: Uint8Array, nonce: Uint8Array, sharedKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param ciphertext
 * @param nonce (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_NONCEBYTES bytes)
 * @param publicKey (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_PUBLICKEYBYTES bytes)
 * @param privateKey (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_SECRETKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_MACBYTES bytes)
 */
export function crypto_box_curve25519xchacha20poly1305_open_easy(ciphertext: Uint8Array, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_box_curve25519xchacha20poly1305_open_easy(ciphertext: Uint8Array, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param ciphertext (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_MACBYTES bytes)
 * @param nonce (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_NONCEBYTES bytes)
 * @param sharedKey (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_BEFORENMBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_MACBYTES bytes)
 */
export function crypto_box_curve25519xchacha20poly1305_open_easy_afternm(ciphertext: Uint8Array | string, nonce: Uint8Array, sharedKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_box_curve25519xchacha20poly1305_open_easy_afternm(ciphertext: Uint8Array | string, nonce: Uint8Array, sharedKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param publicKey (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_PUBLICKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_SEALBYTES bytes)
 */
export function crypto_box_curve25519xchacha20poly1305_seal(message: Uint8Array | string, publicKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_box_curve25519xchacha20poly1305_seal(message: Uint8Array | string, publicKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param ciphertext
 * @param publicKey (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_PUBLICKEYBYTES bytes)
 * @param secretKey (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_SECRETKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_SEALBYTES bytes)
 */
export function crypto_box_curve25519xchacha20poly1305_seal_open(ciphertext: Uint8Array, publicKey: Uint8Array, secretKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_box_curve25519xchacha20poly1305_seal_open(ciphertext: Uint8Array, publicKey: Uint8Array, secretKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param seed (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_SEEDBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {publicKey, privateKey, keyType} (CRYPTO_BOX_CURVE25519XCHACHA20POLY1305_PUBLICKEYBYTES bytes)
 */
export function crypto_box_curve25519xchacha20poly1305_seed_keypair(seed: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): { publicKey: Uint8Array; privateKey: Uint8Array; keyType: string };
export function crypto_box_curve25519xchacha20poly1305_seed_keypair(seed: Uint8Array, outputFormat: StringOutputFormat): { publicKey: string; privateKey: string; keyType: string };
/**
 * @param message
 * @param nonce (CRYPTO_BOX_NONCEBYTES bytes)
 * @param publicKey (CRYPTO_BOX_PUBLICKEYBYTES bytes)
 * @param privateKey (CRYPTO_BOX_SECRETKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {ciphertext, mac}
 */
export function crypto_box_detached(message: Uint8Array | string, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): { ciphertext: Uint8Array; mac: Uint8Array };
export function crypto_box_detached(message: Uint8Array | string, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat: StringOutputFormat): { ciphertext: string; mac: string };
/**
 * @param message
 * @param nonce (CRYPTO_BOX_NONCEBYTES bytes)
 * @param publicKey (CRYPTO_BOX_PUBLICKEYBYTES bytes)
 * @param privateKey (CRYPTO_BOX_SECRETKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_BOX_MACBYTES bytes)
 */
export function crypto_box_easy(message: Uint8Array | string, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_box_easy(message: Uint8Array | string, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param nonce (CRYPTO_BOX_NONCEBYTES bytes)
 * @param sharedKey (CRYPTO_BOX_BEFORENMBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_BOX_MACBYTES bytes)
 */
export function crypto_box_easy_afternm(message: Uint8Array | string, nonce: Uint8Array, sharedKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_box_easy_afternm(message: Uint8Array | string, nonce: Uint8Array, sharedKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {publicKey, privateKey, keyType} (CRYPTO_BOX_PUBLICKEYBYTES bytes)
 */
export function crypto_box_keypair(outputFormat?: Uint8ArrayOutputFormat | null): { publicKey: Uint8Array; privateKey: Uint8Array; keyType: string };
export function crypto_box_keypair(outputFormat: StringOutputFormat): { publicKey: string; privateKey: string; keyType: string };
/**
 * @param ciphertext
 * @param mac (CRYPTO_BOX_MACBYTES bytes)
 * @param nonce (CRYPTO_BOX_NONCEBYTES bytes)
 * @param publicKey (CRYPTO_BOX_PUBLICKEYBYTES bytes)
 * @param privateKey (CRYPTO_BOX_SECRETKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_box_open_detached(ciphertext: Uint8Array | string, mac: Uint8Array, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_box_open_detached(ciphertext: Uint8Array | string, mac: Uint8Array, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param ciphertext
 * @param nonce (CRYPTO_BOX_NONCEBYTES bytes)
 * @param publicKey (CRYPTO_BOX_PUBLICKEYBYTES bytes)
 * @param privateKey (CRYPTO_BOX_SECRETKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_BOX_MACBYTES bytes)
 */
export function crypto_box_open_easy(ciphertext: Uint8Array, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_box_open_easy(ciphertext: Uint8Array, nonce: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param ciphertext (CRYPTO_BOX_MACBYTES bytes)
 * @param nonce (CRYPTO_BOX_NONCEBYTES bytes)
 * @param sharedKey (CRYPTO_BOX_BEFORENMBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_BOX_MACBYTES bytes)
 */
export function crypto_box_open_easy_afternm(ciphertext: Uint8Array | string, nonce: Uint8Array, sharedKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_box_open_easy_afternm(ciphertext: Uint8Array | string, nonce: Uint8Array, sharedKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param publicKey (CRYPTO_BOX_PUBLICKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_BOX_SEALBYTES bytes)
 */
export function crypto_box_seal(message: Uint8Array | string, publicKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_box_seal(message: Uint8Array | string, publicKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param ciphertext
 * @param publicKey (CRYPTO_BOX_PUBLICKEYBYTES bytes)
 * @param privateKey (CRYPTO_BOX_SECRETKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_BOX_SEALBYTES bytes)
 */
export function crypto_box_seal_open(ciphertext: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_box_seal_open(ciphertext: Uint8Array, publicKey: Uint8Array, privateKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param seed (CRYPTO_BOX_SEEDBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {publicKey, privateKey, keyType} (CRYPTO_BOX_PUBLICKEYBYTES bytes)
 */
export function crypto_box_seed_keypair(seed: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): { publicKey: Uint8Array; privateKey: Uint8Array; keyType: string };
export function crypto_box_seed_keypair(seed: Uint8Array, outputFormat: StringOutputFormat): { publicKey: string; privateKey: string; keyType: string };
/**
 * @param p (CRYPTO_CORE_ED25519_BYTES bytes)
 * @param q (CRYPTO_CORE_ED25519_BYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_ED25519_BYTES bytes)
 */
export function crypto_core_ed25519_add(p: Uint8Array, q: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ed25519_add(p: Uint8Array, q: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param r
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_ED25519_BYTES bytes)
 */
export function crypto_core_ed25519_from_hash(r: Uint8Array | string, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ed25519_from_hash(r: Uint8Array | string, outputFormat: StringOutputFormat): string;
/**
 * @param r
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_ED25519_BYTES bytes)
 */
export function crypto_core_ed25519_from_uniform(r: Uint8Array | string, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ed25519_from_uniform(r: Uint8Array | string, outputFormat: StringOutputFormat): string;
/**
 * @param repr (CRYPTO_CORE_ED25519_BYTES bytes)
 * @returns boolean
 */
export function crypto_core_ed25519_is_valid_point(repr: Uint8Array): boolean;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_ED25519_BYTES bytes)
 */
export function crypto_core_ed25519_random(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ed25519_random(outputFormat: StringOutputFormat): string;
/**
 * @param x (CRYPTO_CORE_ED25519_SCALARBYTES bytes)
 * @param y (CRYPTO_CORE_ED25519_SCALARBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_ED25519_SCALARBYTES bytes)
 */
export function crypto_core_ed25519_scalar_add(x: Uint8Array, y: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ed25519_scalar_add(x: Uint8Array, y: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param s (CRYPTO_CORE_ED25519_SCALARBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_ED25519_SCALARBYTES bytes)
 */
export function crypto_core_ed25519_scalar_complement(s: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ed25519_scalar_complement(s: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param s (CRYPTO_CORE_ED25519_SCALARBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_ED25519_SCALARBYTES bytes)
 */
export function crypto_core_ed25519_scalar_invert(s: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ed25519_scalar_invert(s: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param x (CRYPTO_CORE_ED25519_SCALARBYTES bytes)
 * @param y (CRYPTO_CORE_ED25519_SCALARBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_ED25519_SCALARBYTES bytes)
 */
export function crypto_core_ed25519_scalar_mul(x: Uint8Array, y: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ed25519_scalar_mul(x: Uint8Array, y: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param s (CRYPTO_CORE_ED25519_SCALARBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_ED25519_SCALARBYTES bytes)
 */
export function crypto_core_ed25519_scalar_negate(s: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ed25519_scalar_negate(s: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_ED25519_SCALARBYTES bytes)
 */
export function crypto_core_ed25519_scalar_random(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ed25519_scalar_random(outputFormat: StringOutputFormat): string;
/**
 * @param sample (CRYPTO_CORE_ED25519_NONREDUCEDSCALARBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_ED25519_SCALARBYTES bytes)
 */
export function crypto_core_ed25519_scalar_reduce(sample: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ed25519_scalar_reduce(sample: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param x (CRYPTO_CORE_ED25519_SCALARBYTES bytes)
 * @param y (CRYPTO_CORE_ED25519_SCALARBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_ED25519_SCALARBYTES bytes)
 */
export function crypto_core_ed25519_scalar_sub(x: Uint8Array, y: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ed25519_scalar_sub(x: Uint8Array, y: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param p (CRYPTO_CORE_ED25519_BYTES bytes)
 * @param q (CRYPTO_CORE_ED25519_BYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_ED25519_BYTES bytes)
 */
export function crypto_core_ed25519_sub(p: Uint8Array, q: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ed25519_sub(p: Uint8Array, q: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param input (CRYPTO_CORE_HCHACHA20_INPUTBYTES bytes)
 * @param privateKey (CRYPTO_CORE_HCHACHA20_KEYBYTES bytes)
 * @param constant (CRYPTO_CORE_HCHACHA20_CONSTBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_HCHACHA20_OUTPUTBYTES bytes)
 */
export function crypto_core_hchacha20(input: Uint8Array, privateKey: Uint8Array, constant: Uint8Array | string | null, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_hchacha20(input: Uint8Array, privateKey: Uint8Array, constant: Uint8Array | string | null, outputFormat: StringOutputFormat): string;
/**
 * @param input (CRYPTO_CORE_HSALSA20_INPUTBYTES bytes)
 * @param privateKey (CRYPTO_CORE_HSALSA20_KEYBYTES bytes)
 * @param constant (CRYPTO_CORE_HSALSA20_CONSTBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_HSALSA20_OUTPUTBYTES bytes)
 */
export function crypto_core_hsalsa20(input: Uint8Array, privateKey: Uint8Array, constant: Uint8Array | string | null, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_hsalsa20(input: Uint8Array, privateKey: Uint8Array, constant: Uint8Array | string | null, outputFormat: StringOutputFormat): string;
/**
 * @param p (CRYPTO_CORE_RISTRETTO255_BYTES bytes)
 * @param q (CRYPTO_CORE_RISTRETTO255_BYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_RISTRETTO255_BYTES bytes)
 */
export function crypto_core_ristretto255_add(p: Uint8Array, q: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ristretto255_add(p: Uint8Array, q: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param r
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_RISTRETTO255_BYTES bytes)
 */
export function crypto_core_ristretto255_from_hash(r: Uint8Array | string, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ristretto255_from_hash(r: Uint8Array | string, outputFormat: StringOutputFormat): string;
/**
 * @param repr (CRYPTO_CORE_RISTRETTO255_BYTES bytes)
 * @returns boolean
 */
export function crypto_core_ristretto255_is_valid_point(repr: Uint8Array): boolean;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_RISTRETTO255_BYTES bytes)
 */
export function crypto_core_ristretto255_random(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ristretto255_random(outputFormat: StringOutputFormat): string;
/**
 * @param x (CRYPTO_CORE_RISTRETTO255_SCALARBYTES bytes)
 * @param y (CRYPTO_CORE_RISTRETTO255_SCALARBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_RISTRETTO255_SCALARBYTES bytes)
 */
export function crypto_core_ristretto255_scalar_add(x: Uint8Array, y: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ristretto255_scalar_add(x: Uint8Array, y: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param s (CRYPTO_CORE_RISTRETTO255_SCALARBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_RISTRETTO255_SCALARBYTES bytes)
 */
export function crypto_core_ristretto255_scalar_complement(s: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ristretto255_scalar_complement(s: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param s (CRYPTO_CORE_RISTRETTO255_SCALARBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_RISTRETTO255_SCALARBYTES bytes)
 */
export function crypto_core_ristretto255_scalar_invert(s: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ristretto255_scalar_invert(s: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param x (CRYPTO_CORE_RISTRETTO255_SCALARBYTES bytes)
 * @param y (CRYPTO_CORE_RISTRETTO255_SCALARBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_RISTRETTO255_SCALARBYTES bytes)
 */
export function crypto_core_ristretto255_scalar_mul(x: Uint8Array, y: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ristretto255_scalar_mul(x: Uint8Array, y: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param s (CRYPTO_CORE_RISTRETTO255_SCALARBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_RISTRETTO255_SCALARBYTES bytes)
 */
export function crypto_core_ristretto255_scalar_negate(s: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ristretto255_scalar_negate(s: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_RISTRETTO255_SCALARBYTES bytes)
 */
export function crypto_core_ristretto255_scalar_random(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ristretto255_scalar_random(outputFormat: StringOutputFormat): string;
/**
 * @param sample (CRYPTO_CORE_RISTRETTO255_NONREDUCEDSCALARBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_RISTRETTO255_SCALARBYTES bytes)
 */
export function crypto_core_ristretto255_scalar_reduce(sample: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ristretto255_scalar_reduce(sample: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param x (CRYPTO_CORE_RISTRETTO255_SCALARBYTES bytes)
 * @param y (CRYPTO_CORE_RISTRETTO255_SCALARBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_RISTRETTO255_SCALARBYTES bytes)
 */
export function crypto_core_ristretto255_scalar_sub(x: Uint8Array, y: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ristretto255_scalar_sub(x: Uint8Array, y: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param p (CRYPTO_CORE_RISTRETTO255_BYTES bytes)
 * @param q (CRYPTO_CORE_RISTRETTO255_BYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_RISTRETTO255_BYTES bytes)
 */
export function crypto_core_ristretto255_sub(p: Uint8Array, q: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_core_ristretto255_sub(p: Uint8Array, q: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param hash_length
 * @param message
 * @param key
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_generichash(hash_length: number, message: Uint8Array | string, key: Uint8Array | string | null, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_generichash(hash_length: number, message: Uint8Array | string, key: Uint8Array | string | null, outputFormat: StringOutputFormat): string;
/**
 * @param subkey_len
 * @param key
 * @param id (CRYPTO_GENERICHASH_BLAKE2B_SALTBYTES bytes)
 * @param ctx (CRYPTO_GENERICHASH_BLAKE2B_PERSONALBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_generichash_blake2b_salt_personal(subkey_len: number, key: Uint8Array | string | null, id: Uint8Array | null, ctx: Uint8Array | null, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_generichash_blake2b_salt_personal(subkey_len: number, key: Uint8Array | string | null, id: Uint8Array | null, ctx: Uint8Array | null, outputFormat: StringOutputFormat): string;
/**
 * @param state_address
 * @param hash_length
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_generichash_final(state_address: StateAddress, hash_length: number, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_generichash_final(state_address: StateAddress, hash_length: number, outputFormat: StringOutputFormat): string;
/**
 * @param key
 * @param hash_length
 * @returns StateAddress
 */
export function crypto_generichash_init(key: Uint8Array | string | null, hash_length: number): StateAddress;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_GENERICHASH_KEYBYTES bytes)
 */
export function crypto_generichash_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_generichash_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param state_address
 * @param message_chunk
 */
export function crypto_generichash_update(state_address: StateAddress, message_chunk: Uint8Array | string): void;
/**
 * @param message
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_HASH_BYTES bytes)
 */
export function crypto_hash(message: Uint8Array | string, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_hash(message: Uint8Array | string, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_HASH_SHA256_BYTES bytes)
 */
export function crypto_hash_sha256(message: Uint8Array | string, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_hash_sha256(message: Uint8Array | string, outputFormat: StringOutputFormat): string;
/**
 * @param state_address
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_HASH_SHA256_BYTES bytes)
 */
export function crypto_hash_sha256_final(state_address: StateAddress, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_hash_sha256_final(state_address: StateAddress, outputFormat: StringOutputFormat): string;
/**
 * @returns StateAddress
 */
export function crypto_hash_sha256_init(): StateAddress;
/**
 * @param state_address
 * @param message_chunk
 */
export function crypto_hash_sha256_update(state_address: StateAddress, message_chunk: Uint8Array | string): void;
/**
 * @param message
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_HASH_SHA512_BYTES bytes)
 */
export function crypto_hash_sha512(message: Uint8Array | string, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_hash_sha512(message: Uint8Array | string, outputFormat: StringOutputFormat): string;
/**
 * @param state_address
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_HASH_SHA512_BYTES bytes)
 */
export function crypto_hash_sha512_final(state_address: StateAddress, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_hash_sha512_final(state_address: StateAddress, outputFormat: StringOutputFormat): string;
/**
 * @returns StateAddress
 */
export function crypto_hash_sha512_init(): StateAddress;
/**
 * @param state_address
 * @param message_chunk
 */
export function crypto_hash_sha512_update(state_address: StateAddress, message_chunk: Uint8Array | string): void;
/**
 * @param input (CRYPTO_IPCRYPT_BYTES bytes)
 * @param key (CRYPTO_IPCRYPT_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_IPCRYPT_BYTES bytes)
 */
export function crypto_ipcrypt_decrypt(input: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_ipcrypt_decrypt(input: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param input (CRYPTO_IPCRYPT_BYTES bytes)
 * @param key (CRYPTO_IPCRYPT_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_IPCRYPT_BYTES bytes)
 */
export function crypto_ipcrypt_encrypt(input: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_ipcrypt_encrypt(input: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_IPCRYPT_KEYBYTES bytes)
 */
export function crypto_ipcrypt_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_ipcrypt_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param input (CRYPTO_IPCRYPT_ND_OUTPUTBYTES bytes)
 * @param key (CRYPTO_IPCRYPT_ND_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_IPCRYPT_ND_INPUTBYTES bytes)
 */
export function crypto_ipcrypt_nd_decrypt(input: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_ipcrypt_nd_decrypt(input: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param input (CRYPTO_IPCRYPT_ND_INPUTBYTES bytes)
 * @param tweak (CRYPTO_IPCRYPT_ND_TWEAKBYTES bytes)
 * @param key (CRYPTO_IPCRYPT_ND_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_IPCRYPT_ND_OUTPUTBYTES bytes)
 */
export function crypto_ipcrypt_nd_encrypt(input: Uint8Array, tweak: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_ipcrypt_nd_encrypt(input: Uint8Array, tweak: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_IPCRYPT_ND_KEYBYTES bytes)
 */
export function crypto_ipcrypt_nd_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_ipcrypt_nd_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param input (CRYPTO_IPCRYPT_NDX_OUTPUTBYTES bytes)
 * @param key (CRYPTO_IPCRYPT_NDX_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_IPCRYPT_NDX_INPUTBYTES bytes)
 */
export function crypto_ipcrypt_ndx_decrypt(input: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_ipcrypt_ndx_decrypt(input: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param input (CRYPTO_IPCRYPT_NDX_INPUTBYTES bytes)
 * @param tweak (CRYPTO_IPCRYPT_NDX_TWEAKBYTES bytes)
 * @param key (CRYPTO_IPCRYPT_NDX_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_IPCRYPT_NDX_OUTPUTBYTES bytes)
 */
export function crypto_ipcrypt_ndx_encrypt(input: Uint8Array, tweak: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_ipcrypt_ndx_encrypt(input: Uint8Array, tweak: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_IPCRYPT_NDX_KEYBYTES bytes)
 */
export function crypto_ipcrypt_ndx_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_ipcrypt_ndx_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param input (CRYPTO_IPCRYPT_PFX_BYTES bytes)
 * @param key (CRYPTO_IPCRYPT_PFX_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_IPCRYPT_PFX_BYTES bytes)
 */
export function crypto_ipcrypt_pfx_decrypt(input: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_ipcrypt_pfx_decrypt(input: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param input (CRYPTO_IPCRYPT_PFX_BYTES bytes)
 * @param key (CRYPTO_IPCRYPT_PFX_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_IPCRYPT_PFX_BYTES bytes)
 */
export function crypto_ipcrypt_pfx_encrypt(input: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_ipcrypt_pfx_encrypt(input: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_IPCRYPT_PFX_KEYBYTES bytes)
 */
export function crypto_ipcrypt_pfx_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_ipcrypt_pfx_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param subkey_len
 * @param subkey_id
 * @param ctx (CRYPTO_KDF_CONTEXTBYTES bytes)
 * @param key (CRYPTO_KDF_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_kdf_derive_from_key(subkey_len: number, subkey_id: number | bigint, ctx: string, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_kdf_derive_from_key(subkey_len: number, subkey_id: number | bigint, ctx: string, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_KDF_KEYBYTES bytes)
 */
export function crypto_kdf_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_kdf_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param clientPublicKey (CRYPTO_KX_PUBLICKEYBYTES bytes)
 * @param clientSecretKey (CRYPTO_KX_SECRETKEYBYTES bytes)
 * @param serverPublicKey (CRYPTO_KX_PUBLICKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {sharedRx, sharedTx} (CRYPTO_KX_SESSIONKEYBYTES bytes)
 */
export function crypto_kx_client_session_keys(clientPublicKey: Uint8Array, clientSecretKey: Uint8Array, serverPublicKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): { sharedRx: Uint8Array; sharedTx: Uint8Array };
export function crypto_kx_client_session_keys(clientPublicKey: Uint8Array, clientSecretKey: Uint8Array, serverPublicKey: Uint8Array, outputFormat: StringOutputFormat): { sharedRx: string; sharedTx: string };
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {publicKey, privateKey, keyType} (CRYPTO_KX_PUBLICKEYBYTES bytes)
 */
export function crypto_kx_keypair(outputFormat?: Uint8ArrayOutputFormat | null): { publicKey: Uint8Array; privateKey: Uint8Array; keyType: string };
export function crypto_kx_keypair(outputFormat: StringOutputFormat): { publicKey: string; privateKey: string; keyType: string };
/**
 * @param seed (CRYPTO_KX_SEEDBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {publicKey, privateKey, keyType} (CRYPTO_KX_PUBLICKEYBYTES bytes)
 */
export function crypto_kx_seed_keypair(seed: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): { publicKey: Uint8Array; privateKey: Uint8Array; keyType: string };
export function crypto_kx_seed_keypair(seed: Uint8Array, outputFormat: StringOutputFormat): { publicKey: string; privateKey: string; keyType: string };
/**
 * @param serverPublicKey (CRYPTO_KX_PUBLICKEYBYTES bytes)
 * @param serverSecretKey (CRYPTO_KX_SECRETKEYBYTES bytes)
 * @param clientPublicKey (CRYPTO_KX_PUBLICKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {sharedRx, sharedTx} (CRYPTO_KX_SESSIONKEYBYTES bytes)
 */
export function crypto_kx_server_session_keys(serverPublicKey: Uint8Array, serverSecretKey: Uint8Array, clientPublicKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): { sharedRx: Uint8Array; sharedTx: Uint8Array };
export function crypto_kx_server_session_keys(serverPublicKey: Uint8Array, serverSecretKey: Uint8Array, clientPublicKey: Uint8Array, outputFormat: StringOutputFormat): { sharedRx: string; sharedTx: string };
/**
 * @param message
 * @param key (CRYPTO_ONETIMEAUTH_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_ONETIMEAUTH_BYTES bytes)
 */
export function crypto_onetimeauth(message: Uint8Array | string, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_onetimeauth(message: Uint8Array | string, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param state_address
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_ONETIMEAUTH_BYTES bytes)
 */
export function crypto_onetimeauth_final(state_address: StateAddress, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_onetimeauth_final(state_address: StateAddress, outputFormat: StringOutputFormat): string;
/**
 * @param key
 * @returns StateAddress
 */
export function crypto_onetimeauth_init(key: Uint8Array | string | null): StateAddress;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_ONETIMEAUTH_KEYBYTES bytes)
 */
export function crypto_onetimeauth_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_onetimeauth_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param state_address
 * @param message_chunk
 */
export function crypto_onetimeauth_update(state_address: StateAddress, message_chunk: Uint8Array | string): void;
/**
 * @param hash (CRYPTO_ONETIMEAUTH_BYTES bytes)
 * @param message
 * @param key (CRYPTO_ONETIMEAUTH_KEYBYTES bytes)
 * @returns boolean
 */
export function crypto_onetimeauth_verify(hash: Uint8Array, message: Uint8Array | string, key: Uint8Array): boolean;
/**
 * @param keyLength
 * @param password
 * @param salt (CRYPTO_PWHASH_SALTBYTES bytes)
 * @param opsLimit
 * @param memLimit
 * @param algorithm
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_pwhash(keyLength: number, password: Uint8Array | string, salt: Uint8Array, opsLimit: number, memLimit: number, algorithm: number, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_pwhash(keyLength: number, password: Uint8Array | string, salt: Uint8Array, opsLimit: number, memLimit: number, algorithm: number, outputFormat: StringOutputFormat): string;
/**
 * @param password
 * @param opsLimit
 * @param memLimit
 * @returns Uint8Array (CRYPTO_PWHASH_STRBYTES bytes)
 */
export function crypto_pwhash_str(password: Uint8Array | string, opsLimit: number, memLimit: number): Uint8Array;
/**
 * @param hashed_password
 * @param opsLimit
 * @param memLimit
 * @returns boolean
 */
export function crypto_pwhash_str_needs_rehash(hashed_password: string, opsLimit: number, memLimit: number): boolean;
/**
 * @param hashed_password
 * @param password
 * @returns boolean
 */
export function crypto_pwhash_str_verify(hashed_password: string, password: Uint8Array | string): boolean;
/**
 * @param privateKey (CRYPTO_SCALARMULT_SCALARBYTES bytes)
 * @param publicKey (CRYPTO_SCALARMULT_BYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SCALARMULT_BYTES bytes)
 */
export function crypto_scalarmult(privateKey: Uint8Array, publicKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_scalarmult(privateKey: Uint8Array, publicKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param privateKey (CRYPTO_SCALARMULT_SCALARBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SCALARMULT_BYTES bytes)
 */
export function crypto_scalarmult_base(privateKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_scalarmult_base(privateKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param n (CRYPTO_SCALARMULT_ED25519_SCALARBYTES bytes)
 * @param p (CRYPTO_SCALARMULT_ED25519_BYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SCALARMULT_ED25519_BYTES bytes)
 */
export function crypto_scalarmult_ed25519(n: Uint8Array, p: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_scalarmult_ed25519(n: Uint8Array, p: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param scalar (CRYPTO_SCALARMULT_ED25519_SCALARBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SCALARMULT_ED25519_BYTES bytes)
 */
export function crypto_scalarmult_ed25519_base(scalar: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_scalarmult_ed25519_base(scalar: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param scalar (CRYPTO_SCALARMULT_ED25519_SCALARBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SCALARMULT_ED25519_BYTES bytes)
 */
export function crypto_scalarmult_ed25519_base_noclamp(scalar: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_scalarmult_ed25519_base_noclamp(scalar: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param n (CRYPTO_SCALARMULT_ED25519_SCALARBYTES bytes)
 * @param p (CRYPTO_SCALARMULT_ED25519_BYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SCALARMULT_ED25519_BYTES bytes)
 */
export function crypto_scalarmult_ed25519_noclamp(n: Uint8Array, p: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_scalarmult_ed25519_noclamp(n: Uint8Array, p: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param scalar (CRYPTO_SCALARMULT_RISTRETTO255_SCALARBYTES bytes)
 * @param element (CRYPTO_SCALARMULT_RISTRETTO255_BYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SCALARMULT_RISTRETTO255_BYTES bytes)
 */
export function crypto_scalarmult_ristretto255(scalar: Uint8Array, element: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_scalarmult_ristretto255(scalar: Uint8Array, element: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param scalar (CRYPTO_CORE_RISTRETTO255_SCALARBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_CORE_RISTRETTO255_BYTES bytes)
 */
export function crypto_scalarmult_ristretto255_base(scalar: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_scalarmult_ristretto255_base(scalar: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param nonce (CRYPTO_SECRETBOX_NONCEBYTES bytes)
 * @param key (CRYPTO_SECRETBOX_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {mac, cipher}
 */
export function crypto_secretbox_detached(message: Uint8Array | string, nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): { mac: Uint8Array; cipher: Uint8Array };
export function crypto_secretbox_detached(message: Uint8Array | string, nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): { mac: string; cipher: string };
/**
 * @param message
 * @param nonce (CRYPTO_SECRETBOX_NONCEBYTES bytes)
 * @param key (CRYPTO_SECRETBOX_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SECRETBOX_MACBYTES bytes)
 */
export function crypto_secretbox_easy(message: Uint8Array | string, nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_secretbox_easy(message: Uint8Array | string, nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SECRETBOX_KEYBYTES bytes)
 */
export function crypto_secretbox_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_secretbox_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param ciphertext
 * @param mac (CRYPTO_SECRETBOX_MACBYTES bytes)
 * @param nonce (CRYPTO_SECRETBOX_NONCEBYTES bytes)
 * @param key (CRYPTO_SECRETBOX_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_secretbox_open_detached(ciphertext: Uint8Array | string, mac: Uint8Array, nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_secretbox_open_detached(ciphertext: Uint8Array | string, mac: Uint8Array, nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param ciphertext
 * @param nonce (CRYPTO_SECRETBOX_NONCEBYTES bytes)
 * @param key (CRYPTO_SECRETBOX_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SECRETBOX_MACBYTES bytes)
 */
export function crypto_secretbox_open_easy(ciphertext: Uint8Array, nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_secretbox_open_easy(ciphertext: Uint8Array, nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param header (CRYPTO_SECRETSTREAM_XCHACHA20POLY1305_HEADERBYTES bytes)
 * @param key (CRYPTO_SECRETSTREAM_XCHACHA20POLY1305_KEYBYTES bytes)
 * @returns StateAddress
 */
export function crypto_secretstream_xchacha20poly1305_init_pull(header: Uint8Array, key: Uint8Array): StateAddress;
/**
 * @param key (CRYPTO_SECRETSTREAM_XCHACHA20POLY1305_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {state, header}
 */
export function crypto_secretstream_xchacha20poly1305_init_push(key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): { state: StateAddress; header: Uint8Array };
export function crypto_secretstream_xchacha20poly1305_init_push(key: Uint8Array, outputFormat: StringOutputFormat): { state: StateAddress; header: string };
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SECRETSTREAM_XCHACHA20POLY1305_KEYBYTES bytes)
 */
export function crypto_secretstream_xchacha20poly1305_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_secretstream_xchacha20poly1305_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param state_address
 * @param cipher
 * @param ad
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {message, tag} | false (CRYPTO_SECRETSTREAM_XCHACHA20POLY1305_ABYTES bytes)
 */
export function crypto_secretstream_xchacha20poly1305_pull(state_address: StateAddress, cipher: Uint8Array, ad: Uint8Array | string | null, outputFormat?: Uint8ArrayOutputFormat | null): { message: Uint8Array; tag: number } | false;
export function crypto_secretstream_xchacha20poly1305_pull(state_address: StateAddress, cipher: Uint8Array, ad: Uint8Array | string | null, outputFormat: StringOutputFormat): { message: string; tag: number } | false;
/**
 * @param state_address
 * @param message_chunk
 * @param ad
 * @param tag
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SECRETSTREAM_XCHACHA20POLY1305_ABYTES bytes)
 */
export function crypto_secretstream_xchacha20poly1305_push(state_address: StateAddress, message_chunk: Uint8Array | string, ad: Uint8Array | string | null, tag: number, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_secretstream_xchacha20poly1305_push(state_address: StateAddress, message_chunk: Uint8Array | string, ad: Uint8Array | string | null, tag: number, outputFormat: StringOutputFormat): string;
/**
 * @param state_address
 */
export function crypto_secretstream_xchacha20poly1305_rekey(state_address: StateAddress): void;
/**
 * @param message
 * @param key (CRYPTO_SHORTHASH_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SHORTHASH_BYTES bytes)
 */
export function crypto_shorthash(message: Uint8Array | string, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_shorthash(message: Uint8Array | string, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SHORTHASH_KEYBYTES bytes)
 */
export function crypto_shorthash_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_shorthash_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param key (CRYPTO_SHORTHASH_SIPHASHX24_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SHORTHASH_SIPHASHX24_BYTES bytes)
 */
export function crypto_shorthash_siphashx24(message: Uint8Array | string, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_shorthash_siphashx24(message: Uint8Array | string, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param privateKey (CRYPTO_SIGN_SECRETKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SIGN_BYTES bytes)
 */
export function crypto_sign(message: Uint8Array | string, privateKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_sign(message: Uint8Array | string, privateKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param message
 * @param privateKey (CRYPTO_SIGN_SECRETKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SIGN_BYTES bytes)
 */
export function crypto_sign_detached(message: Uint8Array | string, privateKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_sign_detached(message: Uint8Array | string, privateKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param edPk (CRYPTO_SIGN_PUBLICKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SCALARMULT_SCALARBYTES bytes)
 */
export function crypto_sign_ed25519_pk_to_curve25519(edPk: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_sign_ed25519_pk_to_curve25519(edPk: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param edSk (CRYPTO_SIGN_SECRETKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SCALARMULT_SCALARBYTES bytes)
 */
export function crypto_sign_ed25519_sk_to_curve25519(edSk: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_sign_ed25519_sk_to_curve25519(edSk: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param privateKey (CRYPTO_SIGN_SECRETKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SIGN_PUBLICKEYBYTES bytes)
 */
export function crypto_sign_ed25519_sk_to_pk(privateKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_sign_ed25519_sk_to_pk(privateKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param privateKey (CRYPTO_SIGN_SECRETKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SIGN_SEEDBYTES bytes)
 */
export function crypto_sign_ed25519_sk_to_seed(privateKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_sign_ed25519_sk_to_seed(privateKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param state_address
 * @param privateKey (CRYPTO_SIGN_SECRETKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SIGN_BYTES bytes)
 */
export function crypto_sign_final_create(state_address: StateAddress, privateKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_sign_final_create(state_address: StateAddress, privateKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param state_address
 * @param signature (CRYPTO_SIGN_BYTES bytes)
 * @param publicKey (CRYPTO_SIGN_PUBLICKEYBYTES bytes)
 * @returns boolean
 */
export function crypto_sign_final_verify(state_address: StateAddress, signature: Uint8Array, publicKey: Uint8Array): boolean;
/**
 * @returns StateAddress
 */
export function crypto_sign_init(): StateAddress;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {publicKey, privateKey, keyType} (CRYPTO_SIGN_PUBLICKEYBYTES bytes)
 */
export function crypto_sign_keypair(outputFormat?: Uint8ArrayOutputFormat | null): { publicKey: Uint8Array; privateKey: Uint8Array; keyType: string };
export function crypto_sign_keypair(outputFormat: StringOutputFormat): { publicKey: string; privateKey: string; keyType: string };
/**
 * @param signedMessage
 * @param publicKey (CRYPTO_SIGN_PUBLICKEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_SIGN_BYTES bytes)
 */
export function crypto_sign_open(signedMessage: Uint8Array, publicKey: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_sign_open(signedMessage: Uint8Array, publicKey: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param seed (CRYPTO_SIGN_SEEDBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns {publicKey, privateKey, keyType} (CRYPTO_SIGN_PUBLICKEYBYTES bytes)
 */
export function crypto_sign_seed_keypair(seed: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): { publicKey: Uint8Array; privateKey: Uint8Array; keyType: string };
export function crypto_sign_seed_keypair(seed: Uint8Array, outputFormat: StringOutputFormat): { publicKey: string; privateKey: string; keyType: string };
/**
 * @param state_address
 * @param message_chunk
 */
export function crypto_sign_update(state_address: StateAddress, message_chunk: Uint8Array | string): void;
/**
 * @param signature (CRYPTO_SIGN_BYTES bytes)
 * @param message
 * @param publicKey (CRYPTO_SIGN_PUBLICKEYBYTES bytes)
 * @returns boolean
 */
export function crypto_sign_verify_detached(signature: Uint8Array, message: Uint8Array | string, publicKey: Uint8Array): boolean;
/**
 * @param outLength
 * @param key (CRYPTO_STREAM_CHACHA20_KEYBYTES bytes)
 * @param nonce (CRYPTO_STREAM_CHACHA20_NONCEBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_stream_chacha20(outLength: number, key: Uint8Array, nonce: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_stream_chacha20(outLength: number, key: Uint8Array, nonce: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param input_message
 * @param nonce (CRYPTO_STREAM_CHACHA20_IETF_NONCEBYTES bytes)
 * @param key (CRYPTO_STREAM_CHACHA20_IETF_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_stream_chacha20_ietf_xor(input_message: Uint8Array | string, nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_stream_chacha20_ietf_xor(input_message: Uint8Array | string, nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param input_message
 * @param nonce (CRYPTO_STREAM_CHACHA20_IETF_NONCEBYTES bytes)
 * @param nonce_increment
 * @param key (CRYPTO_STREAM_CHACHA20_IETF_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_stream_chacha20_ietf_xor_ic(input_message: Uint8Array | string, nonce: Uint8Array, nonce_increment: number, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_stream_chacha20_ietf_xor_ic(input_message: Uint8Array | string, nonce: Uint8Array, nonce_increment: number, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_STREAM_CHACHA20_KEYBYTES bytes)
 */
export function crypto_stream_chacha20_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_stream_chacha20_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param input_message
 * @param nonce (CRYPTO_STREAM_CHACHA20_NONCEBYTES bytes)
 * @param key (CRYPTO_STREAM_CHACHA20_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_stream_chacha20_xor(input_message: Uint8Array | string, nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_stream_chacha20_xor(input_message: Uint8Array | string, nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param input_message
 * @param nonce (CRYPTO_STREAM_CHACHA20_NONCEBYTES bytes)
 * @param nonce_increment
 * @param key (CRYPTO_STREAM_CHACHA20_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_stream_chacha20_xor_ic(input_message: Uint8Array | string, nonce: Uint8Array, nonce_increment: number, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_stream_chacha20_xor_ic(input_message: Uint8Array | string, nonce: Uint8Array, nonce_increment: number, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_STREAM_KEYBYTES bytes)
 */
export function crypto_stream_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_stream_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string (CRYPTO_STREAM_XCHACHA20_KEYBYTES bytes)
 */
export function crypto_stream_xchacha20_keygen(outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_stream_xchacha20_keygen(outputFormat: StringOutputFormat): string;
/**
 * @param input_message
 * @param nonce (CRYPTO_STREAM_XCHACHA20_NONCEBYTES bytes)
 * @param key (CRYPTO_STREAM_XCHACHA20_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_stream_xchacha20_xor(input_message: Uint8Array | string, nonce: Uint8Array, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_stream_xchacha20_xor(input_message: Uint8Array | string, nonce: Uint8Array, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param input_message
 * @param nonce (CRYPTO_STREAM_XCHACHA20_NONCEBYTES bytes)
 * @param nonce_increment
 * @param key (CRYPTO_STREAM_XCHACHA20_KEYBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_stream_xchacha20_xor_ic(input_message: Uint8Array | string, nonce: Uint8Array, nonce_increment: number, key: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_stream_xchacha20_xor_ic(input_message: Uint8Array | string, nonce: Uint8Array, nonce_increment: number, key: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 * @param out_length
 * @param message
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_xof_shake128(out_length: number, message: Uint8Array | string, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_xof_shake128(out_length: number, message: Uint8Array | string, outputFormat: StringOutputFormat): string;
/**
 * @returns StateAddress
 */
export function crypto_xof_shake128_init(): StateAddress;
/**
 * @param domain
 * @returns StateAddress
 */
export function crypto_xof_shake128_init_with_domain(domain: number): StateAddress;
/**
 * @param state_address
 * @param out_length
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_xof_shake128_squeeze(state_address: StateAddress, out_length: number, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_xof_shake128_squeeze(state_address: StateAddress, out_length: number, outputFormat: StringOutputFormat): string;
/**
 * @param state_address
 * @param message_chunk
 */
export function crypto_xof_shake128_update(state_address: StateAddress, message_chunk: Uint8Array | string): void;
/**
 * @param out_length
 * @param message
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_xof_shake256(out_length: number, message: Uint8Array | string, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_xof_shake256(out_length: number, message: Uint8Array | string, outputFormat: StringOutputFormat): string;
/**
 * @returns StateAddress
 */
export function crypto_xof_shake256_init(): StateAddress;
/**
 * @param domain
 * @returns StateAddress
 */
export function crypto_xof_shake256_init_with_domain(domain: number): StateAddress;
/**
 * @param state_address
 * @param out_length
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_xof_shake256_squeeze(state_address: StateAddress, out_length: number, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_xof_shake256_squeeze(state_address: StateAddress, out_length: number, outputFormat: StringOutputFormat): string;
/**
 * @param state_address
 * @param message_chunk
 */
export function crypto_xof_shake256_update(state_address: StateAddress, message_chunk: Uint8Array | string): void;
/**
 * @param out_length
 * @param message
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_xof_turboshake128(out_length: number, message: Uint8Array | string, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_xof_turboshake128(out_length: number, message: Uint8Array | string, outputFormat: StringOutputFormat): string;
/**
 * @returns StateAddress
 */
export function crypto_xof_turboshake128_init(): StateAddress;
/**
 * @param domain
 * @returns StateAddress
 */
export function crypto_xof_turboshake128_init_with_domain(domain: number): StateAddress;
/**
 * @param state_address
 * @param out_length
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_xof_turboshake128_squeeze(state_address: StateAddress, out_length: number, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_xof_turboshake128_squeeze(state_address: StateAddress, out_length: number, outputFormat: StringOutputFormat): string;
/**
 * @param state_address
 * @param message_chunk
 */
export function crypto_xof_turboshake128_update(state_address: StateAddress, message_chunk: Uint8Array | string): void;
/**
 * @param out_length
 * @param message
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_xof_turboshake256(out_length: number, message: Uint8Array | string, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_xof_turboshake256(out_length: number, message: Uint8Array | string, outputFormat: StringOutputFormat): string;
/**
 * @returns StateAddress
 */
export function crypto_xof_turboshake256_init(): StateAddress;
/**
 * @param domain
 * @returns StateAddress
 */
export function crypto_xof_turboshake256_init_with_domain(domain: number): StateAddress;
/**
 * @param state_address
 * @param out_length
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function crypto_xof_turboshake256_squeeze(state_address: StateAddress, out_length: number, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function crypto_xof_turboshake256_squeeze(state_address: StateAddress, out_length: number, outputFormat: StringOutputFormat): string;
/**
 * @param state_address
 * @param message_chunk
 */
export function crypto_xof_turboshake256_update(state_address: StateAddress, message_chunk: Uint8Array | string): void;
/**
 * @param length
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function randombytes_buf(length: number, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function randombytes_buf(length: number, outputFormat: StringOutputFormat): string;
/**
 * @param length
 * @param seed (RANDOMBYTES_SEEDBYTES bytes)
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function randombytes_buf_deterministic(length: number, seed: Uint8Array, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function randombytes_buf_deterministic(length: number, seed: Uint8Array, outputFormat: StringOutputFormat): string;
/**
 */
export function randombytes_close(): void;
/**
 * @returns number
 */
export function randombytes_random(): number;
/**
 * @param implementation
 */
export function randombytes_set_implementation(implementation: object): void;
/**
 */
export function randombytes_stir(): void;
/**
 * @param upper_bound
 * @returns number
 */
export function randombytes_uniform(upper_bound: number): number;
/**
 * @param bin
 * @returns Uint8Array
 */
export function sodium_bin2ip(bin: Uint8Array): Uint8Array;
/**
 * @param ip
 * @param outputFormat Output format (default: Uint8Array)
 * @returns Uint8Array | string
 */
export function sodium_ip2bin(ip: string, outputFormat?: Uint8ArrayOutputFormat | null): Uint8Array;
export function sodium_ip2bin(ip: string, outputFormat: StringOutputFormat): string;
/**
 * @returns string
 */
export function sodium_version_string(): string;

// Internal: list of all exported symbols
export function symbols(): string[];

// Default export interface containing all exports
declare const sodium: {
  readonly ready: Promise<void>;
  readonly base64_variants: typeof base64_variants;
  readonly output_formats: string[];
  from_base64(input: string, variant?: base64_variants): Uint8Array;
  to_base64(input: Uint8Array | string, variant?: base64_variants): string;
  from_hex(input: string): Uint8Array;
  to_hex(input: Uint8Array | string): string;
  from_string(input: string): Uint8Array;
  to_string(input: Uint8Array): string;
  pad(buf: Uint8Array, blocksize: number): Uint8Array;
  unpad(buf: Uint8Array, blocksize: number): Uint8Array;
  memcmp(b1: Uint8Array, b2: Uint8Array): boolean;
  memzero(bytes: Uint8Array): void;
  increment(bytes: Uint8Array): void;
  add(a: Uint8Array, b: Uint8Array): void;
  compare(b1: Uint8Array, b2: Uint8Array): number;
  is_zero(bytes: Uint8Array): boolean;
  symbols(): string[];
  readonly SODIUM_LIBRARY_VERSION_MAJOR: number;
  readonly SODIUM_LIBRARY_VERSION_MINOR: number;
  readonly SODIUM_VERSION_STRING: string;
  readonly crypto_aead_aegis128l_ABYTES: number;
  readonly crypto_aead_aegis128l_KEYBYTES: number;
  readonly crypto_aead_aegis128l_MESSAGEBYTES_MAX: number;
  readonly crypto_aead_aegis128l_NPUBBYTES: number;
  readonly crypto_aead_aegis128l_NSECBYTES: number;
  readonly crypto_aead_aegis256_ABYTES: number;
  readonly crypto_aead_aegis256_KEYBYTES: number;
  readonly crypto_aead_aegis256_MESSAGEBYTES_MAX: number;
  readonly crypto_aead_aegis256_NPUBBYTES: number;
  readonly crypto_aead_aegis256_NSECBYTES: number;
  readonly crypto_aead_aes256gcm_ABYTES: number;
  readonly crypto_aead_aes256gcm_KEYBYTES: number;
  readonly crypto_aead_aes256gcm_MESSAGEBYTES_MAX: number;
  readonly crypto_aead_aes256gcm_NPUBBYTES: number;
  readonly crypto_aead_aes256gcm_NSECBYTES: number;
  readonly crypto_aead_chacha20poly1305_ABYTES: number;
  readonly crypto_aead_chacha20poly1305_IETF_ABYTES: number;
  readonly crypto_aead_chacha20poly1305_IETF_KEYBYTES: number;
  readonly crypto_aead_chacha20poly1305_IETF_MESSAGEBYTES_MAX: number;
  readonly crypto_aead_chacha20poly1305_IETF_NPUBBYTES: number;
  readonly crypto_aead_chacha20poly1305_IETF_NSECBYTES: number;
  readonly crypto_aead_chacha20poly1305_KEYBYTES: number;
  readonly crypto_aead_chacha20poly1305_MESSAGEBYTES_MAX: number;
  readonly crypto_aead_chacha20poly1305_NPUBBYTES: number;
  readonly crypto_aead_chacha20poly1305_NSECBYTES: number;
  readonly crypto_aead_chacha20poly1305_ietf_ABYTES: number;
  readonly crypto_aead_chacha20poly1305_ietf_KEYBYTES: number;
  readonly crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX: number;
  readonly crypto_aead_chacha20poly1305_ietf_NPUBBYTES: number;
  readonly crypto_aead_chacha20poly1305_ietf_NSECBYTES: number;
  readonly crypto_aead_xchacha20poly1305_IETF_ABYTES: number;
  readonly crypto_aead_xchacha20poly1305_IETF_KEYBYTES: number;
  readonly crypto_aead_xchacha20poly1305_IETF_MESSAGEBYTES_MAX: number;
  readonly crypto_aead_xchacha20poly1305_IETF_NPUBBYTES: number;
  readonly crypto_aead_xchacha20poly1305_IETF_NSECBYTES: number;
  readonly crypto_aead_xchacha20poly1305_ietf_ABYTES: number;
  readonly crypto_aead_xchacha20poly1305_ietf_KEYBYTES: number;
  readonly crypto_aead_xchacha20poly1305_ietf_MESSAGEBYTES_MAX: number;
  readonly crypto_aead_xchacha20poly1305_ietf_NPUBBYTES: number;
  readonly crypto_aead_xchacha20poly1305_ietf_NSECBYTES: number;
  readonly crypto_auth_BYTES: number;
  readonly crypto_auth_KEYBYTES: number;
  readonly crypto_auth_hmacsha256_BYTES: number;
  readonly crypto_auth_hmacsha256_KEYBYTES: number;
  readonly crypto_auth_hmacsha512256_BYTES: number;
  readonly crypto_auth_hmacsha512256_KEYBYTES: number;
  readonly crypto_auth_hmacsha512_BYTES: number;
  readonly crypto_auth_hmacsha512_KEYBYTES: number;
  readonly crypto_box_BEFORENMBYTES: number;
  readonly crypto_box_MACBYTES: number;
  readonly crypto_box_MESSAGEBYTES_MAX: number;
  readonly crypto_box_NONCEBYTES: number;
  readonly crypto_box_PUBLICKEYBYTES: number;
  readonly crypto_box_SEALBYTES: number;
  readonly crypto_box_SECRETKEYBYTES: number;
  readonly crypto_box_SEEDBYTES: number;
  readonly crypto_box_curve25519xchacha20poly1305_BEFORENMBYTES: number;
  readonly crypto_box_curve25519xchacha20poly1305_MACBYTES: number;
  readonly crypto_box_curve25519xchacha20poly1305_MESSAGEBYTES_MAX: number;
  readonly crypto_box_curve25519xchacha20poly1305_NONCEBYTES: number;
  readonly crypto_box_curve25519xchacha20poly1305_PUBLICKEYBYTES: number;
  readonly crypto_box_curve25519xchacha20poly1305_SEALBYTES: number;
  readonly crypto_box_curve25519xchacha20poly1305_SECRETKEYBYTES: number;
  readonly crypto_box_curve25519xchacha20poly1305_SEEDBYTES: number;
  readonly crypto_box_curve25519xsalsa20poly1305_BEFORENMBYTES: number;
  readonly crypto_box_curve25519xsalsa20poly1305_MACBYTES: number;
  readonly crypto_box_curve25519xsalsa20poly1305_MESSAGEBYTES_MAX: number;
  readonly crypto_box_curve25519xsalsa20poly1305_NONCEBYTES: number;
  readonly crypto_box_curve25519xsalsa20poly1305_PUBLICKEYBYTES: number;
  readonly crypto_box_curve25519xsalsa20poly1305_SECRETKEYBYTES: number;
  readonly crypto_box_curve25519xsalsa20poly1305_SEEDBYTES: number;
  readonly crypto_core_ed25519_BYTES: number;
  readonly crypto_core_ed25519_HASHBYTES: number;
  readonly crypto_core_ed25519_NONREDUCEDSCALARBYTES: number;
  readonly crypto_core_ed25519_SCALARBYTES: number;
  readonly crypto_core_ed25519_UNIFORMBYTES: number;
  readonly crypto_core_hchacha20_CONSTBYTES: number;
  readonly crypto_core_hchacha20_INPUTBYTES: number;
  readonly crypto_core_hchacha20_KEYBYTES: number;
  readonly crypto_core_hchacha20_OUTPUTBYTES: number;
  readonly crypto_core_hsalsa20_CONSTBYTES: number;
  readonly crypto_core_hsalsa20_INPUTBYTES: number;
  readonly crypto_core_hsalsa20_KEYBYTES: number;
  readonly crypto_core_hsalsa20_OUTPUTBYTES: number;
  readonly crypto_core_ristretto255_BYTES: number;
  readonly crypto_core_ristretto255_HASHBYTES: number;
  readonly crypto_core_ristretto255_NONREDUCEDSCALARBYTES: number;
  readonly crypto_core_ristretto255_SCALARBYTES: number;
  readonly crypto_core_salsa2012_CONSTBYTES: number;
  readonly crypto_core_salsa2012_INPUTBYTES: number;
  readonly crypto_core_salsa2012_KEYBYTES: number;
  readonly crypto_core_salsa2012_OUTPUTBYTES: number;
  readonly crypto_core_salsa208_CONSTBYTES: number;
  readonly crypto_core_salsa208_INPUTBYTES: number;
  readonly crypto_core_salsa208_KEYBYTES: number;
  readonly crypto_core_salsa208_OUTPUTBYTES: number;
  readonly crypto_core_salsa20_CONSTBYTES: number;
  readonly crypto_core_salsa20_INPUTBYTES: number;
  readonly crypto_core_salsa20_KEYBYTES: number;
  readonly crypto_core_salsa20_OUTPUTBYTES: number;
  readonly crypto_generichash_BYTES: number;
  readonly crypto_generichash_BYTES_MAX: number;
  readonly crypto_generichash_BYTES_MIN: number;
  readonly crypto_generichash_KEYBYTES: number;
  readonly crypto_generichash_KEYBYTES_MAX: number;
  readonly crypto_generichash_KEYBYTES_MIN: number;
  readonly crypto_generichash_blake2b_BYTES: number;
  readonly crypto_generichash_blake2b_BYTES_MAX: number;
  readonly crypto_generichash_blake2b_BYTES_MIN: number;
  readonly crypto_generichash_blake2b_KEYBYTES: number;
  readonly crypto_generichash_blake2b_KEYBYTES_MAX: number;
  readonly crypto_generichash_blake2b_KEYBYTES_MIN: number;
  readonly crypto_generichash_blake2b_PERSONALBYTES: number;
  readonly crypto_generichash_blake2b_SALTBYTES: number;
  readonly crypto_hash_BYTES: number;
  readonly crypto_hash_sha256_BYTES: number;
  readonly crypto_hash_sha512_BYTES: number;
  readonly crypto_ipcrypt_BYTES: number;
  readonly crypto_ipcrypt_KEYBYTES: number;
  readonly crypto_ipcrypt_ND_INPUTBYTES: number;
  readonly crypto_ipcrypt_ND_KEYBYTES: number;
  readonly crypto_ipcrypt_ND_OUTPUTBYTES: number;
  readonly crypto_ipcrypt_ND_TWEAKBYTES: number;
  readonly crypto_ipcrypt_NDX_INPUTBYTES: number;
  readonly crypto_ipcrypt_NDX_KEYBYTES: number;
  readonly crypto_ipcrypt_NDX_OUTPUTBYTES: number;
  readonly crypto_ipcrypt_NDX_TWEAKBYTES: number;
  readonly crypto_ipcrypt_PFX_BYTES: number;
  readonly crypto_ipcrypt_PFX_KEYBYTES: number;
  readonly crypto_kdf_BYTES_MAX: number;
  readonly crypto_kdf_BYTES_MIN: number;
  readonly crypto_kdf_CONTEXTBYTES: number;
  readonly crypto_kdf_KEYBYTES: number;
  readonly crypto_kdf_blake2b_BYTES_MAX: number;
  readonly crypto_kdf_blake2b_BYTES_MIN: number;
  readonly crypto_kdf_blake2b_CONTEXTBYTES: number;
  readonly crypto_kdf_blake2b_KEYBYTES: number;
  readonly crypto_kdf_hkdf_sha256_BYTES_MAX: number;
  readonly crypto_kdf_hkdf_sha256_BYTES_MIN: number;
  readonly crypto_kdf_hkdf_sha256_KEYBYTES: number;
  readonly crypto_kdf_hkdf_sha512_BYTES_MAX: number;
  readonly crypto_kdf_hkdf_sha512_BYTES_MIN: number;
  readonly crypto_kdf_hkdf_sha512_KEYBYTES: number;
  readonly crypto_kx_PUBLICKEYBYTES: number;
  readonly crypto_kx_SECRETKEYBYTES: number;
  readonly crypto_kx_SEEDBYTES: number;
  readonly crypto_kx_SESSIONKEYBYTES: number;
  readonly crypto_onetimeauth_BYTES: number;
  readonly crypto_onetimeauth_KEYBYTES: number;
  readonly crypto_onetimeauth_poly1305_BYTES: number;
  readonly crypto_onetimeauth_poly1305_KEYBYTES: number;
  readonly crypto_pwhash_ALG_ARGON2I13: number;
  readonly crypto_pwhash_ALG_ARGON2ID13: number;
  readonly crypto_pwhash_ALG_DEFAULT: number;
  readonly crypto_pwhash_BYTES_MAX: number;
  readonly crypto_pwhash_BYTES_MIN: number;
  readonly crypto_pwhash_MEMLIMIT_INTERACTIVE: number;
  readonly crypto_pwhash_MEMLIMIT_MAX: number;
  readonly crypto_pwhash_MEMLIMIT_MIN: number;
  readonly crypto_pwhash_MEMLIMIT_MODERATE: number;
  readonly crypto_pwhash_MEMLIMIT_SENSITIVE: number;
  readonly crypto_pwhash_OPSLIMIT_INTERACTIVE: number;
  readonly crypto_pwhash_OPSLIMIT_MAX: number;
  readonly crypto_pwhash_OPSLIMIT_MIN: number;
  readonly crypto_pwhash_OPSLIMIT_MODERATE: number;
  readonly crypto_pwhash_OPSLIMIT_SENSITIVE: number;
  readonly crypto_pwhash_PASSWD_MAX: number;
  readonly crypto_pwhash_PASSWD_MIN: number;
  readonly crypto_pwhash_SALTBYTES: number;
  readonly crypto_pwhash_STRBYTES: number;
  readonly crypto_pwhash_STRPREFIX: string;
  readonly crypto_pwhash_argon2i_BYTES_MAX: number;
  readonly crypto_pwhash_argon2i_BYTES_MIN: number;
  readonly crypto_pwhash_argon2i_MEMLIMIT_INTERACTIVE: number;
  readonly crypto_pwhash_argon2i_MEMLIMIT_MAX: number;
  readonly crypto_pwhash_argon2i_MEMLIMIT_MIN: number;
  readonly crypto_pwhash_argon2i_MEMLIMIT_MODERATE: number;
  readonly crypto_pwhash_argon2i_MEMLIMIT_SENSITIVE: number;
  readonly crypto_pwhash_argon2i_OPSLIMIT_INTERACTIVE: number;
  readonly crypto_pwhash_argon2i_OPSLIMIT_MAX: number;
  readonly crypto_pwhash_argon2i_OPSLIMIT_MIN: number;
  readonly crypto_pwhash_argon2i_OPSLIMIT_MODERATE: number;
  readonly crypto_pwhash_argon2i_OPSLIMIT_SENSITIVE: number;
  readonly crypto_pwhash_argon2i_PASSWD_MAX: number;
  readonly crypto_pwhash_argon2i_PASSWD_MIN: number;
  readonly crypto_pwhash_argon2i_SALTBYTES: number;
  readonly crypto_pwhash_argon2i_STRBYTES: number;
  readonly crypto_pwhash_argon2i_STRPREFIX: string;
  readonly crypto_pwhash_argon2id_BYTES_MAX: number;
  readonly crypto_pwhash_argon2id_BYTES_MIN: number;
  readonly crypto_pwhash_argon2id_MEMLIMIT_INTERACTIVE: number;
  readonly crypto_pwhash_argon2id_MEMLIMIT_MAX: number;
  readonly crypto_pwhash_argon2id_MEMLIMIT_MIN: number;
  readonly crypto_pwhash_argon2id_MEMLIMIT_MODERATE: number;
  readonly crypto_pwhash_argon2id_MEMLIMIT_SENSITIVE: number;
  readonly crypto_pwhash_argon2id_OPSLIMIT_INTERACTIVE: number;
  readonly crypto_pwhash_argon2id_OPSLIMIT_MAX: number;
  readonly crypto_pwhash_argon2id_OPSLIMIT_MIN: number;
  readonly crypto_pwhash_argon2id_OPSLIMIT_MODERATE: number;
  readonly crypto_pwhash_argon2id_OPSLIMIT_SENSITIVE: number;
  readonly crypto_pwhash_argon2id_PASSWD_MAX: number;
  readonly crypto_pwhash_argon2id_PASSWD_MIN: number;
  readonly crypto_pwhash_argon2id_SALTBYTES: number;
  readonly crypto_pwhash_argon2id_STRBYTES: number;
  readonly crypto_pwhash_argon2id_STRPREFIX: string;
  readonly crypto_pwhash_scryptsalsa208sha256_BYTES_MAX: number;
  readonly crypto_pwhash_scryptsalsa208sha256_BYTES_MIN: number;
  readonly crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_INTERACTIVE: number;
  readonly crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_MAX: number;
  readonly crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_MIN: number;
  readonly crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_SENSITIVE: number;
  readonly crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_INTERACTIVE: number;
  readonly crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_MAX: number;
  readonly crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_MIN: number;
  readonly crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_SENSITIVE: number;
  readonly crypto_pwhash_scryptsalsa208sha256_PASSWD_MAX: number;
  readonly crypto_pwhash_scryptsalsa208sha256_PASSWD_MIN: number;
  readonly crypto_pwhash_scryptsalsa208sha256_SALTBYTES: number;
  readonly crypto_pwhash_scryptsalsa208sha256_STRBYTES: number;
  readonly crypto_pwhash_scryptsalsa208sha256_STRPREFIX: string;
  readonly crypto_scalarmult_BYTES: number;
  readonly crypto_scalarmult_SCALARBYTES: number;
  readonly crypto_scalarmult_curve25519_BYTES: number;
  readonly crypto_scalarmult_curve25519_SCALARBYTES: number;
  readonly crypto_scalarmult_ed25519_BYTES: number;
  readonly crypto_scalarmult_ed25519_SCALARBYTES: number;
  readonly crypto_scalarmult_ristretto255_BYTES: number;
  readonly crypto_scalarmult_ristretto255_SCALARBYTES: number;
  readonly crypto_secretbox_KEYBYTES: number;
  readonly crypto_secretbox_MACBYTES: number;
  readonly crypto_secretbox_MESSAGEBYTES_MAX: number;
  readonly crypto_secretbox_NONCEBYTES: number;
  readonly crypto_secretbox_xchacha20poly1305_KEYBYTES: number;
  readonly crypto_secretbox_xchacha20poly1305_MACBYTES: number;
  readonly crypto_secretbox_xchacha20poly1305_MESSAGEBYTES_MAX: number;
  readonly crypto_secretbox_xchacha20poly1305_NONCEBYTES: number;
  readonly crypto_secretbox_xsalsa20poly1305_KEYBYTES: number;
  readonly crypto_secretbox_xsalsa20poly1305_MACBYTES: number;
  readonly crypto_secretbox_xsalsa20poly1305_MESSAGEBYTES_MAX: number;
  readonly crypto_secretbox_xsalsa20poly1305_NONCEBYTES: number;
  readonly crypto_secretstream_xchacha20poly1305_ABYTES: number;
  readonly crypto_secretstream_xchacha20poly1305_HEADERBYTES: number;
  readonly crypto_secretstream_xchacha20poly1305_KEYBYTES: number;
  readonly crypto_secretstream_xchacha20poly1305_MESSAGEBYTES_MAX: number;
  readonly crypto_secretstream_xchacha20poly1305_TAG_FINAL: number;
  readonly crypto_secretstream_xchacha20poly1305_TAG_MESSAGE: number;
  readonly crypto_secretstream_xchacha20poly1305_TAG_PUSH: number;
  readonly crypto_secretstream_xchacha20poly1305_TAG_REKEY: number;
  readonly crypto_shorthash_BYTES: number;
  readonly crypto_shorthash_KEYBYTES: number;
  readonly crypto_shorthash_siphash24_BYTES: number;
  readonly crypto_shorthash_siphash24_KEYBYTES: number;
  readonly crypto_shorthash_siphashx24_BYTES: number;
  readonly crypto_shorthash_siphashx24_KEYBYTES: number;
  readonly crypto_sign_BYTES: number;
  readonly crypto_sign_MESSAGEBYTES_MAX: number;
  readonly crypto_sign_PUBLICKEYBYTES: number;
  readonly crypto_sign_SECRETKEYBYTES: number;
  readonly crypto_sign_SEEDBYTES: number;
  readonly crypto_sign_ed25519_BYTES: number;
  readonly crypto_sign_ed25519_MESSAGEBYTES_MAX: number;
  readonly crypto_sign_ed25519_PUBLICKEYBYTES: number;
  readonly crypto_sign_ed25519_SECRETKEYBYTES: number;
  readonly crypto_sign_ed25519_SEEDBYTES: number;
  readonly crypto_stream_KEYBYTES: number;
  readonly crypto_stream_MESSAGEBYTES_MAX: number;
  readonly crypto_stream_NONCEBYTES: number;
  readonly crypto_stream_chacha20_IETF_KEYBYTES: number;
  readonly crypto_stream_chacha20_IETF_MESSAGEBYTES_MAX: number;
  readonly crypto_stream_chacha20_IETF_NONCEBYTES: number;
  readonly crypto_stream_chacha20_KEYBYTES: number;
  readonly crypto_stream_chacha20_MESSAGEBYTES_MAX: number;
  readonly crypto_stream_chacha20_NONCEBYTES: number;
  readonly crypto_stream_chacha20_ietf_KEYBYTES: number;
  readonly crypto_stream_chacha20_ietf_MESSAGEBYTES_MAX: number;
  readonly crypto_stream_chacha20_ietf_NONCEBYTES: number;
  readonly crypto_stream_salsa2012_KEYBYTES: number;
  readonly crypto_stream_salsa2012_MESSAGEBYTES_MAX: number;
  readonly crypto_stream_salsa2012_NONCEBYTES: number;
  readonly crypto_stream_salsa208_KEYBYTES: number;
  readonly crypto_stream_salsa208_MESSAGEBYTES_MAX: number;
  readonly crypto_stream_salsa208_NONCEBYTES: number;
  readonly crypto_stream_salsa20_KEYBYTES: number;
  readonly crypto_stream_salsa20_MESSAGEBYTES_MAX: number;
  readonly crypto_stream_salsa20_NONCEBYTES: number;
  readonly crypto_stream_xchacha20_KEYBYTES: number;
  readonly crypto_stream_xchacha20_MESSAGEBYTES_MAX: number;
  readonly crypto_stream_xchacha20_NONCEBYTES: number;
  readonly crypto_stream_xsalsa20_KEYBYTES: number;
  readonly crypto_stream_xsalsa20_MESSAGEBYTES_MAX: number;
  readonly crypto_stream_xsalsa20_NONCEBYTES: number;
  readonly crypto_xof_shake128_BLOCKBYTES: number;
  readonly crypto_xof_shake128_STATEBYTES: number;
  readonly crypto_xof_shake256_BLOCKBYTES: number;
  readonly crypto_xof_shake256_STATEBYTES: number;
  readonly crypto_xof_turboshake128_BLOCKBYTES: number;
  readonly crypto_xof_turboshake128_STATEBYTES: number;
  readonly crypto_xof_turboshake256_BLOCKBYTES: number;
  readonly crypto_xof_turboshake256_STATEBYTES: number;
  readonly crypto_verify_16_BYTES: number;
  readonly crypto_verify_32_BYTES: number;
  readonly crypto_verify_64_BYTES: number;
  crypto_aead_aegis128l_decrypt: typeof crypto_aead_aegis128l_decrypt;
  crypto_aead_aegis128l_decrypt_detached: typeof crypto_aead_aegis128l_decrypt_detached;
  crypto_aead_aegis128l_encrypt: typeof crypto_aead_aegis128l_encrypt;
  crypto_aead_aegis128l_encrypt_detached: typeof crypto_aead_aegis128l_encrypt_detached;
  crypto_aead_aegis128l_keygen: typeof crypto_aead_aegis128l_keygen;
  crypto_aead_aegis256_decrypt: typeof crypto_aead_aegis256_decrypt;
  crypto_aead_aegis256_decrypt_detached: typeof crypto_aead_aegis256_decrypt_detached;
  crypto_aead_aegis256_encrypt: typeof crypto_aead_aegis256_encrypt;
  crypto_aead_aegis256_encrypt_detached: typeof crypto_aead_aegis256_encrypt_detached;
  crypto_aead_aegis256_keygen: typeof crypto_aead_aegis256_keygen;
  crypto_aead_chacha20poly1305_decrypt: typeof crypto_aead_chacha20poly1305_decrypt;
  crypto_aead_chacha20poly1305_decrypt_detached: typeof crypto_aead_chacha20poly1305_decrypt_detached;
  crypto_aead_chacha20poly1305_encrypt: typeof crypto_aead_chacha20poly1305_encrypt;
  crypto_aead_chacha20poly1305_encrypt_detached: typeof crypto_aead_chacha20poly1305_encrypt_detached;
  crypto_aead_chacha20poly1305_ietf_decrypt: typeof crypto_aead_chacha20poly1305_ietf_decrypt;
  crypto_aead_chacha20poly1305_ietf_decrypt_detached: typeof crypto_aead_chacha20poly1305_ietf_decrypt_detached;
  crypto_aead_chacha20poly1305_ietf_encrypt: typeof crypto_aead_chacha20poly1305_ietf_encrypt;
  crypto_aead_chacha20poly1305_ietf_encrypt_detached: typeof crypto_aead_chacha20poly1305_ietf_encrypt_detached;
  crypto_aead_chacha20poly1305_ietf_keygen: typeof crypto_aead_chacha20poly1305_ietf_keygen;
  crypto_aead_chacha20poly1305_keygen: typeof crypto_aead_chacha20poly1305_keygen;
  crypto_aead_xchacha20poly1305_ietf_decrypt: typeof crypto_aead_xchacha20poly1305_ietf_decrypt;
  crypto_aead_xchacha20poly1305_ietf_decrypt_detached: typeof crypto_aead_xchacha20poly1305_ietf_decrypt_detached;
  crypto_aead_xchacha20poly1305_ietf_encrypt: typeof crypto_aead_xchacha20poly1305_ietf_encrypt;
  crypto_aead_xchacha20poly1305_ietf_encrypt_detached: typeof crypto_aead_xchacha20poly1305_ietf_encrypt_detached;
  crypto_aead_xchacha20poly1305_ietf_keygen: typeof crypto_aead_xchacha20poly1305_ietf_keygen;
  crypto_auth: typeof crypto_auth;
  crypto_auth_hmacsha256: typeof crypto_auth_hmacsha256;
  crypto_auth_hmacsha256_final: typeof crypto_auth_hmacsha256_final;
  crypto_auth_hmacsha256_init: typeof crypto_auth_hmacsha256_init;
  crypto_auth_hmacsha256_keygen: typeof crypto_auth_hmacsha256_keygen;
  crypto_auth_hmacsha256_update: typeof crypto_auth_hmacsha256_update;
  crypto_auth_hmacsha256_verify: typeof crypto_auth_hmacsha256_verify;
  crypto_auth_hmacsha512: typeof crypto_auth_hmacsha512;
  crypto_auth_hmacsha512256: typeof crypto_auth_hmacsha512256;
  crypto_auth_hmacsha512256_final: typeof crypto_auth_hmacsha512256_final;
  crypto_auth_hmacsha512256_init: typeof crypto_auth_hmacsha512256_init;
  crypto_auth_hmacsha512256_keygen: typeof crypto_auth_hmacsha512256_keygen;
  crypto_auth_hmacsha512256_update: typeof crypto_auth_hmacsha512256_update;
  crypto_auth_hmacsha512256_verify: typeof crypto_auth_hmacsha512256_verify;
  crypto_auth_hmacsha512_final: typeof crypto_auth_hmacsha512_final;
  crypto_auth_hmacsha512_init: typeof crypto_auth_hmacsha512_init;
  crypto_auth_hmacsha512_keygen: typeof crypto_auth_hmacsha512_keygen;
  crypto_auth_hmacsha512_update: typeof crypto_auth_hmacsha512_update;
  crypto_auth_hmacsha512_verify: typeof crypto_auth_hmacsha512_verify;
  crypto_auth_keygen: typeof crypto_auth_keygen;
  crypto_auth_verify: typeof crypto_auth_verify;
  crypto_box_beforenm: typeof crypto_box_beforenm;
  crypto_box_curve25519xchacha20poly1305_beforenm: typeof crypto_box_curve25519xchacha20poly1305_beforenm;
  crypto_box_curve25519xchacha20poly1305_detached: typeof crypto_box_curve25519xchacha20poly1305_detached;
  crypto_box_curve25519xchacha20poly1305_detached_afternm: typeof crypto_box_curve25519xchacha20poly1305_detached_afternm;
  crypto_box_curve25519xchacha20poly1305_easy: typeof crypto_box_curve25519xchacha20poly1305_easy;
  crypto_box_curve25519xchacha20poly1305_easy_afternm: typeof crypto_box_curve25519xchacha20poly1305_easy_afternm;
  crypto_box_curve25519xchacha20poly1305_keypair: typeof crypto_box_curve25519xchacha20poly1305_keypair;
  crypto_box_curve25519xchacha20poly1305_open_detached: typeof crypto_box_curve25519xchacha20poly1305_open_detached;
  crypto_box_curve25519xchacha20poly1305_open_detached_afternm: typeof crypto_box_curve25519xchacha20poly1305_open_detached_afternm;
  crypto_box_curve25519xchacha20poly1305_open_easy: typeof crypto_box_curve25519xchacha20poly1305_open_easy;
  crypto_box_curve25519xchacha20poly1305_open_easy_afternm: typeof crypto_box_curve25519xchacha20poly1305_open_easy_afternm;
  crypto_box_curve25519xchacha20poly1305_seal: typeof crypto_box_curve25519xchacha20poly1305_seal;
  crypto_box_curve25519xchacha20poly1305_seal_open: typeof crypto_box_curve25519xchacha20poly1305_seal_open;
  crypto_box_curve25519xchacha20poly1305_seed_keypair: typeof crypto_box_curve25519xchacha20poly1305_seed_keypair;
  crypto_box_detached: typeof crypto_box_detached;
  crypto_box_easy: typeof crypto_box_easy;
  crypto_box_easy_afternm: typeof crypto_box_easy_afternm;
  crypto_box_keypair: typeof crypto_box_keypair;
  crypto_box_open_detached: typeof crypto_box_open_detached;
  crypto_box_open_easy: typeof crypto_box_open_easy;
  crypto_box_open_easy_afternm: typeof crypto_box_open_easy_afternm;
  crypto_box_seal: typeof crypto_box_seal;
  crypto_box_seal_open: typeof crypto_box_seal_open;
  crypto_box_seed_keypair: typeof crypto_box_seed_keypair;
  crypto_core_ed25519_add: typeof crypto_core_ed25519_add;
  crypto_core_ed25519_from_hash: typeof crypto_core_ed25519_from_hash;
  crypto_core_ed25519_from_uniform: typeof crypto_core_ed25519_from_uniform;
  crypto_core_ed25519_is_valid_point: typeof crypto_core_ed25519_is_valid_point;
  crypto_core_ed25519_random: typeof crypto_core_ed25519_random;
  crypto_core_ed25519_scalar_add: typeof crypto_core_ed25519_scalar_add;
  crypto_core_ed25519_scalar_complement: typeof crypto_core_ed25519_scalar_complement;
  crypto_core_ed25519_scalar_invert: typeof crypto_core_ed25519_scalar_invert;
  crypto_core_ed25519_scalar_mul: typeof crypto_core_ed25519_scalar_mul;
  crypto_core_ed25519_scalar_negate: typeof crypto_core_ed25519_scalar_negate;
  crypto_core_ed25519_scalar_random: typeof crypto_core_ed25519_scalar_random;
  crypto_core_ed25519_scalar_reduce: typeof crypto_core_ed25519_scalar_reduce;
  crypto_core_ed25519_scalar_sub: typeof crypto_core_ed25519_scalar_sub;
  crypto_core_ed25519_sub: typeof crypto_core_ed25519_sub;
  crypto_core_hchacha20: typeof crypto_core_hchacha20;
  crypto_core_hsalsa20: typeof crypto_core_hsalsa20;
  crypto_core_ristretto255_add: typeof crypto_core_ristretto255_add;
  crypto_core_ristretto255_from_hash: typeof crypto_core_ristretto255_from_hash;
  crypto_core_ristretto255_is_valid_point: typeof crypto_core_ristretto255_is_valid_point;
  crypto_core_ristretto255_random: typeof crypto_core_ristretto255_random;
  crypto_core_ristretto255_scalar_add: typeof crypto_core_ristretto255_scalar_add;
  crypto_core_ristretto255_scalar_complement: typeof crypto_core_ristretto255_scalar_complement;
  crypto_core_ristretto255_scalar_invert: typeof crypto_core_ristretto255_scalar_invert;
  crypto_core_ristretto255_scalar_mul: typeof crypto_core_ristretto255_scalar_mul;
  crypto_core_ristretto255_scalar_negate: typeof crypto_core_ristretto255_scalar_negate;
  crypto_core_ristretto255_scalar_random: typeof crypto_core_ristretto255_scalar_random;
  crypto_core_ristretto255_scalar_reduce: typeof crypto_core_ristretto255_scalar_reduce;
  crypto_core_ristretto255_scalar_sub: typeof crypto_core_ristretto255_scalar_sub;
  crypto_core_ristretto255_sub: typeof crypto_core_ristretto255_sub;
  crypto_generichash: typeof crypto_generichash;
  crypto_generichash_blake2b_salt_personal: typeof crypto_generichash_blake2b_salt_personal;
  crypto_generichash_final: typeof crypto_generichash_final;
  crypto_generichash_init: typeof crypto_generichash_init;
  crypto_generichash_keygen: typeof crypto_generichash_keygen;
  crypto_generichash_update: typeof crypto_generichash_update;
  crypto_hash: typeof crypto_hash;
  crypto_hash_sha256: typeof crypto_hash_sha256;
  crypto_hash_sha256_final: typeof crypto_hash_sha256_final;
  crypto_hash_sha256_init: typeof crypto_hash_sha256_init;
  crypto_hash_sha256_update: typeof crypto_hash_sha256_update;
  crypto_hash_sha512: typeof crypto_hash_sha512;
  crypto_hash_sha512_final: typeof crypto_hash_sha512_final;
  crypto_hash_sha512_init: typeof crypto_hash_sha512_init;
  crypto_hash_sha512_update: typeof crypto_hash_sha512_update;
  crypto_ipcrypt_decrypt: typeof crypto_ipcrypt_decrypt;
  crypto_ipcrypt_encrypt: typeof crypto_ipcrypt_encrypt;
  crypto_ipcrypt_keygen: typeof crypto_ipcrypt_keygen;
  crypto_ipcrypt_nd_decrypt: typeof crypto_ipcrypt_nd_decrypt;
  crypto_ipcrypt_nd_encrypt: typeof crypto_ipcrypt_nd_encrypt;
  crypto_ipcrypt_nd_keygen: typeof crypto_ipcrypt_nd_keygen;
  crypto_ipcrypt_ndx_decrypt: typeof crypto_ipcrypt_ndx_decrypt;
  crypto_ipcrypt_ndx_encrypt: typeof crypto_ipcrypt_ndx_encrypt;
  crypto_ipcrypt_ndx_keygen: typeof crypto_ipcrypt_ndx_keygen;
  crypto_ipcrypt_pfx_decrypt: typeof crypto_ipcrypt_pfx_decrypt;
  crypto_ipcrypt_pfx_encrypt: typeof crypto_ipcrypt_pfx_encrypt;
  crypto_ipcrypt_pfx_keygen: typeof crypto_ipcrypt_pfx_keygen;
  crypto_kdf_derive_from_key: typeof crypto_kdf_derive_from_key;
  crypto_kdf_keygen: typeof crypto_kdf_keygen;
  crypto_kx_client_session_keys: typeof crypto_kx_client_session_keys;
  crypto_kx_keypair: typeof crypto_kx_keypair;
  crypto_kx_seed_keypair: typeof crypto_kx_seed_keypair;
  crypto_kx_server_session_keys: typeof crypto_kx_server_session_keys;
  crypto_onetimeauth: typeof crypto_onetimeauth;
  crypto_onetimeauth_final: typeof crypto_onetimeauth_final;
  crypto_onetimeauth_init: typeof crypto_onetimeauth_init;
  crypto_onetimeauth_keygen: typeof crypto_onetimeauth_keygen;
  crypto_onetimeauth_update: typeof crypto_onetimeauth_update;
  crypto_onetimeauth_verify: typeof crypto_onetimeauth_verify;
  crypto_pwhash: typeof crypto_pwhash;
  crypto_pwhash_str: typeof crypto_pwhash_str;
  crypto_pwhash_str_needs_rehash: typeof crypto_pwhash_str_needs_rehash;
  crypto_pwhash_str_verify: typeof crypto_pwhash_str_verify;
  crypto_scalarmult: typeof crypto_scalarmult;
  crypto_scalarmult_base: typeof crypto_scalarmult_base;
  crypto_scalarmult_ed25519: typeof crypto_scalarmult_ed25519;
  crypto_scalarmult_ed25519_base: typeof crypto_scalarmult_ed25519_base;
  crypto_scalarmult_ed25519_base_noclamp: typeof crypto_scalarmult_ed25519_base_noclamp;
  crypto_scalarmult_ed25519_noclamp: typeof crypto_scalarmult_ed25519_noclamp;
  crypto_scalarmult_ristretto255: typeof crypto_scalarmult_ristretto255;
  crypto_scalarmult_ristretto255_base: typeof crypto_scalarmult_ristretto255_base;
  crypto_secretbox_detached: typeof crypto_secretbox_detached;
  crypto_secretbox_easy: typeof crypto_secretbox_easy;
  crypto_secretbox_keygen: typeof crypto_secretbox_keygen;
  crypto_secretbox_open_detached: typeof crypto_secretbox_open_detached;
  crypto_secretbox_open_easy: typeof crypto_secretbox_open_easy;
  crypto_secretstream_xchacha20poly1305_init_pull: typeof crypto_secretstream_xchacha20poly1305_init_pull;
  crypto_secretstream_xchacha20poly1305_init_push: typeof crypto_secretstream_xchacha20poly1305_init_push;
  crypto_secretstream_xchacha20poly1305_keygen: typeof crypto_secretstream_xchacha20poly1305_keygen;
  crypto_secretstream_xchacha20poly1305_pull: typeof crypto_secretstream_xchacha20poly1305_pull;
  crypto_secretstream_xchacha20poly1305_push: typeof crypto_secretstream_xchacha20poly1305_push;
  crypto_secretstream_xchacha20poly1305_rekey: typeof crypto_secretstream_xchacha20poly1305_rekey;
  crypto_shorthash: typeof crypto_shorthash;
  crypto_shorthash_keygen: typeof crypto_shorthash_keygen;
  crypto_shorthash_siphashx24: typeof crypto_shorthash_siphashx24;
  crypto_sign: typeof crypto_sign;
  crypto_sign_detached: typeof crypto_sign_detached;
  crypto_sign_ed25519_pk_to_curve25519: typeof crypto_sign_ed25519_pk_to_curve25519;
  crypto_sign_ed25519_sk_to_curve25519: typeof crypto_sign_ed25519_sk_to_curve25519;
  crypto_sign_ed25519_sk_to_pk: typeof crypto_sign_ed25519_sk_to_pk;
  crypto_sign_ed25519_sk_to_seed: typeof crypto_sign_ed25519_sk_to_seed;
  crypto_sign_final_create: typeof crypto_sign_final_create;
  crypto_sign_final_verify: typeof crypto_sign_final_verify;
  crypto_sign_init: typeof crypto_sign_init;
  crypto_sign_keypair: typeof crypto_sign_keypair;
  crypto_sign_open: typeof crypto_sign_open;
  crypto_sign_seed_keypair: typeof crypto_sign_seed_keypair;
  crypto_sign_update: typeof crypto_sign_update;
  crypto_sign_verify_detached: typeof crypto_sign_verify_detached;
  crypto_stream_chacha20: typeof crypto_stream_chacha20;
  crypto_stream_chacha20_ietf_xor: typeof crypto_stream_chacha20_ietf_xor;
  crypto_stream_chacha20_ietf_xor_ic: typeof crypto_stream_chacha20_ietf_xor_ic;
  crypto_stream_chacha20_keygen: typeof crypto_stream_chacha20_keygen;
  crypto_stream_chacha20_xor: typeof crypto_stream_chacha20_xor;
  crypto_stream_chacha20_xor_ic: typeof crypto_stream_chacha20_xor_ic;
  crypto_stream_keygen: typeof crypto_stream_keygen;
  crypto_stream_xchacha20_keygen: typeof crypto_stream_xchacha20_keygen;
  crypto_stream_xchacha20_xor: typeof crypto_stream_xchacha20_xor;
  crypto_stream_xchacha20_xor_ic: typeof crypto_stream_xchacha20_xor_ic;
  crypto_xof_shake128: typeof crypto_xof_shake128;
  crypto_xof_shake128_init: typeof crypto_xof_shake128_init;
  crypto_xof_shake128_init_with_domain: typeof crypto_xof_shake128_init_with_domain;
  crypto_xof_shake128_squeeze: typeof crypto_xof_shake128_squeeze;
  crypto_xof_shake128_update: typeof crypto_xof_shake128_update;
  crypto_xof_shake256: typeof crypto_xof_shake256;
  crypto_xof_shake256_init: typeof crypto_xof_shake256_init;
  crypto_xof_shake256_init_with_domain: typeof crypto_xof_shake256_init_with_domain;
  crypto_xof_shake256_squeeze: typeof crypto_xof_shake256_squeeze;
  crypto_xof_shake256_update: typeof crypto_xof_shake256_update;
  crypto_xof_turboshake128: typeof crypto_xof_turboshake128;
  crypto_xof_turboshake128_init: typeof crypto_xof_turboshake128_init;
  crypto_xof_turboshake128_init_with_domain: typeof crypto_xof_turboshake128_init_with_domain;
  crypto_xof_turboshake128_squeeze: typeof crypto_xof_turboshake128_squeeze;
  crypto_xof_turboshake128_update: typeof crypto_xof_turboshake128_update;
  crypto_xof_turboshake256: typeof crypto_xof_turboshake256;
  crypto_xof_turboshake256_init: typeof crypto_xof_turboshake256_init;
  crypto_xof_turboshake256_init_with_domain: typeof crypto_xof_turboshake256_init_with_domain;
  crypto_xof_turboshake256_squeeze: typeof crypto_xof_turboshake256_squeeze;
  crypto_xof_turboshake256_update: typeof crypto_xof_turboshake256_update;
  randombytes_buf: typeof randombytes_buf;
  randombytes_buf_deterministic: typeof randombytes_buf_deterministic;
  randombytes_close: typeof randombytes_close;
  randombytes_random: typeof randombytes_random;
  randombytes_set_implementation: typeof randombytes_set_implementation;
  randombytes_stir: typeof randombytes_stir;
  randombytes_uniform: typeof randombytes_uniform;
  sodium_bin2ip: typeof sodium_bin2ip;
  sodium_ip2bin: typeof sodium_ip2bin;
  sodium_version_string: typeof sodium_version_string;
};

export default sodium;
