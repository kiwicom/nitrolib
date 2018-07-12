// @flow
import * as R from "ramda";

import * as fns from "../countries";

const input = {
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
  ru: {
    id: "ru",
    currency: "rub",
    continent: ["euro", "asia"],
    EN: "Russia",
  },
};

describe("#countries", () => {
  test("get countries", () => {
    const res = fns.getCountries(R.map(R.assoc("kek", "bur"), input));

    expect(res).toEqual(input);
  });

  test("get continents", () => {
    const res = fns.getContinents(fns.getCountries(input));

    expect(res).toEqual({
      euro: ["gb", "ru", "sk"],
      asia: ["ru", "th"],
    });
  });
});
