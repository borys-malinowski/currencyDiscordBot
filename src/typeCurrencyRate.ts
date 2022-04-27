type CurrencyRate = {
  table: string;
  currency: string;
  code: string;
  rates: [{ no: string; effectiveDate: string; mid: number }];
};
export default CurrencyRate;
