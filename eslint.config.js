// import netlyConfig from '@netly/eslint-config-base';
import eslint from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import typescriptEslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: [
      'dist/',
      '/src-capacitor',
      '/src-cordova',
      '.quasar/',
      '/node_modules',
      '/src-ssr',
      '/src/services/package',
      '/quasar.config.*.temporary.compiled*',
    ],
  },
  ...typescriptEslint.config(
    eslint.configs.recommended,
    ...typescriptEslint.configs.recommended,
    ...pluginVue.configs['flat/strongly-recommended'],
    {
      plugins: {
        'typescript-eslint': typescriptEslint.plugin,
      },
      languageOptions: {
        parserOptions: {
          parser: typescriptEslint.parser,
          project: './tsconfig.json',
          extraFileExtensions: ['.vue'],
          sourceType: 'module',
        },
        globals: {
          process: false,
        },
      },
    },
  ),
  eslintConfigPrettier,
  // ...netlyConfig,
];
