// @flow strict

export type PriceType = {|
  currency: string,
  amount: number,
  base: number,
  merchant?: string | null,
  service: number,
  serviceFlat: number,
|};
