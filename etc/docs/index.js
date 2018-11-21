#!/usr/bin/env node
// @noflow
const components = require("./components");
const records = require("./records");
const services = require("./services");

components();
records();
services();
