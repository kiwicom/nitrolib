// @flow strict
import { SYSTEM_ENV } from "client/consts/system";

export type System = {
  env: $Keys<typeof SYSTEM_ENV>,
};

// eslint-disable-next-line import/prefer-default-export, no-underscore-dangle
export const isProduction = () => window.__SYSTEM__.env === SYSTEM_ENV.PROD;
