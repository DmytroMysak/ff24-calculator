export type FF24FileData = {
  date_start: string;
  date_end: string;
  trades: { detailed: { pay_d: string; short_date: string; profit: number; operation: 'buy' | 'sell' }[] };
};

export type NBUResponse = { exchangedate: string; rate: number };

export type CalculateResponse = {
  dateStart: string;
  dateEnd: string;
  totalInUah: number;
  totalInUsd: number;
  gainTax: number;
  militaryTax: number;
  table: { date: string; exchangeRate: number; profitInUsd: number; profitInUah: number }[];
};
