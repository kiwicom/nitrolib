#!/usr/bin/env node
// @noflow
const fsx = require("fs-extra");
const path = require("path");

const components = require("./components");
const records = require("./records");
const services = require("./services");

const DOCS = path.join(__dirname, "../../docs");

fsx.outputFileSync(path.join(DOCS, "components.md"), components());
fsx.outputFileSync(path.join(DOCS, "records.md"), records());
fsx.outputFileSync(path.join(DOCS, "services.md"), services());
