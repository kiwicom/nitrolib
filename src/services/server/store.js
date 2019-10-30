// @flow strict
import path from "path";
import fsx from "fs-extra";
import R from "ramda";

import { type Airlines, airlineDefault } from "../../records/Airline";
import { type BrandLanguages, brandLanguageDefault } from "../../records/BrandLanguage";
import { type Brands, brandDefault } from "../../records/Brand";
import { type Continents, continentsDefault } from "../../records/Continents";
import { type Countries, countryDefault } from "../../records/Country";
import { type Fetched } from "../../records/Fetched";
import { type LangInfos, langInfoDefault } from "../../records/LangInfo";
import { type IntlsRaw, intlDefault } from "../../records/Intl";

export type Data = {|
  airlines: Airlines,
  brandLanguages: BrandLanguages,
  brands: Brands,
  continents: Continents,
  countries: Countries,
  languages: LangInfos,
  intls: IntlsRaw,
  orbits: IntlsRaw,
|};

export const data: Data = {
  airlines: { [airlineDefault.id]: airlineDefault },
  brandLanguages: { [brandDefault.id]: { [langInfoDefault.id]: brandLanguageDefault } },
  brands: { [brandDefault.id]: brandDefault },
  continents: continentsDefault,
  countries: { [countryDefault.id]: countryDefault },
  languages: { [langInfoDefault.id]: langInfoDefault },
  intls: { [intlDefault.language.id]: intlDefault },
  orbits: { [intlDefault.language.id]: intlDefault },
};

export type GetFetchedOptions = {|
  langId: string,
  brandId: string,
|};

export const getFetched = ({ langId, brandId }: GetFetchedOptions): Fetched => ({
  airlines: data.airlines,
  countries: data.countries,
  continents: data.continents,
  brandLanguage: data.brandLanguages[brandId][langId],
});

const loadIntls = (languages: LangInfos, dataPath: string): Promise<IntlsRaw> =>
  fsx.readJSON(path.join(dataPath, "translationsFiles.json")).then(files =>
    Object.keys(files)
      .map(id => ({
        language: R.values(languages).find(lang => lang.phraseApp === id),
        translations: fsx.readJSONSync(path.join(dataPath, "translations", files[id])),
      }))
      // TODO fix inconsistencies between 'iso' and 'translations'
      .filter(intl => Boolean(intl.language))
      .reduce(
        (acc, intl) => ({
          ...acc,
          // $FlowExpected: filtered
          [intl.language.id]: intl,
        }),
        {},
      ),
  );

const loadOribts = (languages: LangInfos, modulesPath: string): Promise<IntlsRaw> =>
  fsx.readdir(path.join(modulesPath, "@kiwicom/orbit-components/lib/data/dictionary")).then(files =>
    files
      .map(file => ({
        language: R.values(languages).find(lang => lang.phraseApp === file.replace(".json", "")),
        translations: fsx.readJSONSync(
          path.join(modulesPath, "@kiwicom/orbit-components/lib/data/dictionary", file),
        ),
      }))
      // TODO fix inconsistencies between 'iso' and 'translations'
      .filter(intl => Boolean(intl.language))
      .reduce(
        (acc, intl) => ({
          ...acc,
          [intl.language.id]: intl,
        }),
        {},
      ),
  );

export type LoadOptions = {|
  dataPath: string,
  modulesPath: string,
|};

export const load = ({ dataPath, modulesPath }: LoadOptions): Promise<void> =>
  Promise.all([
    fsx.readFile(path.join(dataPath, "airlines.json")),
    fsx.readFile(path.join(dataPath, "brandLanguages.json")),
    fsx.readFile(path.join(dataPath, "brands.json")),
    fsx.readFile(path.join(dataPath, "continents.json")),
    fsx.readFile(path.join(dataPath, "countries.json")),
    fsx.readFile(path.join(dataPath, "languages.json")),
  ])
    .then(([airlines, brandLanguages, brands, continents, countries, languages]) => [
      airlines,
      brandLanguages,
      brands,
      continents,
      countries,
      languages,
      loadIntls(languages, dataPath),
      loadOribts(languages, modulesPath),
    ])
    .then(([airlines, brandLanguages, brands, continents, countries, languages, intls, orbits]) => {
      data.airlines = airlines;
      data.brandLanguages = brandLanguages;
      data.brands = brands;
      data.continents = continents;
      data.countries = countries;
      data.languages = languages;
      data.intls = intls;
      data.orbits = orbits;
    });
