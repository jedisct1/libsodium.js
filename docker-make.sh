docker build -t libsodium-builder .
docker run -v $(pwd):/src --rm libsodium-builder $@