FROM webassembly/toolchain

RUN apt install -y libtool autoconf
RUN mkdir /libsodium
COPY . /libsodium
WORKDIR /libsodium

CMD ["./emberclear/build.sh"]