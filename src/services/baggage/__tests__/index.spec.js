// @flow
import {
  getOptions,
  getOptionItems,
  getTotalPrice,
  groupDefinitions,
  getBaggageSize,
} from "../utils";
import { baggageData } from "../../../components/BaggagePicker/services/data";

const args = {
  context: "booking",
  currentCombination: undefined,
  passengerCategory: "adult",
  pickerType: "handBag",
  baggage: baggageData,
};

const { combinations } = baggageData;

const definitionsWithIds = [
  {
    id: 1,
    conditions: {
      passengerGroups: ["adult"],
    },
    price: {
      currency: "EUR",
      amount: 0,
      base: 0,
      merchant: null,
      service: 0,
      serviceFlat: 0,
    },
    category: "personalItem",
    restrictions: {
      weight: 5,
      height: 20,
      width: 20,
      length: 20,
      dimensionsSum: null,
    },
  },
  {
    id: 1,
    conditions: {
      passengerGroups: ["adult"],
    },
    price: {
      currency: "EUR",
      amount: 0,
      base: 0,
      merchant: null,
      service: 0,
      serviceFlat: 0,
    },
    category: "personalItem",
    restrictions: {
      weight: 5,
      height: 20,
      width: 20,
      length: 20,
      dimensionsSum: null,
    },
  },
  {
    id: 2,
    conditions: {
      passengerGroups: ["adult"],
    },
    price: {
      currency: "EUR",
      amount: 10,
      base: 0,
      merchant: null,
      service: 0,
      serviceFlat: 0,
    },
    category: "holdBag",
    restrictions: {
      weight: 10,
      height: 52,
      width: 26,
      length: 78,
      dimensionsSum: 156,
    },
  },
];

describe("#Baggage utils", () => {
  // getOptions
  test("getOptions return options", () => {
    const handBagOptions = getOptions(args);
    expect(handBagOptions[0].pickerType).toEqual("handBag");
    expect(handBagOptions[3].price.amount).toEqual(15.15);
  });

  test("getOptions returns options with current combination", () => {
    const handBagOptions = getOptions({
      ...args,
      context: "mmb",
      currentCombination: 3,
    });
    expect(handBagOptions[0].pickerType).toEqual("handBag");
    const option = handBagOptions.find(o => o.originalIndex === 3);
    expect(option?.price.amount).toEqual(0);

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

  // getOptionItems
  test("getOptionItems returns items ", () => {
    const optionItems = getOptionItems(baggageData.definitions.handBag, [0, 0, 1]);
    expect(optionItems[0].amount).toEqual(2);
    expect(optionItems[1].amount).toEqual(1);
  });

  // getTotalPrice
  test("getTotalPrice returns 0 for free combinations", () => {
    const totalPriceZero = getTotalPrice({
      combinationIndices: { handBag: [0], holdBag: [0] },
      combinations,
    });
    expect(totalPriceZero).toEqual(0);
  });

  test("getTotalPrice returns sum of combination prices", () => {
    const totalPrice = getTotalPrice({
      combinationIndices: { handBag: [2], holdBag: [2] },
      combinations,
    });
    expect(totalPrice).toEqual(30.33);
  });

  test("getTotalPrice returns sum of same multiple combination prices", () => {
    const totalPrice = getTotalPrice({
      combinationIndices: { handBag: [3, 3], holdBag: [3, 3] },
      combinations,
    });
    expect(totalPrice).toEqual(90.96);
  });

  test("getTotalPrice returns sum of different multiple combination prices", () => {
    const totalPrice = getTotalPrice({
      combinationIndices: { handBag: [0, 3, 3, 4, 5], holdBag: [0, 1, 2, 2, 3, 3] },
      combinations,
    });
    expect(totalPrice).toEqual(202.14);
  });

  test("groupDefinitions returns proper data", () => {
    const groupedDefinitions = groupDefinitions(definitionsWithIds);
    expect(groupedDefinitions.length).toEqual(2);
    const personalItem = groupedDefinitions.find(item => item.category === "personalItem");
    expect(personalItem?.amount).toEqual(2);
  });

  test("getBaggageSize returns proper string", () => {
    const baggageSize = getBaggageSize(baggageData.definitions.holdBag[2].restrictions);
    expect(baggageSize).toEqual("78 x 26 x 52 cm, 25 kg");
  });
});
