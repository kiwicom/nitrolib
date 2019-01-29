// @flow
const itineraryOneWay = {
  id: "cheburek",
  price: {
    amount: "130",
    currency: {
      id: "eur",
      code: "EUR",
      name: "euro",
      format: {
        format: "__price__ €",
        precision: 2,
        isUncertain: false,
      },
      fallback: null,
      enabledOnAffilId: "",
      rate: "1",
    },
    formattedValue: "val",
  },
  provider: {
    id: "pelmeni",
    name: "kvas",
    code: "da Vinci",
    hasHighProbabilityOfPriceChange: false,
  },
  type: "oneWay",
  bagsInfo: {
    hasNoCheckedBags: false,
    checkedBag: {
      height: {
        value: "60",
        unit: "CM",
      },
      length: {
        value: "150",
        unit: "CM",
      },
      width: {
        value: "80",
        unit: "CM",
      },
      weight: {
        value: "20",
        unit: "KG",
      },
    },
    handBag: {
      height: {
        value: "30",
        unit: "CM",
      },
      length: {
        value: "60",
        unit: "CM",
      },
      width: {
        value: "40",
        unit: "CM",
      },
      weight: {
        value: "10",
        unit: "KG",
      },
    },
  },
  bookingOptions: {
    provider: {
      name: "kek",
      siteName: "bur",
    },
    price: {
      amount: "130",
      currency: {
        id: "eur",
        code: "EUR",
        name: "euro",
        format: {
          format: "__price__ €",
          precision: 2,
          isUncertain: false,
        },
        fallback: null,
        enabledOnAffilId: "",
        rate: "1",
      },
      formattedValue: "val",
    },
    token: "kek",
  },
  sector: {
    id: "sector1",
    segments: [
      {
        id: "segment1",
        source: {
          station: {
            id: "station1",
            name: "Moscow",
            code: "VKO",
            city: "Moscow",
            country: "Russia",
            type: "AIRPORT",
          },
          time: "2019-03-17T03:24:00.000Z",
        },
        destination: {
          station: {
            id: "station2",
            name: "Prague",
            code: "PRG",
            city: "Prague",
            country: "Czech Republic",
            type: "AIRPORT",
          },
          time: "2019-03-17T05:30:00.000Z",
        },
        type: "FLIGHT",
        code: "1",
        duration: 126,
        layover: {
          duration: 30,
          guarantee: "KIWI_COM",
          isStationChange: false,
          isBaggageRecheck: false,
        },
        carrier: {
          id: "DP",
          name: "Pobeda",
          code: "DP",
        },
        operatingCarrier: {
          id: "DP",
          name: "Pobeda",
          code: "DP",
        },
        seatInfo: {
          pitch: {
            value: "30",
            unit: "CM",
          },
          width: {
            value: "80",
            unit: "CM",
          },
          recline: {
            value: "7",
            unit: "CM",
          },
          hasPower: true,
          hasAudioVideo: false,
          hasWifi: true,
        },
      },
      {
        id: "segment2",
        source: {
          station: {
            id: "station2",
            name: "Prague",
            code: "PRG",
            city: "Prague",
            country: "Czech Republic",
            type: "AIRPORT",
          },
          time: "2019-03-18T04:25:00.000Z",
        },
        destination: {
          station: {
            id: "station2",
            name: "London",
            code: "LTN",
            city: "London",
            country: "United Kingdom",
            type: "AIRPORT",
          },
          time: "2019-03-18T06:30:00.000Z",
        },
        type: "FLIGHT",
        code: "1",
        duration: 125,
        layover: {
          duration: 30,
          guarantee: "KIWI_COM",
          isStationChange: false,
          isBaggageRecheck: false,
        },
        carrier: {
          id: "W6",
          name: "Wizzair",
          code: "W6",
        },
        operatingCarrier: {
          id: "W6",
          name: "Wizzair",
          code: "W6",
        },
        seatInfo: {
          pitch: {
            value: "30",
            unit: "CM",
          },
          width: {
            value: "80",
            unit: "CM",
          },
          recline: {
            value: "7",
            unit: "CM",
          },
          hasPower: true,
          hasAudioVideo: false,
          hasWifi: true,
        },
      },
    ],
    carriers: [
      {
        id: "DP",
        name: "Pobeda",
        code: "DP",
      },
      {
        id: "W6",
        name: "Wizzair",
        code: "W6",
      },
    ],
    duration: 240,
    stopover: {
      nightsCount: 1,
      arrival: {
        id: "station1",
        name: "The Station",
        code: "stationizer",
        city: {
          id: "vienna",
          name: "Vienna",
          code: "VIE",
          slug: "vienna",
        },
        country: {
          id: "austria",
          name: "Austria",
          code: "AU",
          slug: "austria",
        },
        type: "AIRPORT",
      },
      departure: {
        id: "station1",
        name: "The Station",
        code: "stationizer",
        city: {
          id: "vienna",
          name: "Vienna",
          code: "VIE",
          slug: "vienna",
        },
        country: {
          id: "austria",
          name: "Austria",
          code: "AU",
          slug: "austria",
        },
        type: "AIRPORT",
      },
    },
  },
};

export default itineraryOneWay;
