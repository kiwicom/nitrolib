// @flow strict
import { getSegment, getSegments } from "../Segment";
import { flatten } from "../Itinerary";
import input from "../__mocks__/Itinerary/ItineraryMulticity";

const singleSegment = {
  carrier: "DP",
  code: "1",
  destination: {
    station: {
      city: "Prague",
      code: "PRG",
      country: "Czech Republic",
      id: "station2",
      name: "Prague",
      type: "AIRPORT",
    },
    time: "2019-03-17T05:30:00.000Z",
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
      city: "Moscow",
      code: "VKO",
      country: "Russia",
      id: "station1",
      name: "Moscow",
      type: "AIRPORT",
    },
    time: "2019-03-17T03:24:00.000Z",
  },
  type: "FLIGHT",
};

const allSegments = [
  {
    carrier: "DP",
    code: "1",
    destination: {
      station: {
        city: "Prague",
        code: "PRG",
        country: "Czech Republic",
        id: "station2",
        name: "Prague",
        type: "AIRPORT",
      },
      time: "2019-03-17T05:30:00.000Z",
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
        city: "Moscow",
        code: "VKO",
        country: "Russia",
        id: "station1",
        name: "Moscow",
        type: "AIRPORT",
      },
      time: "2019-03-17T03:24:00.000Z",
    },
    type: "FLIGHT",
  },
  {
    carrier: "W6",
    code: "1",
    destination: {
      station: {
        city: "London",
        code: "LTN",
        country: "United Kingdom",
        id: "station2",
        name: "London",
        type: "AIRPORT",
      },
      time: "2019-03-18T06:30:00.000Z",
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
        city: "Prague",
        code: "PRGG",
        country: "Czech Republic",
        id: "station2",
        name: "Prague",
        type: "AIRPORT",
      },
      time: "2019-03-18T04:25:00.000Z",
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
