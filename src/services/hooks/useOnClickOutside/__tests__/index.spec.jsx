// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import useOnClickOutside from "..";

const Component = () => {
  const ref = React.useRef(null);

  const [isOpen, setOpen] = React.useState(false);

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <>
      {isOpen ? (
        <div ref={ref}>Click Outside</div>
      ) : (
        <button type="button" onClick={() => setOpen(true)}>
          Open Modal
        </button>
      )}
    </>
  );
};

describe("#useOnClickOutside", () => {
  test("component mount", () => {
    const wrapper = shallow(<Component />);

    expect(wrapper.text()).toBe("Open Modal");
  });

  test("isOpen", () => {
    const wrapper = shallow(<Component>kek</Component>);
    wrapper.find("button").simulate("click");

    expect(wrapper.text()).toBe("Click Outside");
  });
});
