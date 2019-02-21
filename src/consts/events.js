// @flow strict
import type { Event } from "../records/Event";

export const API_ERROR: Event = {
  category: "Nitro",
  subCategory: "API",
  action: "Error",
  destinations: {
    exponea: false,
    ga: false,
    logmole: true,
  },
};

export const API_REQUEST: Event = {
  category: "Nitro",
  subCategory: "API",
  action: "Request",
  destinations: {
    exponea: false,
    ga: false,
    logmole: true,
  },
};

export const API_SUCCESS: Event = {
  category: "Nitro",
  subCategory: "API",
  action: "Success",
  destinations: {
    exponea: false,
    ga: false,
    logmole: true,
  },
};

export const API_REQUEST_FAILED: Event = {
  category: "Nitro",
  subCategory: "API",
  action: "Failed",
  destinations: {
    exponea: false,
    ga: false,
    logmole: true,
  },
};

export const MODAL_OPEN: Event = {
  category: "Nitro",
  subCategory: "Modal",
  action: "Open",
  destinations: {
    exponea: false,
    ga: false,
    logmole: true,
  },
};
