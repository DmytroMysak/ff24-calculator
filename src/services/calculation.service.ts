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
    const exchangeRate = await getExchangeRate(json.date_start, json.date_end);

    const totalInUah = json?.trades?.detailed?.reduce((acc, el) => {
      const exchangeRateForSpecificDate = exchangeRate[formatDate(el.short_date, 'YYYY-MM-DD')];

      if (!exchangeRateForSpecificDate && !el.profit) {
        return acc;
      }
      if (!exchangeRateForSpecificDate) {
        console.error(el); // eslint-disable-line no-console
        throw new Error('validation.invalidExchangeRate');
      }
      return round(acc + round(el.profit * exchangeRateForSpecificDate));
    }, 0);

    const totalInUsd = json?.trades?.detailed?.reduce((acc, el) => round(acc + el.profit), 0);

    return {
      totalInUah,
      totalInUsd,
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
