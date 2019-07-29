import * as React from "react";
import { mount } from "enzyme";

import { SingleBookingTripUnWrapped as SingleBookingTrip } from "..";

const bookingReturn: any = {
  singleBooking: {
    __typename: "BookingReturn",
    id: "Qm9va2luZ1JldHVybjoyODU5NTI1OQ==",
    isPastBooking: false,
    destinationImageUrl: "https://images.kiwi.com/photos/600x600/london_gb.jpg",
  },
};

const oneWay: any = {
  singleBooking: {
    __typename: "BookingOneWay",
    id: "Qm9va2luZ1JldHVybjoyODU5NTI1OQ==",
    isPastBooking: false,
    destinationImageUrl: "https://images.kiwi.com/photos/600x600/london_gb.jpg",
  },
};

const multicity: any = {
  singleBooking: {
    __typename: "BookingMulticity",
    id: "Qm9va2luZ1JldHVybjoyODU5NTI1OQ==",
    isPastBooking: false,
    destinationImageUrl: "https://images.kiwi.com/photos/600x600/london_gb.jpg",
  },
};

describe("#SingleBookingTrip", () => {
  it("should return bookingReturn", () => {
    const wrapper = mount(<SingleBookingTrip trip={bookingReturn} onSelect={jest.fn()} />);
    expect(wrapper.find("SingleBookingTrip").prop("trip")).toEqual(bookingReturn);
  });

  it("should return bookingReturn", () => {
    const wrapper = mount(<SingleBookingTrip trip={oneWay} onSelect={jest.fn()} />);
    expect(wrapper.find("SingleBookingTrip").prop("trip")).toEqual(oneWay);
  });

  it("should return bookingReturn", () => {
    const wrapper = mount(<SingleBookingTrip trip={multicity} onSelect={jest.fn()} />);
    expect(wrapper.find("SingleBookingTrip").prop("trip")).toEqual(multicity);
  });
});
