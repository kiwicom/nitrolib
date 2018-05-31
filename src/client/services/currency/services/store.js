// @flow strict
import jsCookie from "js-cookie";

import { CURRENCY as COOKIE_CURRENCY } from "client/consts/cookies";

export function getValue() {
  return jsCookie.get(COOKIE_CURRENCY);
}

export function saveValue(newValue: string) {
  jsCookie.set(COOKIE_CURRENCY, newValue);
}
