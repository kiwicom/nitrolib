// @flow strict
import * as fns from "../Itinerary";

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
      isKiwiComGuarantee: true,
      isStationChange: false,
      isBaggageRecheck: false,
    },
    carrier: carriers[0],
    operatingCarrier: carriers[0],
    seatInfo: {
      pitch: 13,
      width: 37,
      recline: 420,
      hasPower: true,
      hasAudioVideo: false,
    },
    hasWifi: true,
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
    amount: "1337",
    currencyId: "EUR",
  },
  provider: {
    id: "lol",
    name: "kek",
    code: "bur",
  },
  hasNoCheckedBags: false,
};

const itineraryDeepOneWay = {
  ...itineraryCommon,
  type: "oneWay",
  sector: sectors[0],
};

const itineraryDeepReturn = {
  ...itineraryCommon,
  type: "return",
  outbound: sectors[0],
  inbound: sectors[1],
};

const itineraryDeepMulticity = {
  ...itineraryCommon,
  type: "multicity",
  sectors,
};

const itineraryDeepNomad = {
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
