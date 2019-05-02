// @flow strict
import type { Currency } from "./Currency";

export type Money = {|
  amount: string,
  currency: Currency,
  formattedValue: string,
|};
