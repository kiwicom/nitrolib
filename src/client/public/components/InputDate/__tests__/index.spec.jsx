// @flow strict
import * as React from "react";
import { shallow } from "enzyme";
import addYears from "date-fns/addYears";
import setDate from "date-fns/setDate";
import setMonth from "date-fns/setMonth";
import setYear from "date-fns/setYear";

import InputDate from "../index";

const NOW = new Date(Date.UTC(2018, 1, 1));

describe("#InputDate", () => {
  test("render regular", () => {
    const wrapper = shallow(
      <InputDate
        id="test"
        value={NOW}
        onChange={jest.fn()}
        min={addYears(NOW, -1)}
        max={addYears(NOW, 2)}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("render mmddyyyy", () => {
    const wrapper = shallow(
      <InputDate
        id="test"
        value={NOW}
        onChange={jest.fn()}
        min={addYears(NOW, -1)}
        max={addYears(NOW, 2)}
        mmddyyyy
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("handle change date", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <InputDate
        id="test"
        value={NOW}
        onChange={onChange}
        min={addYears(NOW, -1)}
        max={addYears(NOW, 2)}
      />,
    );

    wrapper.instance().handleChangeDate({ target: { value: "10" } });

    expect(onChange).toBeCalledWith(setDate(NOW, 10));
  });

  test("handle change month", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <InputDate
        id="test"
        value={NOW}
        onChange={onChange}
        min={addYears(NOW, -1)}
        max={addYears(NOW, 2)}
      />,
    );

    wrapper.instance().handleChangeMonth({ target: { value: "10" } });

    expect(onChange).toBeCalledWith(setMonth(NOW, 10));
  });

  test("handle change year", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <InputDate
        id="test"
        value={NOW}
        onChange={onChange}
        min={addYears(NOW, -1)}
        max={addYears(NOW, 2)}
      />,
    );

    wrapper.instance().handleChangeYear({ target: { value: "2020" } });

    expect(onChange).toBeCalledWith(setYear(NOW, 2020));
  });
});
