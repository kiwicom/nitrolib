module.exports = {
  setupFiles: ["raf/polyfill", "./etc/jestSetup.js", "./etc/jestGlobals.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testPathIgnorePatterns: ["dist"],
  collectCoverageFrom: ["src/client/**.{js,jsx}", "!src/client/app.jsx", "!src/client/index.js"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
