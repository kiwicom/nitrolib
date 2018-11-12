// @flow strict
import type { Itinerary } from "./Itinerary";

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
  journey: Itinerary,
  priceUpdatedAt: ?Date,
  createdAt: Date,
  updatedAt: Date,
|};

export type ShareDialog = {|
  journey: Itinerary,
  shareUrl: string,
  passengers: PassengersCount,
  cabinClass: CabinClass,
  isMobile: boolean,
  getLangInfo: string,
  setNotice: boolean,
  onClose: boolean,
|};
