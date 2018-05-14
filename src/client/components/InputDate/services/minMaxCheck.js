// @flow
import isBefore from "date-fns/isBefore";
import isAfter from "date-fns/isAfter";

export default function minMaxCheck(value: Date, min: Date, max: Date, onChange: Date => void) {
  if (isBefore(value, min)) {
    onChange(min);
  }
  if (isAfter(value, max)) {
    onChange(max);
  }
}
