// @flow strict
import groupDefinitions from "../groupDefinitions";

const definitions = [
  {
    index: 0,
    conditions: {
      passengerGroups: ["adult"],
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
    index: 0,
    conditions: {
      passengerGroups: ["adult"],
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
    index: 2,
    conditions: {
      passengerGroups: ["adult"],
    },
    price: {
      currency: "EUR",
      amount: 10,
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
];

describe("groupDefinitions", () => {
  test(" returns proper data", () => {
    const groupedDefinitions = groupDefinitions(definitions);
    expect(groupedDefinitions.length).toEqual(2);
    const personalItem = groupedDefinitions.find(item => item.category === "personalItem");
    expect(personalItem?.amount).toEqual(2);
  });
});
