// @flow strict
import placeholder from "../placeholder";

const cityParams = {
  code: "NYC",
  type: "city",
  country: {
    name: "United States",
    code: "US",
  },
  name: "New York",
};

const airportParams = {
  code: "MCO",
  type: "airport",
  country: {
    name: "United States",
    code: "US",
  },
  name: "Orlando International",
};

const autonomousParams = {
  name: "U.S. Virgin Islands",
  country: {
    name: "United States",
    code: "US",
  },
  code: "VI",
  type: "autonomous_territory",
};

const specialParams = {
  name: "Empire State Building",
  country: null,
  code: null,
  type: "special",
};

const stationParams = {
  name: "Firenze Santa Maria Novella railway station",
  country: {
    name: "Italy",
    code: "IT",
  },
  code: "ZMS",
  type: "station",
};

const countryParams = {
  name: "Russia",
  country: null,
  code: "RU",
  type: "country",
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
