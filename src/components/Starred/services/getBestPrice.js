// @flow strict
import * as R from "ramda";

import type { Itinerary } from "../../../records/Itinerary";
import getPrice from "./getPrice";

const getBestPrice = (journey: Itinerary) => {
  const { providers } = journey;
  const prices = providers.map(trip => trip.price);

  if (R.isEmpty(providers)) {
    return getPrice(journey);
  }

  return prices.length > 1 ? Math.min(...prices) : prices[0];
};

export default getBestPrice;
