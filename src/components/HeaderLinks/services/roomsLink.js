// @flow strict
import * as R from "ramda";
import { format, getDate } from "date-fns";

import type { LangInfo } from "../../../records/LangInfo";
import type { Currency } from "../../../records/Currency";

export type Provider = "booking" | "roomsKiwi" | "roomsKiwiCode";

export type PlaceType =
  | "airport"
  | "country"
  | "city"
  | "train_station"
  | "autonomous_territory"
  | "region"
  | "continent"
  | "bus_station"
  | "special"
  | "vitrual";

type Params = {|
  lang: string,
  currency: string,
  destination?: {| type: PlaceType, name: string |},
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
        `checkin_monthday=${getDate(input)}&checkin_year_month=${format(input, "YYYY-MM")}`,
      checkOut: (input: Date) =>
        `checkout_monthday=${getDate(input)}&checkout_year_month=${format(input, "YYYY-MM")}`,
      adults: (input: number) => `group_adults=${input}`,
      children: (input: number) => `group_children=${input}`,
    },
    params,
  );

  const query = R.values(urlParams)
    .filter(Boolean)
    .join("&");

  return `${baseUrl}${urlParams.destination ? "searchresults" : "index"}.html${query &&
    `${baseUrl.includes("?") ? "&" : "?"}${query}`}`;
};

const PROVIDERS = {
  booking: (params: Params) =>
    buildLink("https://www.booking.com/", {
      ...params,
      aid: "aid=1549681",
    }),
  roomsKiwi: (params: Params) =>
    buildLink("https://rooms.kiwi.com/", {
      ...params,
      label: "label=headerlinks",
    }),
  roomsKiwiCode: (params: Params) =>
    buildLink("https://rooms.kiwi.com/", {
      ...params,
      aid: "aid=1549200",
      label: "label=headerlinks",
    }),
};

const ENABLED_SEARCH_MODES = ["oneWay", "return"];

export type FormMode = "oneWay" | "return" | "multicity" | "salesman";

export type SearchFormData = {|
  mode?: FormMode,
  destination?: {| type: PlaceType, name: string |},
  checkIn?: Date,
  checkOut?: Date,
  adults?: number,
  children?: number,
|};

export default function getLink(
  provider: string,
  language: LangInfo,
  currencyObj: Currency,
  form: SearchFormData | null,
) {
  const urlGetter = PROVIDERS[provider];

  if (!urlGetter) {
    return null;
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
