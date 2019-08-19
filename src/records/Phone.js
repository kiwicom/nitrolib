// @flow strict
export type NumberType =
  | "MOBILE"
  | "PREMIUM_RATE"
  | "TOLL_FREE"
  | "SHARED_COST"
  | "VOIP"
  | "PERSONAL_NUMBER"
  | "PAGER"
  | "UAN"
  | "VOICEMAIL";

export type FetchedPhone = {|
  countryCallingCode: string,
  nationalNumber: string,
  number: string,
  country: string,
  type?: NumberType,
  allowSMS: boolean,
  formatInternational: string,
|};
