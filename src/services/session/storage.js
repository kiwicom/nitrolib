// @flow strict
import type { Storage } from "../../consts/storage";

const available = () => "localStorage" in window;
const availableSession = () => "sessionStorage" in window;

export const load = (key: Storage): ?string =>
  available() ? window.localStorage.getItem(key) : null;

export const save = (key: Storage, value: string) => {
  if (available()) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      // Pass
    }
  }
};

export const remove = (key: Storage) => {
  if (available()) {
    window.localStorage.removeItem(key);
  }
};

export const loadSession = (key: Storage): ?string =>
  availableSession() ? window.sessionStorage.getItem(key) : null;

export const saveSession = (key: Storage, value: string) => {
  if (availableSession()) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (e) {
      // Pass
    }
  }
};

export const removeSession = (key: Storage) => {
  if (availableSession()) {
    window.sessionStorage.removeItem(key);
  }
};
