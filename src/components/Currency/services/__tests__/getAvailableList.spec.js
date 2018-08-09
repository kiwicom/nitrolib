// @flow strict
import getAvailableList from "../getAvailableList";

describe("#Currency/getAvailableList", () => {
  test("Creates array ordered by code", () => {
    const currencyMap = {
      eur: {
        id: "eur",
        name: "Euro",
        format: "__price__ €",
        uncertainFormat: false,
        round: "2",
        enabledOnAffilId: "",
        fallback: "",
        rate: 1,
      },
      czk: {
        id: "czk",
        name: "Koruna",
        format: "__price__ Kč",
        uncertainFormat: false,
        round: "2",
        enabledOnAffilId: "",
        fallback: "",
        rate: 0.3,
      },
    };

    expect(getAvailableList(currencyMap)).toEqual([currencyMap.czk, currencyMap.eur]);
  });
});
