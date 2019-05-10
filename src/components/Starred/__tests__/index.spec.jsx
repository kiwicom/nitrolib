// @flow strict
import * as React from "react";
import { mount } from "enzyme";

import { Provider } from "../../../services/starred/context";
import type { StarredItem } from "../../../records/Starred";

import Starred from "..";

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
    itinerary: {
      id: "itinerary1",
      price: {
        amount: "1337",
        currencyId: "EUR",
      },
      provider: {
        id: "pelmeni",
        name: "kvas",
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
      sector: {
        id: "sector1",
        segments: [
          {
            id: "segment1",
            source: {
              station: {
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
              time: new Date(),
            },
            destination: {
              station: {
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
            carrier: {
              id: "kek",
              name: "Kekistan",
              code: "KEK",
            },
            operatingCarrier: {
              id: "kek",
              name: "Kekistan",
              code: "KEK",
            },
            seatInfo: {
              pitch: 13,
              width: 37,
              recline: 420,
              hasPower: true,
              hasAudioVideo: false,
            },
            hasWifi: true,
          },
        ],
        duration: 420,
        stopover: {
          nightsCount: 0,
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
      },
      type: "oneWay",
    },
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
