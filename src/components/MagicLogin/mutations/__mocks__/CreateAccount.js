// @noflow

const CreateAccount = jest.fn((brand, credentials) => {
  if (credentials.password.length < 8) {
    return Promise.resolve({
      createAccount: {
        success: false,
        error: "WEAK_PASSWORD",
      },
    });
  }

  return Promise.resolve({
    createAccount: {
      success: true,
      error: null,
    },
  });
});

export default CreateAccount;
