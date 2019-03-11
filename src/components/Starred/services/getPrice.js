// @flow strict
import * as R from 'ramda';
import type { Itinerary } from '../../../records/Itinerary';

const getPrice = (journey: Itinerary) => R.prop("default", journey.prices);

export default getPrice;
