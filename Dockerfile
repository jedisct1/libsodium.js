FROM webassembly/toolchain

RUN mkdir /libsodium
COPY . /libsodium
WORKDIR /libsodium

CMD ["./emberclear/build.sh"]