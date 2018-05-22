// @flow strict
import isEmail from "validator/lib/isEmail";
import isAfter from "date-fns/isAfter";

// eslint-disable-next-line no-extra-boolean-cast
export const required = (val: mixed) => (Boolean(val) ? "" : __("forms.this_field_must_be_filled"));

export const email = (val: string) => (isEmail(val) ? "" : __("forms.wrong_format_email"));

export const iata = (val: string) =>
  val.match(/^[A-Za-z]{3}$/) ? "" : __("forms.enter_iata_code");

export const departure = (val: Date, now: Date = new Date(Date.UTC(0, 0))) =>
  isAfter(val, now) ? "" : __("common.error");
