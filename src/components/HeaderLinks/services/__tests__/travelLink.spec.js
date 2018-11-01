// @flow strict
import getLink from "../travelLink";
import { langInfoDefault } from "../../../../records/LangInfo";

const language = langInfoDefault;

describe("#HeaderLinks/service/travelLink", () => {
  test("getLink", () => {
    expect(getLink(language)).toEqual("/en/searchDeep?pageName=search");
  });
});
