// @flow strict
import { getSector, getSectors } from "../Sector";
import { flatten } from "../Itinerary";
import input from "../__mocks__/Itinerary/ItineraryMulticity";

const singleSector = {
  carriers: ["DP", "UX"],
  duration: 240,
  id: "sector2",
  segments: ["segment3"],
  stopover: {
    arrival: {
      city: { code: "VIE", id: "vienna", name: "Vienna", slug: "vienna" },
      code: "stationizer",
      country: { code: "AU", id: "austria", name: "Austria", slug: "austria" },
      id: "station1",
      name: "The Station",
      type: "AIRPORT",
    },
    departure: {
      city: { code: "VIE", id: "vienna", name: "Vienna", slug: "vienna" },
      code: "stationizer",
      country: { code: "AU", id: "austria", name: "Austria", slug: "austria" },
      id: "station1",
      name: "The Station",
      type: "AIRPORT",
    },
    nightsCount: 1,
  },
};

const allSectors = [
  {
    carriers: ["DP", "W6"],
    duration: 240,
    id: "sector1",
    segments: ["segment1", "segment2"],
    stopover: {
      arrival: {
        city: { code: "VIE", id: "vienna", name: "Vienna", slug: "vienna" },
        code: "stationizer",
        country: { code: "AU", id: "austria", name: "Austria", slug: "austria" },
        id: "station1",
        name: "The Station",
        type: "AIRPORT",
      },
      departure: {
        city: { code: "VIE", id: "vienna", name: "Vienna", slug: "vienna" },
        code: "stationizer",
        country: { code: "AU", id: "austria", name: "Austria", slug: "austria" },
        id: "station1",
        name: "The Station",
        type: "AIRPORT",
      },
      nightsCount: 1,
    },
  },
  {
    carriers: ["DP", "UX"],
    duration: 240,
    id: "sector2",
    segments: ["segment3"],
    stopover: {
      arrival: {
        city: { code: "VIE", id: "vienna", name: "Vienna", slug: "vienna" },
        code: "stationizer",
        country: { code: "AU", id: "austria", name: "Austria", slug: "austria" },
        id: "station1",
        name: "The Station",
        type: "AIRPORT",
      },
      departure: {
        city: { code: "VIE", id: "vienna", name: "Vienna", slug: "vienna" },
        code: "stationizer",
        country: { code: "AU", id: "austria", name: "Austria", slug: "austria" },
        id: "station1",
        name: "The Station",
        type: "AIRPORT",
      },
      nightsCount: 1,
    },
  },
];

describe("#Sector", () => {
  it("should return single sector by id", () => {
    // $FlowExpected: TODO
    expect(getSector(flatten(input), "sector2")).toEqual(singleSector);
  });

  it("should return all sectors", () => {
    // $FlowExpected: TODO
    expect(getSectors(flatten(input))).toEqual(allSectors);
  });
});
