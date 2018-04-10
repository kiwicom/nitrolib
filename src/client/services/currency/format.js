// @flow
import type { Currency } from "client/records/Currency";

const format = (currency: Currency, price: number) =>
  currency.format.replace("__price__", String(price * currency.rate));

export default format;
