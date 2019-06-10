// @flow strict
import * as starred from "../Starred";
import starredMock from "../__mocks__/Starred";
import oneWayMock from "../__mocks__/Itinerary/ItineraryOneWay";
import returnMock from "../__mocks__/Itinerary/ItineraryReturn";
import { flatten } from "../Itinerary";

const passengers = {
  adults: 2,
  infants: 1,
  children: 1,
};

const passengersMulti = {
  adults: 2,
  infants: 1,
  children: 0,
};

const passengersNotMulti = {
  adults: 2,
  infants: 0,
  children: 0,
};

const itineraries = [{ ...flatten(oneWayMock) }, { ...flatten(returnMock) }];

describe("#getSum", () => {
  it("should sum all passengers", () => {
    expect(starred.getSum(passengers)).toEqual(4);
  });
});

describe("#isMulti", () => {
  it("should return true", () => {
    expect(starred.isMulti(passengersMulti)).toEqual(true);
  });

  it("should return false", () => {
    expect(starred.isMulti(passengersNotMulti)).toEqual(false);
  });
});

describe("#getTransKey", () => {
  it("should get proper translation key", () => {
    expect(starred.getTransKey(passengers)).toEqual("adults");
  });
});

describe("#isStarred", () => {
  it("should check if trip is starred", () => {
    expect(starred.isStarred(starredMock, itineraries)).toEqual(true);
  });
});
