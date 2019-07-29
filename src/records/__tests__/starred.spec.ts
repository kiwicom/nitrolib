import * as starred from "../Starred";

const passengers = {
  adults: 2,
  infants: 1,
  children: 1,
};

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

describe("#getSum", () => {
  it("should sum all passengers", () => {
    expect(starred.getSum(passengers)).toEqual(4);
  });
});

describe("#isMulti", () => {
  it("should return true", () => {
    expect(starred.isMulti(passengersMulti)).toEqual(true);
  });

  it("should return false", () => {
    expect(starred.isMulti(passengersNotMulti)).toEqual(false);
  });
});

describe("#getTransKey", () => {
  it("should get proper translation key", () => {
    expect(starred.getTransKey(passengers)).toEqual("adults");
  });
});
