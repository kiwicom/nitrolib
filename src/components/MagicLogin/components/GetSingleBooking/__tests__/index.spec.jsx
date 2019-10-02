// @flow
/* eslint-env node */

import * as React from "react";
import { mount } from "enzyme";
import { RelayEnvironmentProvider } from "@kiwicom/relay";
import { createMockEnvironment } from "relay-test-utils";

import GetSingleBookingScreen from "../../screens/GetSingleBooking";
import createSimpleToken from "../../../mutations/createSimpleToken";
import { SIMPLE_TOKEN_RETRIEVED } from "../../../consts/events";

import GetSingleBooking, { GetSingleBookingWithoutContext } from "..";

jest.mock("../../../mutations/createSimpleToken");

const defaultProps = {
  onBack: jest.fn(),
  onClose: jest.fn(),
  onGetSimpleToken: jest.fn(),
};

const GetSingleBookingComponent = () => {
  return (
    <RelayEnvironmentProvider environment={createMockEnvironment()}>
      <GetSingleBooking {...defaultProps} />
    </RelayEnvironmentProvider>
  );
};

describe("#GetSingleBooking", () => {
  it("handles email changes before submit", () => {
    const wrapper = mount(<GetSingleBookingComponent />);

    wrapper
      .find(`input[data-test="MagicLogin-Email"]`)
      .simulate("change", { target: { value: "noemail" } });
    expect(wrapper.find(GetSingleBookingScreen).prop("emailError")).toBe("");
  });

  it("handles iata changes after submit", () => {
    const wrapper = mount(<GetSingleBookingComponent />);

    wrapper.find("form").simulate("submit");
    wrapper.find(`input#MagicLogin-IATA`).simulate("change", { target: { value: "no" } });

    expect(wrapper.find(GetSingleBookingScreen).prop("IATAError")).toBe("forms.enter_iata_code");
    expect(defaultProps.onGetSimpleToken).not.toHaveBeenCalled();
  });

  it("handles successful retrieval of simple token", done => {
    const wrapper = mount(
      <GetSingleBookingWithoutContext
        {...defaultProps}
        environment={createMockEnvironment()}
        log={jest.fn()}
      />,
    );

    wrapper.setState({
      email: "nobooking@example.com",
      IATA: "TLL",
      bookingId: "123456",
      departureDate: new Date(),
    });
    wrapper.find("form").simulate("submit");

    setImmediate(() => {
      expect(createSimpleToken).toHaveBeenCalled();
      expect(wrapper.state("error")).toBe("account.my_booking_login_incorrect");
      done();
    });
  });

  it("handles error when booking is not found", done => {
    const log = jest.fn();
    const wrapper = mount(
      <GetSingleBookingWithoutContext
        {...defaultProps}
        environment={createMockEnvironment()}
        log={log}
      />,
    );

    wrapper.setState({
      email: "joe.doe@example.com",
      IATA: "TLL",
      bookingId: "123456",
      departureDate: new Date(),
    });
    wrapper.find("form").simulate("submit");

    setImmediate(() => {
      expect(createSimpleToken).toHaveBeenCalled();
      expect(defaultProps.onClose).toHaveBeenCalled();
      expect(log).toHaveBeenCalledWith(SIMPLE_TOKEN_RETRIEVED, {});
      done();
    });
  });
});
