// @flow strict
import * as React from "react";
import { mount } from "enzyme";
import format from "date-fns/format";

import Time from "..";

const mock = (fn: any) => fn;

jest.mock("date-fns/format"); // I don't like this, but better than dates

describe("#Time", () => {
  test("format", () => {
    mock(format).mockImplementation(() => "11:30");
    const wrapper = mount(<Time time={new Date()} />);

    expect(wrapper.contains("11:30")).toBe(true);
  });
});
