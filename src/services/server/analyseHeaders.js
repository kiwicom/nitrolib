// @flow strict
const HEADER_DELIMITERS_SIZE = 3;
const COOKIES_DELIMITERS_SIZE = 1;
const SIZE_LIMIT = 6000;

const getCookieName = (cookie: string): string => cookie.split("=")[0].trim();

const isCookieSplitster = cookie => cookie.toLowerCase().split("_")[0] === "splitster";
const isCookieRecentSearch = cookie => cookie === "recentSearch";
const isCookieUserId = cookie => cookie === "userId";

type CookieSizes = {|
  total: number,
  splitster: number,
  recentSearch: number,
  other: number,
|};

const getCookiesSizes = (cookies: string[]): CookieSizes =>
  cookies.reduce(
    (acc, cookie) => {
      const size = cookie.length + COOKIES_DELIMITERS_SIZE;
      const name = getCookieName(cookie);

      if (isCookieSplitster(name)) {
        return { ...acc, total: acc.total + size, splitster: acc.splitster + size };
      }

      if (isCookieRecentSearch(name)) {
        return { ...acc, total: acc.total + size, recentSearch: acc.recentSearch + size };
      }

      return { ...acc, total: acc.total + size, other: acc.other + size };
    },
    { total: 0, splitster: 0, recentSearch: 0, other: 0 },
  );

export type Headers = { [string]: string };

const getHeadersSize = (headers: Headers) =>
  Object.keys(headers).reduce(
    (acc, key) => acc + key.length + headers[key].length + HEADER_DELIMITERS_SIZE,
    0,
  );

const getCookiesToRemove = (cookies: string[]): string[] =>
  cookies
    .map(getCookieName)
    .filter(name => isCookieSplitster(name) || isCookieRecentSearch(name) || isCookieUserId(name));

export type AnalysePayload = {|
  total: number,
  url: number,
  headers: number,
  cookies: CookieSizes,
  cookiesToRemove: string[],
|};

const analyseHeaders = (h: Headers, url: string, limit: number = SIZE_LIMIT): AnalysePayload => {
  const headers = getHeadersSize(h);
  const list = h.cookie ? h.cookie.split(";") : [];
  const total = url.length + headers;
  const cookies = getCookiesSizes(list);
  const cookiesToRemove = total > limit ? getCookiesToRemove(list) : [];

  return {
    total,
    url: url.length,
    headers,
    cookies,
    cookiesToRemove,
  };
};

export default analyseHeaders;
