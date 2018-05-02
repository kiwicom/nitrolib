// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import ClientOnly from "../";

describe("#ClientOnly", () => {
  test("mount", () => {
    const wrapper = shallow(
      <ClientOnly>
        <div>kek</div>
      </ClientOnly>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("no mount", () => {
    const wrapper = shallow(
      <ClientOnly>
        <div>kek</div>
      </ClientOnly>,
    );

    wrapper.setState({ mounted: false });
    expect(wrapper).toMatchSnapshot();
  });

  test("no mount loader", () => {
    const wrapper = shallow(
      <ClientOnly loader={<h2>loading...</h2>}>
        <div>kek</div>
      </ClientOnly>,
    );

    wrapper.setState({ mounted: false });
    expect(wrapper).toMatchSnapshot();
  });
});
