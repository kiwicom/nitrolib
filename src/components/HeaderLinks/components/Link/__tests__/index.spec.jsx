// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import Link from "..";

describe("Link", () => {
  test("Link component should render correctly", () => {
    const wrapper = shallow(
      <Link link="https://www.kiwi.com" text="Travel" icon="travel" active={false} newWindow />,
    );

    expect(wrapper.find("StyledLink").exists()).toBe(true);
  });

  test("click", () => {
    const onClick = jest.fn();

    const wrapper = shallow(
      <Link
        link="https://www.kiwi.com"
        text="Travel"
        icon="travel"
        active={false}
        newWindow
        onClick={onClick}
      />,
    );

    wrapper.find("StyledLink").simulate("click");

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
