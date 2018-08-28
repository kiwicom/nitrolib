// @flow
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
  test("get continents", () => {
    const res = fns.getContinents(input);

    expect(res).toEqual({
      euro: ["gb", "ru", "sk"],
      asia: ["ru", "th"],
    });
  });
});
