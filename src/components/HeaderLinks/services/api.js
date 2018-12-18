// @flow strict
import { handleJSON } from "../../../services/fetch/handlers";
import { JSON_BOTH } from "../../../services/fetch/headers";
import type { HeaderLink } from "../records/HeaderLink";

export type HeaderLinksInput = {|
  searchString: string,
  languageId: string,
  currencyId: string,
  searchForm: $FlowFixMe, // TODO specify types
  splitster: $FlowFixMe, // TODO specify types
|};

export type HeaderLinksRes = {|
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
