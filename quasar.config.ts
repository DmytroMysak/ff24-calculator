import { configure } from 'quasar/wrappers';
import { fileURLToPath } from 'node:url';
import type { QuasarConf } from '@quasar/app-vite/types/configuration/conf';
import type { QuasarContext } from '@quasar/app-vite/types/configuration/context';
import { version } from './package.json';

export default configure(
  (ctx: QuasarContext): QuasarConf => ({
    boot: ['i18n', 'quasar-lang-pack'],
    css: ['app.scss'],
    extras: ['roboto-font'],
    build: {
      analyze: false,
      vueRouterMode: 'history', // available values: 'hash', 'history'
      vueOptionsAPI: false,
      publicPath: '/',
      extendViteConf(viteConf) {
        if (!viteConf.resolve) {
          viteConf.resolve = { alias: {} };
        }
        viteConf.resolve.alias = {
          ...viteConf.resolve.alias,
          '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
          '@constants': fileURLToPath(new URL('./src/constants', import.meta.url)),
          '@types': fileURLToPath(new URL('./src/types/index.ts', import.meta.url)),
        };
        return viteConf;
      },
      env: {
        PACKAGE_VERSION: version,
      },
      vitePlugins: [
        [
          [
            '@intlify/unplugin-vue-i18n/vite',
            {
              runtimeOnly: false,
              include: [fileURLToPath(new URL('./src/i18n', import.meta.url))],
              ssr: ctx.modeName === 'ssr',
            },
          ] as any,
          [
            'vite-plugin-checker',
            {
              vueTsc: { tsconfigPath: 'tsconfig.vue-tsc.json' },
              eslint: { lintCommand: 'eslint "./**/*.{js,ts,mjs,cjs,vue}"' },
            },
            { server: false },
          ],
        ],
      ],
    },
    devServer: { open: false },
    framework: {
      config: {},
      iconSet: 'svg-ionicons-v6',
      plugins: ['Dialog', 'Notify'],
      autoImportScriptExtensions: ['ts'],
    },
    animations: [],
    ssr: {
      pwa: false,
      prodPort: 3000,
      middlewares: ['render'],
    },
    pwa: {
      workboxMode: 'GenerateSW', // or 'InjectManifest'
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
    },
    cordova: {},
    capacitor: { hideSplashscreen: true },
    electron: {
      inspectPort: 5858,
      bundler: 'packager', // 'packager' or 'builder'
      packager: {},
    },
    bex: { contentScripts: ['my-content-script'] },
  }),
);
