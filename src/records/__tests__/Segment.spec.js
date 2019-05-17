// @flow strict
import { getSegment, getSegments } from "../Segment";
import { flatten } from "../Itinerary";
import input from "../__mocks__/Itinerary/ItineraryMulticity";

const singleSegment = {
  carrier: "DP",
  code: "1",
  destination: {
    station: {
      city: { code: "prague", id: "prague", name: "Prague", slug: "prague" },
      code: "PRG",
      country: { code: "cz", id: "cz", name: "Czech Republic", slug: "czech-republic" },
      id: "station2",
      name: "Prague",
      type: "AIRPORT",
    },
    time: new Date("2019-03-17T05:30:00.000Z"),
  },
  duration: 126,
  id: "segment1",
  layover: { duration: 30, guarantee: "KIWI_COM", isBaggageRecheck: false, isStationChange: true },
  operatingCarrier: "DP",
  seatInfo: {
    hasAudioVideo: false,
    hasPower: true,
    hasWifi: true,
    pitch: { unit: "CM", value: "30" },
    recline: { unit: "CM", value: "7" },
    width: { unit: "CM", value: "80" },
  },
  source: {
    station: {
      city: { code: "MSC", id: "moscow", name: "Moscow", slug: "moscow" },
      code: "VKO",
      country: { code: "RU", id: "ru", name: "Russia", slug: "russia" },
      id: "station1",
      name: "Moscow",
      type: "AIRPORT",
    },
    time: new Date("2019-03-17T03:24:00.000Z"),
  },
  type: "FLIGHT",
};

const allSegments = [
  {
    carrier: "DP",
    code: "1",
    destination: {
      station: {
        city: { code: "prague", id: "prague", name: "Prague", slug: "prague" },
        code: "PRG",
        country: { code: "cz", id: "cz", name: "Czech Republic", slug: "czech-republic" },
        id: "station2",
        name: "Prague",
        type: "AIRPORT",
      },
      time: new Date("2019-03-17T05:30:00.000Z"),
    },
    duration: 126,
    id: "segment1",
    layover: {
      duration: 30,
      guarantee: "KIWI_COM",
      isBaggageRecheck: false,
      isStationChange: true,
    },
    operatingCarrier: "DP",
    seatInfo: {
      hasAudioVideo: false,
      hasPower: true,
      hasWifi: true,
      pitch: { unit: "CM", value: "30" },
      recline: { unit: "CM", value: "7" },
      width: { unit: "CM", value: "80" },
    },
    source: {
      station: {
        city: { code: "MSC", id: "moscow", name: "Moscow", slug: "moscow" },
        code: "VKO",
        country: { code: "RU", id: "ru", name: "Russia", slug: "russia" },
        id: "station1",
        name: "Moscow",
        type: "AIRPORT",
      },
      time: new Date("2019-03-17T03:24:00.000Z"),
    },
    type: "FLIGHT",
  },
  {
    carrier: "W6",
    code: "1",
    destination: {
      station: {
        city: { code: "L", id: "London", name: "London", slug: "london" },
        code: "LTN",
        country: { code: "uk", id: "uk", name: "United Kingdom", slug: "united-kingdom" },
        id: "station2",
        name: "London",
        type: "AIRPORT",
      },
      time: new Date("2019-03-18T06:30:00.000Z"),
    },
    duration: 125,
    id: "segment2",
    layover: {
      duration: 30,
      guarantee: "KIWI_COM",
      isBaggageRecheck: false,
      isStationChange: true,
    },
    operatingCarrier: "W6",
    seatInfo: {
      hasAudioVideo: false,
      hasPower: true,
      hasWifi: true,
      pitch: { unit: "CM", value: "30" },
      recline: { unit: "CM", value: "7" },
      width: { unit: "CM", value: "80" },
    },
    source: {
      station: {
        city: { code: "prague", id: "prague", name: "Prague", slug: "prague" },
        code: "PRGG",
        country: { code: "cz", id: "cz", name: "Czech Republic", slug: "czech-republic" },
        id: "station2",
        name: "Prague",
        type: "AIRPORT",
      },
      time: new Date("2019-03-18T04:25:00.000Z"),
    },
    type: "FLIGHT",
  },
];

describe("#getSegment/getSegments", () => {
  it("should return single segment by id", () => {
    expect(getSegment(flatten(input), "segment1")).toEqual(singleSegment);
  });

  it("should return all segments", () => {
    expect(getSegments(flatten(input), ["segment1", "segment2"])).toEqual(allSegments);
  });
});
