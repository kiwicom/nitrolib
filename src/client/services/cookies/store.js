// @flow strict
import JsCookies from "js-cookie";

import { COOKIE_CONSENT_KEY, COOKIE_CONSENT_VALUE } from "client/consts/cookies";

export const isAccepted = () => Boolean(JsCookies.get(COOKIE_CONSENT_KEY));

export const saveAccepted = () => {
  JsCookies.set(COOKIE_CONSENT_KEY, COOKIE_CONSENT_VALUE); // TODO: Add cookie options
};
