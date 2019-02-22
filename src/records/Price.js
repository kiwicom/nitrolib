// @flow strict

export type PriceType = {
  currency: string,
  amount: number,
  base: number,
  merchant?: ?string,
  service: number,
  serviceFlat: number,
};
