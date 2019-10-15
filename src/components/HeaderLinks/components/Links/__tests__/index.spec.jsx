// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import { response } from "../../../__mocks__/api";

import Links from "..";

describe("Links", () => {
  test("Links component should render correctly", () => {
    const wrapper = shallow(<Links active="travel" inverted={false} services={response.items} />);

    expect(wrapper.find("Link").exists()).toBe(true);
  });

  test("click", () => {
    const onClick = jest.fn();

    const wrapper = shallow(
      <Links active="travel" inverted={false} services={response.items} onClick={onClick} />,
    );

    const passedProp = wrapper
      .find("Link")
      .first()
      .prop("onClick");

    passedProp();

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(response.items[0]);
  });
});
