// @flow
export const baggageData = {
  definitions: {
    handBag: [
      {
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
        category: "cabinBag",
        restrictions: {
          weight: 10,
          height: 35,
          width: 20,
          length: 45,
          dimensionsSum: null,
        },
      },
    ],
    holdBag: [
      {
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
      {
        conditions: {
          passengerGroups: ["adult"],
        },
        price: {
          currency: "EUR",
          amount: 20,
          base: 20,
          merchant: null,
          service: 5,
          serviceFlat: 0,
        },
        category: "holdBag",
        restrictions: {
          weight: 15,
          height: 52,
          width: 26,
          length: 78,
          dimensionsSum: 156,
        },
      },
      {
        conditions: {
          passengerGroups: ["adult"],
          isPriority: ["FR", "W6"],
        },
        price: {
          currency: "EUR",
          amount: 30,
          base: 0,
          merchant: null,
          service: 0,
          serviceFlat: 0,
        },
        category: "holdBag",
        restrictions: {
          weight: 25,
          height: 52,
          width: 26,
          length: 78,
          dimensionsSum: 156,
        },
      },
    ],
  },
  combinations: {
    handBag: [
      {
        conditions: {
          passengerGroups: ["adult"],
        },
        indices: [0],
        price: {
          currency: "EUR",
          amount: 0,
          base: 0,
          merchant: null,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        conditions: {
          passengerGroups: ["adult"],
        },
        indices: [1],
        price: {
          currency: "EUR",
          amount: 10,
          base: 0,
          merchant: null,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        conditions: {
          passengerGroups: ["adult"],
        },
        indices: [0, 1],
        price: {
          currency: "EUR",
          amount: 10,
          base: 0,
          merchant: null,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        conditions: {
          passengerGroups: ["adult"],
        },
        indices: [0, 1, 1],
        price: {
          currency: "EUR",
          amount: 20,
          base: 0,
          merchant: null,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        conditions: {
          passengerGroups: ["adult"],
        },
        indices: [0, 1, 1, 1],
        price: {
          currency: "EUR",
          amount: 30,
          base: 0,
          merchant: null,
          service: 0,
          serviceFlat: 0,
        },
      },
    ],
    holdBag: [
      {
        conditions: {
          passengerGroups: ["adult"],
        },
        indices: [],
        price: {
          currency: "EUR",
          amount: 0,
          base: 0,
          merchant: null,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        conditions: {
          passengerGroups: ["adult"],
        },
        indices: [0],
        price: {
          currency: "EUR",
          amount: 10,
          base: 0,
          merchant: null,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        conditions: {
          passengerGroups: ["adult"],
        },
        indices: [1],
        price: {
          currency: "EUR",
          amount: 20,
          base: 0,
          merchant: null,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        conditions: {
          passengerGroups: ["adult"],
        },
        indices: [2],
        price: {
          currency: "EUR",
          amount: 30,
          base: 0,
          merchant: null,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        conditions: {
          passengerGroups: ["adult"],
        },
        indices: [1, 1, 2],
        price: {
          currency: "EUR",
          amount: 70,
          base: 0,
          merchant: null,
          service: 0,
          serviceFlat: 0,
        },
      },
      {
        conditions: {
          passengerGroups: ["adult"],
        },
        indices: [1, 1, 2, 2],
        price: {
          currency: "EUR",
          amount: 100,
          base: 0,
          merchant: null,
          service: 0,
          serviceFlat: 0,
        },
      },
    ],
  },
};

export const emptyData = {
  definitions: {
    handBag: [],
    holdBag: [],
  },
  combinations: {
    handBag: [],
    holdBag: [],
  },
};
