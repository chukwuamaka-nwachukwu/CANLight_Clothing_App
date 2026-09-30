/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.js",
  ],

  moduleFileExtensions: [
    "js",
    "jsx",
    "json",
  ],

  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy",

    "\\.(jpg|jpeg|png|gif|webp|svg|ico)$":
      "<rootDir>/src/test/fileMock.js",
  },

  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],

  clearMocks: true,

  verbose: true,
};