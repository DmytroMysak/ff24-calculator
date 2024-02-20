import { createGlobalState } from '@vueuse/core';
import { date } from 'quasar';
import type { CalculateResponse } from '@types';
import { parseJSON, getExchangeRate, calcPercent, round } from '@utils';

const { formatDate } = date;

export const CalculationService = createGlobalState(() => {
  async function calculate(file?: File): Promise<CalculateResponse> {
    const text = await file?.text();
    if (!text) {
      throw new Error('validation.fileEmpty');
    }

    const json = parseJSON(text);

    const localStorageKey = `${formatDate(json.date_start, 'YYYYMMDD')}-${formatDate(json.date_end, 'YYYYMMDD')}`;
    const cache = localStorage.getItem(localStorageKey);

    const exchangeRate: Record<string, number> = cache
      ? JSON.parse(cache)
      : await getExchangeRate(json.date_start, json.date_end);

    if (!cache) {
      localStorage.setItem(localStorageKey, JSON.stringify(exchangeRate));
    }

    const profit = json?.trades?.detailed?.filter((el) => !!el.profit);

    const totalInUah = profit?.reduce((acc, el) => {
      const exchangeRateForSpecificDate = exchangeRate[formatDate(el.short_date, 'YYYY-MM-DD')];

      if (!exchangeRateForSpecificDate) {
        console.error(el, exchangeRate); // eslint-disable-line no-console
        localStorage.removeItem(localStorageKey);

        throw new Error('validation.invalidExchangeRate');
      }
      return round(acc + round(el.profit * exchangeRateForSpecificDate));
    }, 0);

    const totalInUsd = profit?.reduce((acc, el) => round(acc + el.profit), 0);

    return {
      totalInUah,
      totalInUsd,
      dateStart: json.date_start,
      dateEnd: json.date_end,
      gainTax: calcPercent(totalInUah, 18),
      militaryTax: calcPercent(totalInUah, 1.5),
      table: json.trades.detailed
        .filter((el) => !!el.profit)
        .map((el) => ({
          date: el.short_date,
          exchangeRate: exchangeRate[formatDate(el.short_date, 'YYYY-MM-DD')],
          profitInUsd: round(el.profit),
          profitInUah: round(el.profit * exchangeRate[formatDate(el.short_date, 'YYYY-MM-DD')]),
        })),
    };
  }

  return { calculate };
});
