// @flow strict
import getOptionItems from "../getOptionItems";
import { baggageData } from "../../../../records/__mocks__/baggageData";

describe("getOptionItems", () => {
  test("returns items ", () => {
    const optionItems = getOptionItems(baggageData.definitions.handBag, [0, 0, 1]);
    expect(optionItems[0].amount).toEqual(2);
    expect(optionItems[1].amount).toEqual(1);
  });
});
