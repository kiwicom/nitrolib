import * as React from "react";
import { mount } from "enzyme";
import format from "date-fns/format";

import Time from "..";

jest.mock("date-fns/format"); // I don't like this, but better than dates

describe("#Time", () => {
  test("format", () => {
    // $FlowExpected: jest bug
    format.mockImplementation(() => "11:30");
    const wrapper = mount(<Time time={new Date()} />);

    expect(wrapper.contains("11:30")).toBe(true);
  });
});
