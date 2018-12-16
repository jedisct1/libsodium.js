#!/bin/bash
git submodule init
git submodule update --recursive

# Copy over our selected features
cp emberclear/emscripten.sh libsodium/dist-build/emscripten.sh

make

echo "TODO: push repo stuff"