// @flow

import { handleJSON } from "../../../services/fetch/handlers";

export default function getNavBarLinks() {
  return fetch("https://brxh1qilc2.execute-api.eu-central-1.amazonaws.com/staging/navbar", {
    method: "GET",
  }).then(handleJSON);
}
