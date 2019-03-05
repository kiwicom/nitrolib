// @flow strict
export const data = {
  hotel: {
    name: "Golden Coast Hotel",
    rating: 5,
    rooms: [
      {
        id: "1",
        description: "1x Deluxe Room with Free Daily Activities; 2x Adult, 1x Child; Half board",
      },
      {
        id: "2",
        description: "1x Room with Free Daily Activities; 3x Adult",
      },
    ],
  },
  priceBreakdown: {
    packagePrice: {
      amount: 1200.0,
      currency: "€",
    },
    taxes: {
      amount: 200,
      currency: "€",
    },
    fees: {
      amount: 300,
      currency: "€",
    },
    totalPrice: {
      amount: 1700.0,
      currency: "€",
    },
  },
  travelDates: {
    from: "Fri 20 Nov",
    to: "Sun 4 Dec",
  },
  travelArrangement: {
    itineraryOutbound: [
      {
        departure: "Prague, Czech Republic",
        destination: "Denpasar, Bali",
        numberOfStops: 0,
        note: "Transfer to hotel NOT included",
      },
    ],
    itineraryInbound: [
      {
        departure: "Denpasar, Bali",
        destination: "Prague, Czech Republic",
        numberOfStops: 2,
        note: "Transfer to airport NOT included",
      },
    ],
  },
};

export const oneRoom = {
  ...data,
  hotel: {
    ...data.hotel,
    rooms: [
      {
        id: "1",
        description: "1x Deluxe Room with Free Daily Activities; 2x Adult, 1x Child; Half board",
      },
    ],
  },
};
