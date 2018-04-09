// @flow
import { currencyDefault } from "client/records/Currency";
import format from "../format";

describe("#format", () => {
  test("format", () => {
    expect(format(currencyDefault, 10)).toBe("10 €");
  });

  test("rate", () => {
    expect(format({ ...currencyDefault, rate: 0.8 }, 10)).toBe("8 €");
  });
});
