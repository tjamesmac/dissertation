module.exports = {
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