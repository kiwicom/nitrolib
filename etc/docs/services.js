// @noflow
/* eslint-disable fp/no-throw */
const fsx = require("fs-extra");
const path = require("path");
const R = require("ramda");

const utils = require("./utils");

const SRC = path.join(__dirname, "../../src");
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

  return `See [${name}](./components#${name.toLowerCase()}) for initializing the service.`;
}

function getWhatDoc(service, what) {
  const PATH = path.join(SERVICES, service, `${what}.md`);
  if (!fsx.existsSync(PATH)) {
    return ""; // A private service
  }

  const TYPES = path.join(SERVICES, service, `${what}.js.flow`);
  if (!fsx.existsSync(TYPES)) {
    throw new Error(
      `Every documented service must have a '${what}.js.flow'! Missing: ${what} in ${service}`,
    );
  }

  const readme = String(fsx.readFileSync(PATH));

  const types = utils.getFlowFile(TYPES);
  const doc = utils.getReadme(readme);

  return [
    `### ${capitalize(what)}`,
    "",
    "**Import:**",
    "```js",
    `import * as ${what} from "@kiwicom/nitro/lib/services/${service}/${what}";`,
    "```",
    "",
    types,
    "",
    doc,
    "",
  ].join("\n");
}

function getServiceDoc(service) {
  const PATH = path.join(SERVICES, service);

  const readme = String(fsx.readFileSync(path.join(PATH, "README.md")));
  const docs = fsx
    .readdirSync(PATH)
    .map(what => what.match(/^(\w+)\.js$/)) // only .js files
    .filter(Boolean)
    .map(match => getWhatDoc(service, match[1]))
    .filter(Boolean)
    .join("\n");

  const maybeInit = getServiceInitDoc(service);

  return [
    `## ${capitalize(service)}`,
    "",
    utils.getReadme(readme),
    maybeInit ? NL + maybeInit + NL : "",
    docs,
  ].join("\n");
}

const getList = service => `* [${capitalize(service)}](#${service.toLowerCase()})`;

function servicesDocs() {
  const services = fsx
    .readdirSync(SERVICES)
    .filter(service => fsx.existsSync(path.join(SERVICES, service, "README.md")));

  const docs = services
    .map(getServiceDoc)
    .filter(Boolean)
    .join("\n");
  const list = services.map(getList).join("\n");

  const doc = [
    "# Services",
    "",
    "Located in `@kiwicom/nitro/lib/services/<service>`.",
    "",
    "**List:**",
    "",
    list,
    "",
    docs,
  ].join("\n");

  return doc;
}

module.exports = servicesDocs;
