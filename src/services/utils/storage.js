// @flow strict
const hasStorage = () => "localStorage" in window;

export const setItem = (key: string, value: string) => {
  if (hasStorage()) {
    localStorage.setItem(key, value);
  }
};

export const getItem = (key: string): string => {
  if (hasStorage()) {
    return localStorage.getItem(key) || "";
  }
  return "";
};

export const removeItem = (key: string) => {
  if (hasStorage()) {
    localStorage.removeItem(key);
  }
};
