// @flow strict
export type Continents = { [key: string]: string[] };

export const tKeys = {
  aas: __("common.continents.aas"),
  ap: __("common.continents.ap"),
  eu: __("common.continents.eu"),
  mea: __("common.continents.mea"),
};

export const continentsDefault: Continents = {
  gb: ["eu"],
};
