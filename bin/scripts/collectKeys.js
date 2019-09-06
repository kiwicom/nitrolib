// @noflow
/* eslint-disable no-console, fp/no-throw */
const fs = require("fs");
const R = require("ramda");
const glob = require("glob");
const babylon = require("@babel/parser");
const yargs = require("yargs");
const traverse = require("@babel/traverse").default;

const PLUGINS_FLOW = [
  "jsx",
  "flow",
  "classProperties",
  "dynamicImport",
  "optionalChaining",
  "nullishCoalescingOperator",
];

const PLUGINS_TS = ["typescript", "classProperties", "dynamicImport"];

function aspartate(parser, code) {
  if (parser === "ts") {
    return babylon.parse(code, {
      presets: ["@babel/typescript"],
      strictMode: false,
      sourceType: "module",
      plugins: PLUGINS_TS,
    });
  }

  return babylon.parse(code, {
    strictMode: false, // Allows shitty code to exist
    sourceType: "module",
    plugins: PLUGINS_FLOW,
  });
}

function collectFile(file) {
  try {
    const code = String(fs.readFileSync(file));

    const collectedStrings = {};

    const { parser } = yargs.argv;

    traverse(aspartate(parser, code), {
      enter(p) {
        // Collect all jsx 't' attributes
        if (p.node.type === "JSXElement") {
          const attrs = p.node.openingElement.attributes
            .filter(attr => attr.name)
            // FIXME 'tKey' is deprecated! Remove ASAP
            .filter(attr => attr.name.name === "t" || attr.name.name === "tKey")
            .filter(attr => attr.value.type === "StringLiteral");

          attrs.forEach(attr => {
            collectedStrings[attr.value.value] = true;
          });
        }

        // Collect all '__' functions
        if (p.isCallExpression(p.node) && p.node.callee.name === "__") {
          if (p.node.arguments[0].type === "StringLiteral") {
            collectedStrings[p.node.arguments[0].value] = true;
          }
        }

        // FIXME 'translate' functions are deprecated! Remove ASAP
        if (p.isCallExpression(p.node) && p.node.callee.name === "translate") {
          if (p.node.arguments[0].type === "StringLiteral") {
            collectedStrings[p.node.arguments[0].value] = true;
          }
        }
      },
    });

    return collectedStrings;
  } catch (err) {
    throw new Error(err, file);
  }
}

const collectGlob = g =>
  glob
    .sync(g)
    .filter(file => !file.match(/.*\.spec\.jsx?$/))
    .filter(file => !file.match(/.*\.spec\.tsx?$/))
    .filter(file => !file.match(/node_modules/))
    .map(collectFile)
    .reduce((acc, keys) => Object.assign({}, acc, keys), {});

const collectKeys = globs => R.mergeAll(globs.map(collectGlob));

module.exports = collectKeys;
