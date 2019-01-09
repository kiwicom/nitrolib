// @flow strict
import { handleJSON } from "../../../services/fetch/handlers";
import { JSON_BOTH } from "../../../services/fetch/headers";
import type { HeaderLink, SearchForm } from "../records/HeaderLink";

export type Splitster = {
  // FIXME add a firm structure
  [key: string]: string,
};

export type Input = {|
  languageId: string,
  currencyId: string,
  searchForm: SearchForm | null,
  splitster: Splitster,
|};

export type Response = {|
  splitster: Splitster,
  items: HeaderLink[],
|};

const getNavBarLinks = ({
  languageId,
  currencyId,
  searchForm,
  splitster,
}: Input): Promise<Response> =>
  fetch("https://ancillaries-integration.skypicker.com/navbar", {
    method: "POST",
    headers: JSON_BOTH,
    body: JSON.stringify({
      language: { id: languageId },
      currency: { id: currencyId },
      searchForm,
      splitster,
    }),
  }).then(handleJSON);

export default getNavBarLinks;
