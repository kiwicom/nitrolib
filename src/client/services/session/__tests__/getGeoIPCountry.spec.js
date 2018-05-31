// @flow strict
import { countryDefault } from "client/records/Country";
import getGeoIPCountry from "../getGeoIPCountry";

const countries = {
  gb: {
    id: "gb",
    continent: "eu",
    currency: "gbp",
    EN: "United Kingdom",
  },
  cz: {
    id: "cz",
    continent: "eu",
    currency: "czk",
    EN: "Czech Republic",
  },
};

describe("#getGeoIPCountry", () => {
  test("empty input", () => {
    expect(getGeoIPCountry(undefined, countries)).toEqual(countryDefault);
  });

  test("unknown country", () => {
    expect(
      getGeoIPCountry(
        { geoIP: { coordinates: { lng: 50, lat: 20 }, isoCountryCode: "sk" } },
        countries,
      ),
    ).toEqual(countryDefault);
  });

  test("custom default value", () => {
    expect(
      getGeoIPCountry(
        { geoIP: { coordinates: { lng: 50, lat: 20 }, isoCountryCode: "sk" } },
        countries,
        null,
      ),
    ).toBe(null);
  });

  test("existing country", () => {
    expect(
      getGeoIPCountry(
        { geoIP: { coordinates: { lng: 50, lat: 20 }, isoCountryCode: "cz" } },
        countries,
      ),
    ).toEqual(countries.cz);
  });
});
