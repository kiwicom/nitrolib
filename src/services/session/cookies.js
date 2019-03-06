// @flow strict
import cookie from "js-cookie";

import type { Cookie } from "../../consts/cookies";

export const load = (key: Cookie): ?string => cookie.get(key);

export const save = (key: Cookie, value: string) => {
  cookie.set(key, value);
};

export const remove = (key: Cookie) => {
  cookie.remove(key);
};
