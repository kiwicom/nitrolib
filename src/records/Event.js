// @flow strict
export type Category =
  | "Account"
  | "Auth"
  | "Booking"
  | "Content"
  | "Cookies"
  | "General"
  | "Holidays"
  | "Manage"
  | "Netverify"
  | "Nitro"
  | "Payment"
  | "Refund"
  | "Search"
  | "SmartFAQ"
  | "Watchdog";

export type Event = {|
  category: Category,
  subCategory?: string,
  action: string,
  detail?: string,
  destinations: {|
    exponea: boolean,
    ga: boolean,
    logmole: boolean,
  |},
|};

export type Props = { [key: string]: string | number | boolean };

export type EventPayload = {|
  ...Event,
  timestamp: number,
  props: Props,
|};

export const make = (event: Event, props: Props, now: number = Date.now()): EventPayload => ({
  ...event,
  timestamp: now,
  props,
});

// TODO move these to consts
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

export const CURRENCY_OPEN: Event = {
  category: "Nitro",
  subCategory: "Currency",
  action: "Open",
  destinations: {
    exponea: false,
    ga: false,
    logmole: true,
  },
};

export const HEADER_LINKS_ERROR: Event = {
  category: "Nitro",
  subCategory: "Header links",
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
