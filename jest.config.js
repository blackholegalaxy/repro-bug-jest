const esModules = ['@angular', '@firebase', 'firebase', '@ngrx', '@ngneat'].join('|');

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setupJest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/ng-snapshot.js',
    'jest-preset-angular/build/serializers/html-comment.js',
    'jest-preset-angular/build/serializers/no-ng-attributes.js',
  ],
  moduleNameMapper: {
    'assets/(.*)': '<rootDir>/src/assets/$1',
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    '@env': '<rootDir>/src/environments/environment',
    'environments/(.*)': '<rootDir>/src/environments/$1'
  },
  coverageReporters: ['html', 'text-summary', 'text'],
  collectCoverageFrom: [
    'src/app/core/**/*.ts',

    // Exclusions
    '!src/app/*.ts',
    '!src/app/core/store/utils/*.ts',
    '!src/tests/**/*.ts',
    '!src/environments/*.ts',
    '!src/*.ts',
    '!src/app/**/*.module.ts',
    '!src/app/**/*.routes.ts',
    '!src/app/**/*.model.ts',
    '!src/app/**/models/*.ts',
    '!src/app/**/models/**/*.ts',
    '!src/app/**/model/*.ts',
    '!src/app/**/model/**/*.ts',
    '!src/app/**/animations/*.ts',
    '!src/app/**/*.animation.ts',
    '!src/app/**/vendors.ts',
    '!src/app/**/index.ts',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/coverage/',
  ],
  transformIgnorePatterns: [
    `node_modules/(?!(${esModules}|@angular/fire/node_modules/@firebase|.*.mjs$))`,
  ],
  resolver: '<rootDir>/src/jest.resolver.js',
  cacheDirectory: './jest-cache'
};
