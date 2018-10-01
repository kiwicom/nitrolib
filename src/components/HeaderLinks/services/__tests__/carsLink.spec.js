// @flow strict
import getLink from "../carsLink";
import { langInfoDefault } from "../../../../records/LangInfo";

const language = langInfoDefault;

describe("#HeaderLinks/service/holidaysLink", () => {
  test("getLink", () => {
    expect(getLink(language)).toEqual("https://cars.kiwi.com/?preflang=en&adplat=headerlinks");
  });
});
