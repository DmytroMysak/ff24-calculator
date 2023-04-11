import { EXCHANGE_URL } from '@constants';
import type { FF24FileData, NBUResponse } from '@types';
import { date } from 'quasar';

const { formatDate, extractDate } = date;

export function round(num: number): number {
  return Number(num.toFixed(2));
}

export function parseJSON(text: string): FF24FileData {
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    throw new Error('validation.fileContain');
  }
}

export function calcPercent(total: number, percent: number): number {
  return round((total * percent) / 100);
}

export async function getExchangeRate(startDate: string, endDate: string): Promise<Record<string, number>> {
  try {
    const queryParams = new URLSearchParams({
      valcode: 'usd',
      sort: 'exchangedate',
      order: 'desc',
      start: formatDate(startDate, 'YYYYMMDD'),
      end: formatDate(endDate, 'YYYYMMDD'),
    });
    const response = await fetch(`${process.env.REDIRECT_URL}${EXCHANGE_URL}${queryParams}`);

    const data: NBUResponse[] = await response.json();

    return data.reduce<Record<string, number>>((acc, el) => {
      const key = extractDate(el.exchangedate, 'DD.MM.YYYY');
      acc[formatDate(key, 'YYYY-MM-DD')] = el.rate;

      return acc;
    }, {});
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    throw new Error('validation.siteUnavailable');
  }
}
