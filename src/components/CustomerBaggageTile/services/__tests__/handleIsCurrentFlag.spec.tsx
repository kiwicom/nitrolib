import handleIsCurrentFlag from "../handleIsCurrentFlag";
import { holdBagTileDefinitions } from "../../../../records/__mocks__/baggageData";

describe("handleIsCurrentFlag", () => {
  test("returns proper data", () => {
    const defs = handleIsCurrentFlag(holdBagTileDefinitions, [0, 2]);
    expect(defs).toHaveLength(holdBagTileDefinitions.length);
    expect(defs[0].isCurrent).toBe(true);
    expect(defs[1].isCurrent).toBe(false);
    expect(defs[2].isCurrent).toBe(true);
  });
});
