// @flow strict
import jsCookie from "js-cookie";

import { COOKIE_CONSENT_KEY, COOKIE_CONSENT_VALUE } from "client/consts/cookies";

export const isAccepted = () => Boolean(jsCookie.get(COOKIE_CONSENT_KEY));

export function saveAccepted() {
  jsCookie.set(COOKIE_CONSENT_KEY, COOKIE_CONSENT_VALUE);
}
