// @flow strict
import type { Storage } from "../../consts/storage";

const available = () => "localStorage" in window;

export const load = (key: Storage): ?string => (available() ? localStorage.getItem(key) : null);

export const save = (key: Storage, value: string) => {
  if (available()) {
    localStorage.setItem(key, value);
  }
};

export const remove = (key: Storage) => {
  if (available()) {
    localStorage.removeItem(key);
  }
};
