/* eslint-disable semi */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
module.exports = {
	roots: ["<rootDir>/src"],
	collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
	coverageDirectory: "coverage",
	testEnvironment: "node",
	transform: {
		".+\\.ts$": "ts-jest",
	},
};
