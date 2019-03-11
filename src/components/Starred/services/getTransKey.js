// @flow strict
import * as R from 'ramda';
import type { PassengersCount } from "../../../records/Starred";

const TRANS_KEY_SINGLE = {
  adults: {
    one: "adult",
    many: "adults",
  },
  children: {
    one: "child",
    many: "children",
  },
  infants: {
    one: "infant",
    many: "infants",
  },
};

const getTransKey = (object: PassengersCount): string => {
  const keyWithValue = Object.keys(object).find(key => object[key] > 0) || "adults";
  const source = TRANS_KEY_SINGLE[keyWithValue];

  return Object.keys(object).length > 1 ? source.many : source.one;
};

export default getTransKey;
