// @flow strict
import getUrlParam from "client/services/utils/getUrlParam";
import { isProduction } from "./System";
import { countryDefault } from "./Country";
import type { Country } from "./Country";

export type Geolocation = {
  lat: number,
  lng: number,
  country: Country,
  fresh: boolean,
};

export const geolocationDefault: Geolocation = {
  lat: 51.5092,
  lng: -0.0955,
  country: countryDefault,
  fresh: false,
};

export const DEFAULT_IP = "185.86.151.11";

export const getIP = (): string =>
  isProduction() ? DEFAULT_IP : getUrlParam("node_override_ip") || DEFAULT_IP;
