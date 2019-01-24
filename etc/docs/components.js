// @noflow
const fsx = require("fs-extra");
const path = require("path");

const utils = require("./utils");

const SRC = path.join(__dirname, "../../src");
const DOCS = path.join(__dirname, "../../docs");
const COMPONENTS = path.join(SRC, "components");

function getComponentDoc(component) {
  const PATH = path.join(COMPONENTS, component, "README.md");
  if (!fsx.existsSync(PATH)) {
    return "";
  }

  const readme = String(fsx.readFileSync(PATH));
  return utils.getComponentDoc(component, readme);
}

const FEATURES = {
  CookiesConsent: true,
  Currency: true,
  DatePicker: true,
  Footer: true,
  HeaderLinks: true,
  Languages: true,
  LocationPicker: true,
  NavBar: true,
  SideBar: true,
};

const getList = component => `* [${component}](#${component.toLowerCase()})`;

const FEATURES_TEXT = `## Features

Actual components that do stuff. See [storybook](https://nitro-storybook-master.fe.staging.kiwi.com) for a live example.
`;

const UTILITIES_TEXT = `## Utilities

Things that help in development.
`;

function componentsDocs() {
  const components = fsx
    .readdirSync(COMPONENTS)
    .filter(component => !component.match(/^Init\w+/)) // these are documented in services
    .filter(component => fsx.existsSync(path.join(COMPONENTS, component, "README.md")));

  const features = components.filter(component => FEATURES[component]);
  const featuresList = features.map(getList).join("\n");
  const featuresDocs = features.map(getComponentDoc).join("\n");

  const utilities = components.filter(component => !FEATURES[component]);
  const utilitiesList = utilities.map(getList).join("\n");
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

module.exports = componentsDocs;
