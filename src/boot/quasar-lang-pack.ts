import { DEFAULT_LOCALE } from '@constants/global.constants';
import { Quasar, type QuasarLanguage } from 'quasar';

const langList = import.meta.glob<{ default: QuasarLanguage }>('../../node_modules/quasar/lang/(en-US|uk).js');

export default async () => {
  const langIso = localStorage?.getItem?.('locale') ?? DEFAULT_LOCALE;

  try {
    langList[`../../node_modules/quasar/lang/${langIso}.js`]().then((lang) => Quasar.lang.set(lang.default));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error during quasar locale loading', err);
  }
};
