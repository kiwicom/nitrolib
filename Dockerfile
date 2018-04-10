FROM node

WORKDIR /tmp/app
COPY package.json yarn.lock .
RUN yarn

COPY . .
RUN yarn bundle

EXPOSE 3000
CMD yarn run run
