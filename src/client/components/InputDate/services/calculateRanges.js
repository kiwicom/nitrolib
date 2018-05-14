// @flow
import * as R from "ramda";
import getDaysInMonth from "date-fns/getDaysInMonth";
import getDate from "date-fns/getDate";
import getMonth from "date-fns/getMonth";
import isSameYear from "date-fns/isSameYear";
import isSameMonth from "date-fns/isSameMonth";
import getYear from "date-fns/getYear";

// If `value` has same year and month with `min`
//  return date of min (minimum enabled date)
// else
//  1
export const getMinDate = (min: Date, value: Date) => {
  if (isSameYear(min, value) && isSameMonth(min, value)) {
    return getDate(min);
  }
  return 1;
};

// If `value` has same year and month with `max`
//  return date of max (maximum enabled date)
// else
//  last day of month
export const getMaxDate = (max: Date, value: Date) => {
  if (isSameYear(max, value) && isSameMonth(max, value)) {
    return getDate(max);
  }
  return getDaysInMonth(value);
};

// If `value` has same year with `min`
//  return month of min (minimum enabled month)
// else
//  0 (january)
export const getMinMonth = (min: Date, value: Date) => {
  if (isSameYear(min, value)) {
    return getMonth(min);
  }
  return 0;
};

// If `value` has same year with `max`
//  return month of max (maximum enabled month)
// else
//  11 (december)
export const getMaxMonth = (max: Date, value: Date) => {
  if (isSameYear(max, value)) {
    return getMonth(max);
  }
  return 11;
};

// TODO: consider calculate isSameYear/Month once and pass to functions
// Return enabled ranges of dates/months/years to select by specified min and max dates
const calculateRanges = (min: Date, max: Date, value: Date) => ({
  dates: R.range(getMinDate(min, value), getMaxDate(max, value) + 1), // + 1 because last in R.range is excluded
  months: R.range(getMinMonth(min, value), getMaxMonth(max, value) + 1),
  years: R.range(getYear(min), getYear(max) + 1),
});

export default calculateRanges;
