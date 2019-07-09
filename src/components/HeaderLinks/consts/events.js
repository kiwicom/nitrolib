// @flow strict
import type { Event } from "../../../records/Event";

// eslint-disable-next-line import/prefer-default-export
export const HEADER_LINKS_ERROR: Event = {
  category: "General",
  subCategory: "Header links",
  action: "Error",
  destinations: {
    exponea: false,
    ga: false,
    logmole: true,
    bigquery: true,
  },
};
