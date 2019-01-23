// @flow
const baggageOptions = [
  {
    originalIndex: 5,
    pickerType: "holdBag",
    price: {
      currency: "EUR",
      amount: 0,
      base: 0,
      service: 0,
      serviceFlat: 0,
    },
    items: {},
  },
  {
    originalIndex: 6,
    pickerType: "holdBag",
    price: {
      currency: "EUR",
      amount: 10,
      base: 10,
      service: 0,
      serviceFlat: 0,
    },
    items: {
      "0": {
        amount: 1,
        category: "holdBag",
        conditions: {
          passengerGroups: ["adult"],
        },
        restrictions: {
          weight: 10,
          height: 52,
          width: 26,
          length: 78,
          dimensionsSum: 156,
        },
      },
    },
  },
  {
    originalIndex: 7,
    pickerType: "holdBag",
    price: {
      currency: "EUR",
      amount: 25,
      base: 25,
      service: 0,
      serviceFlat: 0,
    },
    items: {
      "1": {
        amount: 1,
        category: "holdBag",
        conditions: {
          passengerGroups: ["adult"],
        },
        restrictions: {
          weight: 15,
          height: 52,
          width: 26,
          length: 78,
          dimensionsSum: 156,
        },
      },
    },
  },
  {
    originalIndex: 8,
    pickerType: "holdBag",
    price: {
      currency: "EUR",
      amount: 30,
      base: 30,
      service: 0,
      serviceFlat: 0,
    },
    items: {
      "2": {
        amount: 1,
        category: "holdBag",
        conditions: {
          is_priority: ["FR", "W6"],
          passengerGroups: ["adult"],
        },
        restrictions: {
          weight: 25,
          height: 52,
          width: 26,
          length: 78,
          dimensionsSum: 156,
        },
      },
    },
  },
  {
    originalIndex: 9,
    pickerType: "holdBag",
    price: {
      currency: "EUR",
      amount: 50,
      base: 50,
      service: 0,
      serviceFlat: 0,
    },
    items: {
      "1": {
        amount: 2,
        category: "holdBag",
        conditions: {
          passengerGroups: ["adult"],
        },
        restrictions: {
          weight: 15,
          height: 52,
          width: 26,
          length: 78,
          dimensionsSum: 156,
        },
      },
      "2": {
        amount: 1,
        category: "holdBag",
        conditions: {
          is_priority: ["FR", "W6"],
          passengerGroups: ["adult"],
        },
        restrictions: {
          weight: 25,
          height: 52,
          width: 26,
          length: 78,
          dimensionsSum: 156,
        },
      },
    },
  },
  {
    originalIndex: 10,
    pickerType: "holdBag",
    price: {
      currency: "EUR",
      amount: 60,
      base: 60,
      service: 0,
      serviceFlat: 0,
    },
    items: {
      "1": {
        amount: 2,
        category: "holdBag",
        conditions: {
          passengerGroups: ["adult"],
        },
        restrictions: {
          weight: 15,
          height: 52,
          width: 26,
          length: 78,
          dimensionsSum: 156,
        },
      },
      "2": {
        amount: 2,
        category: "holdBag",
        conditions: {
          isPriority: ["FR", "W6"],
          passengerGroups: ["adult"],
        },
        restrictions: {
          weight: 25,
          height: 52,
          width: 26,
          length: 78,
          dimensionsSum: 156,
        },
      },
    },
  },
];

export default baggageOptions;
