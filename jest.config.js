export default {
  "verbose": true,
  "roots": [
    "<rootDir>"
  ],
  "testMatch": [
    "**/tests/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "modulePathIgnorePatterns": ["parson"],
  "collectCoverage": true,
  "collectCoverageFrom": [
    "src/**/*.ts",
    "!src/utils/*.ts"
  ]
}