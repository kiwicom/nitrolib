// @flow strict
import type { Event } from "../../../records/Event";

// eslint-disable-next-line import/prefer-default-export
export const CURRENCY_OPEN: Event = {
  category: "General",
  subCategory: "Currency",
  action: "Open",
  destinations: {
    exponea: false,
    ga: false,
    logmole: true,
    bigQuery: true,
  },
};
