// @flow
import slug from "../slug";

const cityParams = {
  id: "bliny",
  code: "NYC",
  type: "city",
  name: "New York",
  slug: "new-york-city-new-york-united-states",
  subdivision: {
    id: "NY_US",
    code: "NY",
    name: "New York",
    slug: "new-york",
  },
  country: {
    name: "United States",
    code: "US",
    slug: "united-states",
    id: "US",
  },
  location: {
    lat: 404,
    lng: 410,
  },
};

const airportParams = {
  id: "golubci",
  code: "MCO",
  type: "airport",
  slug: "someslug",
  name: "Orlando International",
  city: {
    id: "new-york-city_ny_us",
    name: "New York",
    slug: "new-york-city-new-york-united-states",
    code: "NYC",
  },
  country: {
    name: "United States",
    code: "US",
    slug: "united-states",
    id: "US",
  },
  location: {
    lat: 404,
    lng: 410,
  },
};

const autonomousParams = {
  id: "oladushki",
  name: "U.S. Virgin Islands",
  slug: "u-s-virgin-islands-united-states",
  type: "autonomous_territory",
  country: {
    name: "United States",
    code: "US",
    slug: "united-states",
    id: "US",
  },
  location: {
    lat: 404,
    lng: 410,
  },
  code: "VI",
};

const specialParams = {
  id: "pelmeni",
  name: "Empire State Building",
  slug: "empire-state-building",
  type: "special",
  location: {
    lat: 404,
    lng: 410,
  },
};

const stationParams = {
  id: "plov",
  name: "Firenze Santa Maria Novella railway station",
  slug: "firenze-santa-maria-novella-railway-station-florence-italy",
  code: "ZMS",
  type: "station",
  country: {
    name: "Italy",
    code: "IT",
    id: "IT",
    slug: "italy",
  },
  city: {
    id: "florence_it",
    name: "Florence",
    slug: "florence-italy",
    code: "FLR",
  },
  location: {
    lat: 404,
    lng: 410,
  },
};

const countryParams = {
  id: "cheburek",
  name: "Russia",
  slug: "russia",
  code: "RU",
  type: "country",
  location: {
    lat: 404,
    lng: 410,
  },
};

describe("#LocationPicker/service/slug", () => {
  test("#slug (selected city)", () => {
    expect(slug(cityParams)).toEqual("(United States)");
  });

  test("#slug (selected country)", () => {
    expect(slug(countryParams)).toEqual(false);
  });

  test("#slug (selected airport)", () => {
    expect(slug(airportParams)).toEqual("(MCO)");
  });

  test("#slug (selected autonomous territory)", () => {
    expect(slug(autonomousParams)).toEqual("(United States)");
  });

  test("#slug (selected station)", () => {
    expect(slug(stationParams)).toEqual("(ZMS)");
  });

  test("#slug (selected special)", () => {
    expect(slug(specialParams)).toEqual(false);
  });
});
