// eslint-disable-next-line import/no-import-module-exports
import { URL } from 'node:url';

export default async function handler(request, response) {
  const { url } = request.query;
  console.log({ url });

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    console.warn('Invalid URL');
    return response.status(400).json({ error: 'Invalid URL' });
  }

  const res = await fetch(parsedUrl);

  return response.status(200).json(await res.json());
}
