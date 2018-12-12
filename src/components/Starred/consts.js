// @flow strict

export const MAX_TRIPS = 3;
export const BADGE_MAX = 9;

export const TRANS_KEY_SINGLE = {
  adults: {
    one: "adult",
    many: "adults",
  },
  children: {
    one: "child",
    many: "children",
  },
  infants: {
    one: "infant",
    many: "infants",
  },
};

export const PASSENGERS_COUNT = {
  infants: __("result.infants_count"),
  adults: __("result.adults_count"),
};

export const COPIED_LINK_SUCCESS_TIMEOUT = 3500;
