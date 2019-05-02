// @flow strict
import getTotalPrice from "../getTotalPrice";
import { baggageData } from "../../../records/__mocks__/baggageData";

const { combinations } = baggageData;

describe("getTotalPrice", () => {
  test("returns 0 for free combinations", () => {
    const totalPriceZero = getTotalPrice({
      combinationIndices: { handBag: [0], holdBag: [0] },
      combinations,
    });
    expect(totalPriceZero).toEqual(0);
  });

  test("returns sum of combination prices", () => {
    const totalPrice = getTotalPrice({
      combinationIndices: { handBag: [2], holdBag: [2] },
      combinations,
    });
    expect(totalPrice).toEqual(30.33);
  });

  test("returns sum of same multiple combination prices", () => {
    const totalPrice = getTotalPrice({
      combinationIndices: { handBag: [3, 3], holdBag: [3, 3] },
      combinations,
    });
    expect(totalPrice).toEqual(90.96);
  });

  test("returns sum of different multiple combination prices", () => {
    const totalPrice = getTotalPrice({
      combinationIndices: { handBag: [0, 3, 3, 4, 5], holdBag: [0, 1, 2, 2, 3, 3] },
      combinations,
    });
    expect(totalPrice).toEqual(202.14);
  });
});
