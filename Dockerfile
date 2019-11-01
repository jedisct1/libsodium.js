FROM trzeci/emscripten:sdk-tag-1.38.43-64bit

RUN apt-get update && apt-get install -y \
    autoconf \
    libtool

ENTRYPOINT ["/usr/bin/make"]