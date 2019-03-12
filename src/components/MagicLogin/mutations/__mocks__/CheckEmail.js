// @noflow

const CheckEmail = jest.fn(email => {
  if (email === "error@example.com") {
    return Promise.reject(new Error("Network issue"));
  }

  const result = {
    hasKiwiAccount: false,
    hasFacebook: false,
    hasGoogle: false,
    hasBooking: false,
  };

  if (["withBooking@example.com", "withBookingError@example.com"].includes(email)) {
    return Promise.resolve({
      checkEmail: {
        result: { ...result, hasBooking: true },
      },
    });
  }

  if (email === "withFacebook@example.com") {
    return Promise.resolve({
      checkEmail: {
        result: { ...result, hasFacebook: true, hasKiwiAccount: true, hasBooking: true },
      },
    });
  }

  return Promise.resolve({
    checkEmail: {
      result,
    },
  });
});

export default CheckEmail;
