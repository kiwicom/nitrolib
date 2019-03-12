// @flow strict
import getTransKey from "../getTransKey";

const passengers = {
  adults: 2,
  infants: 1,
  children: 1,
};

describe("#getTransKey", () => {
  it("should get proper translation key", () => {
    expect(getTransKey(passengers)).toEqual("adults");
  });
});
