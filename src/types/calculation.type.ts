export type FF24FileData = {
  date_start: string;
  date_end: string;
  trades: { detailed: { short_date: string; profit: number }[] };
};

export type NBUResponse = { exchangedate: string; rate: number };

export type CalculateResponse = {
  totalInUah: number;
  totalInUsd: number;
  gainTax: number;
  militaryTax: number;
  table: { date: string; exchangeRate: number; profitInUsd: number; profitInUah: number }[];
};
