// @flow strict
import jsCookie from "js-cookie";

import { CURRENCY } from "client/consts/cookies";

export function getValue() {
  return jsCookie.get(CURRENCY);
}

export function saveValue(newValue: string) {
  jsCookie.set(CURRENCY, newValue);
}
