#!/bin/bash
git submodule init
git submodule update --recursive

# Copy over our selected features
cp emberclear/emscripten.sh libsodium/dist-build/emscripten.sh

make

git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"
git checkout -b emberclear
git remote rm origin
git remote add origin "https://NullVoxPopuli:$GH_TOKEN@github.com/NullVoxPopuli/libsodium.js.git"
git add .
git commit -am"build smaller libsodium"
git push origin emberclear -f
