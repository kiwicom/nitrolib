// @flow
import { getOptions, getOptionItems } from "../utils";
import { baggageData } from "../../../components/BaggagePicker/services/data";

const args = {
  context: "booking",
  currentCombination: undefined,
  passengerCategory: "adult",
  pickerType: "handBag",
  baggage: baggageData,
};

describe("#Baggage utils", () => {
  test("getOptions return options", () => {
    const handBagOptions = getOptions(args);
    expect(handBagOptions[0].pickerType).toEqual("handBag");
    expect(handBagOptions[3].price.amount).toEqual(10);
  });

  test("getOptionItems return items ", () => {
    const optionItems = getOptionItems(baggageData.definitions.handBag, [0, 0, 1]);
    expect(optionItems[0].amount).toEqual(2);
    expect(optionItems[1].amount).toEqual(1);
  });

  test("getOptions return options with current combination", () => {
    const handBagOptions = getOptions({ ...args, context: "mmb", currentCombination: 3 });
    expect(handBagOptions[0].pickerType).toEqual("handBag");
    const option = handBagOptions.find(o => o.originalIndex === 3);
    expect(option && option.price.amount).toEqual(10);
  });
});
