// @flow
import type { Currency } from "../../records/Currency";

const format = (currency: Currency, price: number) =>
  currency.format.replace("__price__", price * currency.rate);

export default format;
