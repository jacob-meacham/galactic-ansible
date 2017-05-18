# WARNING: DO NOT MODIFY
# This file was generated by Subscript as part of the dev-setup package.
# Do not modify it directly. Instead, you may update the package in Subscript:
# 
# https://github.com/substantial/subscript/tree/master/packages/dev-setup
# 
# Then use "sub update dev-setup" to update this file.

DEFAULT='\033[0m'
BLACK='\033[30m'
RED='\033[31m'
GREEN='\033[32m'
YELLOW='\033[33m'
BLUE='\033[34m'
MAGENTA='\033[35m'
CYAN='\033[36m'
WHITE='\033[37m'

function warn {
  echo -e "${YELLOW}>> $1${DEFAULT}"
}

function error {
  echo -e "${RED}!! $1${DEFAULT}"
}

function info {
  echo -e "${BLUE}>> $1${DEFAULT}"
}

function cmd {
  command -v $1 > /dev/null
}

function brew-install {
  if ! cmd brew; then
    error "Please install homebrew and rerun, or manually install $1"
    echo "http://brew.sh/"
    exit 1
  fi

  brew install $*
}
