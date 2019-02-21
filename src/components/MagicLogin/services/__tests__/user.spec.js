// @flow

import toUser from "../toUser";

describe("#toUser", () => {
  it("transforms GraphQL user to AuthUser", () => {
    const user = {
      token: "abc",
      identity: {
        id: "id123",
        email: "joe.doe@example.com",
        firstName: "Joe",
        lastName: "Doe",
        emailVerified: true,
      },
    };

    expect(toUser(user)).toEqual({
      token: "abc",
      type: "user",
      user: {
        email: "joe.doe@example.com",
        firstname: "Joe",
        id: "id123",
        lastname: "Doe",
        verified: true,
      },
    });
  });

  it("works even without identity", () => {
    const user = {
      token: null,
      identity: null,
    };

    expect(toUser(user)).toEqual({
      type: "user",
      token: "",
      user: {
        id: "",
        email: "",
        verified: false,
        firstname: "",
        lastname: "",
      },
    });
  });
});
