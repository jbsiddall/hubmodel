/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "src",
  setupFiles: ["dotenv/config"],
  testMatch: [
    "**/__tests__/**/*\.(unit|integration)\.ts",
  ],
};
