// @flow strict
import getCarrier from "../getCarrier";

const input = [
  { id: "DP", name: "Pobeda", code: "DP" },
  { id: "W6", name: "Wizzair", code: "W6" },
  { id: "UX", name: "Air Europa", code: "UX" },
];

describe("#getCarrier", () => {
  it("should get carrier by id", () => {
    expect(getCarrier(input, "DP")).toEqual([{ name: "Pobeda", code: "DP" }]);
  });
});
