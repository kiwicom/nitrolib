// @flow strict
import * as React from "react";
import { shallow } from "enzyme";
import addHours from "date-fns/addHours";

import DistanceInWords from "..";

import { intlDefault } from "../../../records/Intl";

describe("#DistanceInWords", () => {
  test("#formatDistance", () => {
    const time = addHours(Date.now(), 10);
    const wrapper = shallow(<DistanceInWords to={time} />);

    expect(wrapper.prop("children")(intlDefault)).toMatchSnapshot();
  });
});
