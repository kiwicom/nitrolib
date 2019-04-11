// @flow strict
import getDefinitions from "../getDefinitions";
import { baggageData } from "../../../../records/__mocks__/baggageData";

const { definitions, combinations } = baggageData;
const getDefinitionsArgs = {
  current: {
    handBag: 1,
    holdBag: 3,
  },
  selected: {
    handBag: 1,
    holdBag: 4,
  },
  baggage: baggageData,
};

describe("getDefinitions", () => {
  test("returns proper data without newDefinitions", () => {
    const handBagDefs = getDefinitions({ ...getDefinitionsArgs, bagType: "handBag" });
    const holdBagDefs = getDefinitions({ ...getDefinitionsArgs, bagType: "holdBag" });
    expect(handBagDefs).toHaveLength(combinations.handBag[1].indices.length);
    expect(holdBagDefs).toHaveLength(3);
    expect(handBagDefs[0].isCurrent).toBe(true);
    expect(holdBagDefs[0].isCurrent).toBe(false);
    expect(holdBagDefs[2].isCurrent).toBe(true);
  });

  test("returns proper data with newDefinitions", () => {
    const newDefinitions = [...definitions.handBag.slice(1), ...definitions.holdBag.slice(1)];
    const handBagDefs = getDefinitions({
      newDefinitions,
      baggage: baggageData,
      bagType: "handBag",
    });
    const holdBagDefs = getDefinitions({
      newDefinitions,
      baggage: baggageData,
      bagType: "holdBag",
    });
    expect(handBagDefs).toHaveLength(1);
    expect(holdBagDefs).toHaveLength(2);
  });
});
