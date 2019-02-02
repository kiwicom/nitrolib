// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import HeaderLinks from "..";

// TODO test these separately
import Link from "../components/Link/index";
import Links from "../components/Links/index";
import { props, response } from "../__mocks__/api";

describe("HeaderLinks", () => {
  test("should render correctly", () => {
    // TODO replace this with a marble test
    const wrapper = shallow(<HeaderLinks {...props} testResponse={response} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("Links component should render correctly", () => {
    const wrapper = shallow(<Links active="travel" inverted={false} services={response.items} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("Link component should render correctly", () => {
    const wrapper = shallow(
      <Link link="https://www.kiwi.com" text="Travel" icon="travel" active={false} newWindow />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
