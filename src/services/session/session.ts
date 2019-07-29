import { Session } from "../../consts/session";

const available = () => "sessionStorage" in window && window.sessionStorage;

export const load = (key: Session): string =>
  available() ? window.sessionStorage.getItem(key) : null;

export const save = (key: Session, value: string) => {
  if (available()) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (e) {
      // Pass
    }
  }
};

export const remove = (key: Session) => {
  if (available()) {
    window.sessionStorage.removeItem(key);
  }
};
