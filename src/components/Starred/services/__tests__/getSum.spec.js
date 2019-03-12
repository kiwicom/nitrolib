// @flow strict
import getSum from "../getSum";

const passengers = {
  adults: 2,
  infants: 1,
  children: 1,
};

describe("#getSum", () => {
  it("should sum all passengers", () => {
    expect(getSum(passengers)).toEqual(4);
  });
});
