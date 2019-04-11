// @flow strict
import filterNewDefinitions from "../filterNewDefinitions";
import {
  holdBagTileDefinitions,
  handBagTileDefinitions,
} from "../../../../records/__mocks__/baggageData";

describe("filterNewDefinitions", () => {
  test("returns proper data", () => {
    const defs = filterNewDefinitions(
      [...handBagTileDefinitions, ...holdBagTileDefinitions],
      "handBag",
    );
    expect(defs).toHaveLength(handBagTileDefinitions.length);
    expect(defs[0].category).toBe("personalItem");
    expect(defs[1].category).toBe("cabinBag");
  });
});
