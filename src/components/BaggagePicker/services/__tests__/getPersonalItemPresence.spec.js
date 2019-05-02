// @flow strict

import getPersonalItemPresence from "../getPersonalItemPresence";

const options = [
  {
    originalIndex: 0,
    pickerType: "handBag",
    price: {
      currency: "EUR",
      amount: 10,
      base: 10,
      service: 8,
      serviceFlat: 2,
      merchant: 0,
    },
    items: {
      "2": {
        amount: 1,
        category: "personalItem",
        conditions: {
          isPriority: ["FR", "W6"],
          passengerGroups: ["adult"],
        },
        restrictions: {
          dimensionsSum: 156,
          height: 52,
          length: 78,
          weight: 25,
          width: 26,
        },
      },
      "3": {
        amount: 2,
        category: "cabinBag",
        conditions: {
          isPriority: ["FR", "W6"],
          passengerGroups: ["adult"],
        },
        restrictions: {
          dimensionsSum: 156,
          height: 52,
          length: 78,
          weight: 25,
          width: 26,
        },
      },
    },
  },
  {
    originalIndex: 1,
    pickerType: "holdBag",
    price: {
      currency: "EUR",
      amount: 10,
      merchant: 0,
      base: 10,
      service: 8,
      serviceFlat: 2,
    },
    items: {
      "3": {
        amount: 1,
        category: "holdBag",
        conditions: {
          isPriority: ["FR", "W6"],
          passengerGroups: ["adult"],
        },
        restrictions: {
          dimensionsSum: 156,
          height: 52,
          length: 78,
          weight: 25,
          width: 26,
        },
      },
    },
  },
];

const optionsWithoutPersonalItems = [
  {
    originalIndex: 0,
    pickerType: "handBag",
    price: {
      currency: "EUR",
      amount: 10,
      base: 10,
      service: 8,
      serviceFlat: 2,
      merchant: 0,
    },
    items: {
      "2": {
        amount: 3,
        category: "cabinBag",
        conditions: {
          isPriority: ["FR", "W6"],
          passengerGroups: ["adult"],
        },
        restrictions: {
          dimensionsSum: 156,
          height: 30,
          length: 20,
          weight: 5,
          width: 26,
        },
      },
    },
  },
];

describe("getPersonalItemPresence", () => {
  test("return true when personal item is present", () => {
    const isPersonalPresent = getPersonalItemPresence({ pickerType: "handBag", options });
    expect(isPersonalPresent).toEqual(true);
  });
  test("return false when personal item is not present", () => {
    const isPersonalPresent = getPersonalItemPresence({
      pickerType: "handBag",
      options: optionsWithoutPersonalItems,
    });
    expect(isPersonalPresent).toEqual(false);
  });
  test("return false when pickerType is holdBag", () => {
    const isPersonalPresent = getPersonalItemPresence({ pickerType: "holdBag", options });
    expect(isPersonalPresent).toEqual(false);
  });
});
