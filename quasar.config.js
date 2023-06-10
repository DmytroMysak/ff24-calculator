// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

const { configure } = require('quasar/wrappers');
const path = require('path');

module.exports = configure((/* ctx */) => ({
  eslint: {
    fix: true,
    warnings: true,
    errors: true,
  },

  // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
  // preFetch: true,

  // https://v2.quasar.dev/quasar-cli-vite/boot-files
  boot: ['i18n', 'quasar-lang-pack'],

  // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
  css: ['app.scss'],

  // https://github.com/quasarframework/quasar/tree/dev/extras
  extras: ['mdi-v5', 'roboto-font'],

  build: {
    target: {
      browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
      node: 'node16',
    },
    vueRouterMode: 'hash', // available values: 'hash', 'history'
    vueOptionsAPI: false,
    rebuildCache: true,
    publicPath: '/',
    env: {
      REDIRECT_URL: process.env.REDIRECT_URL,
      VERCEL_ANALYTICS_ID: process.env.VERCEL_ANALYTICS_ID,
    },
    // analyze: true,
    // rawDefine: {}
    // ignorePublicFolder: true,
    // minify: false,
    // polyfillModulePreload: true,
    // distDir
    // viteVuePluginOptions: {},

    extendViteConf(viteConf) {
      viteConf.resolve.alias = {
        ...viteConf.resolve.alias,
        '@services': path.resolve(__dirname, './src/services'),
        '@utils': path.resolve(__dirname, './src/utils/index.ts'),
        '@constants': path.resolve(__dirname, './src/constants/index.ts'),
        '@types': path.resolve(__dirname, './src/types/index.ts'),
      };

      return viteConf;
    },
    vitePlugins: [
      [
        '@intlify/vite-plugin-vue-i18n',
        {
          // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
          // compositionOnly: false,

          // if you want to use named tokens in your Vue I18n messages, such as 'Hello {name}',
          // you need to set `runtimeOnly: false`
          runtimeOnly: false,

          // you need to set i18n resource including paths !
          include: path.resolve(__dirname, './src/i18n/**'),
        },
      ],
    ],
  },
  devServer: { open: false },
  framework: {
    config: {},
    iconSet: 'mdi-v5',
    plugins: ['Dialog'],
  },
  animations: [],

  // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
  ssr: {
    // ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
    // will mess up SSR
    // extendSSRWebserverConf (esbuildConf) {},
    // extendPackageJson (json) {},
    pwa: false,
    // manualStoreHydration: true,
    // manualPostHydrationTrigger: true,
    prodPort: 3000, // The default port that the production server should use
    // (gets superseded if process.env.PORT is specified at runtime)
    middlewares: [
      'render', // keep this as last one
    ],
  },

  // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
  pwa: {
    workboxMode: 'generateSW', // or 'injectManifest'
    injectPwaMetaTags: true,
    swFilename: 'sw.js',
    manifestFilename: 'manifest.json',
    useCredentialsForManifestTag: false,
    // useFilenameHashes: true,
    // extendGenerateSWOptions (cfg) {}
    // extendInjectManifestOptions (cfg) {},
    // extendManifestJson (json) {}
    // extendPWACustomSWConf (esbuildConf) {}
  },

  // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
  cordova: {
    // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
  },

  // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
  capacitor: {
    hideSplashscreen: true,
  },

  // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
  electron: {
    // extendElectronMainConf (esbuildConf)
    // extendElectronPreloadConf (esbuildConf)

    inspectPort: 5858,

    bundler: 'packager', // 'packager' or 'builder'

    packager: {
      // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
      // OS X / Mac App Store
      // appBundleId: '',
      // appCategoryType: '',
      // osxSign: '',
      // protocol: 'myapp://path',
      // Windows only
      // win32metadata: { ... }
    },

    builder: {
      // https://www.electron.build/configuration/configuration

      appId: 'ff24-saving',
    },
  },

  // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
  bex: {
    contentScripts: ['my-content-script'],

    // extendBexScriptsConf (esbuildConf) {}
    // extendBexManifestJson (json) {}
  },
}));
