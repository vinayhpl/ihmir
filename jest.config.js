// module.exports = {
//     collectCoverage: true,
//     collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'], // Adjust to match your source files
//     coverageReporters: ['lcov', 'text'],
//     testMatch: [
//         '**/__tests__/**/*.[jt]s?(x)', // Matches test files
//         '**/?(*.)+(spec|test).[jt]s?(x)'
//     ],
//     // Add other configurations as needed
// };

module.exports = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/index.js',
        '!**/node_modules/**',
    ],

   coverageReporters: [
        'text',          // Console output
        'lcov',          // LCOV report for SonarQube
        'html',          // HTML report for browser viewing
        'json'           // JSON report for programmatic access
    ],
    verbose: true, // Enable verbose output
    reporters: ['default', 'jest-silent-reporter'], // Add silent reporter for better error logging
};

