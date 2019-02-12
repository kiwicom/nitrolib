// @flow strict
import type { Loglady } from "../../records/Loglady";
import { JSON_BOTH } from "../fetch/headers";
import { handleError } from "../fetch/handlers";

function log(payload: Loglady) {
  fetch("https://loglady.skypicker.com/api-docs/track", {
    method: "POST",
    headers: JSON_BOTH,
    body: JSON.stringify(payload),
  }).then(handleError);
}

export default log;
