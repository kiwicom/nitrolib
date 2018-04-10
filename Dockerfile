FROM node

WORKDIR /tmp/app
COPY package.json yarn.lock ./
RUN yarn

COPY etc ./etc
COPY flow-typed ./flow-typed
COPY public ./public
COPY src ./src
COPY types ./types
COPY .babelrc .env .eslintignore .eslintrc .flowconfig .prettierrc gulpfile.js jest.config.js ./
RUN yarn bundle

EXPOSE 3000
CMD yarn run run
