// @flow strict
import * as React from "react";
import { shallow } from "enzyme";

import MyBooking from "../index";

const NOW = new Date(Date.UTC(2020, 0, 1));

describe("#MyBooking", () => {
  test("render", () => {
    const wrapper = shallow(
      <MyBooking loading={false} now={NOW} onMyBooking={jest.fn()} onCloseSuccess={jest.fn()} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("render error", () => {
    const wrapper = shallow(
      <MyBooking loading={false} now={NOW} onMyBooking={jest.fn()} onCloseSuccess={jest.fn()} />,
    );

    wrapper.setState({ error: "Error! :(" });

    expect(wrapper).toMatchSnapshot();
  });

  test("not handle non-existent field", () => {
    const wrapper = shallow(
      <MyBooking loading={false} now={NOW} onMyBooking={jest.fn()} onCloseSuccess={jest.fn()} />,
    );

    wrapper.instance().handleChange({ id: "asdf", value: "omfg" });

    expect(wrapper.state()).toMatchSnapshot();
  });

  test("handle change bid", () => {
    const wrapper = shallow(
      <MyBooking loading={false} onMyBooking={jest.fn()} onCloseSuccess={jest.fn()} />,
    );

    wrapper.instance().handleChange({ id: "bid", value: "1234" });

    expect(wrapper.state("fields").bid.value).toBe("1234");
  });

  test("handle normalize bid", () => {
    const wrapper = shallow(
      <MyBooking loading={false} onMyBooking={jest.fn()} onCloseSuccess={jest.fn()} />,
    );

    wrapper.instance().handleChange({ id: "bid", value: "1234" });

    expect(wrapper.state("fields").bid.value).toBe("1234");
  });

  test("handle change email", () => {
    const wrapper = shallow(
      <MyBooking loading={false} onMyBooking={jest.fn()} onCloseSuccess={jest.fn()} />,
    );

    wrapper.instance().handleChange({ id: "email", value: "lol@kek.bur" });

    expect(wrapper.state("fields").email.value).toBe("lol@kek.bur");
  });

  test("handle select iata", () => {
    const wrapper = shallow(
      <MyBooking loading={false} onMyBooking={jest.fn()} onCloseSuccess={jest.fn()} />,
    );

    wrapper.instance().handleSelectIata("VIE");

    expect(wrapper.state("fields").iata.value).toBe("VIE");
  });

  test("handle change departure", () => {
    const wrapper = shallow(
      <MyBooking loading={false} onMyBooking={jest.fn()} onCloseSuccess={jest.fn()} />,
    );

    const date = new Date(Date.UTC(2020, 0, 1));
    wrapper.instance().handleChangeDeparture(date);

    expect(wrapper.state("fields").departure.value).toBe(date);
  });

  test("handle submit", async () => {
    const onMyBooking = jest.fn().mockImplementation(() => Promise.resolve());
    const wrapper = shallow(
      <MyBooking loading={false} onMyBooking={onMyBooking} onCloseSuccess={jest.fn()} />,
    );

    const date = new Date(Date.UTC(2020, 0, 1));

    // Maybe should have isolated errors a lil more. This is simple, though
    wrapper.instance().handleChange({ id: "bid", value: "1234" });
    wrapper.instance().handleChange({ id: "email", value: "lol@kek.bur" });
    wrapper.instance().handleSelectIata("VIE");
    wrapper.instance().handleChangeDeparture(date);

    await wrapper.instance().handleSubmit();

    expect(wrapper.state("submitted")).toBe(true);
    expect(onMyBooking).toBeCalledWith({
      bid: "1234",
      email: "lol@kek.bur",
      iata: "VIE",
      departure: date,
    });
    expect(wrapper.state("error")).toBe("");
  });

  test("handle submit form error", async () => {
    const onMyBooking = jest.fn().mockImplementation(() => Promise.resolve());
    const wrapper = shallow(
      <MyBooking loading={false} onMyBooking={onMyBooking} onCloseSuccess={jest.fn()} />,
    );

    await wrapper.instance().handleSubmit();
    wrapper.update();

    expect(onMyBooking).not.toBeCalled();
    expect(wrapper.state("submitted")).toBe(true);
    expect(wrapper.state("error")).toBe("");
  });

  test("handle submit action error", async () => {
    const onMyBooking = jest.fn().mockImplementation(() => Promise.reject(new Error("common.api_error")));
    const wrapper = shallow(
      <MyBooking loading={false} onMyBooking={onMyBooking} onCloseSuccess={jest.fn()} />,
    );

    const date = new Date(Date.UTC(2020, 0, 1));

    // Maybe should have isolated errors a lil more. This is simple, though
    wrapper.instance().handleChange({ id: "bid", value: "1234" });
    wrapper.instance().handleChange({ id: "email", value: "lol@kek.bur" });
    wrapper.instance().handleSelectIata("VIE");
    wrapper.instance().handleChangeDeparture(date);

    await wrapper.instance().handleSubmit();

    expect(wrapper.state("error")).toBe("common.api_error");
    expect(wrapper).toMatchSnapshot();
  });
});
