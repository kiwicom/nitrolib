#!/usr/bin/env node
// @noflow
const fsx = require("fs-extra");
const path = require("path");

const root = require("./root");
const components = require("./components");
const records = require("./records");
const services = require("./services");

const ROOT = path.join(__dirname, "../..");
const DOCS = path.join(ROOT, "docs");

fsx.outputFileSync(path.join(DOCS, "index.md"), root());
fsx.outputFileSync(path.join(DOCS, "components.md"), components());
fsx.outputFileSync(path.join(DOCS, "records.md"), records());
fsx.outputFileSync(path.join(DOCS, "services.md"), services());
