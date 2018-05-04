// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import InfoModal from "../InfoModal";

describe("#CookiesConsent - InfoModal", () => {
  test("render", () => {
    const close = jest.fn();

    const wrapper = shallow(<InfoModal close={close} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("pass close", () => {
    const close = jest.fn();

    const wrapper = shallow(<InfoModal close={close} />);

    expect(wrapper.find("Modal").prop("onClose")).toBe(close);
  });
});
