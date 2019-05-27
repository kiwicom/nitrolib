#!/usr/bin/env node
// @noflow
const fsx = require("fs-extra");
const path = require("path");

const ROOT = path.join(__dirname, "../..");

const BEGIN = `## Setup

* \`yarn add @kiwicom/nitro\`
`;

const END = `## Documentation

[Changelog](https://github.com/kiwicom/nitrolib/blob/master/CHANGELOG.md).

* [CLI](./cli.md) - Nitro's CLI
* [Components](./components.md) - well... components 🤷
* [Constants](./consts.md)
* [Records](./records.md) - data structures
* [Services](./services.md) - i18n, branding, production data...
* [Translations](./translations.md) - process of adding new translations

Follow applicable guidelines from **Reactizer**'s [styleguide](https://oreqizer.github.io/reactizer/styleguide/), too!
`;

function root() {
  const pkg = fsx.readJsonSync(path.join(ROOT, "package.json"));

  const peerdeps = Object.keys(pkg.peerDependencies)
    .map(dep => `* \`${dep}: ${pkg.peerDependencies[dep]}\``)
    .join("\n");

  return `${BEGIN}
**Peer dependencies:**
${peerdeps};

${END}`;
}

module.exports = root;
