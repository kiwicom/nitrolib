// @flow strict
import type { ItineraryDeep } from "./Itinerary";

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
  setNotice: boolean,
  onClose: boolean,
|};
