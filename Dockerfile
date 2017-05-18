FROM node:7-onbuild

# Install node
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev libkrb5-dev

# Install yarn
RUN set -xe \
  && apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3\
  && echo "deb http://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list \
  && apt-get update && apt-get install -y yarn --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

ADD package.json /app/
ADD yarn.lock /app/
ADD . /app

WORKDIR /app

RUN yarn install
RUN yarn run build

ENV PORT 3000
EXPOSE 3000
