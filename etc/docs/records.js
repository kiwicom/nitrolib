// @noflow
/* eslint-disable fp/no-throw */
const fsx = require("fs-extra");
const path = require("path");

const utils = require("./utils");

const SRC = path.join(__dirname, "../../src");
const RECORDS = path.join(SRC, "records");

function getRecordDoc(record) {
  const README = path.join(RECORDS, `${record}.md`);
  const FLOW = path.join(RECORDS, `${record}.js.flow`);

  const readme = String(fsx.readFileSync(README));
  const flow = utils.getFlowFile(FLOW);

  const doc = utils.getReadme(readme);

  return [
    `## ${record}`,
    "",
    "**Imports:**",
    "```js",
    `import * as fns from "@kiwicom/nitro/lib/records/${record}";`,
    `import type { ${record} } from "@kiwicom/nitro/lib/records/${record}";`,
    "```",
    "",
    flow,
    "",
    doc,
    "",
  ].join("\n");
}

const getList = component => `* [${component}](#${component.toLowerCase()})`;

function getRecordsDocs() {
  const records = fsx
    .readdirSync(RECORDS)
    .filter(file => file.match(/\.md$/))
    .map(file => file.replace(".md", ""));

  const recordsList = records.map(getList).join("\n");
  const recordsDocs = records.map(getRecordDoc).join("\n");

  const doc = [
    "# Records",
    "",
    "Located in `@kiwicom/nitro/lib/records/<record>`.",
    "",
    recordsList,
    "",
    recordsDocs,
  ].join("\n");

  return doc;
}

module.exports = getRecordsDocs;
