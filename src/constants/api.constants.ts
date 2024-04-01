export const EXCHANGE_URL = 'https://bank.gov.ua/NBU_Exchange/exchange_site?json&';

if (!process.env.REDIRECT_URL) {
  throw new Error('No REDIRECT_URL');
}
// eslint-disable-next-line prefer-destructuring
export const REDIRECT_URL: string = process.env.REDIRECT_URL;

if (!process.env.SEND_EMAIL_URL) {
  throw new Error('No SEND_EMAIL_URL');
}
// eslint-disable-next-line prefer-destructuring
export const SEND_EMAIL_URL: string = process.env.SEND_EMAIL_URL;
