import getRecommended from "../getRecommended";
import currencies from "../../../../records/__mocks__/Currencies";

const mostUsed = ["usd", "eur", "gbp", "aud", "sek", "dkk"];

describe("#getRecommended", () => {
  test("no country, no language", () => {
    expect(getRecommended(, , mostUsed, currencies)).toEqual([
      currencies.usd,
      currencies.eur,
      currencies.gbp,
      currencies.aud,
    ]);
  });

  test("with country and language", () => {
    expect(getRecommended("sek", "gbp", mostUsed, currencies)).toEqual([
      currencies.sek,
      currencies.gbp,
      currencies.usd,
      currencies.eur,
    ]);
  });

  test("with identical country and language", () => {
    expect(getRecommended("gbp", "gbp", mostUsed, currencies)).toEqual([
      currencies.gbp,
      currencies.usd,
      currencies.eur,
      currencies.aud,
    ]);
  });
});
