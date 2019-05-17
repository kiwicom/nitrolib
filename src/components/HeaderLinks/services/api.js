// @flow strict
import { handleJSON } from "../../../services/fetch/handlers";
import { JSON_BOTH } from "../../../services/fetch/headers";
import type { HeaderLink, SearchForm, HeaderLinksContext } from "../records/HeaderLink";

export type Splitster = {
  [key: string]: string,
};

export type Input = {|
  languageId: string,
  currencyId: string,
  searchForm: SearchForm | null,
  splitster: Splitster,
<<<<<<< HEAD
  context?: HeaderLinksContext,
=======
  context: string,
  brand?: string | null,
>>>>>>> HeaderLinks: added context and brand props, updated HeaderLinks stories
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
<<<<<<< HEAD
=======
  brand,
>>>>>>> HeaderLinks: added context and brand props, updated HeaderLinks stories
}: Input): Promise<Response> =>
  fetch("https://ancillaries-integration.skypicker.com/v2/navbar", {
    method: "POST",
    headers: JSON_BOTH,
    body: JSON.stringify({
      language: { id: languageId },
      currency: { id: currencyId },
      searchForm,
      splitster,
      context,
<<<<<<< HEAD
=======
      brand,
>>>>>>> HeaderLinks: added context and brand props, updated HeaderLinks stories
    }),
  }).then(handleJSON);

export default getNavBarLinks;
