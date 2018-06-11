// @flow strict
export const DEV = process.env.NODE_ENV !== "production";
export const STAGING = Boolean(process.env.STAGING);
