FROM node:carbon

RUN npm i -g yarn

WORKDIR /tmp/app
COPY package.json .
RUN yarn

COPY . .
RUN yarn bundle

EXPOSE 3000
CMD yarn run run
