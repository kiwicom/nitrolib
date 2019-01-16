// @flow strict
import placeholder from "../placeholder";

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

describe("#LocationPicker/service/placeholder", () => {
  test("#placeholder (selected city)", () => {
    expect(placeholder(cityParams)).toEqual("New York (United States)");
  });

  test("#placeholder (selected country)", () => {
    expect(placeholder(countryParams)).toEqual("Russia");
  });

  test("#placeholder (selected airport)", () => {
    expect(placeholder(airportParams)).toEqual("Orlando International (MCO)");
  });

  test("#placeholder (selected autonomous territory)", () => {
    expect(placeholder(autonomousParams)).toEqual("U.S. Virgin Islands (United States)");
  });

  test("#placeholder (selected station)", () => {
    expect(placeholder(stationParams)).toEqual("Firenze Santa Maria Novella railway station (ZMS)");
  });

  test("#placeholder (selected special)", () => {
    expect(placeholder(specialParams)).toEqual("Empire State Building");
  });
});
