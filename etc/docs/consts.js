// @noflow
const fsx = require("fs-extra");
const path = require("path");
const R = require("ramda");

const SRC = path.join(__dirname, "../../src");
const CONSTS = path.join(SRC, "consts");

const capitalize = R.compose(
  R.join(""),
  R.juxt([
    R.compose(
      R.toUpper,
      R.head,
    ),
    R.tail,
  ]),
);

const getFlow = file =>
  file
    .split("\n")
    .filter(line => !line.match(/^\/\/ @flow/))
    .filter(line => !line.match(/^import/))
    .join("\n")
    .trim();

const getConstDoc = (name, file) =>
  [
    `## ${capitalize(name)}`,
    "",
    "**Import:**",
    "```js",
    `import * as ${name} from "@kiwicom/nitro/lib/consts/${name}";`,
    "```",
    "",
    "**Types:**",
    "```js",
    getFlow(file),
    "```",
    "",
  ].join("\n");

const getList = c => `* [${capitalize(c)}](#${c.toLowerCase()})`;

function constsDocs() {
  const consts = fsx
    .readdirSync(CONSTS)
    .map(file => file.match(/^(\w+)\.js\.flow$/))
    .filter(Boolean)
    .map(match => match[1]);

  const list = consts.map(getList).join("\n");
  const docs = consts
    .map(name => getConstDoc(name, String(fsx.readFileSync(path.join(CONSTS, `${name}.js.flow`)))))
    .join("\n");

  return [
    "# Constants",
    "",
    "Located in `@kiwicom/nitro/lib/consts/<const>`.",
    "",
    "**List:**",
    list,
    "",
    docs,
  ].join("\n");
}

module.exports = constsDocs;
