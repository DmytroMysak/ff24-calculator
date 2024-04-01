import { SEND_EMAIL_URL } from '@constants/api.constants';
import { createSharedComposable } from '@vueuse/core';

export const SuggestionService = createSharedComposable(() => {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  async function sendEmail(from: string, text: string): Promise<void> {
    try {
      const res = await fetch(SEND_EMAIL_URL, {
        headers,
        method: 'POST',
        mode: 'same-origin',
        body: JSON.stringify({ from, text }),
      });
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
      throw new Error('suggestion.error');
    }
  }

  return { sendEmail };
});
