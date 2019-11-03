// @flow string
import { data } from "./store";
import type { Brand } from "../../records/Brand";
import { brandDefault } from "../../records/Brand";

type Input = {|
  hostname: string,
  cookieBrand: ?string,
  queryBrand: ?string,
  xForwardedHost: ?string,
|};

const getBrand = ({ hostname, queryBrand, cookieBrand, xForwardedHost }: Input): Brand => {
  if (queryBrand && data.brands[queryBrand]) {
    return data.brands[queryBrand];
  }

  if (cookieBrand && data.brands[cookieBrand]) {
    return data.brands[cookieBrand];
  }

  const found = Object.keys(data.brands).reduce((acc, id) => {
    if (acc) {
      return acc;
    }

    const brand = data.brands[id];
    const domain = brand.domain || `${brand.id}.kiwi.com`;
    if (
      hostname === domain ||
      hostname === brand.fallbackDomain ||
      xForwardedHost === brand.domain
    ) {
      return brand;
    }
    return acc;
  }, null);

  return found || data.brands[brandDefault.id];
};

export default getBrand;
