module.exports = {
  testEnvironment: 'jest-environment-jsdom-global',
  testURL: 'http://localhost/',
  setupFiles: [
    './src/setupTest.js',
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!@(open)?edx)',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/**.{js,jsx}',
    '!src/**/*.stories.jsx',
    '!src/setupTest.js',
  ],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/fileTransformer.js',
  },
};
