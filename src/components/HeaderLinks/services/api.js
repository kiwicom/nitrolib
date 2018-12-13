// @flow

import { handleJSON } from "../../../services/fetch/handlers";

// Types
type GetNavBarLinks = {
  searchString: string,
  language: { id: string },
  currency: { id: string },
  searchForm: any,
};

export default function getNavBarLinks({
  searchString,
  language,
  currency,
  searchForm,
}: GetNavBarLinks) {
  return fetch("http://localhost:3000/navbar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      searchString,
      language,
      currency,
      searchForm,
    }),
  }).then(handleJSON);
}
