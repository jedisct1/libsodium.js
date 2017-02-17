#! /bin/sh

for f in \
  package-libsodium.json \
  package-libsodium-sumo.json \
  package-libsodium-wrappers-sumo.json \
  package-libsodium-wrappers.json \
; do
  rm -f package.json
  cp "$f" package.json
  npm publish || yarn publish
done
rm -f package.json
cp package-libsodium-wrappers.json package.json
