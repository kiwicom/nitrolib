// @flow strict
import type { TileDefinition } from "../Baggage";

export const baggageData = {
  definitions: {
    handBag: [
      {
        index: 0,
        conditions: {
          passengerGroups: ["teen", "adult"],
        },
        price: {
          currency: "EUR",
          amount: 0,
          base: 0,
          merchant: 0,
          service: 0,
          serviceFlat: 0,
        },
        category: "personalItem",
        restrictions: {
          weight: 5,
          height: 20,
          width: 20,
          length: 20,
          dimensionsSum: null,
        },
      },
      {
        index: 1,
        conditions: {
          passengerGroups: ["adult"],
        },
        price: {
          currency: "EUR",
          amount: 10.11,
          base: 0,
          merchant: 0,
          service: 0,
          serviceFlat: 0,
        },
        category: "cabinBag",
        restrictions: {
          weight: 10,
          height: 35,
          width: 20,
          length: 45,
          dimensionsSum: null,
        },
      },
    ],
    holdBag: [
      {
        index: 0,
        conditions: {
          passengerGroups: ["teen", "adult"],
        },
        price: {
          currency: "EUR",
          amount: 10.11,
          base: 0,
          merchant: 0,
          service: 0,
          serviceFlat: 0,
        },
        category: "holdBag",
        restrictions: {
          weight: 10,
          height: 52,
          width: 26,
          length: 78,
          dimensionsSum: 156,
        },
      },
      {
        index: 1,
        conditions: {
          passengerGroups: ["teen", "adult"],
        },
        price: {
          currency: "EUR",
          amount: 20.22,
          base: 20,
          merchant: 0,
          service: 5,
          serviceFlat: 0,
        },
        category: "holdBag",
        restrictions: {
          weight: 15,
          height: 52,
          width: 26,
          length: 78,
          dimensionsSum: 156,
        },
      },
      {
        index: 2,
        conditions: {
          passengerGroups: ["adult"],
          isPriority: ["FR", "W6"],
        },
        price: {
          currency: "EUR",
          amount: 30.33,
          base: 0,
          merchant: 0,
          service: 0,
          serviceFlat: 0,
        },
        category: "holdBag",
        restrictions: {
          weight: 25,
          height: 52,
          width: 26,
          length: 78,
          dimensionsSum: 156,
        },
      },
    ],
  },
  combinations: {
    handBag: [
      {
        index: 0,
        conditions: {
          passengerGroups: ["adult", "child", "infant", "teen"],
        },
        indices: [],
        price: {
          currency: "EUR",
          amount: 0,
          base: 0,
          merchant: 0,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        index: 1,
        conditions: {
          passengerGroups: ["adult", "infant"],
        },
        indices: [0],
        price: {
          currency: "EUR",
          amount: 0,
          base: 0,
          merchant: 0,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        index: 2,
        conditions: {
          passengerGroups: ["adult", "child"],
        },
        indices: [1],
        price: {
          currency: "EUR",
          amount: 10.11,
          base: 0,
          merchant: 0,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        index: 3,
        conditions: {
          passengerGroups: ["teen", "adult"],
        },
        indices: [0, 1],
        price: {
          currency: "EUR",
          amount: 15.15,
          base: 0,
          merchant: 0,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        index: 4,
        conditions: {
          passengerGroups: ["teen", "adult"],
        },
        indices: [0, 1, 1],
        price: {
          currency: "EUR",
          amount: 25.26,
          base: 0,
          merchant: 0,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        index: 5,
        conditions: {
          passengerGroups: ["adult"],
        },
        indices: [0, 1, 1, 1],
        price: {
          currency: "EUR",
          amount: 35.37,
          base: 0,
          merchant: 0,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        index: 6,
        conditions: {
          passengerGroups: ["adult"],
        },
        indices: [1, 1, 1],
        price: {
          currency: "EUR",
          amount: 30.33,
          base: 0,
          merchant: 0,
          service: 0,
          serviceFlat: 0,
        },
      },
    ],
    holdBag: [
      {
        index: 0,
        conditions: {
          passengerGroups: ["adult", "teen", "child", "infant"],
        },
        indices: [],
        price: {
          currency: "EUR",
          amount: 0,
          base: 0,
          merchant: 0,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        index: 1,
        conditions: {
          passengerGroups: ["adult", "infant"],
        },
        indices: [0],
        price: {
          currency: "EUR",
          amount: 10.11,
          base: 0,
          merchant: 0,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        index: 2,
        conditions: {
          passengerGroups: ["adult", "infant"],
        },
        indices: [1],
        price: {
          currency: "EUR",
          amount: 20.22,
          base: 0,
          merchant: 0,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        index: 3,
        conditions: {
          passengerGroups: ["teen", "adult"],
        },
        indices: [2],
        price: {
          currency: "EUR",
          amount: 30.33,
          base: 0,
          merchant: 0,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        index: 4,
        conditions: {
          passengerGroups: ["adult"],
        },
        indices: [1, 1, 2],
        price: {
          currency: "EUR",
          amount: 70.77,
          base: 0,
          merchant: 0,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        index: 5,
        conditions: {
          passengerGroups: ["adult"],
        },
        indices: [1, 1, 2, 2],
        price: {
          currency: "EUR",
          amount: 101.1,
          base: 0,
          merchant: 0,
          service: 0,
          serviceFlat: 0,
        },
      },
    ],
  },
};

export const emptyData = {
  definitions: {
    handBag: [],
    holdBag: [],
  },
  combinations: {
    handBag: [],
    holdBag: [],
  },
};

const { definitions } = baggageData;

export const holdBagTileDefinitions: TileDefinition[] = definitions.holdBag.map((def, index) => {
  // $FlowIssue: https://github.com/facebook/flow/issues/2892
  return {
    originalIndex: index,
    isCurrent: false,
    ...def,
  };
});
export const handBagTileDefinitions: TileDefinition[] = definitions.handBag.map((def, index) => {
  // $FlowIssue: https://github.com/facebook/flow/issues/2892
  return {
    originalIndex: index,
    isCurrent: false,
    ...def,
  };
});
