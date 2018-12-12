// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

// Mocks
import { props, response } from "../__mocks__";

// Components
import HeaderLinks from "..";

import Link from "../components/Link";
import Links from "../components/Links";

describe("HeaderLinks", () => {
  test("should render correctly", () => {
    const wrapper = shallow(<HeaderLinks {...props} testResponse={response} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("Links component should render correctly", () => {
    const wrapper = shallow(<Links services={response} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("Link component should render correctly", () => {
    const wrapper = shallow(
      <Link logTab="travel" link="https://www.kiwi.com" text="Travel" icon="travel" newWindow />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
