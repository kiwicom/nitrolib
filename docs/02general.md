# General styleguide

Try to keep things as **simple as possible**. Remember - whenever you have to think about a solution for more than 5 minutes, take a break and try a different approach.

Embrace functional programming - no `let`, mutations, useless `class`.

## React

Import as `import * as React from "react";`. This is mainly due to _Flow_ types.

Make use of `React.PureComponent` where it makes sense.

## GraphQL

Compile using `yarn relay`, watch for changes via `yarn relay --watch`.

Update schema before development using `yarn relay:schema`. Visit the [playground](https://kiwi-graphiql.now.sh) to test things out.

## Flow

Write types **as specific as possible**. No `Object` or `Function`! Use `any` where it makes sense, meaning you really _don't care_ about the value:

```js
type Props = {|
  onClick: (ev: SyntheticEvent<HTMLButtonElement>) => any,
|};
```

Only use the `*` type if you _really_ know what you're doing. See [docs](https://flow.org) if in doubt.

## Ramda

Import as `import * as R from "ramda";`. We have a _Babel_ plugin that transforms it into granular imports.

Feel free to use native `map`, `filter`, `reduce` etc. _Ramda_ is mainly useful in cases where you need composition, currying or a more complicated data manipulation. Just avoid any mutations.

## Date-fns

Import granularly:

```js
import format from "date-fns/format";
```

Use for manipulating with native `Date` objects whenever you need some date/time work.
