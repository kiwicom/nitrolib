// @flow strict
import * as R from 'ramda';
import type { StarredItem } from "../../../records/Starred";
import isAfter from "date-fns/isAfter"; // keys

const itemIsValid = (item: StarredItem) =>
  isAfter(R.prop("utc", item.journey.trips[0].flights[0].departure.when), Date.now());

export default itemIsValid;
