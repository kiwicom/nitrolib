#!/usr/bin/env node
// @noflow
/* eslint-disable fp/no-throw */
const fsx = require("fs-extra");
const path = require("path");

const componentsDocs = require("./components");
const servicesDocs = require("./services");

const DOCS = path.join(__dirname, "../../docs");

function load() {
  return Promise.all([
    fsx.readFile(path.join(DOCS, "components.md")),
    fsx.readFile(path.join(DOCS, "services.md")),
  ]).then(docs => docs.map(String));
}

async function checkDocs() {
  const [components, services] = await load();

  componentsDocs();
  servicesDocs();

  const [components2, services2] = await load();

  if (components !== components2) {
    throw new Error("Components docs need a refresh! Run 'yarn docs'.");
  }

  if (services !== services2) {
    throw new Error("Services docs need a refresh! Run 'yarn docs'.");
  }
}

checkDocs();
