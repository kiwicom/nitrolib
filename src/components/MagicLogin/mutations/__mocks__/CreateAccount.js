// @noflow

const CreateAccount = jest.fn((brand, credentials) => {
  if (credentials.email === "error@example.com") {
    return Promise.resolve({
      createAccount: {
        success: false,
        error: "INVALID_EMAIL",
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
