// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Menu from "../Menu";

const available = {
  dkk: {
    id: "dkk",
    name: "Danish Krone",
    format: "__price__ kr",
    uncertainFormat: true,
    round: "0",
    enabledOnAffilId: "",
    fallback: "",
    rate: 0.13434,
  },
  gbp: {
    id: "gbp",
    name: "British Pound Sterling",
    format: "£__price__",
    uncertainFormat: false,
    round: "2",
    enabledOnAffilId: "",
    fallback: "",
    rate: 1.14355,
  },
};

const current = {
  id: "gbp",
  name: "British Pound Sterling",
  format: "£__price__",
  uncertainFormat: false,
  round: "2",
  enabledOnAffilId: "",
  fallback: "",
  rate: 1.14355,
};

const geoIP = {
  geoIP: {
    coordinates: {
      lng: 20,
      lat: 30,
    },
    isoCountryCode: "GB",
  },
};

describe("#Currency/Menu", () => {
  test("render", () => {
    const wrapper = shallow(
      <Menu
        available={available}
        current={current}
        geoIP={geoIP}
        setCurrency={jest.fn()}
        hide={jest.fn()}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("setCurrency", () => {
    const setCurrency = jest.fn();
    const hide = jest.fn();

    const wrapper = shallow(
      <Menu
        available={available}
        current={current}
        geoIP={geoIP}
        setCurrency={setCurrency}
        hide={hide}
      />,
    );

    wrapper.instance().setCurrency("czk");

    expect(setCurrency).toBeCalledWith("czk");
    expect(hide).toBeCalled();
  });
});
