// @flow strict
import type { ItineraryDeep, ItineraryNormalized } from "./Itinerary";

const TRANS_KEY_SINGLE = {
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

export type CabinClass = "economy" | "business" | "first" | "premium";

export type PassengersCount = {|
  adults: number,
  children: number,
  infants: number,
|};

export type StarredFormData = {|
  origin: string,
  destination: string,
  outboundDate: string,
  inboundDate: string,
  multicity: string,
  salesman: string,
  passengers: PassengersCount,
  cabinClass: CabinClass,
  filters: any,
  lang: string,
  places: Array<{ id: string, slug: string }>,
  returnUrl: string,
  starType: string,
|};

export type StarredItem = {|
  id: string,
  form: StarredFormData,
  lastPrice: number,
  itinerary: ItineraryDeep,
  priceUpdatedAt: Date,
  createdAt: Date,
  updatedAt: Date,
|};

export type ShareDialog = {|
  itinerary: ItineraryDeep,
  shareUrl: string,
  passengers: PassengersCount,
  cabinClass: CabinClass,
  isMobile: boolean,
  getLangInfo: string,
  onSetNotice: boolean,
  onClose: boolean,
|};

export const getSum = (object: PassengersCount) =>
  Object.keys(object).reduce((previous, key) => previous + object[key], 0);

export const getTransKey = (object: PassengersCount): string => {
  const keyWithValue = Object.keys(object).find(key => object[key] > 0) || "adults";
  const source = TRANS_KEY_SINGLE[keyWithValue];

  return Object.keys(object).length > 1 ? source.many : source.one;
};

export const isMulti = (object: PassengersCount) =>
  Object.keys(object).filter(key => object[key] > 0).length > 1;

export const isStarred = (starred: StarredItem, itineraries: ItineraryNormalized[]): boolean =>
  itineraries.some(itinerary => itinerary.result.id === starred.id);
