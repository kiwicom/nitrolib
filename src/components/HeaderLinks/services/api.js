// @flow strict
import { handleJSON } from "../../../services/fetch/handlers";
import { JSON_BOTH } from "../../../services/fetch/headers";

type GetNavBarLinks = {
  searchString: string,
  language: { id: string },
  currency: { id: string },
  searchForm: $FlowFixMe, // TODO specify types
  splitster: $FlowFixMe, // TODO specify types
};

const getNavBarLinks = ({
  searchString,
  language,
  currency,
  searchForm,
  splitster,
}: GetNavBarLinks): Promise<$FlowFixMe> => // TODO specify types
  fetch("http://localhost:3000/navbar", {
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
