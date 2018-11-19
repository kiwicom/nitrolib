#!/usr/bin/env node
// @noflow
const fsx = require("fs-extra");
const path = require("path");

const getProps = require("./props");

const SRC = path.join(__dirname, "../../src");
const DOCS = path.join(__dirname, "../../docs");
const COMPONENTS = path.join(SRC, "components");

function getComponentDoc(component) {
  const PATH = path.join(COMPONENTS, component, "README.md");
  if (!fsx.existsSync(PATH)) {
    return "";
  }

  const readme = String(fsx.readFileSync(PATH));
  const doc = readme
    .split("\n")
    .filter(line => !line.match(/# \w+/)) // remove the heading
    .join("\n")
    .trim(); // trim that shit

  const props = getProps(component);
  return [
    `### ${component}`,
    "",
    "**Import:**",
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
  CookiesConsent: true,
  Currency: true,
  HeaderLinks: true,
  Languages: true,
  NavBar: true,
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
