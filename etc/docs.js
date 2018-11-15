#!/usr/bin/env node
// @noflow
const fsx = require("fs-extra");
const path = require("path");

const SRC = path.join(__dirname, "../src");
const DOCS = path.join(__dirname, "../docs");
const COMPONENTS = path.join(SRC, "components");

// TODO split this into fns, reuse also in other doc generators

// Captures anything between 'type Props =' or '/* PROPS */'.
// Ends with '|};', to make it continue, add a comment after an early one
// FIXME add support for 'defaultProps'
function getComponentProps(component) {
  const PATH = path.join(COMPONENTS, component, "index.jsx");
  if (!fsx.existsSync(PATH)) {
    return "";
  }

  const NL = "\n";
  const { text } = String(fsx.readFileSync(PATH))
    .split("\n")
    .reduce(
      (acc, line) => {
        if (!acc.text && line.match(/^type Props =/)) {
          // Natural beginning
          return { text: line + NL, props: true };
        }

        if (!acc.text && line.match(/^\/\* PROPS \*\//)) {
          // Alternative beginning
          return { text: "", props: true };
        }

        if (!acc.props) {
          // Not beginning or already ended
          return acc;
        }

        if (line.match(/\|?\};$/)) {
          // End
          return { text: acc.text + line, props: false };
        }

        return { text: acc.text + line + NL, props: true };
      },
      { text: "", props: false },
    );

  if (!text) {
    return "";
  }

  return ["**Props:**", "```js", text, "```"].join("\n");
}

function getComponentDoc(component) {
  const PATH = path.join(COMPONENTS, component, "README.md");
  if (!fsx.existsSync(PATH)) {
    return "";
  }

  const readme = String(fsx.readFileSync(PATH));
  const doc = readme
    .split("\n")
    .filter(line => !line.match(/# \w+/)) // remove the heading
    .slice(1, -1) // remove the leading and trailing newline
    .join("\n");

  const props = getComponentProps(component);
  return [
    `### ${component}`,
    "",
    "**Import:**",
    "",
    "```js",
    `import ${component} from "@kiwicom/nitro/lib/components/${component}";`,
    "```",
    "",
    props,
    "",
    doc,
    "",
  ].join("\n");
}

const FEATURES = {
  HeaderLinks: true,
  NavBar: true,
  Languages: true,
  Currency: true,
};

const getComponentList = component => `* [${component}](#${component.toLowerCase()})`;

const FEATURES_TEXT = `## Features

Actual components that do stuff. See [storybook](https://nitro-storybook-master.fe.staging.kiwi.com) for a live example.
`;

const UTILITIES_TEXT = `## Utilities

Things that help in development.
`;

function componentsDocs() {
  const components = fsx
    .readdirSync(COMPONENTS)
    .filter(component => !component.match(/^Init\w+/)) // these are documented in services;
    .filter(component => fsx.existsSync(path.join(COMPONENTS, component, "README.md")));

  const features = components.filter(component => FEATURES[component]);
  const featuresList = features.map(getComponentList).join("\n");
  const featuresDocs = features.map(getComponentDoc).join("\n");

  const utilities = components.filter(component => !FEATURES[component]);
  const utilitiesList = utilities.map(getComponentList).join("\n");
  const utilitiesDocs = utilities.map(getComponentDoc).join("\n");

  const doc = [
    "# Components",
    "",
    "Located in `@kiwicom/nitro/lib/components/<component>`.",
    "",
    "**Features:**",
    "",
    featuresList,
    "",
    "**Utilities:**",
    "",
    utilitiesList,
    "",
    FEATURES_TEXT,
    featuresDocs,
    UTILITIES_TEXT,
    utilitiesDocs,
  ].join("\n");

  fsx.outputFileSync(path.join(DOCS, "components.md"), doc);
}

componentsDocs();
