// @flow strict
import type { Loglady } from "../../records/Loglady";
import { JSON_BOTH } from "../fetch/headers";
import { handleError } from "../fetch/handlers";

const log = (payload: Loglady): Promise<void> =>
  fetch("https://loglady.skypicker.com/track", {
    method: "POST",
    headers: JSON_BOTH,
    body: JSON.stringify(payload),
  })
    .then(handleError)
    .then(() => {});

export default log;
