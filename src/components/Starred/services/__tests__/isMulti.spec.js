// @flow strict
import isMulti from "../isMulti";

const passengersMulti = {
  adults: 2,
  infants: 1,
  children: 0,
};

const passengersNotMulti = {
  adults: 2,
  infants: 0,
  children: 0,
};

describe("#isMulti", () => {
  it("should return true", () => {
    expect(isMulti(passengersMulti)).toEqual(true);
  });

  it("should return false", () => {
    expect(isMulti(passengersNotMulti)).toEqual(false);
  });
});
