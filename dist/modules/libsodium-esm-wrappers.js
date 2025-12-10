"use strict";

import initSodiumESM from "./libsodium.esm.js";

const output_format = "uint8array";

export const libsodium = await initSodiumESM();

/* Initialize. */
if (libsodium._sodium_init() !== 0) {
  throw new Error("libsodium was not correctly initialized.");
}

export const SODIUM_LIBRARY_VERSION_MAJOR = libsodium._sodium_library_version_major?.();
export const SODIUM_LIBRARY_VERSION_MINOR = libsodium._sodium_library_version_minor?.();
export const crypto_aead_aegis128l_ABYTES = libsodium._crypto_aead_aegis128l_abytes?.();
export const crypto_aead_aegis128l_KEYBYTES = libsodium._crypto_aead_aegis128l_keybytes?.();
export const crypto_aead_aegis128l_MESSAGEBYTES_MAX = libsodium._crypto_aead_aegis128l_messagebytes_max?.();
export const crypto_aead_aegis128l_NPUBBYTES = libsodium._crypto_aead_aegis128l_npubbytes?.();
export const crypto_aead_aegis128l_NSECBYTES = libsodium._crypto_aead_aegis128l_nsecbytes?.();
export const crypto_aead_aegis256_ABYTES = libsodium._crypto_aead_aegis256_abytes?.();
export const crypto_aead_aegis256_KEYBYTES = libsodium._crypto_aead_aegis256_keybytes?.();
export const crypto_aead_aegis256_MESSAGEBYTES_MAX = libsodium._crypto_aead_aegis256_messagebytes_max?.();
export const crypto_aead_aegis256_NPUBBYTES = libsodium._crypto_aead_aegis256_npubbytes?.();
export const crypto_aead_aegis256_NSECBYTES = libsodium._crypto_aead_aegis256_nsecbytes?.();
export const crypto_aead_aes256gcm_ABYTES = libsodium._crypto_aead_aes256gcm_abytes?.();
export const crypto_aead_aes256gcm_KEYBYTES = libsodium._crypto_aead_aes256gcm_keybytes?.();
export const crypto_aead_aes256gcm_MESSAGEBYTES_MAX = libsodium._crypto_aead_aes256gcm_messagebytes_max?.();
export const crypto_aead_aes256gcm_NPUBBYTES = libsodium._crypto_aead_aes256gcm_npubbytes?.();
export const crypto_aead_aes256gcm_NSECBYTES = libsodium._crypto_aead_aes256gcm_nsecbytes?.();
export const crypto_aead_chacha20poly1305_ABYTES = libsodium._crypto_aead_chacha20poly1305_abytes?.();
export const crypto_aead_chacha20poly1305_IETF_ABYTES = libsodium._crypto_aead_chacha20poly1305_ietf_abytes?.();
export const crypto_aead_chacha20poly1305_IETF_KEYBYTES = libsodium._crypto_aead_chacha20poly1305_ietf_keybytes?.();
export const crypto_aead_chacha20poly1305_IETF_MESSAGEBYTES_MAX = libsodium._crypto_aead_chacha20poly1305_ietf_messagebytes_max?.();
export const crypto_aead_chacha20poly1305_IETF_NPUBBYTES = libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes?.();
export const crypto_aead_chacha20poly1305_IETF_NSECBYTES = libsodium._crypto_aead_chacha20poly1305_ietf_nsecbytes?.();
export const crypto_aead_chacha20poly1305_KEYBYTES = libsodium._crypto_aead_chacha20poly1305_keybytes?.();
export const crypto_aead_chacha20poly1305_MESSAGEBYTES_MAX = libsodium._crypto_aead_chacha20poly1305_messagebytes_max?.();
export const crypto_aead_chacha20poly1305_NPUBBYTES = libsodium._crypto_aead_chacha20poly1305_npubbytes?.();
export const crypto_aead_chacha20poly1305_NSECBYTES = libsodium._crypto_aead_chacha20poly1305_nsecbytes?.();
export const crypto_aead_chacha20poly1305_ietf_ABYTES = libsodium._crypto_aead_chacha20poly1305_ietf_abytes?.();
export const crypto_aead_chacha20poly1305_ietf_KEYBYTES = libsodium._crypto_aead_chacha20poly1305_ietf_keybytes?.();
export const crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX = libsodium._crypto_aead_chacha20poly1305_ietf_messagebytes_max?.();
export const crypto_aead_chacha20poly1305_ietf_NPUBBYTES = libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes?.();
export const crypto_aead_chacha20poly1305_ietf_NSECBYTES = libsodium._crypto_aead_chacha20poly1305_ietf_nsecbytes?.();
export const crypto_aead_xchacha20poly1305_IETF_ABYTES = libsodium._crypto_aead_xchacha20poly1305_ietf_abytes?.();
export const crypto_aead_xchacha20poly1305_IETF_KEYBYTES = libsodium._crypto_aead_xchacha20poly1305_ietf_keybytes?.();
export const crypto_aead_xchacha20poly1305_IETF_MESSAGEBYTES_MAX = libsodium._crypto_aead_xchacha20poly1305_ietf_messagebytes_max?.();
export const crypto_aead_xchacha20poly1305_IETF_NPUBBYTES = libsodium._crypto_aead_xchacha20poly1305_ietf_npubbytes?.();
export const crypto_aead_xchacha20poly1305_IETF_NSECBYTES = libsodium._crypto_aead_xchacha20poly1305_ietf_nsecbytes?.();
export const crypto_aead_xchacha20poly1305_ietf_ABYTES = libsodium._crypto_aead_xchacha20poly1305_ietf_abytes?.();
export const crypto_aead_xchacha20poly1305_ietf_KEYBYTES = libsodium._crypto_aead_xchacha20poly1305_ietf_keybytes?.();
export const crypto_aead_xchacha20poly1305_ietf_MESSAGEBYTES_MAX = libsodium._crypto_aead_xchacha20poly1305_ietf_messagebytes_max?.();
export const crypto_aead_xchacha20poly1305_ietf_NPUBBYTES = libsodium._crypto_aead_xchacha20poly1305_ietf_npubbytes?.();
export const crypto_aead_xchacha20poly1305_ietf_NSECBYTES = libsodium._crypto_aead_xchacha20poly1305_ietf_nsecbytes?.();
export const crypto_auth_BYTES = libsodium._crypto_auth_bytes?.();
export const crypto_auth_KEYBYTES = libsodium._crypto_auth_keybytes?.();
export const crypto_auth_hmacsha256_BYTES = libsodium._crypto_auth_hmacsha256_bytes?.();
export const crypto_auth_hmacsha256_KEYBYTES = libsodium._crypto_auth_hmacsha256_keybytes?.();
export const crypto_auth_hmacsha512256_BYTES = libsodium._crypto_auth_hmacsha512256_bytes?.();
export const crypto_auth_hmacsha512256_KEYBYTES = libsodium._crypto_auth_hmacsha512256_keybytes?.();
export const crypto_auth_hmacsha512_BYTES = libsodium._crypto_auth_hmacsha512_bytes?.();
export const crypto_auth_hmacsha512_KEYBYTES = libsodium._crypto_auth_hmacsha512_keybytes?.();
export const crypto_box_BEFORENMBYTES = libsodium._crypto_box_beforenmbytes?.();
export const crypto_box_MACBYTES = libsodium._crypto_box_macbytes?.();
export const crypto_box_MESSAGEBYTES_MAX = libsodium._crypto_box_messagebytes_max?.();
export const crypto_box_NONCEBYTES = libsodium._crypto_box_noncebytes?.();
export const crypto_box_PUBLICKEYBYTES = libsodium._crypto_box_publickeybytes?.();
export const crypto_box_SEALBYTES = libsodium._crypto_box_sealbytes?.();
export const crypto_box_SECRETKEYBYTES = libsodium._crypto_box_secretkeybytes?.();
export const crypto_box_SEEDBYTES = libsodium._crypto_box_seedbytes?.();
export const crypto_box_curve25519xchacha20poly1305_BEFORENMBYTES = libsodium._crypto_box_curve25519xchacha20poly1305_beforenmbytes?.();
export const crypto_box_curve25519xchacha20poly1305_MACBYTES = libsodium._crypto_box_curve25519xchacha20poly1305_macbytes?.();
export const crypto_box_curve25519xchacha20poly1305_MESSAGEBYTES_MAX = libsodium._crypto_box_curve25519xchacha20poly1305_messagebytes_max?.();
export const crypto_box_curve25519xchacha20poly1305_NONCEBYTES = libsodium._crypto_box_curve25519xchacha20poly1305_noncebytes?.();
export const crypto_box_curve25519xchacha20poly1305_PUBLICKEYBYTES = libsodium._crypto_box_curve25519xchacha20poly1305_publickeybytes?.();
export const crypto_box_curve25519xchacha20poly1305_SEALBYTES = libsodium._crypto_box_curve25519xchacha20poly1305_sealbytes?.();
export const crypto_box_curve25519xchacha20poly1305_SECRETKEYBYTES = libsodium._crypto_box_curve25519xchacha20poly1305_secretkeybytes?.();
export const crypto_box_curve25519xchacha20poly1305_SEEDBYTES = libsodium._crypto_box_curve25519xchacha20poly1305_seedbytes?.();
export const crypto_box_curve25519xsalsa20poly1305_BEFORENMBYTES = libsodium._crypto_box_curve25519xsalsa20poly1305_beforenmbytes?.();
export const crypto_box_curve25519xsalsa20poly1305_MACBYTES = libsodium._crypto_box_curve25519xsalsa20poly1305_macbytes?.();
export const crypto_box_curve25519xsalsa20poly1305_MESSAGEBYTES_MAX = libsodium._crypto_box_curve25519xsalsa20poly1305_messagebytes_max?.();
export const crypto_box_curve25519xsalsa20poly1305_NONCEBYTES = libsodium._crypto_box_curve25519xsalsa20poly1305_noncebytes?.();
export const crypto_box_curve25519xsalsa20poly1305_PUBLICKEYBYTES = libsodium._crypto_box_curve25519xsalsa20poly1305_publickeybytes?.();
export const crypto_box_curve25519xsalsa20poly1305_SECRETKEYBYTES = libsodium._crypto_box_curve25519xsalsa20poly1305_secretkeybytes?.();
export const crypto_box_curve25519xsalsa20poly1305_SEEDBYTES = libsodium._crypto_box_curve25519xsalsa20poly1305_seedbytes?.();
export const crypto_core_ed25519_BYTES = libsodium._crypto_core_ed25519_bytes?.();
export const crypto_core_ed25519_HASHBYTES = libsodium._crypto_core_ed25519_hashbytes?.();
export const crypto_core_ed25519_NONREDUCEDSCALARBYTES = libsodium._crypto_core_ed25519_nonreducedscalarbytes?.();
export const crypto_core_ed25519_SCALARBYTES = libsodium._crypto_core_ed25519_scalarbytes?.();
export const crypto_core_ed25519_UNIFORMBYTES = libsodium._crypto_core_ed25519_uniformbytes?.();
export const crypto_core_hchacha20_CONSTBYTES = libsodium._crypto_core_hchacha20_constbytes?.();
export const crypto_core_hchacha20_INPUTBYTES = libsodium._crypto_core_hchacha20_inputbytes?.();
export const crypto_core_hchacha20_KEYBYTES = libsodium._crypto_core_hchacha20_keybytes?.();
export const crypto_core_hchacha20_OUTPUTBYTES = libsodium._crypto_core_hchacha20_outputbytes?.();
export const crypto_core_hsalsa20_CONSTBYTES = libsodium._crypto_core_hsalsa20_constbytes?.();
export const crypto_core_hsalsa20_INPUTBYTES = libsodium._crypto_core_hsalsa20_inputbytes?.();
export const crypto_core_hsalsa20_KEYBYTES = libsodium._crypto_core_hsalsa20_keybytes?.();
export const crypto_core_hsalsa20_OUTPUTBYTES = libsodium._crypto_core_hsalsa20_outputbytes?.();
export const crypto_core_ristretto255_BYTES = libsodium._crypto_core_ristretto255_bytes?.();
export const crypto_core_ristretto255_HASHBYTES = libsodium._crypto_core_ristretto255_hashbytes?.();
export const crypto_core_ristretto255_NONREDUCEDSCALARBYTES = libsodium._crypto_core_ristretto255_nonreducedscalarbytes?.();
export const crypto_core_ristretto255_SCALARBYTES = libsodium._crypto_core_ristretto255_scalarbytes?.();
export const crypto_core_salsa2012_CONSTBYTES = libsodium._crypto_core_salsa2012_constbytes?.();
export const crypto_core_salsa2012_INPUTBYTES = libsodium._crypto_core_salsa2012_inputbytes?.();
export const crypto_core_salsa2012_KEYBYTES = libsodium._crypto_core_salsa2012_keybytes?.();
export const crypto_core_salsa2012_OUTPUTBYTES = libsodium._crypto_core_salsa2012_outputbytes?.();
export const crypto_core_salsa208_CONSTBYTES = libsodium._crypto_core_salsa208_constbytes?.();
export const crypto_core_salsa208_INPUTBYTES = libsodium._crypto_core_salsa208_inputbytes?.();
export const crypto_core_salsa208_KEYBYTES = libsodium._crypto_core_salsa208_keybytes?.();
export const crypto_core_salsa208_OUTPUTBYTES = libsodium._crypto_core_salsa208_outputbytes?.();
export const crypto_core_salsa20_CONSTBYTES = libsodium._crypto_core_salsa20_constbytes?.();
export const crypto_core_salsa20_INPUTBYTES = libsodium._crypto_core_salsa20_inputbytes?.();
export const crypto_core_salsa20_KEYBYTES = libsodium._crypto_core_salsa20_keybytes?.();
export const crypto_core_salsa20_OUTPUTBYTES = libsodium._crypto_core_salsa20_outputbytes?.();
export const crypto_generichash_BYTES = libsodium._crypto_generichash_bytes?.();
export const crypto_generichash_BYTES_MAX = libsodium._crypto_generichash_bytes_max?.();
export const crypto_generichash_BYTES_MIN = libsodium._crypto_generichash_bytes_min?.();
export const crypto_generichash_KEYBYTES = libsodium._crypto_generichash_keybytes?.();
export const crypto_generichash_KEYBYTES_MAX = libsodium._crypto_generichash_keybytes_max?.();
export const crypto_generichash_KEYBYTES_MIN = libsodium._crypto_generichash_keybytes_min?.();
export const crypto_generichash_blake2b_BYTES = libsodium._crypto_generichash_blake2b_bytes?.();
export const crypto_generichash_blake2b_BYTES_MAX = libsodium._crypto_generichash_blake2b_bytes_max?.();
export const crypto_generichash_blake2b_BYTES_MIN = libsodium._crypto_generichash_blake2b_bytes_min?.();
export const crypto_generichash_blake2b_KEYBYTES = libsodium._crypto_generichash_blake2b_keybytes?.();
export const crypto_generichash_blake2b_KEYBYTES_MAX = libsodium._crypto_generichash_blake2b_keybytes_max?.();
export const crypto_generichash_blake2b_KEYBYTES_MIN = libsodium._crypto_generichash_blake2b_keybytes_min?.();
export const crypto_generichash_blake2b_PERSONALBYTES = libsodium._crypto_generichash_blake2b_personalbytes?.();
export const crypto_generichash_blake2b_SALTBYTES = libsodium._crypto_generichash_blake2b_saltbytes?.();
export const crypto_hash_BYTES = libsodium._crypto_hash_bytes?.();
export const crypto_hash_sha256_BYTES = libsodium._crypto_hash_sha256_bytes?.();
export const crypto_hash_sha512_BYTES = libsodium._crypto_hash_sha512_bytes?.();
export const crypto_kdf_BYTES_MAX = libsodium._crypto_kdf_bytes_max?.();
export const crypto_kdf_BYTES_MIN = libsodium._crypto_kdf_bytes_min?.();
export const crypto_kdf_CONTEXTBYTES = libsodium._crypto_kdf_contextbytes?.();
export const crypto_kdf_KEYBYTES = libsodium._crypto_kdf_keybytes?.();
export const crypto_kdf_blake2b_BYTES_MAX = libsodium._crypto_kdf_blake2b_bytes_max?.();
export const crypto_kdf_blake2b_BYTES_MIN = libsodium._crypto_kdf_blake2b_bytes_min?.();
export const crypto_kdf_blake2b_CONTEXTBYTES = libsodium._crypto_kdf_blake2b_contextbytes?.();
export const crypto_kdf_blake2b_KEYBYTES = libsodium._crypto_kdf_blake2b_keybytes?.();
export const crypto_kdf_hkdf_sha256_BYTES_MAX = libsodium._crypto_kdf_hkdf_sha256_bytes_max?.();
export const crypto_kdf_hkdf_sha256_BYTES_MIN = libsodium._crypto_kdf_hkdf_sha256_bytes_min?.();
export const crypto_kdf_hkdf_sha256_KEYBYTES = libsodium._crypto_kdf_hkdf_sha256_keybytes?.();
export const crypto_kdf_hkdf_sha512_BYTES_MAX = libsodium._crypto_kdf_hkdf_sha512_bytes_max?.();
export const crypto_kdf_hkdf_sha512_BYTES_MIN = libsodium._crypto_kdf_hkdf_sha512_bytes_min?.();
export const crypto_kdf_hkdf_sha512_KEYBYTES = libsodium._crypto_kdf_hkdf_sha512_keybytes?.();
export const crypto_kx_PUBLICKEYBYTES = libsodium._crypto_kx_publickeybytes?.();
export const crypto_kx_SECRETKEYBYTES = libsodium._crypto_kx_secretkeybytes?.();
export const crypto_kx_SEEDBYTES = libsodium._crypto_kx_seedbytes?.();
export const crypto_kx_SESSIONKEYBYTES = libsodium._crypto_kx_sessionkeybytes?.();
export const crypto_onetimeauth_BYTES = libsodium._crypto_onetimeauth_bytes?.();
export const crypto_onetimeauth_KEYBYTES = libsodium._crypto_onetimeauth_keybytes?.();
export const crypto_onetimeauth_poly1305_BYTES = libsodium._crypto_onetimeauth_poly1305_bytes?.();
export const crypto_onetimeauth_poly1305_KEYBYTES = libsodium._crypto_onetimeauth_poly1305_keybytes?.();
export const crypto_pwhash_ALG_ARGON2I13 = libsodium._crypto_pwhash_alg_argon2i13?.();
export const crypto_pwhash_ALG_ARGON2ID13 = libsodium._crypto_pwhash_alg_argon2id13?.();
export const crypto_pwhash_ALG_DEFAULT = libsodium._crypto_pwhash_alg_default?.();
export const crypto_pwhash_BYTES_MAX = libsodium._crypto_pwhash_bytes_max?.();
export const crypto_pwhash_BYTES_MIN = libsodium._crypto_pwhash_bytes_min?.();
export const crypto_pwhash_MEMLIMIT_INTERACTIVE = libsodium._crypto_pwhash_memlimit_interactive?.();
export const crypto_pwhash_MEMLIMIT_MAX = libsodium._crypto_pwhash_memlimit_max?.();
export const crypto_pwhash_MEMLIMIT_MIN = libsodium._crypto_pwhash_memlimit_min?.();
export const crypto_pwhash_MEMLIMIT_MODERATE = libsodium._crypto_pwhash_memlimit_moderate?.();
export const crypto_pwhash_MEMLIMIT_SENSITIVE = libsodium._crypto_pwhash_memlimit_sensitive?.();
export const crypto_pwhash_OPSLIMIT_INTERACTIVE = libsodium._crypto_pwhash_opslimit_interactive?.();
export const crypto_pwhash_OPSLIMIT_MAX = libsodium._crypto_pwhash_opslimit_max?.();
export const crypto_pwhash_OPSLIMIT_MIN = libsodium._crypto_pwhash_opslimit_min?.();
export const crypto_pwhash_OPSLIMIT_MODERATE = libsodium._crypto_pwhash_opslimit_moderate?.();
export const crypto_pwhash_OPSLIMIT_SENSITIVE = libsodium._crypto_pwhash_opslimit_sensitive?.();
export const crypto_pwhash_PASSWD_MAX = libsodium._crypto_pwhash_passwd_max?.();
export const crypto_pwhash_PASSWD_MIN = libsodium._crypto_pwhash_passwd_min?.();
export const crypto_pwhash_SALTBYTES = libsodium._crypto_pwhash_saltbytes?.();
export const crypto_pwhash_STRBYTES = libsodium._crypto_pwhash_strbytes?.();
export const crypto_pwhash_argon2i_BYTES_MAX = libsodium._crypto_pwhash_argon2i_bytes_max?.();
export const crypto_pwhash_argon2i_BYTES_MIN = libsodium._crypto_pwhash_argon2i_bytes_min?.();
export const crypto_pwhash_argon2i_MEMLIMIT_INTERACTIVE = libsodium._crypto_pwhash_argon2i_memlimit_interactive?.();
export const crypto_pwhash_argon2i_MEMLIMIT_MAX = libsodium._crypto_pwhash_argon2i_memlimit_max?.();
export const crypto_pwhash_argon2i_MEMLIMIT_MIN = libsodium._crypto_pwhash_argon2i_memlimit_min?.();
export const crypto_pwhash_argon2i_MEMLIMIT_MODERATE = libsodium._crypto_pwhash_argon2i_memlimit_moderate?.();
export const crypto_pwhash_argon2i_MEMLIMIT_SENSITIVE = libsodium._crypto_pwhash_argon2i_memlimit_sensitive?.();
export const crypto_pwhash_argon2i_OPSLIMIT_INTERACTIVE = libsodium._crypto_pwhash_argon2i_opslimit_interactive?.();
export const crypto_pwhash_argon2i_OPSLIMIT_MAX = libsodium._crypto_pwhash_argon2i_opslimit_max?.();
export const crypto_pwhash_argon2i_OPSLIMIT_MIN = libsodium._crypto_pwhash_argon2i_opslimit_min?.();
export const crypto_pwhash_argon2i_OPSLIMIT_MODERATE = libsodium._crypto_pwhash_argon2i_opslimit_moderate?.();
export const crypto_pwhash_argon2i_OPSLIMIT_SENSITIVE = libsodium._crypto_pwhash_argon2i_opslimit_sensitive?.();
export const crypto_pwhash_argon2i_PASSWD_MAX = libsodium._crypto_pwhash_argon2i_passwd_max?.();
export const crypto_pwhash_argon2i_PASSWD_MIN = libsodium._crypto_pwhash_argon2i_passwd_min?.();
export const crypto_pwhash_argon2i_SALTBYTES = libsodium._crypto_pwhash_argon2i_saltbytes?.();
export const crypto_pwhash_argon2i_STRBYTES = libsodium._crypto_pwhash_argon2i_strbytes?.();
export const crypto_pwhash_argon2id_BYTES_MAX = libsodium._crypto_pwhash_argon2id_bytes_max?.();
export const crypto_pwhash_argon2id_BYTES_MIN = libsodium._crypto_pwhash_argon2id_bytes_min?.();
export const crypto_pwhash_argon2id_MEMLIMIT_INTERACTIVE = libsodium._crypto_pwhash_argon2id_memlimit_interactive?.();
export const crypto_pwhash_argon2id_MEMLIMIT_MAX = libsodium._crypto_pwhash_argon2id_memlimit_max?.();
export const crypto_pwhash_argon2id_MEMLIMIT_MIN = libsodium._crypto_pwhash_argon2id_memlimit_min?.();
export const crypto_pwhash_argon2id_MEMLIMIT_MODERATE = libsodium._crypto_pwhash_argon2id_memlimit_moderate?.();
export const crypto_pwhash_argon2id_MEMLIMIT_SENSITIVE = libsodium._crypto_pwhash_argon2id_memlimit_sensitive?.();
export const crypto_pwhash_argon2id_OPSLIMIT_INTERACTIVE = libsodium._crypto_pwhash_argon2id_opslimit_interactive?.();
export const crypto_pwhash_argon2id_OPSLIMIT_MAX = libsodium._crypto_pwhash_argon2id_opslimit_max?.();
export const crypto_pwhash_argon2id_OPSLIMIT_MIN = libsodium._crypto_pwhash_argon2id_opslimit_min?.();
export const crypto_pwhash_argon2id_OPSLIMIT_MODERATE = libsodium._crypto_pwhash_argon2id_opslimit_moderate?.();
export const crypto_pwhash_argon2id_OPSLIMIT_SENSITIVE = libsodium._crypto_pwhash_argon2id_opslimit_sensitive?.();
export const crypto_pwhash_argon2id_PASSWD_MAX = libsodium._crypto_pwhash_argon2id_passwd_max?.();
export const crypto_pwhash_argon2id_PASSWD_MIN = libsodium._crypto_pwhash_argon2id_passwd_min?.();
export const crypto_pwhash_argon2id_SALTBYTES = libsodium._crypto_pwhash_argon2id_saltbytes?.();
export const crypto_pwhash_argon2id_STRBYTES = libsodium._crypto_pwhash_argon2id_strbytes?.();
export const crypto_pwhash_scryptsalsa208sha256_BYTES_MAX = libsodium._crypto_pwhash_scryptsalsa208sha256_bytes_max?.();
export const crypto_pwhash_scryptsalsa208sha256_BYTES_MIN = libsodium._crypto_pwhash_scryptsalsa208sha256_bytes_min?.();
export const crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_INTERACTIVE = libsodium._crypto_pwhash_scryptsalsa208sha256_memlimit_interactive?.();
export const crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_MAX = libsodium._crypto_pwhash_scryptsalsa208sha256_memlimit_max?.();
export const crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_MIN = libsodium._crypto_pwhash_scryptsalsa208sha256_memlimit_min?.();
export const crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_SENSITIVE = libsodium._crypto_pwhash_scryptsalsa208sha256_memlimit_sensitive?.();
export const crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_INTERACTIVE = libsodium._crypto_pwhash_scryptsalsa208sha256_opslimit_interactive?.();
export const crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_MAX = libsodium._crypto_pwhash_scryptsalsa208sha256_opslimit_max?.();
export const crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_MIN = libsodium._crypto_pwhash_scryptsalsa208sha256_opslimit_min?.();
export const crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_SENSITIVE = libsodium._crypto_pwhash_scryptsalsa208sha256_opslimit_sensitive?.();
export const crypto_pwhash_scryptsalsa208sha256_PASSWD_MAX = libsodium._crypto_pwhash_scryptsalsa208sha256_passwd_max?.();
export const crypto_pwhash_scryptsalsa208sha256_PASSWD_MIN = libsodium._crypto_pwhash_scryptsalsa208sha256_passwd_min?.();
export const crypto_pwhash_scryptsalsa208sha256_SALTBYTES = libsodium._crypto_pwhash_scryptsalsa208sha256_saltbytes?.();
export const crypto_pwhash_scryptsalsa208sha256_STRBYTES = libsodium._crypto_pwhash_scryptsalsa208sha256_strbytes?.();
export const crypto_scalarmult_BYTES = libsodium._crypto_scalarmult_bytes?.();
export const crypto_scalarmult_SCALARBYTES = libsodium._crypto_scalarmult_scalarbytes?.();
export const crypto_scalarmult_curve25519_BYTES = libsodium._crypto_scalarmult_curve25519_bytes?.();
export const crypto_scalarmult_curve25519_SCALARBYTES = libsodium._crypto_scalarmult_curve25519_scalarbytes?.();
export const crypto_scalarmult_ed25519_BYTES = libsodium._crypto_scalarmult_ed25519_bytes?.();
export const crypto_scalarmult_ed25519_SCALARBYTES = libsodium._crypto_scalarmult_ed25519_scalarbytes?.();
export const crypto_scalarmult_ristretto255_BYTES = libsodium._crypto_scalarmult_ristretto255_bytes?.();
export const crypto_scalarmult_ristretto255_SCALARBYTES = libsodium._crypto_scalarmult_ristretto255_scalarbytes?.();
export const crypto_secretbox_KEYBYTES = libsodium._crypto_secretbox_keybytes?.();
export const crypto_secretbox_MACBYTES = libsodium._crypto_secretbox_macbytes?.();
export const crypto_secretbox_MESSAGEBYTES_MAX = libsodium._crypto_secretbox_messagebytes_max?.();
export const crypto_secretbox_NONCEBYTES = libsodium._crypto_secretbox_noncebytes?.();
export const crypto_secretbox_xchacha20poly1305_KEYBYTES = libsodium._crypto_secretbox_xchacha20poly1305_keybytes?.();
export const crypto_secretbox_xchacha20poly1305_MACBYTES = libsodium._crypto_secretbox_xchacha20poly1305_macbytes?.();
export const crypto_secretbox_xchacha20poly1305_MESSAGEBYTES_MAX = libsodium._crypto_secretbox_xchacha20poly1305_messagebytes_max?.();
export const crypto_secretbox_xchacha20poly1305_NONCEBYTES = libsodium._crypto_secretbox_xchacha20poly1305_noncebytes?.();
export const crypto_secretbox_xsalsa20poly1305_KEYBYTES = libsodium._crypto_secretbox_xsalsa20poly1305_keybytes?.();
export const crypto_secretbox_xsalsa20poly1305_MACBYTES = libsodium._crypto_secretbox_xsalsa20poly1305_macbytes?.();
export const crypto_secretbox_xsalsa20poly1305_MESSAGEBYTES_MAX = libsodium._crypto_secretbox_xsalsa20poly1305_messagebytes_max?.();
export const crypto_secretbox_xsalsa20poly1305_NONCEBYTES = libsodium._crypto_secretbox_xsalsa20poly1305_noncebytes?.();
export const crypto_secretstream_xchacha20poly1305_ABYTES = libsodium._crypto_secretstream_xchacha20poly1305_abytes?.();
export const crypto_secretstream_xchacha20poly1305_HEADERBYTES = libsodium._crypto_secretstream_xchacha20poly1305_headerbytes?.();
export const crypto_secretstream_xchacha20poly1305_KEYBYTES = libsodium._crypto_secretstream_xchacha20poly1305_keybytes?.();
export const crypto_secretstream_xchacha20poly1305_MESSAGEBYTES_MAX = libsodium._crypto_secretstream_xchacha20poly1305_messagebytes_max?.();
export const crypto_secretstream_xchacha20poly1305_TAG_FINAL = libsodium._crypto_secretstream_xchacha20poly1305_tag_final?.();
export const crypto_secretstream_xchacha20poly1305_TAG_MESSAGE = libsodium._crypto_secretstream_xchacha20poly1305_tag_message?.();
export const crypto_secretstream_xchacha20poly1305_TAG_PUSH = libsodium._crypto_secretstream_xchacha20poly1305_tag_push?.();
export const crypto_secretstream_xchacha20poly1305_TAG_REKEY = libsodium._crypto_secretstream_xchacha20poly1305_tag_rekey?.();
export const crypto_shorthash_BYTES = libsodium._crypto_shorthash_bytes?.();
export const crypto_shorthash_KEYBYTES = libsodium._crypto_shorthash_keybytes?.();
export const crypto_shorthash_siphash24_BYTES = libsodium._crypto_shorthash_siphash24_bytes?.();
export const crypto_shorthash_siphash24_KEYBYTES = libsodium._crypto_shorthash_siphash24_keybytes?.();
export const crypto_shorthash_siphashx24_BYTES = libsodium._crypto_shorthash_siphashx24_bytes?.();
export const crypto_shorthash_siphashx24_KEYBYTES = libsodium._crypto_shorthash_siphashx24_keybytes?.();
export const crypto_sign_BYTES = libsodium._crypto_sign_bytes?.();
export const crypto_sign_MESSAGEBYTES_MAX = libsodium._crypto_sign_messagebytes_max?.();
export const crypto_sign_PUBLICKEYBYTES = libsodium._crypto_sign_publickeybytes?.();
export const crypto_sign_SECRETKEYBYTES = libsodium._crypto_sign_secretkeybytes?.();
export const crypto_sign_SEEDBYTES = libsodium._crypto_sign_seedbytes?.();
export const crypto_sign_ed25519_BYTES = libsodium._crypto_sign_ed25519_bytes?.();
export const crypto_sign_ed25519_MESSAGEBYTES_MAX = libsodium._crypto_sign_ed25519_messagebytes_max?.();
export const crypto_sign_ed25519_PUBLICKEYBYTES = libsodium._crypto_sign_ed25519_publickeybytes?.();
export const crypto_sign_ed25519_SECRETKEYBYTES = libsodium._crypto_sign_ed25519_secretkeybytes?.();
export const crypto_sign_ed25519_SEEDBYTES = libsodium._crypto_sign_ed25519_seedbytes?.();
export const crypto_stream_KEYBYTES = libsodium._crypto_stream_keybytes?.();
export const crypto_stream_MESSAGEBYTES_MAX = libsodium._crypto_stream_messagebytes_max?.();
export const crypto_stream_NONCEBYTES = libsodium._crypto_stream_noncebytes?.();
export const crypto_stream_chacha20_IETF_KEYBYTES = libsodium._crypto_stream_chacha20_ietf_keybytes?.();
export const crypto_stream_chacha20_IETF_MESSAGEBYTES_MAX = libsodium._crypto_stream_chacha20_ietf_messagebytes_max?.();
export const crypto_stream_chacha20_IETF_NONCEBYTES = libsodium._crypto_stream_chacha20_ietf_noncebytes?.();
export const crypto_stream_chacha20_KEYBYTES = libsodium._crypto_stream_chacha20_keybytes?.();
export const crypto_stream_chacha20_MESSAGEBYTES_MAX = libsodium._crypto_stream_chacha20_messagebytes_max?.();
export const crypto_stream_chacha20_NONCEBYTES = libsodium._crypto_stream_chacha20_noncebytes?.();
export const crypto_stream_chacha20_ietf_KEYBYTES = libsodium._crypto_stream_chacha20_ietf_keybytes?.();
export const crypto_stream_chacha20_ietf_MESSAGEBYTES_MAX = libsodium._crypto_stream_chacha20_ietf_messagebytes_max?.();
export const crypto_stream_chacha20_ietf_NONCEBYTES = libsodium._crypto_stream_chacha20_ietf_noncebytes?.();
export const crypto_stream_salsa2012_KEYBYTES = libsodium._crypto_stream_salsa2012_keybytes?.();
export const crypto_stream_salsa2012_MESSAGEBYTES_MAX = libsodium._crypto_stream_salsa2012_messagebytes_max?.();
export const crypto_stream_salsa2012_NONCEBYTES = libsodium._crypto_stream_salsa2012_noncebytes?.();
export const crypto_stream_salsa208_KEYBYTES = libsodium._crypto_stream_salsa208_keybytes?.();
export const crypto_stream_salsa208_MESSAGEBYTES_MAX = libsodium._crypto_stream_salsa208_messagebytes_max?.();
export const crypto_stream_salsa208_NONCEBYTES = libsodium._crypto_stream_salsa208_noncebytes?.();
export const crypto_stream_salsa20_KEYBYTES = libsodium._crypto_stream_salsa20_keybytes?.();
export const crypto_stream_salsa20_MESSAGEBYTES_MAX = libsodium._crypto_stream_salsa20_messagebytes_max?.();
export const crypto_stream_salsa20_NONCEBYTES = libsodium._crypto_stream_salsa20_noncebytes?.();
export const crypto_stream_xchacha20_KEYBYTES = libsodium._crypto_stream_xchacha20_keybytes?.();
export const crypto_stream_xchacha20_MESSAGEBYTES_MAX = libsodium._crypto_stream_xchacha20_messagebytes_max?.();
export const crypto_stream_xchacha20_NONCEBYTES = libsodium._crypto_stream_xchacha20_noncebytes?.();
export const crypto_stream_xsalsa20_KEYBYTES = libsodium._crypto_stream_xsalsa20_keybytes?.();
export const crypto_stream_xsalsa20_MESSAGEBYTES_MAX = libsodium._crypto_stream_xsalsa20_messagebytes_max?.();
export const crypto_stream_xsalsa20_NONCEBYTES = libsodium._crypto_stream_xsalsa20_noncebytes?.();
export const crypto_verify_16_BYTES = libsodium._crypto_verify_16_bytes?.();
export const crypto_verify_32_BYTES = libsodium._crypto_verify_32_bytes?.();
export const crypto_verify_64_BYTES = libsodium._crypto_verify_64_bytes?.();
export const SODIUM_VERSION_STRING = libsodium.UTF8ToString(libsodium._sodium_version_string?.());
export const crypto_pwhash_STRPREFIX = libsodium.UTF8ToString(libsodium._crypto_pwhash_strprefix?.());
export const crypto_pwhash_argon2i_STRPREFIX = libsodium.UTF8ToString(libsodium._crypto_pwhash_argon2i_strprefix?.());
export const crypto_pwhash_argon2id_STRPREFIX = libsodium.UTF8ToString(libsodium._crypto_pwhash_argon2id_strprefix?.());
export const crypto_pwhash_scryptsalsa208sha256_STRPREFIX = libsodium.UTF8ToString(libsodium._crypto_pwhash_scryptsalsa208sha256_strprefix?.());


