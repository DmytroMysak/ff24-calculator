import { createGlobalState } from '@vueuse/core';
import { date } from 'quasar';
import type { WorkBook } from 'xlsx';
import { utils } from 'xlsx';
import type { CalculateResponse, NBUResponse, RowItem } from '@types';
import { EXCHANGE_URL } from '@constants';

const { formatDate, extractDate, getMinDate, getMaxDate } = date;

export const CalculationService = createGlobalState(() => {
  const round = (number: number): number => Number(number.toFixed(2));
  const calcPercent = (total: number, percent: number): number => round((total * percent) / 100);
  const getCurrency = (parsedSheets: RowItem[]): string => parsedSheets?.[0]?.currency?.toLowerCase();

  function getDateRange(parsedSheets: RowItem[]): { startDate: Date; endDate: Date } {
    const paymentDates = parsedSheets.map((el) => el.paymentDate);

    // @ts-ignore
    return { startDate: getMinDate(...paymentDates), endDate: getMaxDate(...paymentDates) };
  }

  async function getExchangeRate(
    startDate: Date,
    endDate: Date,
    currency: string = 'usd',
  ): Promise<Record<string, number>> {
    const localStorageKey = `${formatDate(startDate, 'YYYYMMDD')}-${formatDate(endDate, 'YYYYMMDD')}-${currency}`;
    const cache = localStorage.getItem(localStorageKey);
    if (cache) {
      return JSON.parse(cache);
    }

    try {
      const queryParams = new URLSearchParams({
        valcode: currency,
        sort: 'exchangedate',
        order: 'desc',
        start: formatDate(startDate, 'YYYYMMDD'),
        end: formatDate(endDate, 'YYYYMMDD'),
      });
      const url = encodeURIComponent(`${EXCHANGE_URL}${queryParams}`);
      const response = await fetch(`${process.env.REDIRECT_URL}?url=${url}`);

      const data: NBUResponse[] = await response.json();

      const result = data.reduce<Record<string, number>>((acc, el) => {
        const key = extractDate(el.exchangedate, 'DD.MM.YYYY');
        acc[formatDate(key, 'YYYY-MM-DD')] = el.rate;

        return acc;
      }, {});

      localStorage.setItem(localStorageKey, JSON.stringify(result));
      return result;
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
      throw new Error('validation.siteUnavailable');
    }
  }

  async function calculate(workbook: WorkBook): Promise<CalculateResponse> {
    const parsedRows: RowItem[] = Object.values(workbook.Sheets)
      .flatMap((sheet) =>
        utils.sheet_to_json<RowItem>(sheet, {
          header: [
            'account',
            'agreementNumber',
            'ticker',
            'isin',
            'instrumentType',
            'place',
            'operation',
            'quantity',
            'price',
            'currency',
            'amount',
            'profit',
            'exchangeRate',
            'profit in currency',
            'commission',
            'paymentDate',
          ],
        }),
      )
      // eslint-disable-next-line no-underscore-dangle
      .filter((el) => el.__rowNum__ !== 0 && Number.parseFloat(el.profit) > 0);

    const currency = getCurrency(parsedRows);
    const { startDate, endDate } = getDateRange(parsedRows);
    const exchangeRate: Record<string, number> = await getExchangeRate(startDate, endDate, currency);

    const totalInUah = parsedRows?.reduce((acc, el) => {
      const exchangeRateForSpecificDate = exchangeRate[formatDate(el.paymentDate, 'YYYY-MM-DD')];

      if (!exchangeRateForSpecificDate) {
        console.error(el, exchangeRate); // eslint-disable-line no-console
        localStorage.clear();
        throw new Error('validation.invalidExchangeRate');
      }
      return round(acc + round(Number.parseFloat(el.profit) * exchangeRateForSpecificDate));
    }, 0);

    const totalInCurrency = parsedRows?.reduce((acc, el) => round(acc + Number.parseFloat(el.profit)), 0);

    return {
      currency: currency.toUpperCase(),
      totalInUah,
      totalInCurrency,
      dateStart: formatDate(startDate, 'YYYY-MM-DD'),
      dateEnd: formatDate(endDate, 'YYYY-MM-DD'),
      gainTax: calcPercent(totalInUah, 18),
      militaryTax: calcPercent(totalInUah, 1.5),
      table: parsedRows.map((el) => ({
        date: el.paymentDate,
        exchangeRate: exchangeRate[formatDate(el.paymentDate, 'YYYY-MM-DD')],
        profitInUsd: round(Number.parseFloat(el.profit)),
        profitInUah: round(Number.parseFloat(el.profit) * exchangeRate[formatDate(el.paymentDate, 'YYYY-MM-DD')]),
      })),
    };
  }

  return { calculate };
});
