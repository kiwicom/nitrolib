// @flow strict
import type { CookieSettings } from "../../records/CookieSettings";
import { COOKIES_SETTINGS } from "../../consts/cookies";

type Cookies = { [key: string]: string };

const cookieSettings = (cookies: Cookies): CookieSettings => {
  const cookie = cookies[COOKIES_SETTINGS];
  if (!cookie) {
    return {
      performance: true,
      marketing: true,
    };
  }

  return {
    performance: cookie.includes("performance=1"),
    marketing: cookie.includes("marketing=1"),
  };
};

export default cookieSettings;
