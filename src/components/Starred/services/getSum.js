// @flow strict
import type { PassengersCount } from "../../../records/Starred";

const getSum = (object: PassengersCount) =>
  Object.keys(object).reduce((previous, key) => previous + object[key], 0);

export default getSum;
