// @flow
import * as fns from "../Country";

const countries = {
  sk: {
    id: "sk",
    currency: "eur",
    continent: "euro",
    EN: "Slovakia",
  },
  gb: {
    id: "gb",
    currency: "lib",
    continent: "euro",
    EN: "Great Britain",
  },
  th: {
    id: "th",
    currency: "thb",
    continent: "asia",
    EN: "Thailand",
  },
};

describe("#Country", () => {
  test("get continents", () => {
    const res = fns.getContinents(countries);

    expect(res).toEqual({
      euro: ["gb", "sk"],
      asia: ["th"],
    });
  });
});
