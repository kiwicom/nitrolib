import { handleJSON } from "../../../services/fetch/handlers";
import { JSON_BOTH } from "../../../services/fetch/headers";
import { HeaderLink, SearchForm, HeaderLinksContext } from "../records/HeaderLink";

export type Splitster = {
  [key: string]: string,
};

export type Input = {
  languageId: string,
  currencyId: string,
  searchForm: SearchForm | null,
  splitster: Splitster,
  context?: HeaderLinksContext,
};

export type Response = {
  splitster: Splitster,
  items: HeaderLink[],
};

const getNavBarLinks = ({
  languageId,
  currencyId,
  searchForm,
  splitster,
  context,
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
    }),
  }).then(handleJSON);

export default getNavBarLinks;
