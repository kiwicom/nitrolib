// @flow strict
import { JSON_BOTH } from "../fetch/headers";
import { handleJSON } from "../fetch/handlers";
import type { FetchedPhone } from "../../records/Phone";

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

export const validate = async (val: string): Promise<string> => {
  if (val === "") {
    return __("forms.this_field_must_be_filled");
  }

  if (val.length < 4) {
    return __("forms.errors.invalid_value");
  }

  const { allowSMS } = await call(val);

  if (allowSMS) {
    return "";
  }

  return __("forms.errors.invalid_phone");
};
