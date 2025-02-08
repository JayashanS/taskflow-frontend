module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    "^ol/ol.css$": "<rootDir>/__mocks__/styleMock.js",
  },
};
