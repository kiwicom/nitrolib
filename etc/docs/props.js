// @noflow
/* eslint-disable fp/no-throw */
const fsx = require("fs-extra");
const path = require("path");

const SRC = path.join(__dirname, "../../src");
const COMPONENTS = path.join(SRC, "components");

function props(component) {
  const PATH = path.join(COMPONENTS, component, "index.js.flow");
  if (!fsx.existsSync(PATH)) {
    throw new Error(`Documented components need an 'index.js.flow' file! Missing: ${component}`);
  }

  const text = String(fsx.readFileSync(PATH))
    .split("\n")
    .filter(line => !line.match(/^\/\/ @flow/)) // remove initial Flow comment
    .filter(line => !line.match(/^import/)) // remove imports
    .filter(line => !line.match(/^declare export default/)) // remove exports
    .join("\n")
    .trim(); // trim that shit

  if (!text) {
    return "";
  }

  return ["**Props:**", "```js", text, "```"].join("\n");
}

module.exports = props;
