// @flow strict
import * as React from "react";
import { shallow } from "enzyme";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";

import Button from "..";

describe("#Button", () => {
  test("string", () => {
    const wrapper = shallow(<Button onClick={jest.fn()} t="kek" type="secondary" />);

    expect(wrapper.find("Translate").prop("t")).toBe("kek");
  });

  test("html", () => {
    const wrapper = shallow(<Button onClick={jest.fn()} t="kek" html />);

    expect(wrapper.find("Translate").prop("t")).toBe("kek");
    expect(wrapper.find("Translate").prop("html")).toBe(true);
  });

  test("orbit props", () => {
    const wrapper = shallow(
      <Button onClick={jest.fn()} t="kek" type="secondary" iconLeft={<Airplane />} />,
    );

    expect(wrapper.prop("type")).toBe("secondary");
    expect(wrapper.prop("iconLeft")).toEqual(<Airplane />);
  });
});
