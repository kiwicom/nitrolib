// @noflow

const createSimpleToken = jest.fn((environment, variables) => {
  if (variables.input.email === "nobooking@example.com") {
    return Promise.resolve({
      createSimpleToken: {
        code: "NOT_FOUND",
      },
    });
  }

  return Promise.resolve({
    createSimpleToken: {
      token: "abcd-1234-aaaa-1111",
    },
  });
});

export default createSimpleToken;
