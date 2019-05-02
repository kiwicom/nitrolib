// @flow strict
import getLink from "../holidaysLink";
import { langInfoDefault } from "../../../../records/LangInfo";
import currencies from "../../../../records/__mocks__/Currencies";

const language = langInfoDefault;

describe("#HeaderLinks/service/holidaysLink", () => {
  test("getLink holidays", () => {
    expect(getLink("holidays", false, language, currencies.eur)).toBe(
      "//holidays.kiwi.com/gb/?utm_id=24897",
    );
  });

  test("getLink lastminute", () => {
    expect(getLink("lastminute", false, language, currencies.eur)).toBe(
      "https://kiwicom.lastminute.com/flight-hotel/?acntb=DP&bf_subsource=-----TL0S10RR01&utm_medium=whitelabel&utm_source=kiwi",
    );
  });

  test("getLink none", () => {
    expect(getLink("none", false, language, currencies.sek)).toBe("");
  });

  test("getLink lastminute fallback", () => {
    expect(getLink("none", true, language, currencies.sek)).toBe(
      "https://kiwicom.lastminute.com/flight-hotel/?acntb=DP&bf_subsource=-----TL0S10RR01&utm_medium=whitelabel&utm_source=kiwi",
    );
  });
});
