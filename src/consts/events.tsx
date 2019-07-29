import { Event } from "../records/Event";

export const API_ERROR: Event = {
  category: "General",
  subCategory: "API",
  action: "Error",
  destinations: {
    exponea: false,
    ga: false,
    logmole: true,
    bigquery: true,
  },
};

export const API_REQUEST: Event = {
  category: "General",
  subCategory: "API",
  action: "Request",
  destinations: {
    exponea: false,
    ga: false,
    logmole: true,
    bigquery: true,
  },
};

export const API_SUCCESS: Event = {
  category: "General",
  subCategory: "API",
  action: "Success",
  destinations: {
    exponea: false,
    ga: false,
    logmole: true,
    bigquery: true,
  },
};

export const API_REQUEST_FAILED: Event = {
  category: "General",
  subCategory: "API",
  action: "Failed",
  destinations: {
    exponea: false,
    ga: false,
    logmole: true,
    bigquery: true,
  },
};

export const MODAL_OPEN: Event = {
  category: "General",
  subCategory: "Modal",
  action: "Open",
  destinations: {
    exponea: false,
    ga: false,
    logmole: true,
    bigquery: true,
  },
};
