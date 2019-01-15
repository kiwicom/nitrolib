// @flow
import slug from "../slug";

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

describe("#LocationPicker/service/slug", () => {
  test("#slug (selected city)", () => {
    expect(slug(cityParams)).toEqual("United States");
  });

  test("#slug (selected country)", () => {
    expect(slug(countryParams)).toEqual(false);
  });

  test("#slug (selected airport)", () => {
    expect(slug(airportParams)).toEqual("MCO");
  });

  test("#slug (selected autonomous territory)", () => {
    expect(slug(autonomousParams)).toEqual("United States");
  });

  test("#slug (selected station)", () => {
    expect(slug(stationParams)).toEqual("ZMS");
  });

  test("#slug (selected special)", () => {
    expect(slug(specialParams)).toEqual(false);
  });
});
