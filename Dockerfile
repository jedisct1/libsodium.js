FROM webassembly/toolchain

RUN apt install -y libtool autoconf nodejs
RUN mkdir /libsodium
COPY . /libsodium
WORKDIR /libsodium

CMD ["./emberclear/build.sh"]