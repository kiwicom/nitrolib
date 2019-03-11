// @flow strict
import type { PassengersCount } from "../../../records/Starred";

const isMulti = (object: PassengersCount) =>
  Object.keys(object).filter(key => object[key] > 0).length > 1;

export default isMulti;
