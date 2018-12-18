// @flow strict
import { handleJSON } from "../../../services/fetch/handlers";
import { JSON_BOTH } from "../../../services/fetch/headers";
import type { HeaderLink } from "../records/HeaderLink";

export type HeaderLinksInput = {|
  searchString: string,
  language: { id: string },
  currency: { id: string },
  searchForm: $FlowFixMe, // TODO specify types
  splitster: $FlowFixMe, // TODO specify types
|};

export type HeaderLinksRes = {|
  items: HeaderLink[],
|};

const getNavBarLinks = ({
  searchString,
  language,
  currency,
  searchForm,
  splitster,
}: HeaderLinksInput): Promise<HeaderLinksRes> =>
  fetch("https://ancillaries-integration.skypicker.com/navbar", {
    method: "POST",
    headers: JSON_BOTH,
    body: JSON.stringify({
      searchString,
      language,
      currency,
      searchForm,
      splitster,
    }),
  }).then(handleJSON);

export default getNavBarLinks;
