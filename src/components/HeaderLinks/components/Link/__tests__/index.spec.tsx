import * as React from "react";
import { shallow } from "enzyme";

import Link from "..";

describe("Links", () => {
  test("Links component should render correctly", () => {
    const wrapper = shallow(
      <Link link="https://www.kiwi.com" text="Travel" icon="travel" active={false} newWindow />,
    );

    expect(wrapper.find("StyledLink").exists()).toBe(true);
  });
});
