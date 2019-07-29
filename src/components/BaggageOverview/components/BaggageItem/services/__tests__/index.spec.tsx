
import getPassengerNames from "../getPassengerNames";

const passengers = [
  {
    paxId: 1,
    firstName: "Barrack",
    middleName: "Hussein",
    lastName: "Obama",
  },
  {
    paxId: 2,
    firstName: "Donald",
    middleName: "John",
    lastName: "Trump",
  },
  {
    paxId: 3,
    firstName: "George",
    lastName: "Bush",
  },
];

describe("#getPassengerNames", () => {
  test("returns three passengers names", () => {
    const passengersNames = getPassengerNames(passengers);
    expect(passengersNames).toEqual("B. H. Obama, D. J. Trump, G. Bush");
  });
  test("renders one passenger name without middle name", () => {
    const passengersNames = getPassengerNames([passengers[2]]);
    expect(passengersNames).toEqual("G. Bush");
  });
});
