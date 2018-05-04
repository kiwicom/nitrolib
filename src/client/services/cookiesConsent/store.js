// @flow strict
import JsCookies from "js-cookie";

import { COOKIE_CONSENT_KEY, COOKIE_CONSENT_VALUE } from "client/consts/cookies";
import { IS_CLIENT } from "client/consts/system";

export const isAccepted = () => !IS_CLIENT || Boolean(JsCookies.get(COOKIE_CONSENT_KEY));

export const saveAccepted = () => {
  if (IS_CLIENT) {
    JsCookies.set(COOKIE_CONSENT_KEY, COOKIE_CONSENT_VALUE);
  }
};
