// @flow strict
import * as React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import useEventListener from "..";

const App = () => {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });

  const handler = React.useCallback(
    ({ clientX, clientY }) => {
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords],
  );

  useEventListener("mousemove", handler);

  return (
    <div>
      {coords.x}, {coords.y}
    </div>
  );
};

describe("#useEventListener", () => {
  test("render", () => {
    const wrapper = mount(<App />);

    expect(wrapper.find("div").text()).toBe("0, 0");
  });

  test("mousemove", () => {
    const map = {};

    window.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const wrapper = mount(<App />);

    act(() => {
      map.mousemove({ clientX: 100, clientY: 150 });
    });

    expect(wrapper.find("div").text()).toBe("100, 150");
  });
});
