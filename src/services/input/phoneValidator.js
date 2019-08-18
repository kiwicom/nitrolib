// @flow strict
import { JSON_BOTH } from "../fetch/headers";
import { handleJSON } from "../fetch/handlers";
import type { FetchedPhone } from "../../records/Phone";

export type Validator = {|
  error: string,
  code?: string,
|};

export const call = async (phone: string): Promise<FetchedPhone> => {
  const res = await fetch(`https://worker.check-phone.workers.dev/${phone}`, {
    method: "POST",
    headers: {
      ...JSON_BOTH,
    },
  })
    .then(handleJSON)
    .catch(() => Promise.reject(new Error("API error when retrieving phone")));

  return res;
};

export const validate = async (val: string): Promise<Validator> => {
  if (val === "") {
    return { error: __("forms.this_field_must_be_filled") };
  }

  if (val.length <= 5) {
    return { error: __("forms.errors.invalid_value") };
  }

  const { allowSMS, country } = await call(val);

  if (allowSMS) {
    return { error: "", code: country.toLowerCase() };
  }

  return { error: __("forms.errors.invalid_phone") };
};
