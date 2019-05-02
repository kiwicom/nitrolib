// @flow strict
import getPassengersFromId from "../getPassengersFromId";

const passengersData = [
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
      handBag: 3,
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

describe("getPassengersFromId", () => {
  test("return proper data", () => {
    const passengers = getPassengersFromId([2, 1], passengersData);

    expect(passengers).toHaveLength(2);
    expect(passengers[0].firstName).toBe("Barrack");
    expect(passengers[1].middleName).toBe("John");
  });
});
