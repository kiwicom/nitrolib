// @flow strict

export type PriceBreakdown = {|
  packagePrice: {|
    amount: number,
    currency: string,
  |},
  taxes: {|
    amount: number,
    currency: string,
  |},
  fees: {|
    amount: number,
    currency: string,
  |},
  totalPrice: {|
    amount: number,
    currency: string,
  |},
|};
