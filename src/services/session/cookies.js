// @flow strict
import cookie from "js-cookie";

import type { Cookie } from "../../consts/cookies";

type Options = {|
  expires?: number | Date,
  domain?: string,
  path?: string,
  secure?: boolean,
|};

export const load = (key: Cookie): ?string => cookie.get(key);

export const save = (key: Cookie, value: string, opts?: Options) => {
  cookie.set(key, value, opts);
};

export const remove = (key: Cookie, opts?: Options) => {
  cookie.remove(key, opts);
};
