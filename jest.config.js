module.exports = {
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
    },
    testEnvironment: 'jest-environment-jsdom',
};