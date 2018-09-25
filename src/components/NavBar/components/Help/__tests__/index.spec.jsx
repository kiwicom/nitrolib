// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Help from "../index";

describe("#Help", () => {
  test("render", () => {
    const wrapper = shallow(<Help onOpen={jest.fn()} onLog={jest.fn()} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("toggle", () => {
    const onOpen = jest.fn();
    const onLog = jest.fn();
    const wrapper = shallow(<Help onOpen={onOpen} onLog={onLog} />);

    wrapper.instance().handleOpen();

    expect(onOpen).toBeCalled();
    expect(onLog).toBeCalledWith({ event: "openFAQ", data: null });
  });
});
