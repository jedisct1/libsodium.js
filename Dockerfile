FROM webassembly/toolchain

RUN mkdir /libsodium
COPY . /libsodium
WORKDIR /libsodium
RUN echo \
  && git submodule update --recursive \
  && make \
  && echo "need to push to a branch of the git repo"



