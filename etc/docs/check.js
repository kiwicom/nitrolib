#!/usr/bin/env node
// @noflow
/* eslint-disable fp/no-throw */
const fsx = require("fs-extra");
const path = require("path");

const rootDocs = require("./root");
const componentsDocs = require("./components");
const recordsDocs = require("./records");
const servicesDocs = require("./services");

const DOCS = path.join(__dirname, "../../docs");

function load() {
  return Promise.all([
    fsx.readFile(path.join(DOCS, "index.md")),
    fsx.readFile(path.join(DOCS, "components.md")),
    fsx.readFile(path.join(DOCS, "records.md")),
    fsx.readFile(path.join(DOCS, "services.md")),
  ]).then(docs => docs.map(String));
}

async function checkDocs() {
  const [index, components, records, services] = await load();

  const index2 = rootDocs();
  const components2 = componentsDocs();
  const records2 = recordsDocs();
  const services2 = servicesDocs();

  if (index !== index2) {
    throw new Error("Root docs need a refresh! Run 'yarn docs'.");
  }

  if (components !== components2) {
    throw new Error("Components docs need a refresh! Run 'yarn docs'.");
  }

  if (records !== records2) {
    throw new Error("Records docs need a refresh! Run 'yarn docs'.");
  }

  if (services !== services2) {
    throw new Error("Services docs need a refresh! Run 'yarn docs'.");
  }
}

checkDocs()
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.error(err); // eslint-disable-line no-console

    process.exit(1);
  });
