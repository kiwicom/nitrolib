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

  test("check min on mount", () => {
    const min = addYears(NOW, -1);
    const onChange = jest.fn();
    shallow(
      <InputDate
        id="test"
        value={addYears(NOW, -2)}
        onChange={onChange}
        min={min}
        max={addYears(NOW, 2)}
      />,
    );

    expect(onChange).toBeCalledWith(min);
  });

  test("check max on mount", () => {
    const max = addYears(NOW, 2);
    const onChange = jest.fn();
    shallow(
      <InputDate
        id="test"
        value={addYears(NOW, 3)}
        onChange={onChange}
        min={addYears(NOW, -1)}
        max={max}
      />,
    );

    expect(onChange).toBeCalledWith(max);
  });

  test("check min on update", () => {
    const min = addYears(NOW, -1);
    const onChange = jest.fn();
    const wrapper = shallow(
      <InputDate id="test" value={NOW} onChange={onChange} min={min} max={addYears(NOW, 2)} />,
    );

    expect(onChange).not.toBeCalled();

    wrapper.setProps({ value: addYears(NOW, -2) });

    expect(onChange).toBeCalledWith(min);
  });

  test("check max on update", () => {
    const max = addYears(NOW, 2);
    const onChange = jest.fn();
    const wrapper = shallow(
      <InputDate id="test" value={NOW} onChange={onChange} min={addYears(NOW, -1)} max={max} />,
    );

    expect(onChange).not.toBeCalled();

    wrapper.setProps({ value: addYears(NOW, 3) });

    expect(onChange).toBeCalledWith(max);
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

    wrapper.find("#test-date").simulate("change", { target: { value: "10" } });

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

    wrapper.find("#test-month").simulate("change", { target: { value: "10" } });

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

    wrapper.find("#test-year").simulate("change", { target: { value: "2020" } });

    expect(onChange).toBeCalledWith(setYear(NOW, 2020));
  });
});
