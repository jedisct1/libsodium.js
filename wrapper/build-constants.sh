#! /bin/sh

for macro in $(grep -Er '#define (SODIUM_.*VERSION.*|crypto_(.*TAG_[A-Z]+|.*BYTES(_[A-Z0-9]+)?|pwhash_.*[A-Z0-9]+)) ' ../libsodium/src/libsodium/include |
    cut -d: -f2- | cut -d' ' -f2 |
    grep -vE 'edwards25519sha512batch|ZEROBYTE|PRIMITIVE' | sort -u); do
    echo "  { \"name\": \"$macro\", \"type\": \"uint\" },"
done
