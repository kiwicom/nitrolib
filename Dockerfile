FROM node

WORKDIR /tmp/app
COPY package.json yarn.lock ./
RUN yarn

COPY data data/
COPY dist dist/

EXPOSE 3000
CMD yarn run run
