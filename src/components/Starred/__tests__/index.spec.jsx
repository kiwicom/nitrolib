// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import { Provider } from "../../../services/starred/context";
import type { StarredItem } from "../../../records/Starred";

import Starred from "..";

import itineraryOneWay from "../../../records/__mocks__/Itinerary/ItineraryOneWay";

const starredList: StarredItem[] = [
  {
    id: "kek",
    form: {
      origin: "bur",
      destination: "Mordor",
      outboundDate: "13-10-2018",
      inboundDate: "12-10-2018",
      multicity: "cheburek",
      filters: null,
      salesman: "pelmeni",
      passengers: {
        adults: 1,
        infants: 0,
        children: 0,
      },
      cabinClass: "first",
      lang: "en",
      places: [
        {
          id: "vienna_au",
          slug: "vienna_au",
        },
        {
          id: "vienna_au",
          slug: "vienna_au",
        },
      ],
      returnUrl: "url",
      starType: "star",
    },
    lastPrice: 123,
    itinerary: itineraryOneWay,
    priceUpdatedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const context = {
  list: starredList,
  lang: "en",
  isMobile: false,
  onAdd: () => {},
  onGoToStarred: () => {},
  onClear: () => {},
  onRemove: () => {},
  onSetNotice: () => {},
  renderShareDialog: () => null,
  makeShareUrl: () => " ",
};

describe("#Starred", () => {
  test("badge should have 1 trip", () => {
    const wrapper = mount(
      <Provider value={context}>
        <Starred positionMenuDesktop={0} positionMenuTablet={120} inverted={false} />
      </Provider>,
    );

    expect(wrapper.find("Starred__StarredBadge").text()).toEqual("1");
  });

  test("should render/open component with itineraries", () => {
    const wrapper = mount(
      <Provider value={context}>
        <Starred positionMenuDesktop={0} positionMenuTablet={120} inverted={false} />
      </Provider>,
    );

    expect(wrapper.find("TripContainer").exists()).toBe(false);
    wrapper
      .find("Button")
      .first()
      .simulate("click");
    wrapper.update();
    expect(wrapper.find("TripContainer").exists()).toBe(true);
  });
});
