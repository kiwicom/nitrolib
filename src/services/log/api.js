// @flow strict
import type { Loglady } from "../../records/Loglady";
import { JSON_BOTH } from "../fetch/headers";
import { handleError } from "../fetch/handlers";

export type Settings = {
  devUrl?: string,
};

const log = (payload: Loglady, settings: Settings = {}): Promise<void> => {
  if (settings.devUrl) {
    fetch(settings.devUrl, {
      method: "POST",
      headers: JSON_BOTH,
      body: JSON.stringify(payload),
    })
      .then(handleError)
      .then(() => {});
  }

  return fetch("https://loglady.skypicker.com/track", {
    method: "POST",
    headers: JSON_BOTH,
    body: JSON.stringify(payload),
  })
    .then(handleError)
    .then(() => {});
};

export default log;
