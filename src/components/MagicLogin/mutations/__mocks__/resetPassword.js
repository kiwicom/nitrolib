// @noflow

const resetPassword = jest.fn(() =>
  Promise.resolve({
    resetPassword: {
      success: true,
    },
  }),
);

export default resetPassword;
