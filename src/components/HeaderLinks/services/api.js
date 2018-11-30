// @flow

import { handleJSON } from "../../../services/fetch/handlers";

// Types
type GetNavBarLinks = {
  searchString: string,
  language: string,
  currency: string,
  searchForm: any,
  roomsProvider: string,
  holidaysProvider: string,
  lastminuteSupported: boolean,
};

export default function getNavBarLinks({
  searchString,
  language,
  currency,
  searchForm,
  roomsProvider,
  holidaysProvider,
  lastminuteSupported,
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
      roomsProvider,
      holidaysProvider,
      lastminuteSupported,
    }),
  }).then(handleJSON);
}
