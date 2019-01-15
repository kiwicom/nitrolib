// @flow
const data = [
  {
    originalIndex: 5,
    bagType: "holdBag",
    price: {
      currency: "EUR",
      amount: 0,
    },
    items: {},
  },
  {
    originalIndex: 6,
    bagType: "holdBag",
    price: {
      currency: "EUR",
      amount: 10,
    },
    items: {
      "0": {
        amount: 1,
        category: "holdBag",
        restrictions: {
          weight: 10,
          height: 52,
          width: 26,
          length: 78,
          dimensions_sum: 156,
        },
      },
    },
  },
  {
    originalIndex: 7,
    bagType: "holdBag",
    price: {
      currency: "EUR",
      amount: 25,
    },
    items: {
      "1": {
        amount: 1,
        category: "holdBag",
        restrictions: {
          weight: 15,
          height: 52,
          width: 26,
          length: 78,
          dimensions_sum: 156,
        },
      },
    },
  },
  {
    originalIndex: 8,
    bagType: "holdBag",
    price: {
      currency: "EUR",
      amount: 30,
    },
    items: {
      "2": {
        amount: 1,
        category: "holdBag",
        restrictions: {
          weight: 25,
          height: 52,
          width: 26,
          length: 78,
          dimensions_sum: 156,
        },
        conditions: {
          is_priority: ["FR", "W6"],
        },
      },
    },
  },
  {
    originalIndex: 9,
    bagType: "holdBag",
    price: {
      currency: "EUR",
      amount: 50,
    },
    items: {
      "1": {
        amount: 2,
        category: "holdBag",
        restrictions: {
          weight: 15,
          height: 52,
          width: 26,
          length: 78,
          dimensions_sum: 156,
        },
      },
      "2": {
        amount: 1,
        category: "holdBag",
        restrictions: {
          weight: 25,
          height: 52,
          width: 26,
          length: 78,
          dimensions_sum: 156,
        },
        conditions: {
          is_priority: ["FR", "W6"],
        },
      },
    },
  },
  {
    originalIndex: 10,
    bagType: "holdBag",
    price: {
      currency: "EUR",
      amount: 60,
    },
    items: {
      "1": {
        amount: 2,
        category: "holdBag",
        restrictions: {
          weight: 15,
          height: 52,
          width: 26,
          length: 78,
          dimensions_sum: 156,
        },
      },
      "2": {
        amount: 2,
        category: "holdBag",
        restrictions: {
          weight: 25,
          height: 52,
          width: 26,
          length: 78,
          dimensions_sum: 156,
        },
        conditions: {
          is_priority: ["FR", "W6"],
        },
      },
    },
  },
];

export default data;
