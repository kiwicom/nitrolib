// @flow strict
import getBaggageRowData from "../getBaggageRowData";
import { baggageData } from "../../../../../../records/__mocks__/baggageData";

const passengers = [
  {
    paxId: 1,
    firstName: "Barrack",
    middleName: "Hussein",
    lastName: "Obama",
    baggage: {
      holdBag: 1,
      handBag: 2,
    },
  },
  {
    paxId: 2,
    firstName: "Donald",
    middleName: "John",
    lastName: "Trump",
    baggage: {
      holdBag: 1,
      handBag: 1,
    },
  },
  {
    paxId: 3,
    firstName: "George",
    lastName: "Bush",
    baggage: {
      holdBag: 0,
      handBag: 1,
    },
  },
];

describe("getBaggageRowData", () => {
  test("returns proper data", () => {
    const baggageRowData = getBaggageRowData({
      baggage: baggageData,
      passengers,
      bagType: "handBag",
    });
    const firstRow = baggageRowData[0];
    const secondRow = baggageRowData[1];
    expect(baggageRowData).toHaveLength(2);
    expect(firstRow.category).toBe("personalItem");
    expect(secondRow.category).toBe("cabinBag");
    expect(firstRow.passengers).toHaveLength(2);
    expect(secondRow.passengers).toHaveLength(1);
  });
});
