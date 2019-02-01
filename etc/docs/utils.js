// @noflow
/* eslint-disable fp/no-throw */
const fsx = require("fs-extra");
const path = require("path");

const SRC = path.join(__dirname, "../../src");
const STORIES = path.join(__dirname, "../../stories");
const COMPONENTS = path.join(SRC, "components");

const STORYBOOK_URL = "https://nitro-storybook-master.fe.staging.kiwi.com/";

const getReadme = readme =>
  readme
    .split("\n")
    .filter(line => !line.match(/^#{1,2} \w+/)) // remove big headings
    .join("\n")
    .trim(); // trim that shit

const getStory = name => {
  if (name.match(/^Init/)) {
    return ""; // No story for init components
  }

  if (!fsx.existsSync(path.join(STORIES, `${name}.stories.jsx`))) {
    throw new Error(`Documented features need a '.stories.jsx' in 'stories/'! Missing: ${name}`);
  }

  return `${STORYBOOK_URL}?selectedKind=${name}`;
};

const getImports = file =>
  String(fsx.readFileSync(file))
    .split("\n")
    .map(line => line.match(/^import \w+ from "(\.\/)?(\.\.\/)+(\w+)";$/)) // another component
    .filter(Boolean)
    .map(match => path.join(COMPONENTS, match[3]));

const getFilesWithImports = (folder, files) =>
  files
    .filter(file => file.match(/^[a-zA-Z]+(\.jsx?)?$/))
    .map(file => path.join(folder, file))
    .reduce(
      (acc, file) =>
        file.match(/.*\.jsx?$/)
          ? acc.concat(file).concat(
              getImports(file)
                .filter(f => fsx.existsSync(f))
                .map(f => getFilesWithImports(f, fsx.readdirSync(f)))
                .reduce((a, next) => a.concat(next), []),
            )
          : acc.concat(getFilesWithImports(file, fsx.readdirSync(file))),
      [],
    );

const getFiles = (folder, files) =>
  files
    .filter(file => file.match(/^[a-zA-Z]+(\.jsx?)?$/))
    .map(file => path.join(folder, file))
    .reduce(
      (acc, file) =>
        file.match(/.*\.jsx?$/)
          ? acc.concat(file)
          : acc.concat(getFiles(file, fsx.readdirSync(file))),
      [],
    );

const getContextNeeds = folder =>
  getFilesWithImports(folder, fsx.readdirSync(folder)) // eslint-disable-line fp/no-mutating-methods
    .map(file => String(fsx.readFileSync(file)))
    .join("")
    .split("\n")
    .map(line => line.match(/^import .* from .*\/services\/(\w+)\/context";$/))
    .filter(Boolean)
    .map(match => match[1])
    .sort()
    .reduce((acc, next) => (acc.includes(next) ? acc : acc.concat(next)), [])
    .map(context => `* [${context}](./services#${context.toLowerCase()})`)
    .join("\n");

const getDataTestList = folder =>
  getFiles(folder, fsx.readdirSync(folder)) // eslint-disable-line fp/no-mutating-methods
    .map(file => String(fsx.readFileSync(file)))
    .join("")
    .split("\n")
    .map(line => line.match(/(data-test|dataTest)=((\{`|")[\w-_.${}]+(`\}|"))/))
    .filter(Boolean)
    .map(match => match[2])
    .sort();

const dataTestPurify = test =>
  test
    .replace(/(^"|"$)/g, "")
    .replace(/^\{`/, "")
    .replace(/`\}$/, "");

const getDataTests = (name, folder) => {
  const list = getDataTestList(folder);
  const prefix = `${name}-`;

  list.forEach(test => {
    const pure = dataTestPurify(test);
    if (pure !== name && pure.indexOf(prefix) !== 0) {
      throw new Error(
        `Every ${name}'s "data-test" must be "${name}" or prefixed with "${prefix}", wrong: "${pure}"`,
      );
    }

    pure.split("-").forEach(subtest => {
      if (!subtest.match(/^([A-Z][a-zA-Z]+|\$\{[\w.]+\})$/)) {
        throw new Error(
          `Every "data-test" must have '-' joined PascalCase parts, wrong: "${subtest}" in "${pure}"`,
        );
      }
    });
  });

  return list.map(test => `* \`\`\`${test}\`\`\``).join("\n");
};

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
  const folder = path.join(COMPONENTS, name);

  const doc = getReadme(readme);
  const story = getStory(name);
  const props = getFlowFile(path.join(COMPONENTS, name, "index.js.flow"));
  const contexts = getContextNeeds(folder);
  const datalist = getDataTests(name, folder);

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
    story && `\n[Storybook](${story}).\n`,
    contexts && `\n**Context needs:**\n${contexts}\n`,
    datalist && `\n**Selectors \`data-test\`:**\n${datalist}\n`,
    doc && `\n${doc}\n`,
  ].join("");
}

module.exports = {
  getReadme,
  getFlowFile,
  getComponentDoc,
};
