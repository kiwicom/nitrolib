import differentStations from "../differentStations";

const input = {
  segment1: {
    id: "segment1",
    source: {
      station: {
        id: "station1",
        name: "Moscow",
        code: "VKO",
        city: {
          id: "moscow",
          name: "Moscow",
          slug: "moscow",
          code: "VKO",
        },
        country: {
          id: "russia",
          name: "Russia",
          slug: "russia",
          code: "RU",
        },
        type: "AIRPORT",
      },
      time: new Date(),
    },
    destination: {
      station: {
        id: "station2",
        name: "Prague",
        code: "PRG",
        city: {
          id: "prague",
          name: "Prague",
          slug: "prague",
          code: "PRG",
        },
        country: {
          id: "czechia",
          slug: "czechia",
          name: "Czech Republic",
          code: "CZ",
        },
        type: "AIRPORT",
      },
      time: new Date(),
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
    carrier: "DP",
    operatingCarrier: "DP",
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
  segment2: {
    id: "segment2",
    source: {
      station: {
        id: "station2",
        name: "Prague",
        code: "PRGG",
        city: {
          id: "prague",
          name: "Prague",
          slug: "prague",
          code: "PRG",
        },
        country: {
          id: "czechia",
          slug: "czechia",
          name: "Czech Republic",
          code: "CZ",
        },
        type: "AIRPORT",
      },
      time: new Date(),
    },
    destination: {
      station: {
        id: "station2",
        name: "London",
        code: "LTN",
        city: {
          id: "london",
          name: "London",
          slug: "london",
          code: "LTN",
        },
        country: {
          id: "united-kingdom",
          slug: "united-kingdom",
          name: "United Kingdom",
          code: "UK",
        },
        type: "AIRPORT",
      },
      time: new Date(),
    },
    type: "FLIGHT",
    code: "1",
    duration: 125,
    layover: {
      duration: 30,
      guarantee: "KIWI_COM",
      isStationChange: true,
      isBaggageRecheck: false,
    },
    carrier: "W6",
    operatingCarrier: "W6",
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
};

describe("#differentStations", () => {
  it("should return all ids of segments with different stations", () => {
    expect(differentStations(input)).toEqual(["segment2"]);
  });
});
