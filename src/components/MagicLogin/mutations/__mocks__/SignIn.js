// @noflow

const SignIn = jest.fn(() =>
  Promise.resolve({
    signIn: {
      success: true,
      user: {
        token: "",
        identity: {
          id: "",
          email: "",
          firstName: "",
          lastName: "",
          emailVerified: false,
        },
      },
    },
  }),
);

export default SignIn;
