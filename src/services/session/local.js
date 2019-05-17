// @flow strict
import type { Local } from "../../consts/local";

const available = () => "localStorage" in window && window.localStorage;

export const load = (key: Local): ?string =>
  available() ? window.localStorage.getItem(key) : null;

export const save = (key: Local, value: string) => {
  if (available()) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      // Pass
    }
  }
};

export const remove = (key: Local) => {
  if (available()) {
    window.localStorage.removeItem(key);
  }
};
