// @flow strict
import calculatePrice from "../calculatePrice";
import { baggageData } from "../../../../records/__mocks__/baggageData";

const { combinations } = baggageData;
const calculatePriceArgs = {
  selected: {
    handBag: 1,
    holdBag: 2,
  },
  current: {
    handBag: 0,
    holdBag: 1,
  },
  combinations,
};

describe("calculatePrice", () => {
  test("return proper price", () => {
    const priceOne = calculatePrice(calculatePriceArgs);
    const priceTwo = calculatePrice({
      ...calculatePriceArgs,
      selected: { handBag: 0, holdBag: 1 },
    });
    const priceThree = calculatePrice({
      ...calculatePriceArgs,
      selected: { handBag: 2, holdBag: 3 },
    });
    const priceFour = calculatePrice({ combinations });
    expect(priceOne).toBe(10.11);
    expect(priceTwo).toBe(0);
    expect(priceThree).toBe(30.33);
    expect(priceFour).toBe(null);
  });
});
