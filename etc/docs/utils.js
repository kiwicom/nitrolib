// @noflow
/* eslint-disable fp/no-throw */
const fsx = require("fs-extra");
const path = require("path");

const SRC = path.join(__dirname, "../../src");
const COMPONENTS = path.join(SRC, "components");

const getReadme = readme =>
  readme
    .split("\n")
    .filter(line => !line.match(/^#{1,2} \w+/)) // remove big headings
    .join("\n")
    .trim(); // trim that shit

const getImports = file =>
  String(fsx.readFileSync(file))
    .split("\n")
    .map(line => line.match(/^import \w+ from "(\.\/)?(\.\.\/)+(\w+)";$/)) // another component
    .filter(Boolean)
    .map(match => path.join(COMPONENTS, match[3]));

const getFiles = (folder, files) =>
  files
    .filter(file => file.match(/^[a-zA-Z]+(\.jsx?)?$/))
    .map(file => path.join(folder, file))
    .reduce(
      (acc, file) =>
        file.match(/.*\.jsx?$/)
          ? acc.concat(file).concat(
              // Add contexts from all imports
              getImports(file)
                .filter(f => fsx.existsSync(f))
                .map(f => getFiles(f, fsx.readdirSync(f)))
                .reduce((a, next) => a.concat(next), []),
            )
          : acc.concat(getFiles(file, fsx.readdirSync(file))),
      [],
    );

const getContextNeeds = folder =>
  getFiles(folder, fsx.readdirSync(folder)) // eslint-disable-line fp/no-mutating-methods
    .map(file => String(fsx.readFileSync(file)))
    .join("")
    .split("\n")
    .map(line => line.match(/^import .* from .*\/services\/(\w+)\/context";$/))
    .filter(Boolean)
    .map(match => match[1])
    .sort()
    .reduce((acc, next) => (acc.includes(next) ? acc : acc.concat(next)), []);

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
  const contexts = getContextNeeds(path.join(COMPONENTS, name))
    .map(context => `* [${context}](./services#${context.toLowerCase()})`)
    .join("\n");

  return [
    [
      `### ${name}`,
      "",
      "**Import:**",
      "```js",
      `import ${name} from "@kiwicom/nitro/lib/components/${name}";`,
      "```",
      "",
      props,
      "",
    ].join("\n"),
    contexts && `\n**Context needs:**\n${contexts}\n`,
    doc && `\n${doc}\n`,
  ].join("");
}

module.exports = {
  getReadme,
  getFlowFile,
  getComponentDoc,
};
