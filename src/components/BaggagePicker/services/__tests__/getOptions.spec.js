// @flow strict
import getOptions from "../getOptions";
import { baggageData } from "../../../../records/__mocks__/baggageData";

const args = {
  context: "booking",
  currentCombination: undefined,
  passengerCategory: "adult",
  pickerType: "handBag",
  baggage: baggageData,
};

describe("getOptions", () => {
  test("return options", () => {
    const handBagOptions = getOptions(args);
    expect(handBagOptions[0].pickerType).toEqual("handBag");
    expect(handBagOptions[3].price.amount).toEqual(15.15);
  });

  test("returns options with current combination", () => {
    const handBagOptions = getOptions({
      ...args,
      context: "mmb",
      currentCombination: 3,
    });
    expect(handBagOptions[0].pickerType).toEqual("handBag");
    const option = handBagOptions.find(o => o.originalIndex === 3);
    expect(option?.price.amount).toEqual(15.15);

    const holdBagOptions = getOptions({
      ...args,
      pickerType: "holdBag",
      context: "mmb",
      currentCombination: 1,
    });
    expect(holdBagOptions[0].pickerType).toEqual("holdBag");
    const optionTwo = holdBagOptions.find(o => o.originalIndex === 2);
    const optionThree = holdBagOptions.find(o => o.originalIndex === 3);
    expect(optionTwo?.price.amount).toEqual(10.11);
    expect(optionThree?.price.amount).toEqual(20.22);
  });
});
