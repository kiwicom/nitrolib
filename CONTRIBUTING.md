# Contributing

Follow **all** rules written in the documents linked from the [README](./README.md).

Make sure these tasks run without errors:
* `yarn test`
* `yarn lint`
* `yarn flow check`

### Development

Run `yarn gulp fetch` before developing. You will need a `.env` file with secrets for this to work.

Run `yarn start` and enjoy!

### Production

Run `yarn bundle && yarn run run` and check out `localhost:3000`.

## Tests

Unit test **everything** testable! Isolate non-testable code as much as possible. Only the following is considered non-testable:

* Any **API calls** (REST, GraphQL...)
* Functions interacting with the **DOM API**

### Functions

**100% coverage**, no mercy. All cases, all branches, any meaningful combination of example cases.

### Components

Use **Enzyme**.

Snapshot test **dumb** components and make sure the snapshot makes sense.

Test all methods and callbacks in **smart** components.

## ESlint

Only disable stuff that _really_ needs disabling. No errors allowed, ideally not even warnings.

## Flow

Cover **all** source files with `// @flow`! Only disable stuff that _really_ needs disabling. No errors allowed.


