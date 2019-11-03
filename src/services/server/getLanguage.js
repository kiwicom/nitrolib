// @flow strict
import { data } from "./store";
import type { IntlRaw } from "../../records/Intl";
import { intlDefault } from "../../records/Intl";

type Input = {|
  path: string,
|};

const getLanguage = ({ path }: Input): IntlRaw => {
  const lang = path.split("/").slice(1, 2)[0];

  if (data.intls[lang]) {
    return data.intls[lang];
  }

  return data.intls[intlDefault.language.id];
};

export default getLanguage;
