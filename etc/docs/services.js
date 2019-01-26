// @noflow
/* eslint-disable fp/no-throw */
const fsx = require("fs-extra");
const path = require("path");
const R = require("ramda");

const utils = require("./utils");

const SRC = path.join(__dirname, "../../src");
const DOCS = path.join(__dirname, "../../docs");
const SERVICES = path.join(SRC, "services");
const COMPONENTS = path.join(SRC, "components");

const NL = "\n";

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

function getServiceInitDoc(service) {
  const name = `Init${capitalize(service)}`;
  const PATH = path.join(COMPONENTS, name);
  if (!fsx.existsSync(PATH)) {
    return "";
  }

  const README = path.join(PATH, "README.md");
  if (!fsx.existsSync(README)) {
    throw new Error(`Every service's 'Init' component must have a README.md! Missing: ${name}`);
  }

  const readme = String(fsx.readFileSync(README));
  return utils.getComponentDoc(name, readme);
}

function getContextDoc(service) {
  const PATH = path.join(SERVICES, service, "README.md");
  if (!fsx.existsSync(PATH)) {
    throw new Error(`Every service must have a 'README.md'! Missing: ${service}`);
  }

  const TYPES = path.join(SERVICES, service, "context.js.flow");
  if (!fsx.existsSync(TYPES)) {
    throw new Error(`Every service must have a 'context.js.flow'! Missing: ${service}`);
  }

  const maybeInit = getServiceInitDoc(service);
  const readme = String(fsx.readFileSync(PATH));

  const types = utils.getFlowFile(TYPES);
  const doc = utils.getReadme(readme);

  return [
    `## ${capitalize(service)}`,
    "",
    "**Import:**",
    "```js",
    `import { Consumer, Provider } from "@kiwicom/nitro/lib/services/${service}/context";`,
    "```",
    "",
    types,
    "",
    doc,
    maybeInit ? NL + maybeInit : "",
  ].join("\n");
}

const getList = component => `* [${component}](#${component.toLowerCase()})`;

function servicesDocs() {
  const services = fsx.readdirSync(SERVICES);

  const contexts = services.filter(service =>
    fsx.existsSync(path.join(SERVICES, service, "context.js")),
  );
  const contextsList = contexts.map(getList).join("\n");
  const contextsDocs = contexts.map(getContextDoc).join("\n");

  // FIXME add also these
  // const utilities = services.filter(
  //   service => !fsx.existsSync(path.join(COMPONENTS, service, "context.js")),
  // );
  // const utilitiesList = utilities.map(getList).join("\n");
  // const utilitiesDocs = utilities.map(getContextDoc).join("\n");

  const doc = [
    "# Services",
    "",
    "Located in `@kiwicom/nitro/lib/services/<service>`.",
    "",
    "**List:**",
    "",
    contextsList,
    "",
    // "**Utilities:**",
    // "",
    // utilitiesList,
    // "",
    contextsDocs,
    // utilitiesDocs,
  ].join("\n");

  return doc;
}

module.exports = servicesDocs;
