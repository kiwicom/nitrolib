// @noflow

const sendMagicLink = jest.fn((environment, email) => {
  if (email === "withBookingError@example.com") {
    return Promise.reject(Error("Some wild error."));
  }

  return Promise.resolve({
    sendMagicLink: {
      success: true,
    },
  });
});

export default sendMagicLink;
