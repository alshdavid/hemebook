#!/bin/bash
set -e

# Default to LTS
NODE_VERSION="$(cat .nvmrc)"

# Default to home directory
OUT_DIR="$2"
if [ "$OUT_DIR" = "" ]; then
  OUT_DIR="$HOME/.local/nodejs"
fi 

URL=""
ARCH=""
OS=""

case $(uname -m) in
  x86_64 | x86-64 | x64 | amd64)
    ARCH="amd64"
  ;;
  aarch64 | arm64)
    ARCH="arm64"
  ;;
esac

case $(uname -s) in
  Darwin)
    OS="macos"
  ;;
  Linux)
    OS="linux"
  ;;
esac

case "$OS-$ARCH" in
  linux-amd64)
    URL=https://nodejs.org/download/release/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz
  ;;
  linux-arm64)
    URL=https://nodejs.org/download/release/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-arm64.tar.gz
  ;;
  macos-amd64)
    URL=https://nodejs.org/download/release/v${NODE_VERSION}/node-v${NODE_VERSION}-darwin-x64.tar.gz
  ;;
  macos-arm64)
    URL=https://nodejs.org/download/release/v${NODE_VERSION}/node-v${NODE_VERSION}-darwin-arm64.tar.gz
  ;;
esac

if [ "$URL" == "" ]; then
  echo "Cannot find installer for Nodejs"
  exit 1
fi

export PATH="${HOME}/.local/nodejs/bin:$PATH"
export PATH="${HOME}/.local/nodejs/prefix/bin:$PATH"
export NPM_CONFIG_PREFIX=$HOME/.local/nodejs/prefix

echo "${HOME}/.local/nodejs/bin" >> $GITHUB_PATH
echo "${HOME}/.local/nodejs/prefix/bin" >> $GITHUB_PATH
echo "NPM_CONFIG_PREFIX=${NPM_CONFIG_PREFIX}" >> $GITHUB_ENV

mkdir -p $HOME/.local/nodejs
mkdir -p $HOME/.local/nodejs/prefix
mkdir -p $HOME/.local/nodejs/cache

echo $URL
curl -s -L --url $URL | tar -xzf - -C $HOME/.local/nodejs --strip-components=1
npm install -g npm

npm -v
node -v
