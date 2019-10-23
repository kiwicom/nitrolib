// @flow
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
  {
    paxId: 4,
    firstName: "花生",
    lastName: "雞",
  },
];

describe("#getPassengerNames", () => {
  test("returns four passenger names", () => {
    const passengersNames = getPassengerNames(passengers);
    expect(passengersNames).toEqual("B. H. Obama, D. J. Trump, G. Bush, 花生 雞");
  });
  test("renders one passenger name without middle name", () => {
    const passengersNames = getPassengerNames([passengers[2]]);
    expect(passengersNames).toEqual("G. Bush");
  });
});
