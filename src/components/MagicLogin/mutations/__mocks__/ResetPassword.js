// @noflow

const ResetPassword = jest.fn(() =>
  Promise.resolve({
    resetPassword: {
      success: true,
    },
  }),
);

export default ResetPassword;
