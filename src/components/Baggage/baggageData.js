// @flow
export default {
  definitions: {
    handBag: [
      {
        note: null,
        price: {
          currency: "EUR",
          amount: 0,
        },
        currency: "EUR",
        category: "personalItem",
        restrictions: {
          weight: 5,
          height: 20,
          width: 20,
          length: 20,
          dimensions_sum: null,
        },
      },
      {
        note: null,
        price: {
          currency: "EUR",
          amount: 0,
        },
        currency: "EUR",
        category: "cabinBag",
        restrictions: {
          weight: 10,
          height: 35,
          width: 20,
          length: 45,
          dimensions_sum: null,
        },
      },
    ],
    holdBag: [
      {
        note: null,
        price: {
          currency: "EUR",
          amount: 10,
        },
        currency: "EUR",
        category: "holdBag",
        restrictions: {
          weight: 10,
          height: 52,
          width: 26,
          length: 78,
          dimensions_sum: 156,
        },
      },
      {
        note: null,
        price: {
          currency: "EUR",
          amount: 25,
        },
        currency: "EUR",
        category: "holdBag",
        restrictions: {
          weight: 15,
          height: 52,
          width: 26,
          length: 78,
          dimensions_sum: 156,
        },
      },
      {
        note: null,
        price: {
          currency: "EUR",
          amount: 30,
        },
        currency: "EUR",
        category: "holdBag",
        restrictions: {
          weight: 25,
          height: 52,
          width: 26,
          length: 78,
          dimensions_sum: 156,
        },
      },
    ],
  },
  combinations: {
    adult: {
      handBag: [
        {
          category: "handBag",
          group: "adult",
          combination: [0],
          price: {
            currency: "EUR",
            amount: 0,
          },
          originalIndex: 0,
          allowanceGraph: {
            add: {},
            remove: {},
          },
        },
        {
          category: "handBag",
          group: "adult",
          combination: [1],
          price: {
            currency: "EUR",
            amount: 15,
          },
          originalIndex: 1,
          allowanceGraph: {
            add: {},
            remove: {},
          },
        },
        {
          category: "handBag",
          group: "adult",
          combination: [0, 1],
          price: {
            currency: "EUR",
            amount: 20,
          },
          originalIndex: 2,
          allowanceGraph: {
            add: {},
            remove: {},
          },
        },
        {
          category: "handBag",
          group: "adult",
          combination: [0, 1, 1],
          price: {
            currency: "EUR",
            amount: 30,
          },
          originalIndex: 3,
          allowanceGraph: {
            add: {},
            remove: {},
          },
        },
        {
          category: "handBag",
          group: "adult",
          combination: [0, 1, 1, 1],
          price: {
            currency: "EUR",
            amount: 40,
          },
          originalIndex: 4,
          allowanceGraph: {
            add: {},
            remove: {},
          },
        },
      ],
      holdBag: [
        {
          category: "holdBag",
          group: "adult",
          combination: [],
          price: {
            currency: "EUR",
            amount: 0,
          },
          originalIndex: 5,
          allowanceGraph: {
            add: {
              "0": 1,
              "1": 2,
              "2": 3,
            },
            remove: {},
          },
        },
        {
          category: "holdBag",
          group: "adult",
          combination: [0],
          price: {
            currency: "EUR",
            amount: 10,
          },
          originalIndex: 6,
          allowanceGraph: {
            add: {},
            remove: {
              "0": 0,
            },
          },
        },
        {
          category: "holdBag",
          group: "adult",
          combination: [1],
          price: {
            currency: "EUR",
            amount: 25,
          },
          originalIndex: 7,
          allowanceGraph: {
            add: {},
            remove: {
              "1": 0,
            },
          },
        },
        {
          category: "holdBag",
          group: "adult",
          combination: [2],
          price: {
            currency: "EUR",
            amount: 30,
          },
          originalIndex: 8,
          allowanceGraph: {
            add: {},
            remove: {
              "2": 0,
            },
          },
        },
        {
          category: "holdBag",
          group: "adult",
          combination: [1, 1, 2],
          price: {
            currency: "EUR",
            amount: 50,
          },
          originalIndex: 9,
          allowanceGraph: {
            add: {},
            remove: {
              "2": 0,
            },
          },
        },
        {
          category: "holdBag",
          group: "adult",
          combination: [1, 1, 2, 2],
          price: {
            currency: "EUR",
            amount: 60,
          },
          originalIndex: 10,
          allowanceGraph: {
            add: {},
            remove: {
              "2": 0,
            },
          },
        },
      ],
    },
    child: {
      handBag: [
        {
          category: "handBag",
          group: "adult",
          combination: [0, 1],
          price: {
            currency: "EUR",
            amount: 0,
          },
          originalIndex: 0,
          allowanceGraph: {
            add: {},
            remove: {},
          },
        },
      ],
      holdBag: [
        {
          category: "holdBag",
          group: "adult",
          combination: [],
          price: {
            currency: "EUR",
            amount: 0,
          },
          originalIndex: 1,
          allowanceGraph: {
            add: {
              "0": 1,
              "1": 2,
              "2": 3,
            },
            remove: {},
          },
        },
        {
          category: "holdBag",
          group: "adult",
          combination: [0],
          price: {
            currency: "EUR",
            amount: 0,
          },
          originalIndex: 2,
          allowanceGraph: {
            add: {},
            remove: {
              "0": 0,
            },
          },
        },
        {
          category: "holdBag",
          group: "adult",
          combination: [1],
          price: {
            currency: "EUR",
            amount: 25,
          },
          originalIndex: 3,
          allowanceGraph: {
            add: {},
            remove: {
              "1": 0,
            },
          },
        },
        {
          category: "holdBag",
          group: "adult",
          combination: [2],
          price: {
            currency: "EUR",
            amount: 30,
          },
          originalIndex: 4,
          allowanceGraph: {
            add: {},
            remove: {
              "2": 0,
            },
          },
        },
      ],
    },
    infant: {
      handBag: [
        {
          originalIndex: null,
          allowanceGraph: {
            add: {},
            remove: {},
          },
          category: "handBag",
          combination: [],
          group: "infant",
          price: {
            currency: "EUR",
            amount: 0,
          },
        },
      ],
      holdBag: [
        {
          originalIndex: null,
          allowanceGraph: {
            add: {},
            remove: {},
          },
          category: "holdBag",
          combination: [],
          group: "infant",
          price: {
            currency: "EUR",
            amount: 0,
          },
        },
      ],
    },
  },
};
