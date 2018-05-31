// @flow strict
import type { Currency } from "client/records/Currency";

const getSymbol = (currency: Currency) => currency.format.replace("__price__", "").trim();

export default getSymbol;
