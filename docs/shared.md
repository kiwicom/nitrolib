# Shared components

All shared components must go into the `src/client/public` folder. The folder **must be self-contained**, it cannot import things from elsewhere!

Make sure all dependencies it uses are listed in the `peerDependencies` section in `public/package.json`.

## Release

Do:
* `yarn public`
* `cd public`
* `npm version <semver>`
* `npm release`

## Usage

```js
import Component from "@kiwicom/nitro/lib/Component";
```

## TODOs
- [ ] Private NPM project
