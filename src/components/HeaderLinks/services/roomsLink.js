// @flow strict
import * as R from "ramda";
import format from "date-fns/format";
import getDate from "date-fns/getDate";

import type { LangInfo } from "../../../records/LangInfo";
import type { Currency } from "../../../records/Currency";

export type Provider = "booking" | "roomsKiwi" | "roomsKiwiCode";

type Params = {|
  lang: string,
  currency: string,
  destination?: {| type: string, name: string |},
  checkIn?: Date,
  checkOut?: Date,
  adults?: number,
  children?: number,
  label?: string,
  aid?: string,
|};

const buildLink = (baseUrl: string, params: Params) => {
  const urlParams = R.evolve(
    {
      lang: (input: string) => `lang=${input}`,
      currency: (input: string) => `selected_currency=${input.toUpperCase()}`,
      destination: (input: {| type: string, name: string |}) => {
        switch (input.type) {
          case "airport":
            return `iata=${input.name}`;
          case "country":
            return input.name && `ss=${input.name}&si=co`;
          case "region":
          case "continent":
            return null;
          default:
            return input.name && `ss=${input.name}`;
        }
      },
      checkIn: (input: Date) =>
        `checkin_monthday=${getDate(input)}&checkin_year_month=${format(input, "yyyy-MM")}`,
      checkOut: (input: Date) =>
        `checkout_monthday=${getDate(input)}&checkout_year_month=${format(input, "yyyy-MM")}`,
      adults: (input: number) => `group_adults=${input}`,
      children: (input: number) => `group_children=${input}`,
    },
    params,
  );

  const query = R.values(urlParams)
    .filter(Boolean)
    .join("&");

  return {
    base: baseUrl,
    query: `${urlParams.destination ? "searchresults" : "index"}.html${query &&
      `${baseUrl.includes("?") ? "&" : "?"}${query}`}`,
  };
};

const PROVIDERS = {
  booking: (params: Params) =>
    buildLink("BOOKING", {
      ...params,
      aid: "aid=1549681",
    }),
  roomsKiwi: (params: Params) =>
    buildLink("ROOMS_KIWI", {
      ...params,
      label: "headerlinks",
    }),
  roomsKiwiCode: (params: Params) =>
    buildLink("ROOMS_KIWI_CODE", {
      ...params,
      aid: "aid=1549200",
      label: "headerlinks",
    }),
};

const ENABLED_SEARCH_MODES = ["oneWay", "return"];

export type FormMode = "oneWay" | "return" | "multicity" | "salesman";

export type SearchFormData = {|
  mode: FormMode,
  destination: {| type: string, name: string |} | null,
  checkIn: Date | null,
  checkOut: Date | null,
  adults: number,
  children: number,
|};

export default function getLink(
  provider: string,
  language: LangInfo,
  currencyObj: Currency,
  form: SearchFormData | null,
): string {
  const urlGetter = PROVIDERS[provider];

  if (!urlGetter) {
    return "";
  }

  const searchParams =
    form && ENABLED_SEARCH_MODES.includes(form.mode)
      ? {
          destination: form.destination,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          adults: form.adults,
          children: form.children,
        }
      : null;

  const lang = language.id;
  const currency = currencyObj.id;

  return urlGetter(
    R.pickBy(R.complement(R.isNil), {
      lang,
      currency,
      ...searchParams,
    }),
  );
}
