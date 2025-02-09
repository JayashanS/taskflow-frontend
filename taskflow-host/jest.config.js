module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    "\\.css$": "<rootDir>/src/__mocks__/styleMock.js",
    "^ol/ol.css$": "<rootDir>/src/__mocks__/styleMock.js",
  },
  transformIgnorePatterns: ["/node_modules/(?!ol)/"],
};
