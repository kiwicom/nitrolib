# Contributing

Make sure these tasks run without errors:
* `yarn test`
* `yarn lint`
* `yarn flow check`

## Development

Run `yarn start` and enjoy! If you're doing **GraphQL** stuff, also run `yarn relay --watch`.

### Tests

Unit test **everything** testable! Isolate non-testable code as much as possible. Only the following is considered non-testable:
* Any **API calls** (REST, GraphQL...)
* Functions interacting with the **DOM API**

**100% coverage**, no mercy. All cases, all branches, any meaningful combination of example cases.

Use **Enzyme** for components. No snapshots! Walk the component tree and assert props and render parts that make sense.

### ESlint

Only disable stuff that _really_ needs disabling. No errors allowed, ideally not even warnings.

### Flow

Cover **all** source files with `// @flow strict`! Only disable stuff that _really_ needs disabling. No errors allowed.

## Docs

Only documented features are meant to be used in apps. Docs are processed, be sure to run `yarn docs` for updating it after writing something! _Types_ and _imports_ gets generated automatically.

### CLI

The _CLI_ docs are written manually, edit the `docs/cli.md` file.

### Components

Every public _component_ has to have a:
* `README.md` file
* `<component>.js.flow` file

Document how to use the component, what **context** it uses and possible caveats. Imagine you're using it with zero knowledge!

### Records

Every public _record_ has to have a:
* `<record>.md` file
* `<record>.js.flow` file

Document any functions that work with the record and its main use case.

### Services

Every public _context service_ has to have a:
* `README.md` file
* `context.js.flow` file

Any existing `Init<Service>` components will get referenced automatically.

Other public services need a:
* `README.md` file
* `<file>.js.flow` file

Document what problem does a service solve, how to use it.

## Merge requests

Make a MR as soon as you push a branch!

* commit with a `<context>: <Message>` format
* prefix with `WIP: ` if you're still working on it
* resolve all CR discussions after fixing them
* press the _approved_ button when approving

All _non-approved_, _non-WIP_ MRs with _no unresolved discussions_ are suitable for a review!

## Issues

Give lots of info, code examples, replications for bugs, screenshots... Just don't write essays. The more _meaningful_ info the better.

- include a `type/` label
- determine the weight
- add an assignee - _optional_
