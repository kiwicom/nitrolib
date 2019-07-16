// @flow strict
import * as React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import useKey from "..";

const Component = () => {
  const Enter = useKey("Enter");

  return <>{Enter && <div>bur</div>}</>;
};

describe("#useOnClickOutside", () => {
  test("Enter key", () => {
    const map = {};

    window.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const wrapper = mount(<Component />);

    act(() => {
      map.keydown({ key: "Enter" });
    });

    wrapper.update();

    expect(wrapper.text()).toBe("bur");
  });
});
