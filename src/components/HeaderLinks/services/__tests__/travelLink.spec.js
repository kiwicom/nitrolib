// @flow strict
import getLink from "../travelLink";
import { langInfoDefault } from "../../../../records/LangInfo";

const language = langInfoDefault;

describe("#HeaderLinks/service/holidaysLink", () => {
  test("getLink", () => {
    expect(getLink(language)).toEqual("https://www.kiwi.com/en/searchDeep?pageName=search");
  });
});
