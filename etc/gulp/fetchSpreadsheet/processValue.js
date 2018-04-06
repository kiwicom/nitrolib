const R = require("ramda");

const isNotString = R.compose(R.not, R.is(String));

function processValue(value) {
  if (isNotString(value)) {
    return value;
  }

  // [value]
  if (/^\[.+\]$/.test(value)) {
    return value.slice(1, -1).split(",");
  }

  if (value === "TRUE") {
    return true;
  }

  if (value === "FALSE") {
    return false;
  }

  return value;
}

module.exports = processValue;
