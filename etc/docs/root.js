#!/usr/bin/env node
// @noflow
const fsx = require("fs-extra");
const path = require("path");

const ROOT = path.join(__dirname, "../..");

const INDEX = `## Setup

* \`yarn add @kiwicom/nitro\`

## Documentation

* [CLI](./cli.md) - Nitro's CLI
* [Components](./components.md) - well... components 🤷
* [Records](./records.md) - data structures
* [Services](./services.md) - i18n, branding, production data...
* [Translations](./translations.md) - process of adding new translations

Follow applicable guidelines from [Reactizer](https://oreqizer.github.io/reactizer/), too!
`;

function root() {
  const pkg = fsx.readJsonSync(path.join(ROOT, "package.json"));

  const peerdeps = Object.keys(pkg.peerDependencies)
    .map(dep => `* \`${dep}: ${pkg.peerDependencies[dep]}\``)
    .join("\n");

  return `${INDEX}
## Peer dependencies

${peerdeps};
`;
}

module.exports = root;
