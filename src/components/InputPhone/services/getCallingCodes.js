// @flow
import * as R from "ramda";

import type { Countries } from "../../../records/Country";

type Code = {| +value: string | number, +label?: string, +disabled?: boolean |};

const getCallingCodes = (countries: Countries, language: string): Code[] =>
  R.compose(
    R.map(country => ({
      label: country.callingCode
        ? `${country[language]} (${country.callingCode})`
        : country[language],
      value: country.callingCode,
    })),
    R.values,
  )(countries);

export default getCallingCodes;
