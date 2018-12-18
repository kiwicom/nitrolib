// @flow strict
import { handleJSON } from "../../../services/fetch/handlers";
import { JSON_BOTH } from "../../../services/fetch/headers";
import type { HeaderLink, SearchForm } from "../records/HeaderLink";

export type Splitster = {
  [key: string]: string,
};

export type HeaderLinksInput = {|
  searchString: string,
  languageId: string,
  currencyId: string,
  searchForm: ?SearchForm,
  splitster: Splitster,
|};

export type HeaderLinksRes = {|
  splitster: Splitster,
  items: HeaderLink[],
|};

const getNavBarLinks = ({
  searchString,
  languageId,
  currencyId,
  searchForm,
  splitster,
}: HeaderLinksInput): Promise<HeaderLinksRes> =>
  fetch("https://ancillaries-integration.skypicker.com/navbar", {
    method: "POST",
    headers: JSON_BOTH,
    body: JSON.stringify({
      searchString,
      language: { id: languageId },
      currency: { id: currencyId },
      searchForm,
      splitster,
    }),
  }).then(handleJSON);

export default getNavBarLinks;
