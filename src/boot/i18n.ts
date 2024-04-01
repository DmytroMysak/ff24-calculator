import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import messages from 'src/i18n';
import { DEFAULT_LOCALE } from '@constants/global.constants';

export type MessageLanguages = keyof typeof messages;
export type MessageSchema = (typeof messages)['en-US'];

/* eslint-disable @typescript-eslint/no-empty-interface */
declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
  export interface DefineDateTimeFormat {}
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-interface */

export default boot(({ app }) => {
  const langIso = localStorage?.getItem?.('locale') ?? DEFAULT_LOCALE;

  const i18n = createI18n({
    legacy: false,
    mode: 'composition',
    globalInjection: true,
    locale: langIso,
    fallbackLocale: 'en-US',
    messages,
  });

  app.use(i18n);
});
