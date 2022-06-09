module.exports = {
  root: true,
  ignorePatterns: ["node_modules/**/*"],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        createDefaultProgram: true,
        // project: 'tsconfig.*.json'
      },
      extends: ['plugin:@angular-eslint/recommended'],
      rules: {
        'max-len': [
          'error', { "code": 180 }
        ],
        '@typescript-eslint/no-inferrable-types': 'off',
      }
    },
    {
      files: ['*.component.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        'max-len': 'off',
        '@angular-eslint/template/no-negated-async': 'off',
      }
    },
    {
      files: ['*.component.ts'],
      extends: ['plugin:@angular-eslint/template/process-inline-templates']
    }
  ]
}
