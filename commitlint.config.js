// @flow
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [2, "always", "sentence-case"],
    "scope-enum": [2, "always", ["meta", "bin", "components", "consts", "records", "services"]],
  },
};
