#!/usr/bin/env node
// @noflow
/* eslint-disable fp/no-throw */
const fsx = require("fs-extra");
const path = require("path");

const componentsDocs = require("./components");
const recordsDocs = require("./records");
const servicesDocs = require("./services");

const DOCS = path.join(__dirname, "../../docs");

function load() {
  return Promise.all([
    fsx.readFile(path.join(DOCS, "components.md")),
    fsx.readFile(path.join(DOCS, "records.md")),
    fsx.readFile(path.join(DOCS, "services.md")),
  ]).then(docs => docs.map(String));
}

async function checkDocs() {
  const [components, records, services] = await load();

  componentsDocs();
  recordsDocs();
  servicesDocs();

  const [components2, records2, services2] = await load();

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

checkDocs();
