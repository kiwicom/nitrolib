FROM node

WORKDIR /tmp/app
COPY package.json .
RUN yarn

COPY . .
RUN yarn bundle

EXPOSE 3000
CMD yarn run run
