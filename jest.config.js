module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'], // Adjust to match your source files
    coverageReporters: ['lcov', 'text'],
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)', // Matches test files
        '**/?(*.)+(spec|test).[jt]s?(x)'
    ],
    // Add other configurations as needed
};
