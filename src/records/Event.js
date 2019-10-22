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
    bigQuery: boolean,
    datadog?: boolean,
  |},
|};

export type Props = { [key: string]: string | number | boolean };

export type EventPayload = {|
  ...Event,
  timestamp: number,
  props: Props,
|};

// eslint-disable-next-line import/prefer-default-export
export const make = (event: Event, props: Props, now: number = Date.now()): EventPayload => ({
  ...event,
  timestamp: now,
  props,
});
