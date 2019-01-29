// @flow
import stopoverKeys from "../stopoverKeys";

const inputFirst = {
  departure: {
    city: {
      id: "vienna",
      name: "Vienna",
      code: "VIE",
      slug: "vienna",
    },
    code: "VIE",
    country: {
      id: "austria",
      name: "Austria",
      code: "AU",
      slug: "austria",
    },
    id: "kek",
    name: "bur",
    type: "AIRPORT",
  },
  arrival: {
    city: {
      id: "vienna",
      name: "Vienna",
      code: "XWC",
      slug: "vienna",
    },
    code: "XWC",
    country: {
      id: "austria",
      name: "Austria",
      code: "AU",
      slug: "austria",
    },
    id: "kek",
    name: "bur",
    type: "AIRPORT",
  },
  nightsCount: 2,
};

const inputSecond = {
  departure: {
    city: {
      id: "vienna",
      name: "Vienna",
      code: "VIE",
      slug: "vienna",
    },
    code: "VIE",
    country: {
      id: "austria",
      name: "Austria",
      code: "AU",
      slug: "austria",
    },
    id: "kek",
    name: "bur",
    type: "AIRPORT",
  },
  arrival: {
    city: {
      id: "vienna",
      name: "Vienna",
      code: "VIE",
      slug: "vienna",
    },
    code: "VIE",
    country: {
      id: "austria",
      name: "Austria",
      code: "AU",
      slug: "austria",
    },
    id: "kek",
    name: "bur",
    type: "AIRPORT",
  },
  nightsCount: 2,
};

const expectedFirst = {
  t: __("result.night_in_destination_and_change_to"),
  values: { changePlace: "XWC", place: "bur" },
};

const expectedSecond = { t: __("result.night_in_destination"), values: { place: "bur" } };

describe("#stopoverKeys", () => {
  it("should return stopoverKey if place changed", () => {
    expect(stopoverKeys(inputFirst)).toEqual(expectedFirst);
  });

  it("should return stopoverKey if places not changed", () => {
    expect(stopoverKeys(inputSecond)).toEqual(expectedSecond);
  });
});
