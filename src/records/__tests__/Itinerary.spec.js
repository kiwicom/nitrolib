// @flow strict
import * as fns from "../Itinerary";
import type {
  ItineraryReturnDeep,
  ItineraryOneWayDeep,
  ItineraryMulticityDeep,
  ItineraryNomadDeep,
} from "../Itinerary";

const station = {
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
};

const carriers = [
  {
    id: "kek",
    name: "Kekistan",
    code: "KEK",
  },
];

const segments = [
  {
    id: "segment1",
    source: {
      station,
      time: new Date(),
    },
    destination: {
      station,
      time: new Date(),
    },
    duration: 1336,
    type: "FLIGHT",
    code: "segmentizer",
    layover: {
      duration: 1338,
      guarantee: "KIWI_COM",
      isStationChange: false,
      isBaggageRecheck: false,
    },
    carrier: carriers[0],
    operatingCarrier: carriers[0],
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
];

const sectors = [
  {
    id: "sector1",
    segments,
    carriers,
    duration: 420,
    stopover: {
      nightsCount: 0,
      arrival: station,
      departure: station,
    },
  },
  {
    id: "sector2",
    segments,
    carriers,
    duration: 69,
    stopover: {
      nightsCount: 1,
      arrival: station,
      departure: station,
    },
  },
];

const itineraryCommon = {
  id: "itinerary1",
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
  duration: 120,
  provider: {
    id: "kek",
    name: "bur",
    code: "da Vinci",
    hasHighProbabilityOfPriceChange: false,
  },
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
};

const itineraryDeepOneWay: ItineraryOneWayDeep = {
  ...itineraryCommon,
  type: "oneWay",
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
  sector: sectors[0],
};

const itineraryDeepReturn: ItineraryReturnDeep = {
  ...itineraryCommon,
  type: "return",
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
  outbound: sectors[0],
  inbound: sectors[1],
};

const itineraryDeepMulticity: ItineraryMulticityDeep = {
  ...itineraryCommon,
  type: "multicity",
  sectors,
};

const itineraryDeepNomad: ItineraryNomadDeep = {
  ...itineraryCommon,
  type: "nomad",
  sectors,
};

describe("#Itinerary", () => {
  test("flatten one way", () => {
    const res = fns.flatten(itineraryDeepOneWay);

    expect(res.result.type).toBe("oneWay");
    // $FlowExpected: Result is oneWay
    expect(res.result.sector).toBe("sector1");
    expect(res.entities.carrier.kek).toBeDefined();
    expect(res.entities.segment.segment1).toBeDefined();
    expect(res.entities.sector.sector1).toBeDefined();
    expect(res.entities.sector.sector2).toBeUndefined();
  });

  test("flatten return", () => {
    const res = fns.flatten(itineraryDeepReturn);

    expect(res.result.type).toBe("return");
    // $FlowExpected: Result is return
    expect(res.result.outbound).toBe("sector1");
    // $FlowExpected: Result is return
    expect(res.result.inbound).toBe("sector2");
    expect(res.entities.carrier.kek).toBeDefined();
    expect(res.entities.segment.segment1).toBeDefined();
    expect(res.entities.sector.sector1).toBeDefined();
    expect(res.entities.sector.sector2).toBeDefined();
  });

  test("flatten multicity", () => {
    const res = fns.flatten(itineraryDeepMulticity);

    expect(res.result.type).toBe("multicity");
    // $FlowExpected: Result is return
    expect(res.result.sectors[0]).toBe("sector1");
    // $FlowExpected: Result is return
    expect(res.result.sectors[1]).toBe("sector2");
    expect(res.entities.carrier.kek).toBeDefined();
    expect(res.entities.segment.segment1).toBeDefined();
    expect(res.entities.sector.sector1).toBeDefined();
    expect(res.entities.sector.sector2).toBeDefined();
  });

  test("flatten nomad", () => {
    const res = fns.flatten(itineraryDeepNomad);

    expect(res.result.type).toBe("nomad");
    // $FlowExpected: Result is return
    expect(res.result.sectors[0]).toBe("sector1");
    // $FlowExpected: Result is return
    expect(res.result.sectors[1]).toBe("sector2");
    expect(res.entities.carrier.kek).toBeDefined();
    expect(res.entities.segment.segment1).toBeDefined();
    expect(res.entities.sector.sector1).toBeDefined();
    expect(res.entities.sector.sector2).toBeDefined();
  });
});
