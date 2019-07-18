module.exports = {
  "moduleNameMapper": {
    "\\.(css|less|sass|scss)$": "<rootDir>/src/public/Scss/styleMock.js",
  },
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
  },
  // Enzyme setup
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  // setupTestFrameworkScriptFile is decprecated
  "setupFilesAfterEnv": ["<rootDir>/src/setupEnzyme.ts"],
}