// @flow strict

import { handleJSON } from "../../../services/fetch/handlers";
import type { Splitster } from "../index";

// Types
type GetNavBarLinks = {
  searchString: string,
  language: { id: string },
  currency: string,
  searchForm: any,
  splitster: Splitster,
};

export default function getNavBarLinks({
  searchString,
  language,
  currency,
  searchForm,
  splitster,
}: GetNavBarLinks) {
  return fetch("https://ancillaries-integration.skypicker.com/navbar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      searchString,
      language,
      currency,
      searchForm,
      splitster,
    }),
  }).then(handleJSON);
}