// List of functions and constants defined in the wrapped libsodium
export function symbols() {
  return Object.keys(exports).sort();
}

export function increment(bytes) {
  if (!(bytes instanceof Uint8Array)) {
    throw new TypeError("Only Uint8Array instances can be incremented");
  }
  var c = 1 << 8;
  for (var i = 0 | 0, j = bytes.length; i < j; i++) {
    c >>= 8;
    c += bytes[i];
    bytes[i] = c & 0xff;
  }
}

export function add(a, b) {
  if (!(a instanceof Uint8Array) || !(b instanceof Uint8Array)) {
    throw new TypeError("Only Uint8Array instances can added");
  }
  var j = a.length,
    c = 0 | 0,
    i = 0 | 0;
  if (b.length != a.length) {
    throw new TypeError("Arguments must have the same length");
  }
  for (i = 0; i < j; i++) {
    c >>= 8;
    c += a[i] + b[i];
    a[i] = c & 0xff;
  }
}

export function is_zero(bytes) {
  if (!(bytes instanceof Uint8Array)) {
    throw new TypeError("Only Uint8Array instances can be checked");
  }
  var d = 0 | 0;
  for (var i = 0 | 0, j = bytes.length; i < j; i++) {
    d |= bytes[i];
  }
  return d === 0;
}

export function memzero(bytes) {
  if (!(bytes instanceof Uint8Array)) {
    throw new TypeError("Only Uint8Array instances can be wiped");
  }
  for (var i = 0 | 0, j = bytes.length; i < j; i++) {
    bytes[i] = 0;
  }
}

export function memcmp(b1, b2) {
  if (!(b1 instanceof Uint8Array && b2 instanceof Uint8Array)) {
    throw new TypeError("Only Uint8Array instances can be compared");
  }
  if (b1.length !== b2.length) {
    throw new TypeError(
      "Only instances of identical length can be compared"
    );
  }
  for (var d = 0 | 0, i = 0 | 0, j = b1.length; i < j; i++) {
    d |= b1[i] ^ b2[i];
  }
  return d === 0;
}

export function compare(b1, b2) {
  if (!(b1 instanceof Uint8Array && b2 instanceof Uint8Array)) {
    throw new TypeError("Only Uint8Array instances can be compared");
  }
  if (b1.length !== b2.length) {
    throw new TypeError(
      "Only instances of identical length can be compared"
    );
  }
  for (var gt = 0 | 0, eq = 1 | 1, i = b1.length; i-- > 0;) {
    gt |= ((b2[i] - b1[i]) >> 8) & eq;
    eq &= ((b2[i] ^ b1[i]) - 1) >> 8;
  }
  return gt + gt + eq - 1;
}

export function pad(buf, blocksize) {
  if (!(buf instanceof Uint8Array)) {
    throw new TypeError("buffer must be a Uint8Array");
  }
  blocksize |= 0;
  if (blocksize <= 0) {
    throw new Error("block size must be > 0");
  }
  var address_pool = [],
    padded,
    padded_buflen_p = _malloc(4),
    st = 1 | 0,
    i = 0 | 0,
    k = buf.length | 0,
    bufx = new AllocatedBuf(k + blocksize);
  address_pool.push(padded_buflen_p);
  address_pool.push(bufx.address);
  for (
    var j = bufx.address, jmax = bufx.address + k + blocksize; j < jmax; j++
  ) {
    libsodium.HEAPU8[j] = buf[i];
    k -= st;
    st = ~(((((k >>> 48) | (k >>> 32) | (k >>> 16) | k) & 0xffff) - 1) >> 16) &
      1;
    i += st;
  }
  if (
    libsodium._sodium_pad(
      padded_buflen_p,
      bufx.address,
      buf.length,
      blocksize,
      bufx.length
    ) !== 0
  ) {
    _free_and_throw_error(address_pool, "internal error");
  }
  bufx.length = libsodium.getValue(padded_buflen_p, "i32");
  padded = bufx.to_Uint8Array();
  _free_all(address_pool);
  return padded;
}

export function unpad(buf, blocksize) {
  if (!(buf instanceof Uint8Array)) {
    throw new TypeError("buffer must be a Uint8Array");
  }
  blocksize |= 0;
  if (blocksize <= 0) {
    throw new Error("block size must be > 0");
  }
  var address_pool = [],
    unpadded_address = _to_allocated_buf_address(buf),
    unpadded_buflen_p = _malloc(4);
  address_pool.push(unpadded_address);
  address_pool.push(unpadded_buflen_p);
  if (
    libsodium._sodium_unpad(
      unpadded_buflen_p,
      unpadded_address,
      buf.length,
      blocksize
    ) !== 0
  ) {
    _free_and_throw_error(address_pool, "unsupported/invalid padding");
  }
  buf = new Uint8Array(buf);
  buf = buf.subarray(0, libsodium.getValue(unpadded_buflen_p, "i32"));
  _free_all(address_pool);
  return buf;
}

