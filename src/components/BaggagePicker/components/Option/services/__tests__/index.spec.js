// @flow strict

import getAirlinesWithPriorityBoarding from "../getAirlinesWithPriorityBoarding";

const items = [
  {
    category: "personalItem",
    restrictions: {
      weight: 5,
      height: 22,
      width: 26,
      length: 48,
      dimensionsSum: 156,
    },
    amount: 2,
    conditions: {
      isPriority: ["FR", "W6"],
      passengerGroups: ["infant", "adult"],
    },
  },
  {
    amount: 1,
    category: "cabinBag",
    restrictions: {
      weight: 10,
      height: 22,
      width: 26,
      length: 48,
      dimensionsSum: 156,
    },
    conditions: {
      isPriority: ["0B"],
      passengerGroups: ["infant"],
    },
  },
  {
    amount: 1,
    category: "holdBag",
    restrictions: {
      weight: 20,
      height: 52,
      width: 26,
      length: 78,
      dimensionsSum: 156,
    },
    conditions: {
      isPriority: ["0B", "FR"],
      passengerGroups: ["adult"],
    },
  },
  {
    amount: 1,
    category: "holdBag",
    restrictions: {
      weight: 30,
      height: 52,
      width: 36,
      length: 88,
      dimensionsSum: 156,
    },
    conditions: {
      passengerGroups: ["adult"],
    },
  },
];

describe("#BaggagePaymentSummary", () => {
  test("renders proper data", () => {
    const threeAirlines = getAirlinesWithPriorityBoarding(items);
    const oneAirline = getAirlinesWithPriorityBoarding([items[1]]);
    expect(threeAirlines).toEqual(["FR", "W6", "0B"]);
    expect(oneAirline).toEqual(["0B"]);
  });
});
