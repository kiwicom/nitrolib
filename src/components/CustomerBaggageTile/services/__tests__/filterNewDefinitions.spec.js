// @flow strict
import filterNewDefinitions from "../filterNewDefinitions";
import { baggageData } from "../../../../records/__mocks__/baggageData";

describe("filterNewDefinitions", () => {
  test("returns proper data", () => {
    const defs = filterNewDefinitions(
      [...baggageData.definitions.handBag, ...baggageData.definitions.holdBag],
      "handBag",
    );
    expect(defs).toHaveLength(baggageData.definitions.handBag.length);
    expect(defs[0].category).toBe("personalItem");
    expect(defs[1].category).toBe("cabinBag");
  });
});
