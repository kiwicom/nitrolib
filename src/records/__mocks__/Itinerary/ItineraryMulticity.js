// @flow strict
import type { ItineraryMulticityDeep } from "../../Itinerary";

const itineraryMulticity: ItineraryMulticityDeep = {
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
  type: "multicity",
  duration: 137,
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
  sectors: [
    {
      id: "sector1",
      segments: [
        {
          id: "segment1",
          source: {
            station: {
              id: "station1",
              name: "Moscow",
              code: "VKO",
              city: {
                id: "moscow",
                name: "Moscow",
                code: "MSC",
                slug: "moscow",
              },
              country: {
                id: "ru",
                name: "Russia",
                code: "RU",
                slug: "russia",
              },
              type: "AIRPORT",
            },
            time: new Date("2019-03-17T03:24:00.000Z"),
          },
          destination: {
            station: {
              id: "station2",
              name: "Prague",
              code: "PRG",
              city: {
                id: "prague",
                name: "Prague",
                code: "prague",
                slug: "prague",
              },
              country: {
                id: "cz",
                name: "Czech Republic",
                code: "cz",
                slug: "czech-republic",
              },
              type: "AIRPORT",
            },
            time: new Date("2019-03-17T05:30:00.000Z"),
          },
          type: "FLIGHT",
          duration: 126,
          code: "1",
          layover: {
            duration: 30,
            guarantee: "KIWI_COM",
            isStationChange: true,
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
              code: "PRGG",
              city: {
                id: "prague",
                name: "Prague",
                code: "prague",
                slug: "prague",
              },
              country: {
                id: "cz",
                name: "Czech Republic",
                code: "cz",
                slug: "czech-republic",
              },
              type: "AIRPORT",
            },
            time: new Date("2019-03-18T04:25:00.000Z"),
          },
          destination: {
            station: {
              id: "station2",
              name: "London",
              code: "LTN",
              city: {
                id: "London",
                name: "London",
                code: "L",
                slug: "london",
              },
              country: {
                id: "uk",
                name: "United Kingdom",
                code: "uk",
                slug: "united-kingdom",
              },
              type: "AIRPORT",
            },
            time: new Date("2019-03-18T06:30:00.000Z"),
          },
          type: "FLIGHT",
          duration: 125,
          code: "1",
          layover: {
            duration: 30,
            guarantee: "KIWI_COM",
            isStationChange: true,
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
    {
      id: "sector2",
      segments: [
        {
          id: "segment3",
          source: {
            station: {
              id: "station1",
              name: "Frankfurt",
              code: "FRA",
              city: {
                id: "frankfurt",
                name: "Frankfurt",
                code: "frankfurt",
                slug: "frankfurt",
              },
              country: {
                id: "de",
                name: "Germany",
                code: "de",
                slug: "germany",
              },
              type: "AIRPORT",
            },
            time: new Date("2019-03-25T16:24:00.000Z"),
          },
          destination: {
            station: {
              id: "station2",
              name: "Madrid",
              code: "MAD",
              city: {
                id: "madrid",
                name: "Madrid",
                code: "madrid",
                slug: "madrid",
              },
              country: {
                id: "es",
                name: "Spain",
                code: "es",
                slug: "spain",
              },
              type: "AIRPORT",
            },
            time: new Date("2019-03-25T18:30:00.000Z"),
          },
          type: "FLIGHT",
          duration: 126,
          code: "1",
          layover: {
            duration: 30,
            guarantee: "KIWI_COM",
            isStationChange: false,
            isBaggageRecheck: false,
          },
          carrier: {
            id: "UX",
            name: "Air Europa",
            code: "UX",
          },
          operatingCarrier: {
            id: "UX",
            name: "Air Europa",
            code: "UX",
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
          id: "UX",
          name: "Air Europa",
          code: "UX",
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
  ],
};

export default itineraryMulticity;
