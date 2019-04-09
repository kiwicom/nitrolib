// @flow
import {
  handleIsCurrentFlag,
  filterNewDefinitions,
  getDefinitions,
  calculatePrice,
  getStatus,
} from "../index";
import { baggageData } from "../../../BaggagePicker/services/data";
import type { HoldBagTileDefinition, HandBagTileDefinition } from "../../../../records/Baggage";

const { definitions, combinations } = baggageData;

const holdBagTileDefinitions: (
  | HoldBagTileDefinition
  | HandBagTileDefinition
)[] = definitions.holdBag.map((def, index) => {
  // $FlowIssue: https://github.com/facebook/flow/issues/2892
  return {
    originalIndex: index,
    isCurrent: false,
    ...def,
  };
});
const handBagTileDefinitions: (
  | HoldBagTileDefinition
  | HandBagTileDefinition
)[] = definitions.handBag.map((def, index) => {
  // $FlowIssue: https://github.com/facebook/flow/issues/2892
  return {
    originalIndex: index,
    isCurrent: false,
    ...def,
  };
});

describe("handleIsCurrentFlag", () => {
  test("returns proper data", () => {
    const defs = handleIsCurrentFlag(holdBagTileDefinitions, [0, 2]);
    expect(defs).toHaveLength(holdBagTileDefinitions.length);
    expect(defs[0].isCurrent).toBe(true);
    expect(defs[1].isCurrent).toBe(false);
    expect(defs[2].isCurrent).toBe(true);
  });
});

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

const handBagTileDefinitionsArgs = {
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

describe("handBagTileDefinitions", () => {
  test("returns proper data without newDefinitions", () => {
    const handBagDefs = getDefinitions({ ...handBagTileDefinitionsArgs, bagType: "handBag" });
    const holdBagDefs = getDefinitions({ ...handBagTileDefinitionsArgs, bagType: "holdBag" });
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

const calculatePriceArgs = {
  selected: {
    handBag: 1,
    holdBag: 2,
  },
  current: {
    handBag: 0,
    holdBag: 1,
  },
  combinations,
};

describe("calculatePrice", () => {
  test("return proper price", () => {
    const priceOne = calculatePrice(calculatePriceArgs);
    const priceTwo = calculatePrice({
      ...calculatePriceArgs,
      selected: { handBag: 0, holdBag: 1 },
    });
    const priceThree = calculatePrice({
      ...calculatePriceArgs,
      selected: { handBag: 2, holdBag: 3 },
    });
    const priceFour = calculatePrice({ combinations });
    expect(priceOne).toBe(10.11);
    expect(priceTwo).toBe(0);
    expect(priceThree).toBe(30.33);
    expect(priceFour).toBe(null);
  });
});

describe("getStatus", () => {
  test("returns proper orderStatus", () => {
    const withoutStatus = getStatus({
      selected: { handBag: 1, holdBag: 2 },
      current: { handBag: 1, holdBag: 2 },
      isProcessing: false,
    });
    const processing = getStatus({ isProcessing: true });
    const unpaid = getStatus({
      selected: { handBag: 2, holdBag: 3 },
      current: { handBag: 1, holdBag: 2 },
      isProcessing: false,
    });
    const notAvailable = getStatus({
      isProcessing: false,
    });
    expect(withoutStatus).toBe(null);
    expect(processing).toBe("processing");
    expect(unpaid).toBe("unpaid");
    expect(notAvailable).toBe("notAvailable");
  });
});
