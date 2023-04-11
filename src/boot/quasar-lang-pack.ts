import { DEFAULT_LOCALE } from '@constants';
import { Quasar } from 'quasar';

const langList = import.meta.glob('../../node_modules/quasar/lang/(en-US|uk).mjs');

export default async () => {
  const langIso = localStorage?.getItem?.('locale') ?? DEFAULT_LOCALE;

  try {
    langList[`../../node_modules/quasar/lang/${langIso}.mjs`]().then((lang) => Quasar.lang.set(lang.default));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error during quasar locale loading', err);
  }
};
