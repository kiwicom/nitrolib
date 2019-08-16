// @flow strict
import isEmail from "validator/lib/isEmail";
import isAfter from "date-fns/isAfter";
import addYears from "date-fns/addYears";

export type Error = string;

// eslint-disable-next-line no-extra-boolean-cast
export const required = (val: mixed): Error => (val ? "" : __("forms.this_field_must_be_filled"));

export const email = (val: string): Error => (isEmail(val) ? "" : __("forms.wrong_format_email"));
export type YearAfterOpts = {|
  offset: number,
  now: Date,
|};

export const yearAfter = ({ offset = 0, now = new Date() }: YearAfterOpts) => (val: Date): Error =>
  isAfter(val, addYears(now, offset)) ? "" : __("common.error");

export const iata = (val: string): Error =>
  val.match(/^[A-Za-z]{3}$/) ? "" : __("forms.enter_iata_code");

export const departure = (val: Date, now: Date = new Date()): Error =>
  isAfter(val, addYears(now, -1)) ? "" : __("common.error");

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_STRENGTH_LEVEL = 2;

export const passwordScore = (value: string, userInput?: string[]): number => {
  const score = window.zxcvbn ? window.zxcvbn(value, userInput).score : 0;
  return score;
};

export const password = (value: string): Error => {
  if (value.length < PASSWORD_MIN_LENGTH) return __("account.password_too_short");

  const score = passwordScore(value);
  if (score < PASSWORD_STRENGTH_LEVEL) return __("account.password_too_simple");

  return "";
};
