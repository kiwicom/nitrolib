// @noflow
/* eslint-disable fp/no-throw */
const fsx = require("fs-extra");
const path = require("path");

const SRC = path.join(__dirname, "../../src");
const COMPONENTS = path.join(SRC, "components");

const getReadme = readme =>
  readme
    .split("\n")
    .filter(line => !line.match(/^#{1,3} \w+/)) // remove big headings
    .join("\n")
    .trim(); // trim that shit

function getFlowRecordImports(file) {
  if (!fsx.existsSync(file)) {
    throw new Error(`Documented features need a '.js.flow' file! Missing: ${file}`);
  }

  const imports = String(fsx.readFileSync(file))
    .split("\n")
    .map(line => line.match(/^import .* from "(.*\/records|\.)\/(\w+)";$/))
    .filter(Boolean)
    .map(match => match[2])
    .map(record => `* [${record}](./records#${record.toLowerCase()})`);

  if (imports.length === 0) {
    return "";
  }

  return ["", "See types:", ...imports].join("\n");
}

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

  const maybeImports = getFlowRecordImports(file);

  return ["**Types:**", "```js", text, "```", maybeImports].filter(Boolean).join("\n");
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
