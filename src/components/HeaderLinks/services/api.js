// @flow strict
import { handleJSON } from "../../../services/fetch/handlers";
import { JSON_BOTH } from "../../../services/fetch/headers";
import type { HeaderLink, SearchForm } from "../records/HeaderLink";

export type Splitster = {
  [key: string]: string,
};

export type Input = {|
  languageId: string,
  currencyId: string,
  searchForm: SearchForm | null,
  splitster: Splitster,
  context: string,
  brand?: string | null,
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
  context,
  brand,
}: Input): Promise<Response> =>
  fetch("https://ancillaries-integration.skypicker.com/navbar", {
    method: "POST",
    headers: JSON_BOTH,
    body: JSON.stringify({
      language: { id: languageId },
      currency: { id: currencyId },
      searchForm,
      splitster,
      context,
      brand,
    }),
  }).then(handleJSON);

export default getNavBarLinks;
