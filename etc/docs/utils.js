// @noflow
/* eslint-disable fp/no-throw */
const fsx = require("fs-extra");
const path = require("path");

const SRC = path.join(__dirname, "../../src");
const COMPONENTS = path.join(SRC, "components");

const getReadme = readme =>
  readme
    .split("\n")
    .filter(line => !line.match(/# \w+/)) // remove the heading
    .join("\n")
    .trim(); // trim that shit

function getFlowFile(file) {
  if (!fsx.existsSync(file)) {
    throw new Error(`Documented features need a '.js.flow' file! Missing: ${file}`);
  }

  const text = String(fsx.readFileSync(file))
    .split("\n")
    .filter(line => !line.match(/^\/\/ @flow/)) // remove initial Flow comment
    .filter(line => !line.match(/^import/)) // remove imports
    .filter(line => !line.match(/^declare export default/)) // remove exports
    .join("\n")
    .trim(); // trim that shit

  return ["**Types:**", "```js", text, "```"].join("\n");
}

function getComponentDoc(name, readme) {
  const doc = getReadme(readme);

  const props = getFlowFile(path.join(COMPONENTS, name, "index.js.flow"));
  return [
    `### ${name}`,
    "",
    "**Import:**",
    "```js",
    `import ${name} from "@kiwicom/nitro/lib/components/${name}";`,
    "```",
    "",
    props,
    "",
    doc,
    "",
  ].join("\n");
}

module.exports = {
  getReadme,
  getFlowFile,
  getComponentDoc,
};
