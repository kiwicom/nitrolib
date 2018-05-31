// @flow strict
import resolveRates from "../resolveRates";

const currencies = {
  dkk: {
    id: "dkk",
    name: "Danish Krone",
    format: "__price__ kr",
    uncertainFormat: true,
    round: "0",
    enabledOnAffilId: "",
    fallback: "",
    rate: 0.13434,
  },
  gbp: {
    id: "gbp",
    name: "British Pound Sterling",
    format: "£__price__",
    uncertainFormat: false,
    round: "2",
    enabledOnAffilId: "",
    fallback: "",
    rate: 1.14355,
  },
};

describe("#resolveRates", () => {
  test("resolveRates", () => {
    const result = resolveRates(
      {
        currencies: {
          edges: [
            {
              node: {
                code: "dkk",
                rate: 3.14,
              },
            },
            {
              node: {
                code: "eur",
                rate: 2.5,
              },
            },
          ],
        },
      },
      currencies,
    );

    expect(result.dkk).toEqual({
      ...currencies.dkk,
      rate: 3.14,
    });
    expect(result.gbp).toEqual(currencies.gbp);
    expect(result.eur).toBeUndefined();
  });
});
