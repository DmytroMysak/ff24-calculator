export type RowItem = {
  account: string;
  agreementNumber: string;
  ticker: string;
  isin: string;
  instrumentType: string;
  place: string;
  operation: string;
  quantity: string;
  price: string;
  currency: string;
  amount: string;
  profit: string;
  exchangeRate: string;
  'profit in currency': string;
  commission: string;
  paymentDate: string;
  __rowNum__: number;
};

export type NBUResponse = { exchangedate: string; rate: number };

export type CalculateResponse = {
  currency: string;
  dateStart: string;
  dateEnd: string;
  totalInUah: number;
  totalInCurrency: number;
  gainTax: number;
  militaryTax: number;
  table: { date: string; exchangeRate: number; profitInUsd: number; profitInUah: number }[];
};