//---------------------------------------------------------------------------
// Codecs
//
export function from_string(str) {
  if (typeof TextEncoder === "function") {
    return new TextEncoder().encode(str);
  }
  str = unescape(encodeURIComponent(str));
  var bytes = new Uint8Array(str.length);
  for (var i = 0, j = str.length; i < j; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}

export function to_string(bytes) {
  if (typeof TextDecoder === "function") {
    return new TextDecoder("utf-8", {
      fatal: true
    }).decode(bytes);
  }

  var toStringChunkSize = 8192,
    numChunks = Math.ceil(bytes.length / toStringChunkSize);
  if (numChunks <= 1) {
    try {
      return decodeURIComponent(
        escape(String.fromCharCode.apply(null, bytes))
      );
    } catch (_) {
      throw new TypeError("The encoded data was not valid.");
    }
  }
  var totalString = "";
  var sequenceReadOffset = 0;
  for (var i = 0; i < numChunks; i++) {
    var currentChunk = Array.prototype.slice.call(
      bytes,
      i * toStringChunkSize + sequenceReadOffset,
      (i + 1) * toStringChunkSize + sequenceReadOffset
    );
    //Depending on how much we have shifted
    if (currentChunk.length == 0) {
      continue;
    }

    //Checking that we didn't cut the buffer in the middle of a UTF8 sequence.
    //If we did, remove the bytes of the "cut" sequence and
    //decrement sequenceReadOffset for each removed byte
    var sequenceDetectionComplete,
      sequenceIndex = currentChunk.length,
      sequenceLength = 0;

    //This loop will read the chunk from its end, looking for sequence start bytes
    do {
      sequenceIndex--;
      var currentByte = currentChunk[sequenceIndex];

      if (currentByte >= 240) {
        //Beginning of a 4-byte UTF-8 sequence
        sequenceLength = 4;
        sequenceDetectionComplete = true;
      } else if (currentByte >= 224) {
        //Beginning of a 3-byte UTF-8 sequence
        sequenceLength = 3;
        sequenceDetectionComplete = true;
      } else if (currentByte >= 192) {
        //Beginning of a 2-byte UTF-8 sequence
        sequenceLength = 2;
        sequenceDetectionComplete = true;
      } else if (currentByte < 128) {
        //A one byte UTF-8 char
        sequenceLength = 1;
        sequenceDetectionComplete = true;
      }
      //The values between [128, 192[ are part of a UTF-8 sequence.
      //The loop will not exit in that case, and will iterate one byte backwards instead
    } while (!sequenceDetectionComplete);

    var extraBytes = sequenceLength - (currentChunk.length - sequenceIndex);
    for (var j = 0; j < extraBytes; j++) {
      sequenceReadOffset--;
      currentChunk.pop();
    }

    totalString += to_string(currentChunk);
  }
  return totalString;
}

export function from_hex(input) {
  var address_pool = [],
    input = _any_to_Uint8Array(address_pool, input, "input"),
    result = new AllocatedBuf(input.length / 2),
    result_str,
    input_address = _to_allocated_buf_address(input),
    hex_end_p = _malloc(4),
    hex_end;
  address_pool.push(input_address);
  address_pool.push(result.address);
  address_pool.push(result.hex_end_p);
  if (
    libsodium._sodium_hex2bin(
      result.address,
      result.length,
      input_address,
      input.length,
      0,
      0,
      hex_end_p
    ) !== 0
  ) {
    _free_and_throw_error(address_pool, "invalid input");
  }
  hex_end = libsodium.getValue(hex_end_p, "i32");
  if (hex_end - input_address !== input.length) {
    _free_and_throw_error(address_pool, "incomplete input");
  }
  result_str = result.to_Uint8Array();
  _free_all(address_pool);
  return result_str;
}

export function to_hex(input) {
  input = _any_to_Uint8Array(null, input, "input");
  var str = "",
    b,
    c,
    x;
  for (var i = 0; i < input.length; i++) {
    c = input[i] & 0xf;
    b = input[i] >>> 4;
    x =
      ((87 + c + (((c - 10) >> 8) & ~38)) << 8) |
      (87 + b + (((b - 10) >> 8) & ~38));
    str += String.fromCharCode(x & 0xff) + String.fromCharCode(x >>> 8);
  }
  return str;
}

var base64_variants = {
  ORIGINAL: 1 | 0,
  ORIGINAL_NO_PADDING: 3 | 0,
  URLSAFE: 5 | 0,
  URLSAFE_NO_PADDING: 7 | 0
};

export function check_base64_variant(variant) {
  if (variant == undefined) {
    return base64_variants.URLSAFE_NO_PADDING;
  }
  if (
    variant !== base64_variants.ORIGINAL &&
    variant !== base64_variants.ORIGINAL_NO_PADDING &&
    variant !== base64_variants.URLSAFE &&
    variant != base64_variants.URLSAFE_NO_PADDING
  ) {
    throw new Error("unsupported base64 variant");
  }
  return variant;
}

export function from_base64(input, variant) {
  variant = check_base64_variant(variant);
  var address_pool = [],
    input = _any_to_Uint8Array(address_pool, input, "input"),
    result = new AllocatedBuf(input.length * 3 / 4),
    result_bin,
    input_address = _to_allocated_buf_address(input),
    result_bin_len_p = _malloc(4),
    b64_end_p = _malloc(4),
    b64_end;
  address_pool.push(input_address);
  address_pool.push(result.address);
  address_pool.push(result.result_bin_len_p);
  address_pool.push(result.b64_end_p);
  if (
    libsodium._sodium_base642bin(
      result.address,
      result.length,
      input_address,
      input.length,
      0,
      result_bin_len_p,
      b64_end_p,
      variant
    ) !== 0
  ) {
    _free_and_throw_error(address_pool, "invalid input");
  }
  b64_end = libsodium.getValue(b64_end_p, "i32");
  if (b64_end - input_address !== input.length) {
    _free_and_throw_error(address_pool, "incomplete input");
  }
  result.length = libsodium.getValue(result_bin_len_p, "i32");
  result_bin = result.to_Uint8Array();
  _free_all(address_pool);
  return result_bin;
}

export function to_base64(input, variant) {
  variant = check_base64_variant(variant);
  input = _any_to_Uint8Array(address_pool, input, "input");
  var address_pool = [],
    nibbles = Math.floor(input.length / 3) | 0,
    remainder = input.length - 3 * nibbles,
    b64_len =
      nibbles * 4 +
      (remainder !== 0 ?
        (variant & 2) === 0 ? 4 : 2 + (remainder >>> 1) :
        0),
    result = new AllocatedBuf(b64_len + 1),
    result_b64,
    input_address = _to_allocated_buf_address(input);
  address_pool.push(input_address);
  address_pool.push(result.address);
  if (
    libsodium._sodium_bin2base64(
      result.address,
      result.length,
      input_address,
      input.length,
      variant
    ) === 0
  ) {
    _free_and_throw_error(address_pool, "conversion failed");
  }
  result.length = b64_len;
  result_b64 = to_string(result.to_Uint8Array());
  _free_all(address_pool);
  return result_b64;
}

export function output_formats() {
  return ["uint8array", "text", "hex", "base64"];
}

export function _format_output(output, optionalOutputFormat) {
  var selectedOutputFormat = optionalOutputFormat || output_format;
  if (!_is_output_format(selectedOutputFormat)) {
    throw new Error(
      selectedOutputFormat + " output format is not available"
    );
  }
  if (output instanceof AllocatedBuf) {
    if (selectedOutputFormat === "uint8array") {
      return output.to_Uint8Array();
    } else if (selectedOutputFormat === "text") {
      return to_string(output.to_Uint8Array());
    } else if (selectedOutputFormat === "hex") {
      return to_hex(output.to_Uint8Array());
    } else if (selectedOutputFormat === "base64") {
      return to_base64(
        output.to_Uint8Array(),
        base64_variants.URLSAFE_NO_PADDING
      );
    } else {
      throw new Error(
        'What is output format "' + selectedOutputFormat + '"?'
      );
    }
  } else if (typeof output === "object") {
    // Composed output. Example: key pairs
    var props = Object.keys(output);
    var formattedOutput = {};
    for (var i = 0; i < props.length; i++) {
      formattedOutput[props[i]] = _format_output(
        output[props[i]],
        selectedOutputFormat
      );
    }
    return formattedOutput;
  } else if (typeof output === "string") {
    return output;
  } else {
    throw new TypeError("Cannot format output");
  }
}

export function _is_output_format(format) {
  var formats = output_formats();
  for (var i = 0; i < formats.length; i++) {
    if (formats[i] === format) {
      return true;
    }
  }
  return false;
}

export function _check_output_format(format) {
  if (!format) {
    return;
  } else if (typeof format !== "string") {
    throw new TypeError("When defined, the output format must be a string");
  } else if (!_is_output_format(format)) {
    throw new Error(format + " is not a supported output format");
  }
}

//---------------------------------------------------------------------------
// Memory management
//
// AllocatedBuf: address allocated using _malloc() + length
export function AllocatedBuf(length) {
  this.length = length;
  this.address = _malloc(length);
}

// Copy the content of a AllocatedBuf (_malloc()'d memory) into a Uint8Array
AllocatedBuf.prototype.to_Uint8Array = function() {
  var result = new Uint8Array(this.length);
  result.set(
    libsodium.HEAPU8.subarray(this.address, this.address + this.length)
  );
  return result;
};

// _malloc() a region and initialize it with the content of a Uint8Array
export function _to_allocated_buf_address(bytes) {
  var address = _malloc(bytes.length);
  libsodium.HEAPU8.set(bytes, address);
  return address;
}

export function _malloc(length) {
  var result = libsodium._malloc(length);
  if (result === 0) {
    throw {
      message: "_malloc() failed",
      length: length
    };
  }
  return result;
}

export function _free(address) {
  libsodium._free(address);
}

export function _free_all(addresses) {
  if (addresses) {
    for (var i = 0; i < addresses.length; i++) {
      _free(addresses[i]);
    }
  }
}

export function _free_and_throw_error(address_pool, err) {
  _free_all(address_pool);
  throw new Error(err);
}

export function _free_and_throw_type_error(address_pool, err) {
  _free_all(address_pool);
  throw new TypeError(err);
}

export function _require_defined(address_pool, varValue, varName) {
  if (varValue == undefined) {
    _free_and_throw_type_error(
      address_pool,
      varName + " cannot be null or undefined"
    );
  }
}

export function _any_to_Uint8Array(address_pool, varValue, varName) {
  _require_defined(address_pool, varValue, varName);
  if (varValue instanceof Uint8Array) {
    return varValue;
  } else if (typeof varValue === "string") {
    return from_string(varValue);
  }
  _free_and_throw_type_error(
    address_pool,
    "unsupported input type for " + varName
  );
}


export function crypto_aead_aegis128l_decrypt(secret_nonce, ciphertext, additional_data, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: ciphertext (minsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address, ciphertext_min_length = libsodium._crypto_aead_aegis128l_abytes(), ciphertext_length = ciphertext.length;
  if (ciphertext_length < ciphertext_min_length) {
          _free_and_throw_type_error(address_pool, "ciphertext is too short");
  }
  ciphertext_address = _to_allocated_buf_address(ciphertext);
  address_pool.push(ciphertext_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_aegis128l_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_aegis128l_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output message (buf)

  var message_length = (ciphertext_length - libsodium._crypto_aead_aegis128l_abytes()) | 0,
      message = new AllocatedBuf(message_length),
      message_address = message.address;

  address_pool.push(message_address);

  if ((libsodium._crypto_aead_aegis128l_decrypt(message_address, null, secret_nonce_address, ciphertext_address, ciphertext_length, 0, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output(message, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "ciphertext cannot be decrypted using that key");
}

export function crypto_aead_aegis128l_decrypt_detached(secret_nonce, ciphertext, mac, additional_data, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: ciphertext (unsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address = _to_allocated_buf_address(ciphertext),
      ciphertext_length = ciphertext.length;
  address_pool.push(ciphertext_address);

  // ---------- input: mac (buf)

  mac = _any_to_Uint8Array(address_pool, mac, "mac");
  var mac_address, mac_length = (libsodium._crypto_box_macbytes()) | 0;
  if (mac.length !== mac_length) {
      _free_and_throw_type_error(address_pool, "invalid mac length");
  }
  mac_address = _to_allocated_buf_address(mac);
  address_pool.push(mac_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_aegis128l_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_aegis128l_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output message (buf)

  var message_length = (ciphertext_length) | 0,
      message = new AllocatedBuf(message_length),
      message_address = message.address;

  address_pool.push(message_address);

  if ((libsodium._crypto_aead_aegis128l_decrypt_detached(message_address, secret_nonce_address, ciphertext_address, ciphertext_length, 0, mac_address, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output(message, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "ciphertext cannot be decrypted using that key");
}

export function crypto_aead_aegis128l_encrypt(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_aegis128l_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_aegis128l_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output ciphertext (buf)

  var ciphertext_length = (message_length + libsodium._crypto_aead_aegis128l_abytes()) | 0,
      ciphertext = new AllocatedBuf(ciphertext_length),
      ciphertext_address = ciphertext.address;

  address_pool.push(ciphertext_address);

  if ((libsodium._crypto_aead_aegis128l_encrypt(ciphertext_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output(ciphertext, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_aead_aegis128l_encrypt_detached(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_aegis128l_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_aegis128l_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output ciphertext (buf)

  var ciphertext_length = (message_length) | 0,
      ciphertext = new AllocatedBuf(ciphertext_length),
      ciphertext_address = ciphertext.address;

  address_pool.push(ciphertext_address);

  // ---------- output mac (buf)

  var mac_length = (libsodium._crypto_aead_aegis128l_abytes()) | 0,
      mac = new AllocatedBuf(mac_length),
      mac_address = mac.address;

  address_pool.push(mac_address);

  if ((libsodium._crypto_aead_aegis128l_encrypt_detached(ciphertext_address, mac_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_aead_aegis128l_keygen(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output output (buf)

  var output_length = (libsodium._crypto_aead_aegis128l_keybytes()) | 0,
      output = new AllocatedBuf(output_length),
      output_address = output.address;

  address_pool.push(output_address);

  libsodium._crypto_aead_aegis128l_keygen(output_address);
  var ret = (_format_output(output, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_aead_aegis256_decrypt(secret_nonce, ciphertext, additional_data, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: ciphertext (minsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address, ciphertext_min_length = libsodium._crypto_aead_aegis256_abytes(), ciphertext_length = ciphertext.length;
  if (ciphertext_length < ciphertext_min_length) {
          _free_and_throw_type_error(address_pool, "ciphertext is too short");
  }
  ciphertext_address = _to_allocated_buf_address(ciphertext);
  address_pool.push(ciphertext_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_aegis256_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_aegis256_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output message (buf)

  var message_length = (ciphertext_length - libsodium._crypto_aead_aegis256_abytes()) | 0,
      message = new AllocatedBuf(message_length),
      message_address = message.address;

  address_pool.push(message_address);

  if ((libsodium._crypto_aead_aegis256_decrypt(message_address, null, secret_nonce_address, ciphertext_address, ciphertext_length, 0, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output(message, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "ciphertext cannot be decrypted using that key");
}

export function crypto_aead_aegis256_decrypt_detached(secret_nonce, ciphertext, mac, additional_data, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: ciphertext (unsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address = _to_allocated_buf_address(ciphertext),
      ciphertext_length = ciphertext.length;
  address_pool.push(ciphertext_address);

  // ---------- input: mac (buf)

  mac = _any_to_Uint8Array(address_pool, mac, "mac");
  var mac_address, mac_length = (libsodium._crypto_box_macbytes()) | 0;
  if (mac.length !== mac_length) {
      _free_and_throw_type_error(address_pool, "invalid mac length");
  }
  mac_address = _to_allocated_buf_address(mac);
  address_pool.push(mac_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_aegis256_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_aegis256_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output message (buf)

  var message_length = (ciphertext_length) | 0,
      message = new AllocatedBuf(message_length),
      message_address = message.address;

  address_pool.push(message_address);

  if ((libsodium._crypto_aead_aegis256_decrypt_detached(message_address, secret_nonce_address, ciphertext_address, ciphertext_length, 0, mac_address, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output(message, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "ciphertext cannot be decrypted using that key");
}

export function crypto_aead_aegis256_encrypt(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_aegis256_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_aegis256_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output ciphertext (buf)

  var ciphertext_length = (message_length + libsodium._crypto_aead_aegis256_abytes()) | 0,
      ciphertext = new AllocatedBuf(ciphertext_length),
      ciphertext_address = ciphertext.address;

  address_pool.push(ciphertext_address);

  if ((libsodium._crypto_aead_aegis256_encrypt(ciphertext_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output(ciphertext, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_aead_aegis256_encrypt_detached(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_aegis256_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_aegis256_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output ciphertext (buf)

  var ciphertext_length = (message_length) | 0,
      ciphertext = new AllocatedBuf(ciphertext_length),
      ciphertext_address = ciphertext.address;

  address_pool.push(ciphertext_address);

  // ---------- output mac (buf)

  var mac_length = (libsodium._crypto_aead_aegis256_abytes()) | 0,
      mac = new AllocatedBuf(mac_length),
      mac_address = mac.address;

  address_pool.push(mac_address);

  if ((libsodium._crypto_aead_aegis256_encrypt_detached(ciphertext_address, mac_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_aead_aegis256_keygen(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output output (buf)

  var output_length = (libsodium._crypto_aead_aegis256_keybytes()) | 0,
      output = new AllocatedBuf(output_length),
      output_address = output.address;

  address_pool.push(output_address);

  libsodium._crypto_aead_aegis256_keygen(output_address);
  var ret = (_format_output(output, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_aead_chacha20poly1305_decrypt(secret_nonce, ciphertext, additional_data, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: ciphertext (minsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address, ciphertext_min_length = libsodium._crypto_aead_chacha20poly1305_abytes(), ciphertext_length = ciphertext.length;
  if (ciphertext_length < ciphertext_min_length) {
          _free_and_throw_type_error(address_pool, "ciphertext is too short");
  }
  ciphertext_address = _to_allocated_buf_address(ciphertext);
  address_pool.push(ciphertext_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output message (buf)

  var message_length = (ciphertext_length - libsodium._crypto_aead_chacha20poly1305_abytes()) | 0,
      message = new AllocatedBuf(message_length),
      message_address = message.address;

  address_pool.push(message_address);

  if ((libsodium._crypto_aead_chacha20poly1305_decrypt(message_address, null, secret_nonce_address, ciphertext_address, ciphertext_length, 0, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output(message, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "ciphertext cannot be decrypted using that key");
}

export function crypto_aead_chacha20poly1305_decrypt_detached(secret_nonce, ciphertext, mac, additional_data, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: ciphertext (unsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address = _to_allocated_buf_address(ciphertext),
      ciphertext_length = ciphertext.length;
  address_pool.push(ciphertext_address);

  // ---------- input: mac (buf)

  mac = _any_to_Uint8Array(address_pool, mac, "mac");
  var mac_address, mac_length = (libsodium._crypto_box_macbytes()) | 0;
  if (mac.length !== mac_length) {
      _free_and_throw_type_error(address_pool, "invalid mac length");
  }
  mac_address = _to_allocated_buf_address(mac);
  address_pool.push(mac_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output message (buf)

  var message_length = (ciphertext_length) | 0,
      message = new AllocatedBuf(message_length),
      message_address = message.address;

  address_pool.push(message_address);

  if ((libsodium._crypto_aead_chacha20poly1305_decrypt_detached(message_address, secret_nonce_address, ciphertext_address, ciphertext_length, 0, mac_address, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output(message, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "ciphertext cannot be decrypted using that key");
}

export function crypto_aead_chacha20poly1305_encrypt(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output ciphertext (buf)

  var ciphertext_length = (message_length + libsodium._crypto_aead_chacha20poly1305_abytes()) | 0,
      ciphertext = new AllocatedBuf(ciphertext_length),
      ciphertext_address = ciphertext.address;

  address_pool.push(ciphertext_address);

  if ((libsodium._crypto_aead_chacha20poly1305_encrypt(ciphertext_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output(ciphertext, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_aead_chacha20poly1305_encrypt_detached(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output ciphertext (buf)

  var ciphertext_length = (message_length) | 0,
      ciphertext = new AllocatedBuf(ciphertext_length),
      ciphertext_address = ciphertext.address;

  address_pool.push(ciphertext_address);

  // ---------- output mac (buf)

  var mac_length = (libsodium._crypto_aead_chacha20poly1305_abytes()) | 0,
      mac = new AllocatedBuf(mac_length),
      mac_address = mac.address;

  address_pool.push(mac_address);

  if ((libsodium._crypto_aead_chacha20poly1305_encrypt_detached(ciphertext_address, mac_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_aead_chacha20poly1305_ietf_decrypt(secret_nonce, ciphertext, additional_data, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: ciphertext (minsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address, ciphertext_min_length = libsodium._crypto_aead_chacha20poly1305_ietf_abytes(), ciphertext_length = ciphertext.length;
  if (ciphertext_length < ciphertext_min_length) {
          _free_and_throw_type_error(address_pool, "ciphertext is too short");
  }
  ciphertext_address = _to_allocated_buf_address(ciphertext);
  address_pool.push(ciphertext_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output message (buf)

  var message_length = (ciphertext_length - libsodium._crypto_aead_chacha20poly1305_ietf_abytes()) | 0,
      message = new AllocatedBuf(message_length),
      message_address = message.address;

  address_pool.push(message_address);

  if ((libsodium._crypto_aead_chacha20poly1305_ietf_decrypt(message_address, null, secret_nonce_address, ciphertext_address, ciphertext_length, 0, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output(message, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "ciphertext cannot be decrypted using that key");
}

export function crypto_aead_chacha20poly1305_ietf_decrypt_detached(secret_nonce, ciphertext, mac, additional_data, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: ciphertext (unsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address = _to_allocated_buf_address(ciphertext),
      ciphertext_length = ciphertext.length;
  address_pool.push(ciphertext_address);

  // ---------- input: mac (buf)

  mac = _any_to_Uint8Array(address_pool, mac, "mac");
  var mac_address, mac_length = (libsodium._crypto_box_macbytes()) | 0;
  if (mac.length !== mac_length) {
      _free_and_throw_type_error(address_pool, "invalid mac length");
  }
  mac_address = _to_allocated_buf_address(mac);
  address_pool.push(mac_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output message (buf)

  var message_length = (ciphertext_length) | 0,
      message = new AllocatedBuf(message_length),
      message_address = message.address;

  address_pool.push(message_address);

  if ((libsodium._crypto_aead_chacha20poly1305_ietf_decrypt_detached(message_address, secret_nonce_address, ciphertext_address, ciphertext_length, 0, mac_address, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output(message, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "ciphertext cannot be decrypted using that key");
}

export function crypto_aead_chacha20poly1305_ietf_encrypt(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output ciphertext (buf)

  var ciphertext_length = (message_length + libsodium._crypto_aead_chacha20poly1305_ietf_abytes()) | 0,
      ciphertext = new AllocatedBuf(ciphertext_length),
      ciphertext_address = ciphertext.address;

  address_pool.push(ciphertext_address);

  if ((libsodium._crypto_aead_chacha20poly1305_ietf_encrypt(ciphertext_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output(ciphertext, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_aead_chacha20poly1305_ietf_encrypt_detached(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output ciphertext (buf)

  var ciphertext_length = (message_length) | 0,
      ciphertext = new AllocatedBuf(ciphertext_length),
      ciphertext_address = ciphertext.address;

  address_pool.push(ciphertext_address);

  // ---------- output mac (buf)

  var mac_length = (libsodium._crypto_aead_chacha20poly1305_ietf_abytes()) | 0,
      mac = new AllocatedBuf(mac_length),
      mac_address = mac.address;

  address_pool.push(mac_address);

  if ((libsodium._crypto_aead_chacha20poly1305_ietf_encrypt_detached(ciphertext_address, mac_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_aead_chacha20poly1305_ietf_keygen(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output output (buf)

  var output_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0,
      output = new AllocatedBuf(output_length),
      output_address = output.address;

  address_pool.push(output_address);

  libsodium._crypto_aead_chacha20poly1305_ietf_keygen(output_address);
  var ret = (_format_output(output, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_aead_chacha20poly1305_keygen(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output output (buf)

  var output_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0,
      output = new AllocatedBuf(output_length),
      output_address = output.address;

  address_pool.push(output_address);

  libsodium._crypto_aead_chacha20poly1305_keygen(output_address);
  var ret = (_format_output(output, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_aead_xchacha20poly1305_ietf_decrypt(secret_nonce, ciphertext, additional_data, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: ciphertext (minsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address, ciphertext_min_length = libsodium._crypto_aead_xchacha20poly1305_ietf_abytes(), ciphertext_length = ciphertext.length;
  if (ciphertext_length < ciphertext_min_length) {
          _free_and_throw_type_error(address_pool, "ciphertext is too short");
  }
  ciphertext_address = _to_allocated_buf_address(ciphertext);
  address_pool.push(ciphertext_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output message (buf)

  var message_length = (ciphertext_length - libsodium._crypto_aead_xchacha20poly1305_ietf_abytes()) | 0,
      message = new AllocatedBuf(message_length),
      message_address = message.address;

  address_pool.push(message_address);

  if ((libsodium._crypto_aead_xchacha20poly1305_ietf_decrypt(message_address, null, secret_nonce_address, ciphertext_address, ciphertext_length, 0, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output(message, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "ciphertext cannot be decrypted using that key");
}

export function crypto_aead_xchacha20poly1305_ietf_decrypt_detached(secret_nonce, ciphertext, mac, additional_data, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: ciphertext (unsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address = _to_allocated_buf_address(ciphertext),
      ciphertext_length = ciphertext.length;
  address_pool.push(ciphertext_address);

  // ---------- input: mac (buf)

  mac = _any_to_Uint8Array(address_pool, mac, "mac");
  var mac_address, mac_length = (libsodium._crypto_box_macbytes()) | 0;
  if (mac.length !== mac_length) {
      _free_and_throw_type_error(address_pool, "invalid mac length");
  }
  mac_address = _to_allocated_buf_address(mac);
  address_pool.push(mac_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output message (buf)

  var message_length = (ciphertext_length) | 0,
      message = new AllocatedBuf(message_length),
      message_address = message.address;

  address_pool.push(message_address);

  if ((libsodium._crypto_aead_xchacha20poly1305_ietf_decrypt_detached(message_address, secret_nonce_address, ciphertext_address, ciphertext_length, 0, mac_address, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output(message, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "ciphertext cannot be decrypted using that key");
}

export function crypto_aead_xchacha20poly1305_ietf_encrypt(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output ciphertext (buf)

  var ciphertext_length = (message_length + libsodium._crypto_aead_xchacha20poly1305_ietf_abytes()) | 0,
      ciphertext = new AllocatedBuf(ciphertext_length),
      ciphertext_address = ciphertext.address;

  address_pool.push(ciphertext_address);

  if ((libsodium._crypto_aead_xchacha20poly1305_ietf_encrypt(ciphertext_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output(ciphertext, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_aead_xchacha20poly1305_ietf_encrypt_detached(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: additional_data (unsized_buf_optional)

  var additional_data_address = null, additional_data_length = 0;
  if (additional_data != undefined) {
          additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
          additional_data_address = _to_allocated_buf_address(additional_data);
          additional_data_length = additional_data.length;
          address_pool.push(additional_data_address);
  }

  // ---------- input: secret_nonce (unsized_buf_optional)

  var secret_nonce_address = null, secret_nonce_length = 0;
  if (secret_nonce != undefined) {
          secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
          secret_nonce_address = _to_allocated_buf_address(secret_nonce);
          secret_nonce_length = secret_nonce.length;
          address_pool.push(secret_nonce_address);
  }

  // ---------- input: public_nonce (buf)

  public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
  var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_npubbytes()) | 0;
  if (public_nonce.length !== public_nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid public_nonce length");
  }
  public_nonce_address = _to_allocated_buf_address(public_nonce);
  address_pool.push(public_nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output ciphertext (buf)

  var ciphertext_length = (message_length) | 0,
      ciphertext = new AllocatedBuf(ciphertext_length),
      ciphertext_address = ciphertext.address;

  address_pool.push(ciphertext_address);

  // ---------- output mac (buf)

  var mac_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_abytes()) | 0,
      mac = new AllocatedBuf(mac_length),
      mac_address = mac.address;

  address_pool.push(mac_address);

  if ((libsodium._crypto_aead_xchacha20poly1305_ietf_encrypt_detached(ciphertext_address, mac_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
  	var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_aead_xchacha20poly1305_ietf_keygen(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output output (buf)

  var output_length = (libsodium._crypto_aead_xchacha20poly1305_ietf_keybytes()) | 0,
      output = new AllocatedBuf(output_length),
      output_address = output.address;

  address_pool.push(output_address);

  libsodium._crypto_aead_xchacha20poly1305_ietf_keygen(output_address);
  var ret = (_format_output(output, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_auth(message, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_auth_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output tag (buf)

  var tag_length = (libsodium._crypto_auth_bytes()) | 0,
      tag = new AllocatedBuf(tag_length),
      tag_address = tag.address;

  address_pool.push(tag_address);

  if ((libsodium._crypto_auth(tag_address, message_address, message_length, 0, key_address) | 0) === 0) {
  	var ret = _format_output(tag, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_auth_hmacsha256(message, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_auth_hmacsha256_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output hash (buf)

  var hash_length = (libsodium._crypto_auth_hmacsha256_bytes()) | 0,
      hash = new AllocatedBuf(hash_length),
      hash_address = hash.address;

  address_pool.push(hash_address);

  if ((libsodium._crypto_auth_hmacsha256(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
  	var ret = _format_output(hash, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_auth_hmacsha256_final(state_address, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: state_address (auth_hmacsha256_state_address)

  _require_defined(address_pool, state_address, "state_address");

  // ---------- output hash (buf)

  var hash_length = (libsodium._crypto_auth_hmacsha256_bytes()) | 0,
      hash = new AllocatedBuf(hash_length),
      hash_address = hash.address;

  address_pool.push(hash_address);

  if ((libsodium._crypto_auth_hmacsha256_final(state_address, hash_address) | 0) === 0) {
  	var ret = (libsodium._free(state_address), _format_output(hash, outputFormat));
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_auth_hmacsha256_init(key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: key (unsized_buf_optional)

  var key_address = null, key_length = 0;
  if (key != undefined) {
          key = _any_to_Uint8Array(address_pool, key, "key");
          key_address = _to_allocated_buf_address(key);
          key_length = key.length;
          address_pool.push(key_address);
  }

  // ---------- output state (auth_hmacsha256_state)

  var state_address = new AllocatedBuf(208).address;

  if ((libsodium._crypto_auth_hmacsha256_init(state_address, key_address, key_length) | 0) === 0) {
  	var ret = state_address;
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_auth_hmacsha256_keygen(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output output (buf)

  var output_length = (libsodium._crypto_auth_hmacsha256_keybytes()) | 0,
      output = new AllocatedBuf(output_length),
      output_address = output.address;

  address_pool.push(output_address);

  libsodium._crypto_auth_hmacsha256_keygen(output_address);
  var ret = (_format_output(output, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_auth_hmacsha256_update(state_address, message_chunk, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: state_address (auth_hmacsha256_state_address)

  _require_defined(address_pool, state_address, "state_address");

  // ---------- input: message_chunk (unsized_buf)

  message_chunk = _any_to_Uint8Array(address_pool, message_chunk, "message_chunk");
  var message_chunk_address = _to_allocated_buf_address(message_chunk),
      message_chunk_length = message_chunk.length;
  address_pool.push(message_chunk_address);

  if (!((libsodium._crypto_auth_hmacsha256_update(state_address, message_chunk_address, message_chunk_length) | 0) === 0)) {
  	_free_and_throw_error(address_pool, "invalid usage");
  }
  _free_all(address_pool);
}

export function crypto_auth_hmacsha256_verify(tag, message, key) {
  var address_pool = [];

  // ---------- input: tag (buf)

  tag = _any_to_Uint8Array(address_pool, tag, "tag");
  var tag_address, tag_length = (libsodium._crypto_auth_hmacsha256_bytes()) | 0;
  if (tag.length !== tag_length) {
      _free_and_throw_type_error(address_pool, "invalid tag length");
  }
  tag_address = _to_allocated_buf_address(tag);
  address_pool.push(tag_address);

  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_auth_hmacsha256_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  var result = libsodium._crypto_auth_hmacsha256_verify(tag_address, message_address, message_length, 0, key_address) | 0;
  var ret = (result === 0);
  _free_all(address_pool);
  return ret;
}

export function crypto_auth_hmacsha512(message, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_auth_hmacsha512_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output hash (buf)

  var hash_length = (libsodium._crypto_auth_hmacsha512_bytes()) | 0,
      hash = new AllocatedBuf(hash_length),
      hash_address = hash.address;

  address_pool.push(hash_address);

  if ((libsodium._crypto_auth_hmacsha512(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
  	var ret = _format_output(hash, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_auth_hmacsha512_final(state_address, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: state_address (auth_hmacsha512_state_address)

  _require_defined(address_pool, state_address, "state_address");

  // ---------- output hash (buf)

  var hash_length = (libsodium._crypto_auth_hmacsha512_bytes()) | 0,
      hash = new AllocatedBuf(hash_length),
      hash_address = hash.address;

  address_pool.push(hash_address);

  if ((libsodium._crypto_auth_hmacsha512_final(state_address, hash_address) | 0) === 0) {
  	var ret = (libsodium._free(state_address), _format_output(hash, outputFormat));
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_auth_hmacsha512_init(key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: key (unsized_buf_optional)

  var key_address = null, key_length = 0;
  if (key != undefined) {
          key = _any_to_Uint8Array(address_pool, key, "key");
          key_address = _to_allocated_buf_address(key);
          key_length = key.length;
          address_pool.push(key_address);
  }

  // ---------- output state (auth_hmacsha512_state)

  var state_address = new AllocatedBuf(416).address;

  if ((libsodium._crypto_auth_hmacsha512_init(state_address, key_address, key_length) | 0) === 0) {
  	var ret = state_address;
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_auth_hmacsha512_keygen(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output output (buf)

  var output_length = (libsodium._crypto_auth_hmacsha512_keybytes()) | 0,
      output = new AllocatedBuf(output_length),
      output_address = output.address;

  address_pool.push(output_address);

  libsodium._crypto_auth_hmacsha512_keygen(output_address);
  var ret = (_format_output(output, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_auth_hmacsha512_update(state_address, message_chunk, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: state_address (auth_hmacsha512_state_address)

  _require_defined(address_pool, state_address, "state_address");

  // ---------- input: message_chunk (unsized_buf)

  message_chunk = _any_to_Uint8Array(address_pool, message_chunk, "message_chunk");
  var message_chunk_address = _to_allocated_buf_address(message_chunk),
      message_chunk_length = message_chunk.length;
  address_pool.push(message_chunk_address);

  if (!((libsodium._crypto_auth_hmacsha512_update(state_address, message_chunk_address, message_chunk_length) | 0) === 0)) {
  	_free_and_throw_error(address_pool, "invalid usage");
  }
  _free_all(address_pool);
}

export function crypto_auth_hmacsha512_verify(tag, message, key) {
  var address_pool = [];

  // ---------- input: tag (buf)

  tag = _any_to_Uint8Array(address_pool, tag, "tag");
  var tag_address, tag_length = (libsodium._crypto_auth_hmacsha512_bytes()) | 0;
  if (tag.length !== tag_length) {
      _free_and_throw_type_error(address_pool, "invalid tag length");
  }
  tag_address = _to_allocated_buf_address(tag);
  address_pool.push(tag_address);

  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_auth_hmacsha512_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  var result = libsodium._crypto_auth_hmacsha512_verify(tag_address, message_address, message_length, 0, key_address) | 0;
  var ret = (result === 0);
  _free_all(address_pool);
  return ret;
}

export function crypto_auth_keygen(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output output (buf)

  var output_length = (libsodium._crypto_auth_keybytes()) | 0,
      output = new AllocatedBuf(output_length),
      output_address = output.address;

  address_pool.push(output_address);

  libsodium._crypto_auth_keygen(output_address);
  var ret = (_format_output(output, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_auth_verify(tag, message, key) {
  var address_pool = [];

  // ---------- input: tag (buf)

  tag = _any_to_Uint8Array(address_pool, tag, "tag");
  var tag_address, tag_length = (libsodium._crypto_auth_bytes()) | 0;
  if (tag.length !== tag_length) {
      _free_and_throw_type_error(address_pool, "invalid tag length");
  }
  tag_address = _to_allocated_buf_address(tag);
  address_pool.push(tag_address);

  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_auth_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  var result = libsodium._crypto_auth_verify(tag_address, message_address, message_length, 0, key_address) | 0;
  var ret = (result === 0);
  _free_all(address_pool);
  return ret;
}

export function crypto_box_beforenm(publicKey, privateKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: publicKey (buf)

  publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
  var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
  if (publicKey.length !== publicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid publicKey length");
  }
  publicKey_address = _to_allocated_buf_address(publicKey);
  address_pool.push(publicKey_address);

  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- output sharedKey (buf)

  var sharedKey_length = (libsodium._crypto_box_beforenmbytes()) | 0,
      sharedKey = new AllocatedBuf(sharedKey_length),
      sharedKey_address = sharedKey.address;

  address_pool.push(sharedKey_address);

  if ((libsodium._crypto_box_beforenm(sharedKey_address, publicKey_address, privateKey_address) | 0) === 0) {
  	var ret = _format_output(sharedKey, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_box_curve25519xchacha20poly1305_beforenm(publicKey, privateKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: publicKey (buf)

  publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
  var publicKey_address, publicKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_publickeybytes()) | 0;
  if (publicKey.length !== publicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid publicKey length");
  }
  publicKey_address = _to_allocated_buf_address(publicKey);
  address_pool.push(publicKey_address);

  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_secretkeybytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- output sharedKey (buf)

  var sharedKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_beforenmbytes()) | 0,
      sharedKey = new AllocatedBuf(sharedKey_length),
      sharedKey_address = sharedKey.address;

  address_pool.push(sharedKey_address);

  if ((libsodium._crypto_box_curve25519xchacha20poly1305_beforenm(sharedKey_address, publicKey_address, privateKey_address) | 0) === 0) {
  	var ret = _format_output(sharedKey, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_box_curve25519xchacha20poly1305_detached(message, nonce, publicKey, privateKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_box_curve25519xchacha20poly1305_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: publicKey (buf)

  publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
  var publicKey_address, publicKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_publickeybytes()) | 0;
  if (publicKey.length !== publicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid publicKey length");
  }
  publicKey_address = _to_allocated_buf_address(publicKey);
  address_pool.push(publicKey_address);

  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_secretkeybytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- output ciphertext (buf)

  var ciphertext_length = (message_length) | 0,
      ciphertext = new AllocatedBuf(ciphertext_length),
      ciphertext_address = ciphertext.address;

  address_pool.push(ciphertext_address);

  // ---------- output mac (buf)

  var mac_length = (libsodium._crypto_box_curve25519xchacha20poly1305_macbytes()) | 0,
      mac = new AllocatedBuf(mac_length),
      mac_address = mac.address;

  address_pool.push(mac_address);

  if ((libsodium._crypto_box_curve25519xchacha20poly1305_detached(ciphertext_address, mac_address, message_address, message_length, 0, nonce_address, publicKey_address, privateKey_address) | 0) === 0) {
  	var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_box_curve25519xchacha20poly1305_detached_afternm(message, nonce, sharedKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_box_curve25519xchacha20poly1305_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: sharedKey (buf)

  sharedKey = _any_to_Uint8Array(address_pool, sharedKey, "sharedKey");
  var sharedKey_address, sharedKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_beforenmbytes()) | 0;
  if (sharedKey.length !== sharedKey_length) {
      _free_and_throw_type_error(address_pool, "invalid sharedKey length");
  }
  sharedKey_address = _to_allocated_buf_address(sharedKey);
  address_pool.push(sharedKey_address);

  // ---------- output ciphertext (buf)

  var ciphertext_length = (message_length) | 0,
      ciphertext = new AllocatedBuf(ciphertext_length),
      ciphertext_address = ciphertext.address;

  address_pool.push(ciphertext_address);

  // ---------- output mac (buf)

  var mac_length = (libsodium._crypto_box_curve25519xchacha20poly1305_macbytes()) | 0,
      mac = new AllocatedBuf(mac_length),
      mac_address = mac.address;

  address_pool.push(mac_address);

  if ((libsodium._crypto_box_curve25519xchacha20poly1305_detached_afternm(ciphertext_address, mac_address, message_address, message_length, 0, nonce_address, sharedKey_address) | 0) === 0) {
  	var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_box_curve25519xchacha20poly1305_easy(message, nonce, publicKey, privateKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_box_curve25519xchacha20poly1305_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: publicKey (buf)

  publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
  var publicKey_address, publicKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_publickeybytes()) | 0;
  if (publicKey.length !== publicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid publicKey length");
  }
  publicKey_address = _to_allocated_buf_address(publicKey);
  address_pool.push(publicKey_address);

  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_secretkeybytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- output ciphertext (buf)

  var ciphertext_length = (message_length + libsodium._crypto_box_curve25519xchacha20poly1305_macbytes()) | 0,
      ciphertext = new AllocatedBuf(ciphertext_length),
      ciphertext_address = ciphertext.address;

  address_pool.push(ciphertext_address);

  if ((libsodium._crypto_box_curve25519xchacha20poly1305_easy(ciphertext_address, message_address, message_length, 0, nonce_address, publicKey_address, privateKey_address) | 0) === 0) {
  	var ret = _format_output(ciphertext, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_box_curve25519xchacha20poly1305_easy_afternm(message, nonce, sharedKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_box_curve25519xchacha20poly1305_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: sharedKey (buf)

  sharedKey = _any_to_Uint8Array(address_pool, sharedKey, "sharedKey");
  var sharedKey_address, sharedKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_beforenmbytes()) | 0;
  if (sharedKey.length !== sharedKey_length) {
      _free_and_throw_type_error(address_pool, "invalid sharedKey length");
  }
  sharedKey_address = _to_allocated_buf_address(sharedKey);
  address_pool.push(sharedKey_address);

  // ---------- output ciphertext (buf)

  var ciphertext_length = (message_length + libsodium._crypto_box_curve25519xchacha20poly1305_macbytes()) | 0,
      ciphertext = new AllocatedBuf(ciphertext_length),
      ciphertext_address = ciphertext.address;

  address_pool.push(ciphertext_address);

  if ((libsodium._crypto_box_curve25519xchacha20poly1305_easy_afternm(ciphertext_address, message_address, message_length, 0, nonce_address, sharedKey_address) | 0) === 0) {
  	var ret = _format_output(ciphertext, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_box_curve25519xchacha20poly1305_keypair(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output publicKey (buf)

  var publicKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_publickeybytes()) | 0,
      publicKey = new AllocatedBuf(publicKey_length),
      publicKey_address = publicKey.address;

  address_pool.push(publicKey_address);

  // ---------- output secretKey (buf)

  var secretKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_secretkeybytes()) | 0,
      secretKey = new AllocatedBuf(secretKey_length),
      secretKey_address = secretKey.address;

  address_pool.push(secretKey_address);

  libsodium._crypto_box_curve25519xchacha20poly1305_keypair(publicKey_address, secretKey_address) | 0;
  var ret = (_format_output({publicKey: publicKey, privateKey: secretKey, keyType: "curve25519"}, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_box_curve25519xchacha20poly1305_open_detached(ciphertext, mac, nonce, publicKey, privateKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: ciphertext (unsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address = _to_allocated_buf_address(ciphertext),
      ciphertext_length = ciphertext.length;
  address_pool.push(ciphertext_address);

  // ---------- input: mac (buf)

  mac = _any_to_Uint8Array(address_pool, mac, "mac");
  var mac_address, mac_length = (libsodium._crypto_box_curve25519xchacha20poly1305_macbytes()) | 0;
  if (mac.length !== mac_length) {
      _free_and_throw_type_error(address_pool, "invalid mac length");
  }
  mac_address = _to_allocated_buf_address(mac);
  address_pool.push(mac_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_box_curve25519xchacha20poly1305_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: publicKey (buf)

  publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
  var publicKey_address, publicKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_publickeybytes()) | 0;
  if (publicKey.length !== publicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid publicKey length");
  }
  publicKey_address = _to_allocated_buf_address(publicKey);
  address_pool.push(publicKey_address);

  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_secretkeybytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- output plaintext (buf)

  var plaintext_length = (ciphertext_length) | 0,
      plaintext = new AllocatedBuf(plaintext_length),
      plaintext_address = plaintext.address;

  address_pool.push(plaintext_address);

  if ((libsodium._crypto_box_curve25519xchacha20poly1305_open_detached(plaintext_address, ciphertext_address, mac_address, ciphertext_length, 0, nonce_address, publicKey_address, privateKey_address) | 0) === 0) {
  	var ret = _format_output(plaintext, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "incorrect key pair for the given ciphertext");
}

export function crypto_box_curve25519xchacha20poly1305_open_detached_afternm(ciphertext, mac, nonce, sharedKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: ciphertext (unsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address = _to_allocated_buf_address(ciphertext),
      ciphertext_length = ciphertext.length;
  address_pool.push(ciphertext_address);

  // ---------- input: mac (buf)

  mac = _any_to_Uint8Array(address_pool, mac, "mac");
  var mac_address, mac_length = (libsodium._crypto_box_curve25519xchacha20poly1305_macbytes()) | 0;
  if (mac.length !== mac_length) {
      _free_and_throw_type_error(address_pool, "invalid mac length");
  }
  mac_address = _to_allocated_buf_address(mac);
  address_pool.push(mac_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_box_curve25519xchacha20poly1305_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: sharedKey (buf)

  sharedKey = _any_to_Uint8Array(address_pool, sharedKey, "sharedKey");
  var sharedKey_address, sharedKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_beforenmbytes()) | 0;
  if (sharedKey.length !== sharedKey_length) {
      _free_and_throw_type_error(address_pool, "invalid sharedKey length");
  }
  sharedKey_address = _to_allocated_buf_address(sharedKey);
  address_pool.push(sharedKey_address);

  // ---------- output plaintext (buf)

  var plaintext_length = (ciphertext_length) | 0,
      plaintext = new AllocatedBuf(plaintext_length),
      plaintext_address = plaintext.address;

  address_pool.push(plaintext_address);

  if ((libsodium._crypto_box_curve25519xchacha20poly1305_open_detached_afternm(plaintext_address, ciphertext_address, mac_address, ciphertext_length, 0, nonce_address, sharedKey_address) | 0) === 0) {
  	var ret = _format_output(plaintext, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "incorrect secret key for the given ciphertext");
}

export function crypto_box_curve25519xchacha20poly1305_open_easy(ciphertext, nonce, publicKey, privateKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: ciphertext (minsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address, ciphertext_min_length = libsodium._crypto_box_curve25519xchacha20poly1305_macbytes(), ciphertext_length = ciphertext.length;
  if (ciphertext_length < ciphertext_min_length) {
          _free_and_throw_type_error(address_pool, "ciphertext is too short");
  }
  ciphertext_address = _to_allocated_buf_address(ciphertext);
  address_pool.push(ciphertext_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_box_curve25519xchacha20poly1305_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: publicKey (buf)

  publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
  var publicKey_address, publicKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_publickeybytes()) | 0;
  if (publicKey.length !== publicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid publicKey length");
  }
  publicKey_address = _to_allocated_buf_address(publicKey);
  address_pool.push(publicKey_address);

  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_secretkeybytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- output plaintext (buf)

  var plaintext_length = (ciphertext_length - libsodium._crypto_box_curve25519xchacha20poly1305_macbytes()) | 0,
      plaintext = new AllocatedBuf(plaintext_length),
      plaintext_address = plaintext.address;

  address_pool.push(plaintext_address);

  if ((libsodium._crypto_box_curve25519xchacha20poly1305_open_easy(plaintext_address, ciphertext_address, ciphertext_length, 0, nonce_address, publicKey_address, privateKey_address) | 0) === 0) {
  	var ret = _format_output(plaintext, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "incorrect key pair for the given ciphertext");
}

export function crypto_box_curve25519xchacha20poly1305_open_easy_afternm(ciphertext, nonce, sharedKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: ciphertext (unsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address = _to_allocated_buf_address(ciphertext),
      ciphertext_length = ciphertext.length;
  address_pool.push(ciphertext_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_box_curve25519xchacha20poly1305_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: sharedKey (buf)

  sharedKey = _any_to_Uint8Array(address_pool, sharedKey, "sharedKey");
  var sharedKey_address, sharedKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_beforenmbytes()) | 0;
  if (sharedKey.length !== sharedKey_length) {
      _free_and_throw_type_error(address_pool, "invalid sharedKey length");
  }
  sharedKey_address = _to_allocated_buf_address(sharedKey);
  address_pool.push(sharedKey_address);

  // ---------- output plaintext (buf)

  var plaintext_length = (ciphertext_length - libsodium._crypto_box_curve25519xchacha20poly1305_macbytes()) | 0,
      plaintext = new AllocatedBuf(plaintext_length),
      plaintext_address = plaintext.address;

  address_pool.push(plaintext_address);

  if ((libsodium._crypto_box_curve25519xchacha20poly1305_open_easy_afternm(plaintext_address, ciphertext_address, ciphertext_length, 0, nonce_address, sharedKey_address) | 0) === 0) {
  	var ret = _format_output(plaintext, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "incorrect secret key for the given ciphertext");
}

export function crypto_box_curve25519xchacha20poly1305_seal(message, publicKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: publicKey (buf)

  publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
  var publicKey_address, publicKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_publickeybytes()) | 0;
  if (publicKey.length !== publicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid publicKey length");
  }
  publicKey_address = _to_allocated_buf_address(publicKey);
  address_pool.push(publicKey_address);

  // ---------- output ciphertext (buf)

  var ciphertext_length = (message_length + libsodium._crypto_box_curve25519xchacha20poly1305_sealbytes()) | 0,
      ciphertext = new AllocatedBuf(ciphertext_length),
      ciphertext_address = ciphertext.address;

  address_pool.push(ciphertext_address);

  libsodium._crypto_box_curve25519xchacha20poly1305_seal(ciphertext_address, message_address, message_length, 0, publicKey_address) | 0;
  var ret = (_format_output(ciphertext, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_box_curve25519xchacha20poly1305_seal_open(ciphertext, publicKey, secretKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: ciphertext (minsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address, ciphertext_min_length = libsodium._crypto_box_curve25519xchacha20poly1305_sealbytes(), ciphertext_length = ciphertext.length;
  if (ciphertext_length < ciphertext_min_length) {
          _free_and_throw_type_error(address_pool, "ciphertext is too short");
  }
  ciphertext_address = _to_allocated_buf_address(ciphertext);
  address_pool.push(ciphertext_address);

  // ---------- input: publicKey (buf)

  publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
  var publicKey_address, publicKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_publickeybytes()) | 0;
  if (publicKey.length !== publicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid publicKey length");
  }
  publicKey_address = _to_allocated_buf_address(publicKey);
  address_pool.push(publicKey_address);

  // ---------- input: secretKey (buf)

  secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
  var secretKey_address, secretKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_secretkeybytes()) | 0;
  if (secretKey.length !== secretKey_length) {
      _free_and_throw_type_error(address_pool, "invalid secretKey length");
  }
  secretKey_address = _to_allocated_buf_address(secretKey);
  address_pool.push(secretKey_address);

  // ---------- output plaintext (buf)

  var plaintext_length = (ciphertext_length - libsodium._crypto_box_curve25519xchacha20poly1305_sealbytes()) | 0,
      plaintext = new AllocatedBuf(plaintext_length),
      plaintext_address = plaintext.address;

  address_pool.push(plaintext_address);

  libsodium._crypto_box_curve25519xchacha20poly1305_seal_open(plaintext_address, ciphertext_address, ciphertext_length, 0, publicKey_address, secretKey_address) | 0;
  var ret = (_format_output(plaintext, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_box_curve25519xchacha20poly1305_seed_keypair(seed, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: seed (buf)

  seed = _any_to_Uint8Array(address_pool, seed, "seed");
  var seed_address, seed_length = (libsodium._crypto_box_curve25519xchacha20poly1305_seedbytes()) | 0;
  if (seed.length !== seed_length) {
      _free_and_throw_type_error(address_pool, "invalid seed length");
  }
  seed_address = _to_allocated_buf_address(seed);
  address_pool.push(seed_address);

  // ---------- output publicKey (buf)

  var publicKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_publickeybytes()) | 0,
      publicKey = new AllocatedBuf(publicKey_length),
      publicKey_address = publicKey.address;

  address_pool.push(publicKey_address);

  // ---------- output privateKey (buf)

  var privateKey_length = (libsodium._crypto_box_curve25519xchacha20poly1305_secretkeybytes()) | 0,
      privateKey = new AllocatedBuf(privateKey_length),
      privateKey_address = privateKey.address;

  address_pool.push(privateKey_address);

  if ((libsodium._crypto_box_curve25519xchacha20poly1305_seed_keypair(publicKey_address, privateKey_address, seed_address) | 0) === 0) {
  	var ret = {publicKey: _format_output(publicKey, outputFormat), privateKey: _format_output(privateKey, outputFormat), keyType: 'x25519'};
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_box_detached(message, nonce, publicKey, privateKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: publicKey (buf)

  publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
  var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
  if (publicKey.length !== publicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid publicKey length");
  }
  publicKey_address = _to_allocated_buf_address(publicKey);
  address_pool.push(publicKey_address);

  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- output ciphertext (buf)

  var ciphertext_length = (message_length) | 0,
      ciphertext = new AllocatedBuf(ciphertext_length),
      ciphertext_address = ciphertext.address;

  address_pool.push(ciphertext_address);

  // ---------- output mac (buf)

  var mac_length = (libsodium._crypto_box_macbytes()) | 0,
      mac = new AllocatedBuf(mac_length),
      mac_address = mac.address;

  address_pool.push(mac_address);

  if ((libsodium._crypto_box_detached(ciphertext_address, mac_address, message_address, message_length, 0, nonce_address, publicKey_address, privateKey_address) | 0) === 0) {
  	var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_box_easy(message, nonce, publicKey, privateKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: publicKey (buf)

  publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
  var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
  if (publicKey.length !== publicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid publicKey length");
  }
  publicKey_address = _to_allocated_buf_address(publicKey);
  address_pool.push(publicKey_address);

  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- output ciphertext (buf)

  var ciphertext_length = (message_length + libsodium._crypto_box_macbytes()) | 0,
      ciphertext = new AllocatedBuf(ciphertext_length),
      ciphertext_address = ciphertext.address;

  address_pool.push(ciphertext_address);

  if ((libsodium._crypto_box_easy(ciphertext_address, message_address, message_length, 0, nonce_address, publicKey_address, privateKey_address) | 0) === 0) {
  	var ret = _format_output(ciphertext, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_box_easy_afternm(message, nonce, sharedKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: sharedKey (buf)

  sharedKey = _any_to_Uint8Array(address_pool, sharedKey, "sharedKey");
  var sharedKey_address, sharedKey_length = (libsodium._crypto_box_beforenmbytes()) | 0;
  if (sharedKey.length !== sharedKey_length) {
      _free_and_throw_type_error(address_pool, "invalid sharedKey length");
  }
  sharedKey_address = _to_allocated_buf_address(sharedKey);
  address_pool.push(sharedKey_address);

  // ---------- output ciphertext (buf)

  var ciphertext_length = (message_length + libsodium._crypto_box_macbytes()) | 0,
      ciphertext = new AllocatedBuf(ciphertext_length),
      ciphertext_address = ciphertext.address;

  address_pool.push(ciphertext_address);

  if ((libsodium._crypto_box_easy_afternm(ciphertext_address, message_address, message_length, 0, nonce_address, sharedKey_address) | 0) === 0) {
  	var ret = _format_output(ciphertext, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_box_keypair(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output publicKey (buf)

  var publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0,
      publicKey = new AllocatedBuf(publicKey_length),
      publicKey_address = publicKey.address;

  address_pool.push(publicKey_address);

  // ---------- output privateKey (buf)

  var privateKey_length = (libsodium._crypto_box_secretkeybytes()) | 0,
      privateKey = new AllocatedBuf(privateKey_length),
      privateKey_address = privateKey.address;

  address_pool.push(privateKey_address);

  if ((libsodium._crypto_box_keypair(publicKey_address, privateKey_address) | 0) === 0) {
  	var ret = {publicKey: _format_output(publicKey, outputFormat), privateKey: _format_output(privateKey, outputFormat), keyType: 'x25519'};
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "internal error");
}

export function crypto_box_open_detached(ciphertext, mac, nonce, publicKey, privateKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: ciphertext (unsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address = _to_allocated_buf_address(ciphertext),
      ciphertext_length = ciphertext.length;
  address_pool.push(ciphertext_address);

  // ---------- input: mac (buf)

  mac = _any_to_Uint8Array(address_pool, mac, "mac");
  var mac_address, mac_length = (libsodium._crypto_box_macbytes()) | 0;
  if (mac.length !== mac_length) {
      _free_and_throw_type_error(address_pool, "invalid mac length");
  }
  mac_address = _to_allocated_buf_address(mac);
  address_pool.push(mac_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: publicKey (buf)

  publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
  var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
  if (publicKey.length !== publicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid publicKey length");
  }
  publicKey_address = _to_allocated_buf_address(publicKey);
  address_pool.push(publicKey_address);

  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- output plaintext (buf)

  var plaintext_length = (ciphertext_length) | 0,
      plaintext = new AllocatedBuf(plaintext_length),
      plaintext_address = plaintext.address;

  address_pool.push(plaintext_address);

  if ((libsodium._crypto_box_open_detached(plaintext_address, ciphertext_address, mac_address, ciphertext_length, 0, nonce_address, publicKey_address, privateKey_address) | 0) === 0) {
  	var ret = _format_output(plaintext, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "incorrect key pair for the given ciphertext");
}

export function crypto_box_open_easy(ciphertext, nonce, publicKey, privateKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: ciphertext (minsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address, ciphertext_min_length = libsodium._crypto_box_macbytes(), ciphertext_length = ciphertext.length;
  if (ciphertext_length < ciphertext_min_length) {
          _free_and_throw_type_error(address_pool, "ciphertext is too short");
  }
  ciphertext_address = _to_allocated_buf_address(ciphertext);
  address_pool.push(ciphertext_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: publicKey (buf)

  publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
  var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
  if (publicKey.length !== publicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid publicKey length");
  }
  publicKey_address = _to_allocated_buf_address(publicKey);
  address_pool.push(publicKey_address);

  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- output plaintext (buf)

  var plaintext_length = (ciphertext_length - libsodium._crypto_box_macbytes()) | 0,
      plaintext = new AllocatedBuf(plaintext_length),
      plaintext_address = plaintext.address;

  address_pool.push(plaintext_address);

  if ((libsodium._crypto_box_open_easy(plaintext_address, ciphertext_address, ciphertext_length, 0, nonce_address, publicKey_address, privateKey_address) | 0) === 0) {
  	var ret = _format_output(plaintext, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "incorrect key pair for the given ciphertext");
}

export function crypto_box_open_easy_afternm(ciphertext, nonce, sharedKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: ciphertext (unsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address = _to_allocated_buf_address(ciphertext),
      ciphertext_length = ciphertext.length;
  address_pool.push(ciphertext_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: sharedKey (buf)

  sharedKey = _any_to_Uint8Array(address_pool, sharedKey, "sharedKey");
  var sharedKey_address, sharedKey_length = (libsodium._crypto_box_beforenmbytes()) | 0;
  if (sharedKey.length !== sharedKey_length) {
      _free_and_throw_type_error(address_pool, "invalid sharedKey length");
  }
  sharedKey_address = _to_allocated_buf_address(sharedKey);
  address_pool.push(sharedKey_address);

  // ---------- output plaintext (buf)

  var plaintext_length = (ciphertext_length - libsodium._crypto_box_macbytes()) | 0,
      plaintext = new AllocatedBuf(plaintext_length),
      plaintext_address = plaintext.address;

  address_pool.push(plaintext_address);

  if ((libsodium._crypto_box_open_easy_afternm(plaintext_address, ciphertext_address, ciphertext_length, 0, nonce_address, sharedKey_address) | 0) === 0) {
  	var ret = _format_output(plaintext, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "incorrect secret key for the given ciphertext");
}

export function crypto_box_seal(message, publicKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: publicKey (buf)

  publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
  var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
  if (publicKey.length !== publicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid publicKey length");
  }
  publicKey_address = _to_allocated_buf_address(publicKey);
  address_pool.push(publicKey_address);

  // ---------- output ciphertext (buf)

  var ciphertext_length = (message_length + libsodium._crypto_box_sealbytes()) | 0,
      ciphertext = new AllocatedBuf(ciphertext_length),
      ciphertext_address = ciphertext.address;

  address_pool.push(ciphertext_address);

  if ((libsodium._crypto_box_seal(ciphertext_address, message_address, message_length, 0, publicKey_address) | 0) === 0) {
  	var ret = _format_output(ciphertext, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_box_seal_open(ciphertext, publicKey, privateKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: ciphertext (minsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address, ciphertext_min_length = libsodium._crypto_box_sealbytes(), ciphertext_length = ciphertext.length;
  if (ciphertext_length < ciphertext_min_length) {
          _free_and_throw_type_error(address_pool, "ciphertext is too short");
  }
  ciphertext_address = _to_allocated_buf_address(ciphertext);
  address_pool.push(ciphertext_address);

  // ---------- input: publicKey (buf)

  publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
  var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
  if (publicKey.length !== publicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid publicKey length");
  }
  publicKey_address = _to_allocated_buf_address(publicKey);
  address_pool.push(publicKey_address);

  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- output plaintext (buf)

  var plaintext_length = (ciphertext_length - libsodium._crypto_box_sealbytes()) | 0,
      plaintext = new AllocatedBuf(plaintext_length),
      plaintext_address = plaintext.address;

  address_pool.push(plaintext_address);

  if ((libsodium._crypto_box_seal_open(plaintext_address, ciphertext_address, ciphertext_length, 0, publicKey_address, privateKey_address) | 0) === 0) {
  	var ret = _format_output(plaintext, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "incorrect key pair for the given ciphertext");
}

export function crypto_box_seed_keypair(seed, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: seed (buf)

  seed = _any_to_Uint8Array(address_pool, seed, "seed");
  var seed_address, seed_length = (libsodium._crypto_box_seedbytes()) | 0;
  if (seed.length !== seed_length) {
      _free_and_throw_type_error(address_pool, "invalid seed length");
  }
  seed_address = _to_allocated_buf_address(seed);
  address_pool.push(seed_address);

  // ---------- output publicKey (buf)

  var publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0,
      publicKey = new AllocatedBuf(publicKey_length),
      publicKey_address = publicKey.address;

  address_pool.push(publicKey_address);

  // ---------- output privateKey (buf)

  var privateKey_length = (libsodium._crypto_box_secretkeybytes()) | 0,
      privateKey = new AllocatedBuf(privateKey_length),
      privateKey_address = privateKey.address;

  address_pool.push(privateKey_address);

  if ((libsodium._crypto_box_seed_keypair(publicKey_address, privateKey_address, seed_address) | 0) === 0) {
  	var ret = {publicKey: _format_output(publicKey, outputFormat), privateKey: _format_output(privateKey, outputFormat), keyType: 'x25519'};
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_core_ed25519_add(p, q, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: p (buf)

  p = _any_to_Uint8Array(address_pool, p, "p");
  var p_address, p_length = (libsodium._crypto_core_ed25519_bytes()) | 0;
  if (p.length !== p_length) {
      _free_and_throw_type_error(address_pool, "invalid p length");
  }
  p_address = _to_allocated_buf_address(p);
  address_pool.push(p_address);

  // ---------- input: q (buf)

  q = _any_to_Uint8Array(address_pool, q, "q");
  var q_address, q_length = (libsodium._crypto_core_ed25519_bytes()) | 0;
  if (q.length !== q_length) {
      _free_and_throw_type_error(address_pool, "invalid q length");
  }
  q_address = _to_allocated_buf_address(q);
  address_pool.push(q_address);

  // ---------- output r (buf)

  var r_length = (libsodium._crypto_core_ed25519_bytes()) | 0,
      r = new AllocatedBuf(r_length),
      r_address = r.address;

  address_pool.push(r_address);

  if ((libsodium._crypto_core_ed25519_add(r_address, p_address, q_address) | 0) === 0) {
  	var ret = _format_output(r, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "input is an invalid element");
}

export function crypto_core_ed25519_from_hash(r, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: r (unsized_buf)

  r = _any_to_Uint8Array(address_pool, r, "r");
  var r_address = _to_allocated_buf_address(r),
      r_length = r.length;
  address_pool.push(r_address);

  // ---------- output point (buf)

  var point_length = (libsodium._crypto_core_ed25519_bytes()) | 0,
      point = new AllocatedBuf(point_length),
      point_address = point.address;

  address_pool.push(point_address);

  if ((libsodium._crypto_core_ed25519_from_hash(point_address, r_address) | 0) === 0) {
  	var ret = _format_output(point, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_core_ed25519_from_uniform(r, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: r (unsized_buf)

  r = _any_to_Uint8Array(address_pool, r, "r");
  var r_address = _to_allocated_buf_address(r),
      r_length = r.length;
  address_pool.push(r_address);

  // ---------- output point (buf)

  var point_length = (libsodium._crypto_core_ed25519_bytes()) | 0,
      point = new AllocatedBuf(point_length),
      point_address = point.address;

  address_pool.push(point_address);

  if ((libsodium._crypto_core_ed25519_from_uniform(point_address, r_address) | 0) === 0) {
  	var ret = _format_output(point, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_core_ed25519_is_valid_point(repr, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: repr (buf)

  repr = _any_to_Uint8Array(address_pool, repr, "repr");
  var repr_address, repr_length = (libsodium._crypto_core_ed25519_bytes()) | 0;
  if (repr.length !== repr_length) {
      _free_and_throw_type_error(address_pool, "invalid repr length");
  }
  repr_address = _to_allocated_buf_address(repr);
  address_pool.push(repr_address);

  var result = libsodium._crypto_core_ed25519_is_valid_point(repr_address) | 0;
  var ret = (result === 1);
  _free_all(address_pool);
  return ret;
}

export function crypto_core_ed25519_random(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output p (buf)

  var p_length = (libsodium._crypto_core_ed25519_bytes()) | 0,
      p = new AllocatedBuf(p_length),
      p_address = p.address;

  address_pool.push(p_address);

  libsodium._crypto_core_ed25519_random(p_address);
  var ret = (_format_output(p, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_core_ed25519_scalar_add(x, y, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: x (buf)

  x = _any_to_Uint8Array(address_pool, x, "x");
  var x_address, x_length = (libsodium._crypto_core_ed25519_scalarbytes()) | 0;
  if (x.length !== x_length) {
      _free_and_throw_type_error(address_pool, "invalid x length");
  }
  x_address = _to_allocated_buf_address(x);
  address_pool.push(x_address);

  // ---------- input: y (buf)

  y = _any_to_Uint8Array(address_pool, y, "y");
  var y_address, y_length = (libsodium._crypto_core_ed25519_scalarbytes()) | 0;
  if (y.length !== y_length) {
      _free_and_throw_type_error(address_pool, "invalid y length");
  }
  y_address = _to_allocated_buf_address(y);
  address_pool.push(y_address);

  // ---------- output z (buf)

  var z_length = (libsodium._crypto_core_ed25519_scalarbytes()) | 0,
      z = new AllocatedBuf(z_length),
      z_address = z.address;

  address_pool.push(z_address);

  libsodium._crypto_core_ed25519_scalar_add(z_address, x_address, y_address);
  var ret = (_format_output(z, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_core_ed25519_scalar_complement(s, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: s (buf)

  s = _any_to_Uint8Array(address_pool, s, "s");
  var s_address, s_length = (libsodium._crypto_core_ed25519_scalarbytes()) | 0;
  if (s.length !== s_length) {
      _free_and_throw_type_error(address_pool, "invalid s length");
  }
  s_address = _to_allocated_buf_address(s);
  address_pool.push(s_address);

  // ---------- output comp (buf)

  var comp_length = (libsodium._crypto_core_ed25519_scalarbytes()) | 0,
      comp = new AllocatedBuf(comp_length),
      comp_address = comp.address;

  address_pool.push(comp_address);

  libsodium._crypto_core_ed25519_scalar_complement(comp_address, s_address);
  var ret = (_format_output(comp, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_core_ed25519_scalar_invert(s, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: s (buf)

  s = _any_to_Uint8Array(address_pool, s, "s");
  var s_address, s_length = (libsodium._crypto_core_ed25519_scalarbytes()) | 0;
  if (s.length !== s_length) {
      _free_and_throw_type_error(address_pool, "invalid s length");
  }
  s_address = _to_allocated_buf_address(s);
  address_pool.push(s_address);

  // ---------- output recip (buf)

  var recip_length = (libsodium._crypto_core_ed25519_scalarbytes()) | 0,
      recip = new AllocatedBuf(recip_length),
      recip_address = recip.address;

  address_pool.push(recip_address);

  if ((libsodium._crypto_core_ed25519_scalar_invert(recip_address, s_address) | 0) === 0) {
  	var ret = _format_output(recip, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid reciprocate");
}

export function crypto_core_ed25519_scalar_mul(x, y, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: x (buf)

  x = _any_to_Uint8Array(address_pool, x, "x");
  var x_address, x_length = (libsodium._crypto_core_ed25519_scalarbytes()) | 0;
  if (x.length !== x_length) {
      _free_and_throw_type_error(address_pool, "invalid x length");
  }
  x_address = _to_allocated_buf_address(x);
  address_pool.push(x_address);

  // ---------- input: y (buf)

  y = _any_to_Uint8Array(address_pool, y, "y");
  var y_address, y_length = (libsodium._crypto_core_ed25519_scalarbytes()) | 0;
  if (y.length !== y_length) {
      _free_and_throw_type_error(address_pool, "invalid y length");
  }
  y_address = _to_allocated_buf_address(y);
  address_pool.push(y_address);

  // ---------- output z (buf)

  var z_length = (libsodium._crypto_core_ed25519_scalarbytes()) | 0,
      z = new AllocatedBuf(z_length),
      z_address = z.address;

  address_pool.push(z_address);

  libsodium._crypto_core_ed25519_scalar_mul(z_address, x_address, y_address);
  var ret = (_format_output(z, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_core_ed25519_scalar_negate(s, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: s (buf)

  s = _any_to_Uint8Array(address_pool, s, "s");
  var s_address, s_length = (libsodium._crypto_core_ed25519_scalarbytes()) | 0;
  if (s.length !== s_length) {
      _free_and_throw_type_error(address_pool, "invalid s length");
  }
  s_address = _to_allocated_buf_address(s);
  address_pool.push(s_address);

  // ---------- output neg (buf)

  var neg_length = (libsodium._crypto_core_ed25519_scalarbytes()) | 0,
      neg = new AllocatedBuf(neg_length),
      neg_address = neg.address;

  address_pool.push(neg_address);

  libsodium._crypto_core_ed25519_scalar_negate(neg_address, s_address);
  var ret = (_format_output(neg, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_core_ed25519_scalar_random(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output r (buf)

  var r_length = (libsodium._crypto_core_ed25519_scalarbytes()) | 0,
      r = new AllocatedBuf(r_length),
      r_address = r.address;

  address_pool.push(r_address);

  libsodium._crypto_core_ed25519_scalar_random(r_address);
  var ret = (_format_output(r, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_core_ed25519_scalar_reduce(sample, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: sample (buf)

  sample = _any_to_Uint8Array(address_pool, sample, "sample");
  var sample_address, sample_length = (libsodium._crypto_core_ed25519_nonreducedscalarbytes()) | 0;
  if (sample.length !== sample_length) {
      _free_and_throw_type_error(address_pool, "invalid sample length");
  }
  sample_address = _to_allocated_buf_address(sample);
  address_pool.push(sample_address);

  // ---------- output result (buf)

  var result_length = (libsodium._crypto_core_ed25519_scalarbytes()) | 0,
      result = new AllocatedBuf(result_length),
      result_address = result.address;

  address_pool.push(result_address);

  libsodium._crypto_core_ed25519_scalar_reduce(result_address, sample_address);
  var ret = (_format_output(result, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_core_ed25519_scalar_sub(x, y, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: x (buf)

  x = _any_to_Uint8Array(address_pool, x, "x");
  var x_address, x_length = (libsodium._crypto_core_ed25519_scalarbytes()) | 0;
  if (x.length !== x_length) {
      _free_and_throw_type_error(address_pool, "invalid x length");
  }
  x_address = _to_allocated_buf_address(x);
  address_pool.push(x_address);

  // ---------- input: y (buf)

  y = _any_to_Uint8Array(address_pool, y, "y");
  var y_address, y_length = (libsodium._crypto_core_ed25519_scalarbytes()) | 0;
  if (y.length !== y_length) {
      _free_and_throw_type_error(address_pool, "invalid y length");
  }
  y_address = _to_allocated_buf_address(y);
  address_pool.push(y_address);

  // ---------- output z (buf)

  var z_length = (libsodium._crypto_core_ed25519_scalarbytes()) | 0,
      z = new AllocatedBuf(z_length),
      z_address = z.address;

  address_pool.push(z_address);

  libsodium._crypto_core_ed25519_scalar_sub(z_address, x_address, y_address);
  var ret = (_format_output(z, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_core_ed25519_sub(p, q, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: p (buf)

  p = _any_to_Uint8Array(address_pool, p, "p");
  var p_address, p_length = (libsodium._crypto_core_ed25519_bytes()) | 0;
  if (p.length !== p_length) {
      _free_and_throw_type_error(address_pool, "invalid p length");
  }
  p_address = _to_allocated_buf_address(p);
  address_pool.push(p_address);

  // ---------- input: q (buf)

  q = _any_to_Uint8Array(address_pool, q, "q");
  var q_address, q_length = (libsodium._crypto_core_ed25519_bytes()) | 0;
  if (q.length !== q_length) {
      _free_and_throw_type_error(address_pool, "invalid q length");
  }
  q_address = _to_allocated_buf_address(q);
  address_pool.push(q_address);

  // ---------- output r (buf)

  var r_length = (libsodium._crypto_core_ed25519_bytes()) | 0,
      r = new AllocatedBuf(r_length),
      r_address = r.address;

  address_pool.push(r_address);

  if ((libsodium._crypto_core_ed25519_sub(r_address, p_address, q_address) | 0) === 0) {
  	var ret = _format_output(r, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "input is an invalid element");
}

export function crypto_core_hchacha20(input, privateKey, constant, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: input (buf)

  input = _any_to_Uint8Array(address_pool, input, "input");
  var input_address, input_length = (libsodium._crypto_core_hchacha20_inputbytes()) | 0;
  if (input.length !== input_length) {
      _free_and_throw_type_error(address_pool, "invalid input length");
  }
  input_address = _to_allocated_buf_address(input);
  address_pool.push(input_address);

  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_core_hchacha20_keybytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- input: constant (unsized_buf_optional)

  var constant_address = null, constant_length = 0;
  if (constant != undefined) {
          constant = _any_to_Uint8Array(address_pool, constant, "constant");
          constant_address = _to_allocated_buf_address(constant);
          constant_length = constant.length;
          address_pool.push(constant_address);
  }

  // ---------- output hash (buf)

  var hash_length = (libsodium._crypto_core_hchacha20_outputbytes()) | 0,
      hash = new AllocatedBuf(hash_length),
      hash_address = hash.address;

  address_pool.push(hash_address);

  if ((libsodium._crypto_core_hchacha20(hash_address, input_address, privateKey_address, constant_address) | 0) === 0) {
  	var ret = _format_output(hash, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_core_hsalsa20(input, privateKey, constant, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: input (buf)

  input = _any_to_Uint8Array(address_pool, input, "input");
  var input_address, input_length = (libsodium._crypto_core_hsalsa20_inputbytes()) | 0;
  if (input.length !== input_length) {
      _free_and_throw_type_error(address_pool, "invalid input length");
  }
  input_address = _to_allocated_buf_address(input);
  address_pool.push(input_address);

  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_core_hsalsa20_keybytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- input: constant (unsized_buf_optional)

  var constant_address = null, constant_length = 0;
  if (constant != undefined) {
          constant = _any_to_Uint8Array(address_pool, constant, "constant");
          constant_address = _to_allocated_buf_address(constant);
          constant_length = constant.length;
          address_pool.push(constant_address);
  }

  // ---------- output hash (buf)

  var hash_length = (libsodium._crypto_core_hsalsa20_outputbytes()) | 0,
      hash = new AllocatedBuf(hash_length),
      hash_address = hash.address;

  address_pool.push(hash_address);

  if ((libsodium._crypto_core_hsalsa20(hash_address, input_address, privateKey_address, constant_address) | 0) === 0) {
  	var ret = _format_output(hash, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_core_ristretto255_add(p, q, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: p (buf)

  p = _any_to_Uint8Array(address_pool, p, "p");
  var p_address, p_length = (libsodium._crypto_core_ristretto255_bytes()) | 0;
  if (p.length !== p_length) {
      _free_and_throw_type_error(address_pool, "invalid p length");
  }
  p_address = _to_allocated_buf_address(p);
  address_pool.push(p_address);

  // ---------- input: q (buf)

  q = _any_to_Uint8Array(address_pool, q, "q");
  var q_address, q_length = (libsodium._crypto_core_ristretto255_bytes()) | 0;
  if (q.length !== q_length) {
      _free_and_throw_type_error(address_pool, "invalid q length");
  }
  q_address = _to_allocated_buf_address(q);
  address_pool.push(q_address);

  // ---------- output r (buf)

  var r_length = (libsodium._crypto_core_ristretto255_bytes()) | 0,
      r = new AllocatedBuf(r_length),
      r_address = r.address;

  address_pool.push(r_address);

  if ((libsodium._crypto_core_ristretto255_add(r_address, p_address, q_address) | 0) === 0) {
  	var ret = _format_output(r, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "input is an invalid element");
}

export function crypto_core_ristretto255_from_hash(r, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: r (unsized_buf)

  r = _any_to_Uint8Array(address_pool, r, "r");
  var r_address = _to_allocated_buf_address(r),
      r_length = r.length;
  address_pool.push(r_address);

  // ---------- output point (buf)

  var point_length = (libsodium._crypto_core_ristretto255_bytes()) | 0,
      point = new AllocatedBuf(point_length),
      point_address = point.address;

  address_pool.push(point_address);

  if ((libsodium._crypto_core_ristretto255_from_hash(point_address, r_address) | 0) === 0) {
  	var ret = _format_output(point, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_core_ristretto255_is_valid_point(repr, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: repr (buf)

  repr = _any_to_Uint8Array(address_pool, repr, "repr");
  var repr_address, repr_length = (libsodium._crypto_core_ristretto255_bytes()) | 0;
  if (repr.length !== repr_length) {
      _free_and_throw_type_error(address_pool, "invalid repr length");
  }
  repr_address = _to_allocated_buf_address(repr);
  address_pool.push(repr_address);

  var result = libsodium._crypto_core_ristretto255_is_valid_point(repr_address) | 0;
  var ret = (result === 1);
  _free_all(address_pool);
  return ret;
}

export function crypto_core_ristretto255_random(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output p (buf)

  var p_length = (libsodium._crypto_core_ristretto255_bytes()) | 0,
      p = new AllocatedBuf(p_length),
      p_address = p.address;

  address_pool.push(p_address);

  libsodium._crypto_core_ristretto255_random(p_address);
  var ret = (_format_output(p, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_core_ristretto255_scalar_add(x, y, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: x (buf)

  x = _any_to_Uint8Array(address_pool, x, "x");
  var x_address, x_length = (libsodium._crypto_core_ristretto255_scalarbytes()) | 0;
  if (x.length !== x_length) {
      _free_and_throw_type_error(address_pool, "invalid x length");
  }
  x_address = _to_allocated_buf_address(x);
  address_pool.push(x_address);

  // ---------- input: y (buf)

  y = _any_to_Uint8Array(address_pool, y, "y");
  var y_address, y_length = (libsodium._crypto_core_ristretto255_scalarbytes()) | 0;
  if (y.length !== y_length) {
      _free_and_throw_type_error(address_pool, "invalid y length");
  }
  y_address = _to_allocated_buf_address(y);
  address_pool.push(y_address);

  // ---------- output z (buf)

  var z_length = (libsodium._crypto_core_ristretto255_scalarbytes()) | 0,
      z = new AllocatedBuf(z_length),
      z_address = z.address;

  address_pool.push(z_address);

  libsodium._crypto_core_ristretto255_scalar_add(z_address, x_address, y_address);
  var ret = (_format_output(z, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_core_ristretto255_scalar_complement(s, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: s (buf)

  s = _any_to_Uint8Array(address_pool, s, "s");
  var s_address, s_length = (libsodium._crypto_core_ristretto255_scalarbytes()) | 0;
  if (s.length !== s_length) {
      _free_and_throw_type_error(address_pool, "invalid s length");
  }
  s_address = _to_allocated_buf_address(s);
  address_pool.push(s_address);

  // ---------- output comp (buf)

  var comp_length = (libsodium._crypto_core_ristretto255_scalarbytes()) | 0,
      comp = new AllocatedBuf(comp_length),
      comp_address = comp.address;

  address_pool.push(comp_address);

  libsodium._crypto_core_ristretto255_scalar_complement(comp_address, s_address);
  var ret = (_format_output(comp, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_core_ristretto255_scalar_invert(s, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: s (buf)

  s = _any_to_Uint8Array(address_pool, s, "s");
  var s_address, s_length = (libsodium._crypto_core_ristretto255_scalarbytes()) | 0;
  if (s.length !== s_length) {
      _free_and_throw_type_error(address_pool, "invalid s length");
  }
  s_address = _to_allocated_buf_address(s);
  address_pool.push(s_address);

  // ---------- output recip (buf)

  var recip_length = (libsodium._crypto_core_ristretto255_scalarbytes()) | 0,
      recip = new AllocatedBuf(recip_length),
      recip_address = recip.address;

  address_pool.push(recip_address);

  if ((libsodium._crypto_core_ristretto255_scalar_invert(recip_address, s_address) | 0) === 0) {
  	var ret = _format_output(recip, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid reciprocate");
}

export function crypto_core_ristretto255_scalar_mul(x, y, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: x (buf)

  x = _any_to_Uint8Array(address_pool, x, "x");
  var x_address, x_length = (libsodium._crypto_core_ristretto255_scalarbytes()) | 0;
  if (x.length !== x_length) {
      _free_and_throw_type_error(address_pool, "invalid x length");
  }
  x_address = _to_allocated_buf_address(x);
  address_pool.push(x_address);

  // ---------- input: y (buf)

  y = _any_to_Uint8Array(address_pool, y, "y");
  var y_address, y_length = (libsodium._crypto_core_ristretto255_scalarbytes()) | 0;
  if (y.length !== y_length) {
      _free_and_throw_type_error(address_pool, "invalid y length");
  }
  y_address = _to_allocated_buf_address(y);
  address_pool.push(y_address);

  // ---------- output z (buf)

  var z_length = (libsodium._crypto_core_ristretto255_scalarbytes()) | 0,
      z = new AllocatedBuf(z_length),
      z_address = z.address;

  address_pool.push(z_address);

  libsodium._crypto_core_ristretto255_scalar_mul(z_address, x_address, y_address);
  var ret = (_format_output(z, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_core_ristretto255_scalar_negate(s, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: s (buf)

  s = _any_to_Uint8Array(address_pool, s, "s");
  var s_address, s_length = (libsodium._crypto_core_ristretto255_scalarbytes()) | 0;
  if (s.length !== s_length) {
      _free_and_throw_type_error(address_pool, "invalid s length");
  }
  s_address = _to_allocated_buf_address(s);
  address_pool.push(s_address);

  // ---------- output neg (buf)

  var neg_length = (libsodium._crypto_core_ristretto255_scalarbytes()) | 0,
      neg = new AllocatedBuf(neg_length),
      neg_address = neg.address;

  address_pool.push(neg_address);

  libsodium._crypto_core_ristretto255_scalar_negate(neg_address, s_address);
  var ret = (_format_output(neg, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_core_ristretto255_scalar_random(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output r (buf)

  var r_length = (libsodium._crypto_core_ristretto255_scalarbytes()) | 0,
      r = new AllocatedBuf(r_length),
      r_address = r.address;

  address_pool.push(r_address);

  libsodium._crypto_core_ristretto255_scalar_random(r_address);
  var ret = (_format_output(r, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_core_ristretto255_scalar_reduce(sample, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: sample (buf)

  sample = _any_to_Uint8Array(address_pool, sample, "sample");
  var sample_address, sample_length = (libsodium._crypto_core_ristretto255_nonreducedscalarbytes()) | 0;
  if (sample.length !== sample_length) {
      _free_and_throw_type_error(address_pool, "invalid sample length");
  }
  sample_address = _to_allocated_buf_address(sample);
  address_pool.push(sample_address);

  // ---------- output result (buf)

  var result_length = (libsodium._crypto_core_ristretto255_scalarbytes()) | 0,
      result = new AllocatedBuf(result_length),
      result_address = result.address;

  address_pool.push(result_address);

  libsodium._crypto_core_ristretto255_scalar_reduce(result_address, sample_address);
  var ret = (_format_output(result, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_core_ristretto255_scalar_sub(x, y, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: x (buf)

  x = _any_to_Uint8Array(address_pool, x, "x");
  var x_address, x_length = (libsodium._crypto_core_ristretto255_scalarbytes()) | 0;
  if (x.length !== x_length) {
      _free_and_throw_type_error(address_pool, "invalid x length");
  }
  x_address = _to_allocated_buf_address(x);
  address_pool.push(x_address);

  // ---------- input: y (buf)

  y = _any_to_Uint8Array(address_pool, y, "y");
  var y_address, y_length = (libsodium._crypto_core_ristretto255_scalarbytes()) | 0;
  if (y.length !== y_length) {
      _free_and_throw_type_error(address_pool, "invalid y length");
  }
  y_address = _to_allocated_buf_address(y);
  address_pool.push(y_address);

  // ---------- output z (buf)

  var z_length = (libsodium._crypto_core_ristretto255_scalarbytes()) | 0,
      z = new AllocatedBuf(z_length),
      z_address = z.address;

  address_pool.push(z_address);

  libsodium._crypto_core_ristretto255_scalar_sub(z_address, x_address, y_address);
  var ret = (_format_output(z, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_core_ristretto255_sub(p, q, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: p (buf)

  p = _any_to_Uint8Array(address_pool, p, "p");
  var p_address, p_length = (libsodium._crypto_core_ristretto255_bytes()) | 0;
  if (p.length !== p_length) {
      _free_and_throw_type_error(address_pool, "invalid p length");
  }
  p_address = _to_allocated_buf_address(p);
  address_pool.push(p_address);

  // ---------- input: q (buf)

  q = _any_to_Uint8Array(address_pool, q, "q");
  var q_address, q_length = (libsodium._crypto_core_ristretto255_bytes()) | 0;
  if (q.length !== q_length) {
      _free_and_throw_type_error(address_pool, "invalid q length");
  }
  q_address = _to_allocated_buf_address(q);
  address_pool.push(q_address);

  // ---------- output r (buf)

  var r_length = (libsodium._crypto_core_ristretto255_bytes()) | 0,
      r = new AllocatedBuf(r_length),
      r_address = r.address;

  address_pool.push(r_address);

  if ((libsodium._crypto_core_ristretto255_sub(r_address, p_address, q_address) | 0) === 0) {
  	var ret = _format_output(r, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "input is an invalid element");
}

export function crypto_generichash(hash_length, message, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: hash_length (uint)

  _require_defined(address_pool, hash_length, "hash_length");

  if (!(typeof hash_length === "number" && (hash_length | 0) === hash_length) || hash_length < 0) {
          _free_and_throw_type_error(address_pool, "hash_length must be an unsigned integer");
  }

  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: key (unsized_buf_optional)

  var key_address = null, key_length = 0;
  if (key != undefined) {
          key = _any_to_Uint8Array(address_pool, key, "key");
          key_address = _to_allocated_buf_address(key);
          key_length = key.length;
          address_pool.push(key_address);
  }

  // ---------- output hash (buf)

  var hash_length = (hash_length) | 0,
      hash = new AllocatedBuf(hash_length),
      hash_address = hash.address;

  address_pool.push(hash_address);

  if ((libsodium._crypto_generichash(hash_address, hash_length, message_address, message_length, 0, key_address, key_length) | 0) === 0) {
  	var ret = _format_output(hash, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_generichash_blake2b_salt_personal(subkey_len, key, id, ctx, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: subkey_len (uint)

  _require_defined(address_pool, subkey_len, "subkey_len");

  if (!(typeof subkey_len === "number" && (subkey_len | 0) === subkey_len) || subkey_len < 0) {
          _free_and_throw_type_error(address_pool, "subkey_len must be an unsigned integer");
  }

  // ---------- input: key (unsized_buf_optional)

  var key_address = null, key_length = 0;
  if (key != undefined) {
          key = _any_to_Uint8Array(address_pool, key, "key");
          key_address = _to_allocated_buf_address(key);
          key_length = key.length;
          address_pool.push(key_address);
  }

  // ---------- input: id (buf_optional)

  var id_address = null, id_length = 0;
  if (id != undefined) {
          id = _any_to_Uint8Array(address_pool, id, "id");
          id_length = (libsodium._crypto_generichash_blake2b_saltbytes()) | 0;
          if (id.length !== id_length) {
              _free_and_throw_type_error(address_pool, "invalid id length");
          }
          id_address = _to_allocated_buf_address(id);
          address_pool.push(id_address);
  }

  // ---------- input: ctx (buf_optional)

  var ctx_address = null, ctx_length = 0;
  if (ctx != undefined) {
          ctx = _any_to_Uint8Array(address_pool, ctx, "ctx");
          ctx_length = (libsodium._crypto_generichash_blake2b_personalbytes()) | 0;
          if (ctx.length !== ctx_length) {
              _free_and_throw_type_error(address_pool, "invalid ctx length");
          }
          ctx_address = _to_allocated_buf_address(ctx);
          address_pool.push(ctx_address);
  }

  // ---------- output subkey (buf)

  var subkey_length = (subkey_len) | 0,
      subkey = new AllocatedBuf(subkey_length),
      subkey_address = subkey.address;

  address_pool.push(subkey_address);

  if ((libsodium._crypto_generichash_blake2b_salt_personal(subkey_address, subkey_len, null, 0, 0, key_address, key_length, id_address, ctx_address) | 0) === 0) {
  	var ret = _format_output(subkey, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_generichash_final(state_address, hash_length, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: state_address (generichash_state_address)

  _require_defined(address_pool, state_address, "state_address");

  // ---------- input: hash_length (uint)

  _require_defined(address_pool, hash_length, "hash_length");

  if (!(typeof hash_length === "number" && (hash_length | 0) === hash_length) || hash_length < 0) {
          _free_and_throw_type_error(address_pool, "hash_length must be an unsigned integer");
  }

  // ---------- output hash (buf)

  var hash_length = (hash_length) | 0,
      hash = new AllocatedBuf(hash_length),
      hash_address = hash.address;

  address_pool.push(hash_address);

  if ((libsodium._crypto_generichash_final(state_address, hash_address, hash_length) | 0) === 0) {
  	var ret = (libsodium._free(state_address), _format_output(hash, outputFormat));
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_generichash_init(key, hash_length, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: key (unsized_buf_optional)

  var key_address = null, key_length = 0;
  if (key != undefined) {
          key = _any_to_Uint8Array(address_pool, key, "key");
          key_address = _to_allocated_buf_address(key);
          key_length = key.length;
          address_pool.push(key_address);
  }

  // ---------- input: hash_length (uint)

  _require_defined(address_pool, hash_length, "hash_length");

  if (!(typeof hash_length === "number" && (hash_length | 0) === hash_length) || hash_length < 0) {
          _free_and_throw_type_error(address_pool, "hash_length must be an unsigned integer");
  }

  // ---------- output state (generichash_state)

  var state_address = new AllocatedBuf(357).address;

  if ((libsodium._crypto_generichash_init(state_address, key_address, key_length, hash_length) | 0) === 0) {
  	var ret = state_address;
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_generichash_keygen(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output output (buf)

  var output_length = (libsodium._crypto_generichash_keybytes()) | 0,
      output = new AllocatedBuf(output_length),
      output_address = output.address;

  address_pool.push(output_address);

  libsodium._crypto_generichash_keygen(output_address);
  var ret = (_format_output(output, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_generichash_update(state_address, message_chunk, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: state_address (generichash_state_address)

  _require_defined(address_pool, state_address, "state_address");

  // ---------- input: message_chunk (unsized_buf)

  message_chunk = _any_to_Uint8Array(address_pool, message_chunk, "message_chunk");
  var message_chunk_address = _to_allocated_buf_address(message_chunk),
      message_chunk_length = message_chunk.length;
  address_pool.push(message_chunk_address);

  if (!((libsodium._crypto_generichash_update(state_address, message_chunk_address, message_chunk_length) | 0) === 0)) {
  	_free_and_throw_error(address_pool, "invalid usage");
  }
  _free_all(address_pool);
}

export function crypto_hash(message, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- output hash (buf)

  var hash_length = (libsodium._crypto_hash_bytes()) | 0,
      hash = new AllocatedBuf(hash_length),
      hash_address = hash.address;

  address_pool.push(hash_address);

  if ((libsodium._crypto_hash(hash_address, message_address, message_length, 0) | 0) === 0) {
  	var ret = _format_output(hash, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_hash_sha256(message, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- output hash (buf)

  var hash_length = (libsodium._crypto_hash_sha256_bytes()) | 0,
      hash = new AllocatedBuf(hash_length),
      hash_address = hash.address;

  address_pool.push(hash_address);

  if ((libsodium._crypto_hash_sha256(hash_address, message_address, message_length, 0) | 0) === 0) {
  	var ret = _format_output(hash, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_hash_sha256_final(state_address, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: state_address (hash_sha256_state_address)

  _require_defined(address_pool, state_address, "state_address");

  // ---------- output hash (buf)

  var hash_length = (libsodium._crypto_hash_sha256_bytes()) | 0,
      hash = new AllocatedBuf(hash_length),
      hash_address = hash.address;

  address_pool.push(hash_address);

  if ((libsodium._crypto_hash_sha256_final(state_address, hash_address) | 0) === 0) {
  	var ret = (libsodium._free(state_address), _format_output(hash, outputFormat));
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_hash_sha256_init(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output state (hash_sha256_state)

  var state_address = new AllocatedBuf(104).address;

  if ((libsodium._crypto_hash_sha256_init(state_address) | 0) === 0) {
  	var ret = state_address;
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_hash_sha256_update(state_address, message_chunk, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: state_address (hash_sha256_state_address)

  _require_defined(address_pool, state_address, "state_address");

  // ---------- input: message_chunk (unsized_buf)

  message_chunk = _any_to_Uint8Array(address_pool, message_chunk, "message_chunk");
  var message_chunk_address = _to_allocated_buf_address(message_chunk),
      message_chunk_length = message_chunk.length;
  address_pool.push(message_chunk_address);

  if (!((libsodium._crypto_hash_sha256_update(state_address, message_chunk_address, message_chunk_length) | 0) === 0)) {
  	_free_and_throw_error(address_pool, "invalid usage");
  }
  _free_all(address_pool);
}

export function crypto_hash_sha512(message, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- output hash (buf)

  var hash_length = (libsodium._crypto_hash_sha512_bytes()) | 0,
      hash = new AllocatedBuf(hash_length),
      hash_address = hash.address;

  address_pool.push(hash_address);

  if ((libsodium._crypto_hash_sha512(hash_address, message_address, message_length, 0) | 0) === 0) {
  	var ret = _format_output(hash, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_hash_sha512_final(state_address, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: state_address (hash_sha512_state_address)

  _require_defined(address_pool, state_address, "state_address");

  // ---------- output hash (buf)

  var hash_length = (libsodium._crypto_hash_sha512_bytes()) | 0,
      hash = new AllocatedBuf(hash_length),
      hash_address = hash.address;

  address_pool.push(hash_address);

  if ((libsodium._crypto_hash_sha512_final(state_address, hash_address) | 0) === 0) {
  	var ret = (libsodium._free(state_address), _format_output(hash, outputFormat));
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_hash_sha512_init(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output state (hash_sha512_state)

  var state_address = new AllocatedBuf(208).address;

  if ((libsodium._crypto_hash_sha512_init(state_address) | 0) === 0) {
  	var ret = state_address;
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_hash_sha512_update(state_address, message_chunk, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: state_address (hash_sha512_state_address)

  _require_defined(address_pool, state_address, "state_address");

  // ---------- input: message_chunk (unsized_buf)

  message_chunk = _any_to_Uint8Array(address_pool, message_chunk, "message_chunk");
  var message_chunk_address = _to_allocated_buf_address(message_chunk),
      message_chunk_length = message_chunk.length;
  address_pool.push(message_chunk_address);

  if (!((libsodium._crypto_hash_sha512_update(state_address, message_chunk_address, message_chunk_length) | 0) === 0)) {
  	_free_and_throw_error(address_pool, "invalid usage");
  }
  _free_all(address_pool);
}

export function crypto_kdf_derive_from_key(subkey_len, subkey_id, ctx, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: subkey_len (uint)

  _require_defined(address_pool, subkey_len, "subkey_len");

  if (!(typeof subkey_len === "number" && (subkey_len | 0) === subkey_len) || subkey_len < 0) {
          _free_and_throw_type_error(address_pool, "subkey_len must be an unsigned integer");
  }

  // ---------- input: subkey_id (u64)

  _require_defined(address_pool, subkey_id, "subkey_id");
  var subkey_id_hi = 0, subkey_id_lo;
  if (typeof subkey_id === "bigint" && subkey_id >= BigInt(0)) {
          const hi = subkey_id >> BigInt(32);
          if (hi > BigInt(4294967295)) {
                  _free_and_throw_type_error(address_pool, "subkey_id cannot be more than 64 bits");
          }        
          subkey_id_hi = Number(hi);
          subkey_id_lo = Number(subkey_id & BigInt(4294967295));
  } else if (typeof subkey_id === "number" && (subkey_id | 0) === subkey_id && subkey_id >= 0) {
          subkey_id_lo = subkey_id
  } else {
          _free_and_throw_type_error(address_pool, "subkey_id must be an unsigned integer or bigint");
  }

  // ---------- input: ctx (string)

  if (typeof ctx !== "string") {
      _free_and_throw_type_error(address_pool, "ctx must be a string");
  }
  ctx = from_string(ctx + "\0");
  if (ctx_length != undefined && ctx.length - 1 !== ctx_length) {
      _free_and_throw_type_error(address_pool, "invalid ctx length");
  }
  var ctx_address = _to_allocated_buf_address(ctx),
      ctx_length = ctx.length - 1;
  address_pool.push(ctx_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_kdf_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output subkey (buf)

  var subkey_length = (subkey_len) | 0,
      subkey = new AllocatedBuf(subkey_length),
      subkey_address = subkey.address;

  address_pool.push(subkey_address);

  libsodium._crypto_kdf_derive_from_key(subkey_address, subkey_len, subkey_id_lo, subkey_id_hi, ctx_address, key_address);
  var ret = (_format_output(subkey, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_kdf_keygen(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output output (buf)

  var output_length = (libsodium._crypto_kdf_keybytes()) | 0,
      output = new AllocatedBuf(output_length),
      output_address = output.address;

  address_pool.push(output_address);

  libsodium._crypto_kdf_keygen(output_address);
  var ret = (_format_output(output, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_kx_client_session_keys(clientPublicKey, clientSecretKey, serverPublicKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: clientPublicKey (buf)

  clientPublicKey = _any_to_Uint8Array(address_pool, clientPublicKey, "clientPublicKey");
  var clientPublicKey_address, clientPublicKey_length = (libsodium._crypto_kx_publickeybytes()) | 0;
  if (clientPublicKey.length !== clientPublicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid clientPublicKey length");
  }
  clientPublicKey_address = _to_allocated_buf_address(clientPublicKey);
  address_pool.push(clientPublicKey_address);

  // ---------- input: clientSecretKey (buf)

  clientSecretKey = _any_to_Uint8Array(address_pool, clientSecretKey, "clientSecretKey");
  var clientSecretKey_address, clientSecretKey_length = (libsodium._crypto_kx_secretkeybytes()) | 0;
  if (clientSecretKey.length !== clientSecretKey_length) {
      _free_and_throw_type_error(address_pool, "invalid clientSecretKey length");
  }
  clientSecretKey_address = _to_allocated_buf_address(clientSecretKey);
  address_pool.push(clientSecretKey_address);

  // ---------- input: serverPublicKey (buf)

  serverPublicKey = _any_to_Uint8Array(address_pool, serverPublicKey, "serverPublicKey");
  var serverPublicKey_address, serverPublicKey_length = (libsodium._crypto_kx_publickeybytes()) | 0;
  if (serverPublicKey.length !== serverPublicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid serverPublicKey length");
  }
  serverPublicKey_address = _to_allocated_buf_address(serverPublicKey);
  address_pool.push(serverPublicKey_address);

  // ---------- output sharedRx (buf)

  var sharedRx_length = (libsodium._crypto_kx_sessionkeybytes()) | 0,
      sharedRx = new AllocatedBuf(sharedRx_length),
      sharedRx_address = sharedRx.address;

  address_pool.push(sharedRx_address);

  // ---------- output sharedTx (buf)

  var sharedTx_length = (libsodium._crypto_kx_sessionkeybytes()) | 0,
      sharedTx = new AllocatedBuf(sharedTx_length),
      sharedTx_address = sharedTx.address;

  address_pool.push(sharedTx_address);

  if ((libsodium._crypto_kx_client_session_keys(sharedRx_address, sharedTx_address, clientPublicKey_address, clientSecretKey_address, serverPublicKey_address) | 0) === 0) {
  	var ret = _format_output({sharedRx: sharedRx, sharedTx: sharedTx}, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_kx_keypair(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output publicKey (buf)

  var publicKey_length = (libsodium._crypto_kx_publickeybytes()) | 0,
      publicKey = new AllocatedBuf(publicKey_length),
      publicKey_address = publicKey.address;

  address_pool.push(publicKey_address);

  // ---------- output privateKey (buf)

  var privateKey_length = (libsodium._crypto_kx_secretkeybytes()) | 0,
      privateKey = new AllocatedBuf(privateKey_length),
      privateKey_address = privateKey.address;

  address_pool.push(privateKey_address);

  if ((libsodium._crypto_kx_keypair(publicKey_address, privateKey_address) | 0) === 0) {
  	var ret = {publicKey: _format_output(publicKey, outputFormat), privateKey: _format_output(privateKey, outputFormat), keyType: 'x25519'};
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "internal error");
}

export function crypto_kx_seed_keypair(seed, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: seed (buf)

  seed = _any_to_Uint8Array(address_pool, seed, "seed");
  var seed_address, seed_length = (libsodium._crypto_kx_seedbytes()) | 0;
  if (seed.length !== seed_length) {
      _free_and_throw_type_error(address_pool, "invalid seed length");
  }
  seed_address = _to_allocated_buf_address(seed);
  address_pool.push(seed_address);

  // ---------- output publicKey (buf)

  var publicKey_length = (libsodium._crypto_kx_publickeybytes()) | 0,
      publicKey = new AllocatedBuf(publicKey_length),
      publicKey_address = publicKey.address;

  address_pool.push(publicKey_address);

  // ---------- output privateKey (buf)

  var privateKey_length = (libsodium._crypto_kx_secretkeybytes()) | 0,
      privateKey = new AllocatedBuf(privateKey_length),
      privateKey_address = privateKey.address;

  address_pool.push(privateKey_address);

  if ((libsodium._crypto_kx_seed_keypair(publicKey_address, privateKey_address, seed_address) | 0) === 0) {
  	var ret = {publicKey: _format_output(publicKey, outputFormat), privateKey: _format_output(privateKey, outputFormat), keyType: 'x25519'};
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "internal error");
}

export function crypto_kx_server_session_keys(serverPublicKey, serverSecretKey, clientPublicKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: serverPublicKey (buf)

  serverPublicKey = _any_to_Uint8Array(address_pool, serverPublicKey, "serverPublicKey");
  var serverPublicKey_address, serverPublicKey_length = (libsodium._crypto_kx_publickeybytes()) | 0;
  if (serverPublicKey.length !== serverPublicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid serverPublicKey length");
  }
  serverPublicKey_address = _to_allocated_buf_address(serverPublicKey);
  address_pool.push(serverPublicKey_address);

  // ---------- input: serverSecretKey (buf)

  serverSecretKey = _any_to_Uint8Array(address_pool, serverSecretKey, "serverSecretKey");
  var serverSecretKey_address, serverSecretKey_length = (libsodium._crypto_kx_secretkeybytes()) | 0;
  if (serverSecretKey.length !== serverSecretKey_length) {
      _free_and_throw_type_error(address_pool, "invalid serverSecretKey length");
  }
  serverSecretKey_address = _to_allocated_buf_address(serverSecretKey);
  address_pool.push(serverSecretKey_address);

  // ---------- input: clientPublicKey (buf)

  clientPublicKey = _any_to_Uint8Array(address_pool, clientPublicKey, "clientPublicKey");
  var clientPublicKey_address, clientPublicKey_length = (libsodium._crypto_kx_publickeybytes()) | 0;
  if (clientPublicKey.length !== clientPublicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid clientPublicKey length");
  }
  clientPublicKey_address = _to_allocated_buf_address(clientPublicKey);
  address_pool.push(clientPublicKey_address);

  // ---------- output sharedRx (buf)

  var sharedRx_length = (libsodium._crypto_kx_sessionkeybytes()) | 0,
      sharedRx = new AllocatedBuf(sharedRx_length),
      sharedRx_address = sharedRx.address;

  address_pool.push(sharedRx_address);

  // ---------- output sharedTx (buf)

  var sharedTx_length = (libsodium._crypto_kx_sessionkeybytes()) | 0,
      sharedTx = new AllocatedBuf(sharedTx_length),
      sharedTx_address = sharedTx.address;

  address_pool.push(sharedTx_address);

  if ((libsodium._crypto_kx_server_session_keys(sharedRx_address, sharedTx_address, serverPublicKey_address, serverSecretKey_address, clientPublicKey_address) | 0) === 0) {
  	var ret = _format_output({sharedRx: sharedRx, sharedTx: sharedTx}, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_onetimeauth(message, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_onetimeauth_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output hash (buf)

  var hash_length = (libsodium._crypto_onetimeauth_bytes()) | 0,
      hash = new AllocatedBuf(hash_length),
      hash_address = hash.address;

  address_pool.push(hash_address);

  if ((libsodium._crypto_onetimeauth(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
  	var ret = _format_output(hash, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_onetimeauth_final(state_address, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: state_address (onetimeauth_state_address)

  _require_defined(address_pool, state_address, "state_address");

  // ---------- output hash (buf)

  var hash_length = (libsodium._crypto_onetimeauth_bytes()) | 0,
      hash = new AllocatedBuf(hash_length),
      hash_address = hash.address;

  address_pool.push(hash_address);

  if ((libsodium._crypto_onetimeauth_final(state_address, hash_address) | 0) === 0) {
  	var ret = (libsodium._free(state_address), _format_output(hash, outputFormat));
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_onetimeauth_init(key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: key (unsized_buf_optional)

  var key_address = null, key_length = 0;
  if (key != undefined) {
          key = _any_to_Uint8Array(address_pool, key, "key");
          key_address = _to_allocated_buf_address(key);
          key_length = key.length;
          address_pool.push(key_address);
  }

  // ---------- output state (onetimeauth_state)

  var state_address = new AllocatedBuf(144).address;

  if ((libsodium._crypto_onetimeauth_init(state_address, key_address) | 0) === 0) {
  	var ret = state_address;
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_onetimeauth_keygen(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output output (buf)

  var output_length = (libsodium._crypto_onetimeauth_keybytes()) | 0,
      output = new AllocatedBuf(output_length),
      output_address = output.address;

  address_pool.push(output_address);

  libsodium._crypto_onetimeauth_keygen(output_address);
  var ret = (_format_output(output, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_onetimeauth_update(state_address, message_chunk, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: state_address (onetimeauth_state_address)

  _require_defined(address_pool, state_address, "state_address");

  // ---------- input: message_chunk (unsized_buf)

  message_chunk = _any_to_Uint8Array(address_pool, message_chunk, "message_chunk");
  var message_chunk_address = _to_allocated_buf_address(message_chunk),
      message_chunk_length = message_chunk.length;
  address_pool.push(message_chunk_address);

  if (!((libsodium._crypto_onetimeauth_update(state_address, message_chunk_address, message_chunk_length) | 0) === 0)) {
  	_free_and_throw_error(address_pool, "invalid usage");
  }
  _free_all(address_pool);
}

export function crypto_onetimeauth_verify(hash, message, key) {
  var address_pool = [];

  // ---------- input: hash (buf)

  hash = _any_to_Uint8Array(address_pool, hash, "hash");
  var hash_address, hash_length = (libsodium._crypto_onetimeauth_bytes()) | 0;
  if (hash.length !== hash_length) {
      _free_and_throw_type_error(address_pool, "invalid hash length");
  }
  hash_address = _to_allocated_buf_address(hash);
  address_pool.push(hash_address);

  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_onetimeauth_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  var result = libsodium._crypto_onetimeauth_verify(hash_address, message_address, message_length, 0, key_address) | 0;
  var ret = (result === 0);
  _free_all(address_pool);
  return ret;
}

export function crypto_pwhash(keyLength, password, salt, opsLimit, memLimit, algorithm, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: keyLength (uint)

  _require_defined(address_pool, keyLength, "keyLength");

  if (!(typeof keyLength === "number" && (keyLength | 0) === keyLength) || keyLength < 0) {
          _free_and_throw_type_error(address_pool, "keyLength must be an unsigned integer");
  }

  // ---------- input: password (unsized_buf)

  password = _any_to_Uint8Array(address_pool, password, "password");
  var password_address = _to_allocated_buf_address(password),
      password_length = password.length;
  address_pool.push(password_address);

  // ---------- input: salt (buf)

  salt = _any_to_Uint8Array(address_pool, salt, "salt");
  var salt_address, salt_length = (libsodium._crypto_pwhash_saltbytes()) | 0;
  if (salt.length !== salt_length) {
      _free_and_throw_type_error(address_pool, "invalid salt length");
  }
  salt_address = _to_allocated_buf_address(salt);
  address_pool.push(salt_address);

  // ---------- input: opsLimit (uint)

  _require_defined(address_pool, opsLimit, "opsLimit");

  if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) || opsLimit < 0) {
          _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
  }

  // ---------- input: memLimit (uint)

  _require_defined(address_pool, memLimit, "memLimit");

  if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) || memLimit < 0) {
          _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
  }

  // ---------- input: algorithm (uint)

  _require_defined(address_pool, algorithm, "algorithm");

  if (!(typeof algorithm === "number" && (algorithm | 0) === algorithm) || algorithm < 0) {
          _free_and_throw_type_error(address_pool, "algorithm must be an unsigned integer");
  }

  // ---------- output derivedKey (buf)

  var derivedKey_length = (keyLength) | 0,
      derivedKey = new AllocatedBuf(derivedKey_length),
      derivedKey_address = derivedKey.address;

  address_pool.push(derivedKey_address);

  if ((libsodium._crypto_pwhash(derivedKey_address, keyLength, 0, password_address, password_length, 0, salt_address, opsLimit, 0, memLimit, algorithm) | 0) === 0) {
  	var ret = _format_output(derivedKey, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_pwhash_scryptsalsa208sha256(keyLength, password, salt, opsLimit, memLimit, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: keyLength (uint)

  _require_defined(address_pool, keyLength, "keyLength");

  if (!(typeof keyLength === "number" && (keyLength | 0) === keyLength) || keyLength < 0) {
          _free_and_throw_type_error(address_pool, "keyLength must be an unsigned integer");
  }

  // ---------- input: password (unsized_buf)

  password = _any_to_Uint8Array(address_pool, password, "password");
  var password_address = _to_allocated_buf_address(password),
      password_length = password.length;
  address_pool.push(password_address);

  // ---------- input: salt (buf)

  salt = _any_to_Uint8Array(address_pool, salt, "salt");
  var salt_address, salt_length = (libsodium._crypto_pwhash_scryptsalsa208sha256_saltbytes()) | 0;
  if (salt.length !== salt_length) {
      _free_and_throw_type_error(address_pool, "invalid salt length");
  }
  salt_address = _to_allocated_buf_address(salt);
  address_pool.push(salt_address);

  // ---------- input: opsLimit (uint)

  _require_defined(address_pool, opsLimit, "opsLimit");

  if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) || opsLimit < 0) {
          _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
  }

  // ---------- input: memLimit (uint)

  _require_defined(address_pool, memLimit, "memLimit");

  if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) || memLimit < 0) {
          _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
  }

  // ---------- output derivedKey (buf)

  var derivedKey_length = (keyLength) | 0,
      derivedKey = new AllocatedBuf(derivedKey_length),
      derivedKey_address = derivedKey.address;

  address_pool.push(derivedKey_address);

  if ((libsodium._crypto_pwhash_scryptsalsa208sha256(derivedKey_address, keyLength, 0, password_address, password_length, 0, salt_address, opsLimit, 0, memLimit) | 0) === 0) {
  	var ret = _format_output(derivedKey, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_pwhash_scryptsalsa208sha256_ll(password, salt, opsLimit, r, p, keyLength, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: password (unsized_buf)

  password = _any_to_Uint8Array(address_pool, password, "password");
  var password_address = _to_allocated_buf_address(password),
      password_length = password.length;
  address_pool.push(password_address);

  // ---------- input: salt (unsized_buf)

  salt = _any_to_Uint8Array(address_pool, salt, "salt");
  var salt_address = _to_allocated_buf_address(salt),
      salt_length = salt.length;
  address_pool.push(salt_address);

  // ---------- input: opsLimit (uint)

  _require_defined(address_pool, opsLimit, "opsLimit");

  if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) || opsLimit < 0) {
          _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
  }

  // ---------- input: r (uint)

  _require_defined(address_pool, r, "r");

  if (!(typeof r === "number" && (r | 0) === r) || r < 0) {
          _free_and_throw_type_error(address_pool, "r must be an unsigned integer");
  }

  // ---------- input: p (uint)

  _require_defined(address_pool, p, "p");

  if (!(typeof p === "number" && (p | 0) === p) || p < 0) {
          _free_and_throw_type_error(address_pool, "p must be an unsigned integer");
  }

  // ---------- input: keyLength (uint)

  _require_defined(address_pool, keyLength, "keyLength");

  if (!(typeof keyLength === "number" && (keyLength | 0) === keyLength) || keyLength < 0) {
          _free_and_throw_type_error(address_pool, "keyLength must be an unsigned integer");
  }

  // ---------- output derivedKey (buf)

  var derivedKey_length = (keyLength) | 0,
      derivedKey = new AllocatedBuf(derivedKey_length),
      derivedKey_address = derivedKey.address;

  address_pool.push(derivedKey_address);

  if ((libsodium._crypto_pwhash_scryptsalsa208sha256_ll(password_address, password_length, salt_address, salt_length, opsLimit, 0, r, p, derivedKey_address, keyLength) | 0) === 0) {
  	var ret = _format_output(derivedKey, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_pwhash_scryptsalsa208sha256_str(password, opsLimit, memLimit, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: password (unsized_buf)

  password = _any_to_Uint8Array(address_pool, password, "password");
  var password_address = _to_allocated_buf_address(password),
      password_length = password.length;
  address_pool.push(password_address);

  // ---------- input: opsLimit (uint)

  _require_defined(address_pool, opsLimit, "opsLimit");

  if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) || opsLimit < 0) {
          _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
  }

  // ---------- input: memLimit (uint)

  _require_defined(address_pool, memLimit, "memLimit");

  if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) || memLimit < 0) {
          _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
  }

  // ---------- output hashed_password (buf)

  var hashed_password_length = (libsodium._crypto_pwhash_scryptsalsa208sha256_strbytes()) | 0,
      hashed_password = new AllocatedBuf(hashed_password_length),
      hashed_password_address = hashed_password.address;

  address_pool.push(hashed_password_address);

  if ((libsodium._crypto_pwhash_scryptsalsa208sha256_str(hashed_password_address, password_address, password_length, 0, opsLimit, 0, memLimit) | 0) === 0) {
  	var ret = libsodium.UTF8ToString(hashed_password_address);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_pwhash_scryptsalsa208sha256_str_verify(hashed_password, password, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: hashed_password (string)

  if (typeof hashed_password !== "string") {
      _free_and_throw_type_error(address_pool, "hashed_password must be a string");
  }
  hashed_password = from_string(hashed_password + "\0");
  if (hashed_password_length != undefined && hashed_password.length - 1 !== hashed_password_length) {
      _free_and_throw_type_error(address_pool, "invalid hashed_password length");
  }
  var hashed_password_address = _to_allocated_buf_address(hashed_password),
      hashed_password_length = hashed_password.length - 1;
  address_pool.push(hashed_password_address);

  // ---------- input: password (unsized_buf)

  password = _any_to_Uint8Array(address_pool, password, "password");
  var password_address = _to_allocated_buf_address(password),
      password_length = password.length;
  address_pool.push(password_address);

  var result = libsodium._crypto_pwhash_scryptsalsa208sha256_str_verify(hashed_password_address, password_address, password_length, 0) | 0;
  var ret = (result === 0);
  _free_all(address_pool);
  return ret;
}

export function crypto_pwhash_str(password, opsLimit, memLimit, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: password (unsized_buf)

  password = _any_to_Uint8Array(address_pool, password, "password");
  var password_address = _to_allocated_buf_address(password),
      password_length = password.length;
  address_pool.push(password_address);

  // ---------- input: opsLimit (uint)

  _require_defined(address_pool, opsLimit, "opsLimit");

  if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) || opsLimit < 0) {
          _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
  }

  // ---------- input: memLimit (uint)

  _require_defined(address_pool, memLimit, "memLimit");

  if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) || memLimit < 0) {
          _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
  }

  // ---------- output hashed_password (buf)

  var hashed_password_length = (libsodium._crypto_pwhash_strbytes()) | 0,
      hashed_password = new AllocatedBuf(hashed_password_length),
      hashed_password_address = hashed_password.address;

  address_pool.push(hashed_password_address);

  if ((libsodium._crypto_pwhash_str(hashed_password_address, password_address, password_length, 0, opsLimit, 0, memLimit) | 0) === 0) {
  	var ret = libsodium.UTF8ToString(hashed_password_address);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_pwhash_str_needs_rehash(hashed_password, opsLimit, memLimit, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: hashed_password (string)

  if (typeof hashed_password !== "string") {
      _free_and_throw_type_error(address_pool, "hashed_password must be a string");
  }
  hashed_password = from_string(hashed_password + "\0");
  if (hashed_password_length != undefined && hashed_password.length - 1 !== hashed_password_length) {
      _free_and_throw_type_error(address_pool, "invalid hashed_password length");
  }
  var hashed_password_address = _to_allocated_buf_address(hashed_password),
      hashed_password_length = hashed_password.length - 1;
  address_pool.push(hashed_password_address);

  // ---------- input: opsLimit (uint)

  _require_defined(address_pool, opsLimit, "opsLimit");

  if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) || opsLimit < 0) {
          _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
  }

  // ---------- input: memLimit (uint)

  _require_defined(address_pool, memLimit, "memLimit");

  if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) || memLimit < 0) {
          _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
  }

  var result = libsodium._crypto_pwhash_str_needs_rehash(hashed_password_address, opsLimit, 0, memLimit) | 0;
  var ret = (result !== 0);
  _free_all(address_pool);
  return ret;
}

export function crypto_pwhash_str_verify(hashed_password, password, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: hashed_password (string)

  if (typeof hashed_password !== "string") {
      _free_and_throw_type_error(address_pool, "hashed_password must be a string");
  }
  hashed_password = from_string(hashed_password + "\0");
  if (hashed_password_length != undefined && hashed_password.length - 1 !== hashed_password_length) {
      _free_and_throw_type_error(address_pool, "invalid hashed_password length");
  }
  var hashed_password_address = _to_allocated_buf_address(hashed_password),
      hashed_password_length = hashed_password.length - 1;
  address_pool.push(hashed_password_address);

  // ---------- input: password (unsized_buf)

  password = _any_to_Uint8Array(address_pool, password, "password");
  var password_address = _to_allocated_buf_address(password),
      password_length = password.length;
  address_pool.push(password_address);

  var result = libsodium._crypto_pwhash_str_verify(hashed_password_address, password_address, password_length, 0) | 0;
  var ret = (result === 0);
  _free_all(address_pool);
  return ret;
}

export function crypto_scalarmult(privateKey, publicKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- input: publicKey (buf)

  publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
  var publicKey_address, publicKey_length = (libsodium._crypto_scalarmult_bytes()) | 0;
  if (publicKey.length !== publicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid publicKey length");
  }
  publicKey_address = _to_allocated_buf_address(publicKey);
  address_pool.push(publicKey_address);

  // ---------- output sharedSecret (buf)

  var sharedSecret_length = (libsodium._crypto_scalarmult_bytes()) | 0,
      sharedSecret = new AllocatedBuf(sharedSecret_length),
      sharedSecret_address = sharedSecret.address;

  address_pool.push(sharedSecret_address);

  if ((libsodium._crypto_scalarmult(sharedSecret_address, privateKey_address, publicKey_address) | 0) === 0) {
  	var ret = _format_output(sharedSecret, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "weak public key");
}

export function crypto_scalarmult_base(privateKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- output publicKey (buf)

  var publicKey_length = (libsodium._crypto_scalarmult_bytes()) | 0,
      publicKey = new AllocatedBuf(publicKey_length),
      publicKey_address = publicKey.address;

  address_pool.push(publicKey_address);

  if ((libsodium._crypto_scalarmult_base(publicKey_address, privateKey_address) | 0) === 0) {
  	var ret = _format_output(publicKey, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "unknown error");
}

export function crypto_scalarmult_ed25519(n, p, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: n (buf)

  n = _any_to_Uint8Array(address_pool, n, "n");
  var n_address, n_length = (libsodium._crypto_scalarmult_ed25519_scalarbytes()) | 0;
  if (n.length !== n_length) {
      _free_and_throw_type_error(address_pool, "invalid n length");
  }
  n_address = _to_allocated_buf_address(n);
  address_pool.push(n_address);

  // ---------- input: p (buf)

  p = _any_to_Uint8Array(address_pool, p, "p");
  var p_address, p_length = (libsodium._crypto_scalarmult_ed25519_bytes()) | 0;
  if (p.length !== p_length) {
      _free_and_throw_type_error(address_pool, "invalid p length");
  }
  p_address = _to_allocated_buf_address(p);
  address_pool.push(p_address);

  // ---------- output q (buf)

  var q_length = (libsodium._crypto_scalarmult_ed25519_bytes()) | 0,
      q = new AllocatedBuf(q_length),
      q_address = q.address;

  address_pool.push(q_address);

  if ((libsodium._crypto_scalarmult_ed25519(q_address, n_address, p_address) | 0) === 0) {
  	var ret = _format_output(q, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid point or scalar is 0");
}

export function crypto_scalarmult_ed25519_base(scalar, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: scalar (buf)

  scalar = _any_to_Uint8Array(address_pool, scalar, "scalar");
  var scalar_address, scalar_length = (libsodium._crypto_scalarmult_ed25519_scalarbytes()) | 0;
  if (scalar.length !== scalar_length) {
      _free_and_throw_type_error(address_pool, "invalid scalar length");
  }
  scalar_address = _to_allocated_buf_address(scalar);
  address_pool.push(scalar_address);

  // ---------- output point (buf)

  var point_length = (libsodium._crypto_scalarmult_ed25519_bytes()) | 0,
      point = new AllocatedBuf(point_length),
      point_address = point.address;

  address_pool.push(point_address);

  if ((libsodium._crypto_scalarmult_ed25519_base(point_address, scalar_address) | 0) === 0) {
  	var ret = _format_output(point, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "scalar is 0");
}

export function crypto_scalarmult_ed25519_base_noclamp(scalar, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: scalar (buf)

  scalar = _any_to_Uint8Array(address_pool, scalar, "scalar");
  var scalar_address, scalar_length = (libsodium._crypto_scalarmult_ed25519_scalarbytes()) | 0;
  if (scalar.length !== scalar_length) {
      _free_and_throw_type_error(address_pool, "invalid scalar length");
  }
  scalar_address = _to_allocated_buf_address(scalar);
  address_pool.push(scalar_address);

  // ---------- output point (buf)

  var point_length = (libsodium._crypto_scalarmult_ed25519_bytes()) | 0,
      point = new AllocatedBuf(point_length),
      point_address = point.address;

  address_pool.push(point_address);

  if ((libsodium._crypto_scalarmult_ed25519_base_noclamp(point_address, scalar_address) | 0) === 0) {
  	var ret = _format_output(point, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "scalar is 0");
}

export function crypto_scalarmult_ed25519_noclamp(n, p, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: n (buf)

  n = _any_to_Uint8Array(address_pool, n, "n");
  var n_address, n_length = (libsodium._crypto_scalarmult_ed25519_scalarbytes()) | 0;
  if (n.length !== n_length) {
      _free_and_throw_type_error(address_pool, "invalid n length");
  }
  n_address = _to_allocated_buf_address(n);
  address_pool.push(n_address);

  // ---------- input: p (buf)

  p = _any_to_Uint8Array(address_pool, p, "p");
  var p_address, p_length = (libsodium._crypto_scalarmult_ed25519_bytes()) | 0;
  if (p.length !== p_length) {
      _free_and_throw_type_error(address_pool, "invalid p length");
  }
  p_address = _to_allocated_buf_address(p);
  address_pool.push(p_address);

  // ---------- output q (buf)

  var q_length = (libsodium._crypto_scalarmult_ed25519_bytes()) | 0,
      q = new AllocatedBuf(q_length),
      q_address = q.address;

  address_pool.push(q_address);

  if ((libsodium._crypto_scalarmult_ed25519_noclamp(q_address, n_address, p_address) | 0) === 0) {
  	var ret = _format_output(q, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid point or scalar is 0");
}

export function crypto_scalarmult_ristretto255(scalar, element, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: scalar (buf)

  scalar = _any_to_Uint8Array(address_pool, scalar, "scalar");
  var scalar_address, scalar_length = (libsodium._crypto_scalarmult_ristretto255_scalarbytes()) | 0;
  if (scalar.length !== scalar_length) {
      _free_and_throw_type_error(address_pool, "invalid scalar length");
  }
  scalar_address = _to_allocated_buf_address(scalar);
  address_pool.push(scalar_address);

  // ---------- input: element (buf)

  element = _any_to_Uint8Array(address_pool, element, "element");
  var element_address, element_length = (libsodium._crypto_scalarmult_ristretto255_bytes()) | 0;
  if (element.length !== element_length) {
      _free_and_throw_type_error(address_pool, "invalid element length");
  }
  element_address = _to_allocated_buf_address(element);
  address_pool.push(element_address);

  // ---------- output result (buf)

  var result_length = (libsodium._crypto_scalarmult_ristretto255_bytes()) | 0,
      result = new AllocatedBuf(result_length),
      result_address = result.address;

  address_pool.push(result_address);

  if ((libsodium._crypto_scalarmult_ristretto255(result_address, scalar_address, element_address) | 0) === 0) {
  	var ret = _format_output(result, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "result is identity element");
}

export function crypto_scalarmult_ristretto255_base(scalar, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: scalar (buf)

  scalar = _any_to_Uint8Array(address_pool, scalar, "scalar");
  var scalar_address, scalar_length = (libsodium._crypto_core_ristretto255_scalarbytes()) | 0;
  if (scalar.length !== scalar_length) {
      _free_and_throw_type_error(address_pool, "invalid scalar length");
  }
  scalar_address = _to_allocated_buf_address(scalar);
  address_pool.push(scalar_address);

  // ---------- output element (buf)

  var element_length = (libsodium._crypto_core_ristretto255_bytes()) | 0,
      element = new AllocatedBuf(element_length),
      element_address = element.address;

  address_pool.push(element_address);

  if ((libsodium._crypto_scalarmult_ristretto255_base(element_address, scalar_address) | 0) === 0) {
  	var ret = _format_output(element, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "scalar is 0");
}

export function crypto_secretbox_detached(message, nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output cipher (buf)

  var cipher_length = (message_length) | 0,
      cipher = new AllocatedBuf(cipher_length),
      cipher_address = cipher.address;

  address_pool.push(cipher_address);

  // ---------- output mac (buf)

  var mac_length = (libsodium._crypto_secretbox_macbytes()) | 0,
      mac = new AllocatedBuf(mac_length),
      mac_address = mac.address;

  address_pool.push(mac_address);

  if ((libsodium._crypto_secretbox_detached(cipher_address, mac_address, message_address, message_length, 0, nonce_address, key_address) | 0) === 0) {
  	var ret = _format_output({mac: mac, cipher: cipher}, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_secretbox_easy(message, nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output cipher (buf)

  var cipher_length = (message_length + libsodium._crypto_secretbox_macbytes()) | 0,
      cipher = new AllocatedBuf(cipher_length),
      cipher_address = cipher.address;

  address_pool.push(cipher_address);

  if ((libsodium._crypto_secretbox_easy(cipher_address, message_address, message_length, 0, nonce_address, key_address) | 0) === 0) {
  	var ret = _format_output(cipher, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_secretbox_keygen(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output output (buf)

  var output_length = (libsodium._crypto_secretbox_keybytes()) | 0,
      output = new AllocatedBuf(output_length),
      output_address = output.address;

  address_pool.push(output_address);

  libsodium._crypto_secretbox_keygen(output_address);
  var ret = (_format_output(output, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_secretbox_open_detached(ciphertext, mac, nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: ciphertext (unsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address = _to_allocated_buf_address(ciphertext),
      ciphertext_length = ciphertext.length;
  address_pool.push(ciphertext_address);

  // ---------- input: mac (buf)

  mac = _any_to_Uint8Array(address_pool, mac, "mac");
  var mac_address, mac_length = (libsodium._crypto_secretbox_macbytes()) | 0;
  if (mac.length !== mac_length) {
      _free_and_throw_type_error(address_pool, "invalid mac length");
  }
  mac_address = _to_allocated_buf_address(mac);
  address_pool.push(mac_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output message (buf)

  var message_length = (ciphertext_length) | 0,
      message = new AllocatedBuf(message_length),
      message_address = message.address;

  address_pool.push(message_address);

  if ((libsodium._crypto_secretbox_open_detached(message_address, ciphertext_address, mac_address, ciphertext_length, 0, nonce_address, key_address) | 0) === 0) {
  	var ret = _format_output(message, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "wrong secret key for the given ciphertext");
}

export function crypto_secretbox_open_easy(ciphertext, nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: ciphertext (minsized_buf)

  ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
  var ciphertext_address, ciphertext_min_length = libsodium._crypto_secretbox_macbytes(), ciphertext_length = ciphertext.length;
  if (ciphertext_length < ciphertext_min_length) {
          _free_and_throw_type_error(address_pool, "ciphertext is too short");
  }
  ciphertext_address = _to_allocated_buf_address(ciphertext);
  address_pool.push(ciphertext_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output message (buf)

  var message_length = (ciphertext_length - libsodium._crypto_secretbox_macbytes()) | 0,
      message = new AllocatedBuf(message_length),
      message_address = message.address;

  address_pool.push(message_address);

  if ((libsodium._crypto_secretbox_open_easy(message_address, ciphertext_address, ciphertext_length, 0, nonce_address, key_address) | 0) === 0) {
  	var ret = _format_output(message, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "wrong secret key for the given ciphertext");
}

export function crypto_secretstream_xchacha20poly1305_init_pull(header, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: header (buf)

  header = _any_to_Uint8Array(address_pool, header, "header");
  var header_address, header_length = (libsodium._crypto_secretstream_xchacha20poly1305_headerbytes()) | 0;
  if (header.length !== header_length) {
      _free_and_throw_type_error(address_pool, "invalid header length");
  }
  header_address = _to_allocated_buf_address(header);
  address_pool.push(header_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_secretstream_xchacha20poly1305_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output state (secretstream_xchacha20poly1305_state)

  var state_address = new AllocatedBuf(52).address;

  if ((libsodium._crypto_secretstream_xchacha20poly1305_init_pull(state_address, header_address, key_address) | 0) === 0) {
  	var ret = state_address;
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_secretstream_xchacha20poly1305_init_push(key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_secretstream_xchacha20poly1305_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output state (secretstream_xchacha20poly1305_state)

  var state_address = new AllocatedBuf(52).address;

  // ---------- output header (buf)

  var header_length = (libsodium._crypto_secretstream_xchacha20poly1305_headerbytes()) | 0,
      header = new AllocatedBuf(header_length),
      header_address = header.address;

  address_pool.push(header_address);

  if ((libsodium._crypto_secretstream_xchacha20poly1305_init_push(state_address, header_address, key_address) | 0) === 0) {
  	var ret = { state: state_address, header: _format_output(header, outputFormat) };
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_secretstream_xchacha20poly1305_keygen(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output output (buf)

  var output_length = (libsodium._crypto_secretstream_xchacha20poly1305_keybytes()) | 0,
      output = new AllocatedBuf(output_length),
      output_address = output.address;

  address_pool.push(output_address);

  libsodium._crypto_secretstream_xchacha20poly1305_keygen(output_address);
  var ret = (_format_output(output, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_secretstream_xchacha20poly1305_pull(state_address, cipher, ad, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: state_address (secretstream_xchacha20poly1305_state_address)

  _require_defined(address_pool, state_address, "state_address");

  // ---------- input: cipher (minsized_buf)

  cipher = _any_to_Uint8Array(address_pool, cipher, "cipher");
  var cipher_address, cipher_min_length = libsodium._crypto_secretstream_xchacha20poly1305_abytes(), cipher_length = cipher.length;
  if (cipher_length < cipher_min_length) {
          _free_and_throw_type_error(address_pool, "cipher is too short");
  }
  cipher_address = _to_allocated_buf_address(cipher);
  address_pool.push(cipher_address);

  // ---------- input: ad (unsized_buf_optional)

  var ad_address = null, ad_length = 0;
  if (ad != undefined) {
          ad = _any_to_Uint8Array(address_pool, ad, "ad");
          ad_address = _to_allocated_buf_address(ad);
          ad_length = ad.length;
          address_pool.push(ad_address);
  }

  // ---------- output message_chunk (buf)

  var message_chunk_length = (cipher_length - libsodium._crypto_secretstream_xchacha20poly1305_abytes()) | 0,
      message_chunk = new AllocatedBuf(message_chunk_length),
      message_chunk_address = message_chunk.address;

  address_pool.push(message_chunk_address);

  var ret = (function() { var tag_p = _malloc(1); address_pool.push(tag_p); return libsodium._crypto_secretstream_xchacha20poly1305_pull(state_address, message_chunk_address, 0, tag_p, cipher_address, cipher_length, 0, ad_address, ad_length) === 0 && { tag: libsodium.HEAPU8[tag_p], message: message_chunk } } )();
  var ret = (ret && {message: _format_output(ret.message, outputFormat), tag: ret.tag});
  _free_all(address_pool);
  return ret;
}

export function crypto_secretstream_xchacha20poly1305_push(state_address, message_chunk, ad, tag, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: state_address (secretstream_xchacha20poly1305_state_address)

  _require_defined(address_pool, state_address, "state_address");

  // ---------- input: message_chunk (unsized_buf)

  message_chunk = _any_to_Uint8Array(address_pool, message_chunk, "message_chunk");
  var message_chunk_address = _to_allocated_buf_address(message_chunk),
      message_chunk_length = message_chunk.length;
  address_pool.push(message_chunk_address);

  // ---------- input: ad (unsized_buf_optional)

  var ad_address = null, ad_length = 0;
  if (ad != undefined) {
          ad = _any_to_Uint8Array(address_pool, ad, "ad");
          ad_address = _to_allocated_buf_address(ad);
          ad_length = ad.length;
          address_pool.push(ad_address);
  }

  // ---------- input: tag (uint)

  _require_defined(address_pool, tag, "tag");

  if (!(typeof tag === "number" && (tag | 0) === tag) || tag < 0) {
          _free_and_throw_type_error(address_pool, "tag must be an unsigned integer");
  }

  // ---------- output cipher (buf)

  var cipher_length = (message_chunk_length + libsodium._crypto_secretstream_xchacha20poly1305_abytes()) | 0,
      cipher = new AllocatedBuf(cipher_length),
      cipher_address = cipher.address;

  address_pool.push(cipher_address);

  if ((libsodium._crypto_secretstream_xchacha20poly1305_push(state_address, cipher_address, 0, message_chunk_address, message_chunk_length, 0, ad_address, ad_length, 0, tag) | 0) === 0) {
  	var ret = _format_output(cipher, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_secretstream_xchacha20poly1305_rekey(state_address, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: state_address (secretstream_xchacha20poly1305_state_address)

  _require_defined(address_pool, state_address, "state_address");

  libsodium._crypto_secretstream_xchacha20poly1305_rekey(state_address);
  var ret = (true);
  _free_all(address_pool);
  return ret;
}

export function crypto_shorthash(message, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_shorthash_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output hash (buf)

  var hash_length = (libsodium._crypto_shorthash_bytes()) | 0,
      hash = new AllocatedBuf(hash_length),
      hash_address = hash.address;

  address_pool.push(hash_address);

  if ((libsodium._crypto_shorthash(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
  	var ret = _format_output(hash, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_shorthash_keygen(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output output (buf)

  var output_length = (libsodium._crypto_shorthash_keybytes()) | 0,
      output = new AllocatedBuf(output_length),
      output_address = output.address;

  address_pool.push(output_address);

  libsodium._crypto_shorthash_keygen(output_address);
  var ret = (_format_output(output, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_shorthash_siphashx24(message, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_shorthash_siphashx24_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output hash (buf)

  var hash_length = (libsodium._crypto_shorthash_siphashx24_bytes()) | 0,
      hash = new AllocatedBuf(hash_length),
      hash_address = hash.address;

  address_pool.push(hash_address);

  if ((libsodium._crypto_shorthash_siphashx24(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
  	var ret = _format_output(hash, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_sign(message, privateKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- output signature (buf)

  var signature_length = (message.length + libsodium._crypto_sign_bytes()) | 0,
      signature = new AllocatedBuf(signature_length),
      signature_address = signature.address;

  address_pool.push(signature_address);

  if ((libsodium._crypto_sign(signature_address, null, message_address, message_length, 0, privateKey_address) | 0) === 0) {
  	var ret = _format_output(signature, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_sign_detached(message, privateKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- output signature (buf)

  var signature_length = (libsodium._crypto_sign_bytes()) | 0,
      signature = new AllocatedBuf(signature_length),
      signature_address = signature.address;

  address_pool.push(signature_address);

  if ((libsodium._crypto_sign_detached(signature_address, null, message_address, message_length, 0, privateKey_address) | 0) === 0) {
  	var ret = _format_output(signature, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_sign_ed25519_pk_to_curve25519(edPk, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: edPk (buf)

  edPk = _any_to_Uint8Array(address_pool, edPk, "edPk");
  var edPk_address, edPk_length = (libsodium._crypto_sign_publickeybytes()) | 0;
  if (edPk.length !== edPk_length) {
      _free_and_throw_type_error(address_pool, "invalid edPk length");
  }
  edPk_address = _to_allocated_buf_address(edPk);
  address_pool.push(edPk_address);

  // ---------- output cPk (buf)

  var cPk_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0,
      cPk = new AllocatedBuf(cPk_length),
      cPk_address = cPk.address;

  address_pool.push(cPk_address);

  if ((libsodium._crypto_sign_ed25519_pk_to_curve25519(cPk_address, edPk_address) | 0) === 0) {
  	var ret = _format_output(cPk, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid key");
}

export function crypto_sign_ed25519_sk_to_curve25519(edSk, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: edSk (buf)

  edSk = _any_to_Uint8Array(address_pool, edSk, "edSk");
  var edSk_address, edSk_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
  if (edSk.length !== edSk_length) {
      _free_and_throw_type_error(address_pool, "invalid edSk length");
  }
  edSk_address = _to_allocated_buf_address(edSk);
  address_pool.push(edSk_address);

  // ---------- output cSk (buf)

  var cSk_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0,
      cSk = new AllocatedBuf(cSk_length),
      cSk_address = cSk.address;

  address_pool.push(cSk_address);

  if ((libsodium._crypto_sign_ed25519_sk_to_curve25519(cSk_address, edSk_address) | 0) === 0) {
  	var ret = _format_output(cSk, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid key");
}

export function crypto_sign_ed25519_sk_to_pk(privateKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- output publicKey (buf)

  var publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0,
      publicKey = new AllocatedBuf(publicKey_length),
      publicKey_address = publicKey.address;

  address_pool.push(publicKey_address);

  if ((libsodium._crypto_sign_ed25519_sk_to_pk(publicKey_address, privateKey_address) | 0) === 0) {
  	var ret = _format_output(publicKey, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid key");
}

export function crypto_sign_ed25519_sk_to_seed(privateKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- output seed (buf)

  var seed_length = (libsodium._crypto_sign_seedbytes()) | 0,
      seed = new AllocatedBuf(seed_length),
      seed_address = seed.address;

  address_pool.push(seed_address);

  if ((libsodium._crypto_sign_ed25519_sk_to_seed(seed_address, privateKey_address) | 0) === 0) {
  	var ret = _format_output(seed, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid key");
}

export function crypto_sign_final_create(state_address, privateKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: state_address (sign_state_address)

  _require_defined(address_pool, state_address, "state_address");

  // ---------- input: privateKey (buf)

  privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
  var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
  if (privateKey.length !== privateKey_length) {
      _free_and_throw_type_error(address_pool, "invalid privateKey length");
  }
  privateKey_address = _to_allocated_buf_address(privateKey);
  address_pool.push(privateKey_address);

  // ---------- output signature (buf)

  var signature_length = (libsodium._crypto_sign_bytes()) | 0,
      signature = new AllocatedBuf(signature_length),
      signature_address = signature.address;

  address_pool.push(signature_address);

  if ((libsodium._crypto_sign_final_create(state_address, signature_address, null, privateKey_address) | 0) === 0) {
  	var ret = (libsodium._free(state_address), _format_output(signature, outputFormat));
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_sign_final_verify(state_address, signature, publicKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: state_address (sign_state_address)

  _require_defined(address_pool, state_address, "state_address");

  // ---------- input: signature (buf)

  signature = _any_to_Uint8Array(address_pool, signature, "signature");
  var signature_address, signature_length = (libsodium._crypto_sign_bytes()) | 0;
  if (signature.length !== signature_length) {
      _free_and_throw_type_error(address_pool, "invalid signature length");
  }
  signature_address = _to_allocated_buf_address(signature);
  address_pool.push(signature_address);

  // ---------- input: publicKey (buf)

  publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
  var publicKey_address, publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0;
  if (publicKey.length !== publicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid publicKey length");
  }
  publicKey_address = _to_allocated_buf_address(publicKey);
  address_pool.push(publicKey_address);

  var verificationResult = libsodium._crypto_sign_final_verify(state_address, signature_address, publicKey_address) | 0;
  var ret = (verificationResult === 0);
  _free_all(address_pool);
  return ret;
}

export function crypto_sign_init(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output state (sign_state)

  var state_address = new AllocatedBuf(208).address;

  if ((libsodium._crypto_sign_init(state_address) | 0) === 0) {
  	var ret = state_address;
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "internal error");
}

export function crypto_sign_keypair(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output publicKey (buf)

  var publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0,
      publicKey = new AllocatedBuf(publicKey_length),
      publicKey_address = publicKey.address;

  address_pool.push(publicKey_address);

  // ---------- output privateKey (buf)

  var privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0,
      privateKey = new AllocatedBuf(privateKey_length),
      privateKey_address = privateKey.address;

  address_pool.push(privateKey_address);

  if ((libsodium._crypto_sign_keypair(publicKey_address, privateKey_address) | 0) === 0) {
  	var ret = {publicKey: _format_output(publicKey, outputFormat), privateKey: _format_output(privateKey, outputFormat), keyType: 'ed25519'};
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "internal error");
}

export function crypto_sign_open(signedMessage, publicKey, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: signedMessage (minsized_buf)

  signedMessage = _any_to_Uint8Array(address_pool, signedMessage, "signedMessage");
  var signedMessage_address, signedMessage_min_length = libsodium._crypto_sign_bytes(), signedMessage_length = signedMessage.length;
  if (signedMessage_length < signedMessage_min_length) {
          _free_and_throw_type_error(address_pool, "signedMessage is too short");
  }
  signedMessage_address = _to_allocated_buf_address(signedMessage);
  address_pool.push(signedMessage_address);

  // ---------- input: publicKey (buf)

  publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
  var publicKey_address, publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0;
  if (publicKey.length !== publicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid publicKey length");
  }
  publicKey_address = _to_allocated_buf_address(publicKey);
  address_pool.push(publicKey_address);

  // ---------- output message (buf)

  var message_length = (signedMessage_length - libsodium._crypto_sign_bytes()) | 0,
      message = new AllocatedBuf(message_length),
      message_address = message.address;

  address_pool.push(message_address);

  if ((libsodium._crypto_sign_open(message_address, null, signedMessage_address, signedMessage_length, 0, publicKey_address) | 0) === 0) {
  	var ret = _format_output(message, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "incorrect signature for the given public key");
}

export function crypto_sign_seed_keypair(seed, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: seed (buf)

  seed = _any_to_Uint8Array(address_pool, seed, "seed");
  var seed_address, seed_length = (libsodium._crypto_sign_seedbytes()) | 0;
  if (seed.length !== seed_length) {
      _free_and_throw_type_error(address_pool, "invalid seed length");
  }
  seed_address = _to_allocated_buf_address(seed);
  address_pool.push(seed_address);

  // ---------- output publicKey (buf)

  var publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0,
      publicKey = new AllocatedBuf(publicKey_length),
      publicKey_address = publicKey.address;

  address_pool.push(publicKey_address);

  // ---------- output privateKey (buf)

  var privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0,
      privateKey = new AllocatedBuf(privateKey_length),
      privateKey_address = privateKey.address;

  address_pool.push(privateKey_address);

  if ((libsodium._crypto_sign_seed_keypair(publicKey_address, privateKey_address, seed_address) | 0) === 0) {
  	var ret = {publicKey: _format_output(publicKey, outputFormat), privateKey: _format_output(privateKey, outputFormat), keyType: 'ed25519'};
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_sign_update(state_address, message_chunk, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: state_address (sign_state_address)

  _require_defined(address_pool, state_address, "state_address");

  // ---------- input: message_chunk (unsized_buf)

  message_chunk = _any_to_Uint8Array(address_pool, message_chunk, "message_chunk");
  var message_chunk_address = _to_allocated_buf_address(message_chunk),
      message_chunk_length = message_chunk.length;
  address_pool.push(message_chunk_address);

  if (!((libsodium._crypto_sign_update(state_address, message_chunk_address, message_chunk_length, 0) | 0) === 0)) {
  	_free_and_throw_error(address_pool, "invalid usage");
  }
  _free_all(address_pool);
}

export function crypto_sign_verify_detached(signature, message, publicKey) {
  var address_pool = [];

  // ---------- input: signature (buf)

  signature = _any_to_Uint8Array(address_pool, signature, "signature");
  var signature_address, signature_length = (libsodium._crypto_sign_bytes()) | 0;
  if (signature.length !== signature_length) {
      _free_and_throw_type_error(address_pool, "invalid signature length");
  }
  signature_address = _to_allocated_buf_address(signature);
  address_pool.push(signature_address);

  // ---------- input: message (unsized_buf)

  message = _any_to_Uint8Array(address_pool, message, "message");
  var message_address = _to_allocated_buf_address(message),
      message_length = message.length;
  address_pool.push(message_address);

  // ---------- input: publicKey (buf)

  publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
  var publicKey_address, publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0;
  if (publicKey.length !== publicKey_length) {
      _free_and_throw_type_error(address_pool, "invalid publicKey length");
  }
  publicKey_address = _to_allocated_buf_address(publicKey);
  address_pool.push(publicKey_address);

  var verificationResult = libsodium._crypto_sign_verify_detached(signature_address, message_address, message_length, 0, publicKey_address) | 0;
  var ret = (verificationResult === 0);
  _free_all(address_pool);
  return ret;
}

export function crypto_stream_chacha20(outLength, key, nonce, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: outLength (uint)

  _require_defined(address_pool, outLength, "outLength");

  if (!(typeof outLength === "number" && (outLength | 0) === outLength) || outLength < 0) {
          _free_and_throw_type_error(address_pool, "outLength must be an unsigned integer");
  }

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_stream_chacha20_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_stream_chacha20_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- output out (buf)

  var out_length = (outLength) | 0,
      out = new AllocatedBuf(out_length),
      out_address = out.address;

  address_pool.push(out_address);

  libsodium._crypto_stream_chacha20(out_address, outLength, 0, nonce_address, key_address) | 0;
  var ret = (_format_output(out, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_stream_chacha20_ietf_xor(input_message, nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: input_message (unsized_buf)

  input_message = _any_to_Uint8Array(address_pool, input_message, "input_message");
  var input_message_address = _to_allocated_buf_address(input_message),
      input_message_length = input_message.length;
  address_pool.push(input_message_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_stream_chacha20_ietf_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_stream_chacha20_ietf_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output output_message (buf)

  var output_message_length = (input_message_length) | 0,
      output_message = new AllocatedBuf(output_message_length),
      output_message_address = output_message.address;

  address_pool.push(output_message_address);

  if ((libsodium._crypto_stream_chacha20_ietf_xor(output_message_address, input_message_address, input_message_length, 0, nonce_address, key_address)) === 0) {
  	var ret = _format_output(output_message, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_stream_chacha20_ietf_xor_ic(input_message, nonce, nonce_increment, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: input_message (unsized_buf)

  input_message = _any_to_Uint8Array(address_pool, input_message, "input_message");
  var input_message_address = _to_allocated_buf_address(input_message),
      input_message_length = input_message.length;
  address_pool.push(input_message_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_stream_chacha20_ietf_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: nonce_increment (uint)

  _require_defined(address_pool, nonce_increment, "nonce_increment");

  if (!(typeof nonce_increment === "number" && (nonce_increment | 0) === nonce_increment) || nonce_increment < 0) {
          _free_and_throw_type_error(address_pool, "nonce_increment must be an unsigned integer");
  }

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_stream_chacha20_ietf_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output output_message (buf)

  var output_message_length = (input_message_length) | 0,
      output_message = new AllocatedBuf(output_message_length),
      output_message_address = output_message.address;

  address_pool.push(output_message_address);

  if ((libsodium._crypto_stream_chacha20_ietf_xor_ic(output_message_address, input_message_address, input_message_length, 0, nonce_address, nonce_increment, key_address)) === 0) {
  	var ret = _format_output(output_message, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_stream_chacha20_keygen(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output output (buf)

  var output_length = (libsodium._crypto_stream_chacha20_keybytes()) | 0,
      output = new AllocatedBuf(output_length),
      output_address = output.address;

  address_pool.push(output_address);

  libsodium._crypto_stream_chacha20_keygen(output_address);
  var ret = (_format_output(output, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_stream_chacha20_xor(input_message, nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: input_message (unsized_buf)

  input_message = _any_to_Uint8Array(address_pool, input_message, "input_message");
  var input_message_address = _to_allocated_buf_address(input_message),
      input_message_length = input_message.length;
  address_pool.push(input_message_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_stream_chacha20_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_stream_chacha20_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output output_message (buf)

  var output_message_length = (input_message_length) | 0,
      output_message = new AllocatedBuf(output_message_length),
      output_message_address = output_message.address;

  address_pool.push(output_message_address);

  if ((libsodium._crypto_stream_chacha20_xor(output_message_address, input_message_address, input_message_length, 0, nonce_address, key_address)) === 0) {
  	var ret = _format_output(output_message, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_stream_chacha20_xor_ic(input_message, nonce, nonce_increment, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: input_message (unsized_buf)

  input_message = _any_to_Uint8Array(address_pool, input_message, "input_message");
  var input_message_address = _to_allocated_buf_address(input_message),
      input_message_length = input_message.length;
  address_pool.push(input_message_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_stream_chacha20_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: nonce_increment (uint)

  _require_defined(address_pool, nonce_increment, "nonce_increment");

  if (!(typeof nonce_increment === "number" && (nonce_increment | 0) === nonce_increment) || nonce_increment < 0) {
          _free_and_throw_type_error(address_pool, "nonce_increment must be an unsigned integer");
  }

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_stream_chacha20_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output output_message (buf)

  var output_message_length = (input_message_length) | 0,
      output_message = new AllocatedBuf(output_message_length),
      output_message_address = output_message.address;

  address_pool.push(output_message_address);

  if ((libsodium._crypto_stream_chacha20_xor_ic(output_message_address, input_message_address, input_message_length, 0, nonce_address, nonce_increment, 0, key_address)) === 0) {
  	var ret = _format_output(output_message, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_stream_keygen(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output output (buf)

  var output_length = (libsodium._crypto_stream_keybytes()) | 0,
      output = new AllocatedBuf(output_length),
      output_address = output.address;

  address_pool.push(output_address);

  libsodium._crypto_stream_keygen(output_address);
  var ret = (_format_output(output, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_stream_xchacha20_keygen(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- output output (buf)

  var output_length = (libsodium._crypto_stream_xchacha20_keybytes()) | 0,
      output = new AllocatedBuf(output_length),
      output_address = output.address;

  address_pool.push(output_address);

  libsodium._crypto_stream_xchacha20_keygen(output_address);
  var ret = (_format_output(output, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function crypto_stream_xchacha20_xor(input_message, nonce, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: input_message (unsized_buf)

  input_message = _any_to_Uint8Array(address_pool, input_message, "input_message");
  var input_message_address = _to_allocated_buf_address(input_message),
      input_message_length = input_message.length;
  address_pool.push(input_message_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_stream_xchacha20_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_stream_xchacha20_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output output_message (buf)

  var output_message_length = (input_message_length) | 0,
      output_message = new AllocatedBuf(output_message_length),
      output_message_address = output_message.address;

  address_pool.push(output_message_address);

  if ((libsodium._crypto_stream_xchacha20_xor(output_message_address, input_message_address, input_message_length, 0, nonce_address, key_address)) === 0) {
  	var ret = _format_output(output_message, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function crypto_stream_xchacha20_xor_ic(input_message, nonce, nonce_increment, key, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: input_message (unsized_buf)

  input_message = _any_to_Uint8Array(address_pool, input_message, "input_message");
  var input_message_address = _to_allocated_buf_address(input_message),
      input_message_length = input_message.length;
  address_pool.push(input_message_address);

  // ---------- input: nonce (buf)

  nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
  var nonce_address, nonce_length = (libsodium._crypto_stream_xchacha20_noncebytes()) | 0;
  if (nonce.length !== nonce_length) {
      _free_and_throw_type_error(address_pool, "invalid nonce length");
  }
  nonce_address = _to_allocated_buf_address(nonce);
  address_pool.push(nonce_address);

  // ---------- input: nonce_increment (uint)

  _require_defined(address_pool, nonce_increment, "nonce_increment");

  if (!(typeof nonce_increment === "number" && (nonce_increment | 0) === nonce_increment) || nonce_increment < 0) {
          _free_and_throw_type_error(address_pool, "nonce_increment must be an unsigned integer");
  }

  // ---------- input: key (buf)

  key = _any_to_Uint8Array(address_pool, key, "key");
  var key_address, key_length = (libsodium._crypto_stream_xchacha20_keybytes()) | 0;
  if (key.length !== key_length) {
      _free_and_throw_type_error(address_pool, "invalid key length");
  }
  key_address = _to_allocated_buf_address(key);
  address_pool.push(key_address);

  // ---------- output output_message (buf)

  var output_message_length = (input_message_length) | 0,
      output_message = new AllocatedBuf(output_message_length),
      output_message_address = output_message.address;

  address_pool.push(output_message_address);

  if ((libsodium._crypto_stream_xchacha20_xor_ic(output_message_address, input_message_address, input_message_length, 0, nonce_address, nonce_increment, 0, key_address)) === 0) {
  	var ret = _format_output(output_message, outputFormat);
  	_free_all(address_pool);
  	return ret;
  }
  _free_and_throw_error(address_pool, "invalid usage");
}

export function randombytes_buf(length, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: length (uint)

  _require_defined(address_pool, length, "length");

  if (!(typeof length === "number" && (length | 0) === length) || length < 0) {
          _free_and_throw_type_error(address_pool, "length must be an unsigned integer");
  }

  // ---------- output output (buf)

  var output_length = (length) | 0,
      output = new AllocatedBuf(output_length),
      output_address = output.address;

  address_pool.push(output_address);

  libsodium._randombytes_buf(output_address, length);
  var ret = (_format_output(output, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function randombytes_buf_deterministic(length, seed, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: length (uint)

  _require_defined(address_pool, length, "length");

  if (!(typeof length === "number" && (length | 0) === length) || length < 0) {
          _free_and_throw_type_error(address_pool, "length must be an unsigned integer");
  }

  // ---------- input: seed (buf)

  seed = _any_to_Uint8Array(address_pool, seed, "seed");
  var seed_address, seed_length = (libsodium._randombytes_seedbytes()) | 0;
  if (seed.length !== seed_length) {
      _free_and_throw_type_error(address_pool, "invalid seed length");
  }
  seed_address = _to_allocated_buf_address(seed);
  address_pool.push(seed_address);

  // ---------- output output (buf)

  var output_length = (length) | 0,
      output = new AllocatedBuf(output_length),
      output_address = output.address;

  address_pool.push(output_address);

  libsodium._randombytes_buf_deterministic(output_address, length, seed_address);
  var ret = (_format_output(output, outputFormat));
  _free_all(address_pool);
  return ret;
}

export function randombytes_close(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  libsodium._randombytes_close();
}

export function randombytes_random(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  var random_value = libsodium._randombytes_random() >>> 0;
  var ret = (random_value);
  _free_all(address_pool);
  return ret;
}

export function randombytes_set_implementation(implementation, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: implementation (randombytes_implementation)

  var implementation_address = libsodium._malloc(6 * 4);
  for (var i = 0; i < 6; i++) {
          libsodium.setValue(implementation_address + i * 4,
              libsodium.Runtime.addFunction(implementation
              [["implementation_name", "random", "stir", "uniform", "buf", "close"][i]]),
              "i32");
  }

  if (!((libsodium._randombytes_set_implementation(implementation_address) | 0) === 0)) {
  	_free_and_throw_error(address_pool, "unsupported implementation");
  }
  _free_all(address_pool);
}

export function randombytes_stir(outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  libsodium._randombytes_stir();
}

export function randombytes_uniform(upper_bound, outputFormat) {
  var address_pool = [];

  _check_output_format(outputFormat);
  // ---------- input: upper_bound (uint)

  _require_defined(address_pool, upper_bound, "upper_bound");

  if (!(typeof upper_bound === "number" && (upper_bound | 0) === upper_bound) || upper_bound < 0) {
          _free_and_throw_type_error(address_pool, "upper_bound must be an unsigned integer");
  }

  var random_value = libsodium._randombytes_uniform(upper_bound) >>> 0;
  var ret = (random_value);
  _free_all(address_pool);
  return ret;
}

export function sodium_version_string() {
  var address_pool = [];

  var version = libsodium._sodium_version_string();
  var ret = (libsodium.UTF8ToString(version));
  _free_all(address_pool);
  return ret;
}



/* Test to make sure everything works. */
try {
  var message = new Uint8Array([98, 97, 108, 108, 115]);
  var nonce = randombytes_buf(crypto_secretbox_NONCEBYTES);
  var key = randombytes_buf(crypto_secretbox_KEYBYTES);
  var encrypted = crypto_secretbox_easy(message, nonce, key);
  var decrypted = crypto_secretbox_open_easy(encrypted, nonce, key);

  if (!memcmp(message, decrypted)) {
    throw new Error("Init test failed");
  }
}
catch (err) {
  throw new Error("Failed to load" + err)
}
