// @flow

import toUser from "../toUser";

const bookingIdentity = {
  discounts: {
    card: 0,
    credits: 0,
  },
  affiliateId: "lanthi",
  searchApiToken: "abc123",
  balances: [
    {
      amount: "1",
      currencyId: "eur",
    },
  ],
};

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
      bookingIdentity,
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
        affiliateId: "lanthi",
        apiToken: "abc123",
        balanceDiscount: 0,
        cardDiscount: 0,
        balances: [
          {
            amount: 1,
            currency: "eur",
          },
        ],
      },
    });
  });

  it("works even without identity", () => {
    const user = {
      token: null,
      identity: null,
      bookingIdentity: null,
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
        affiliateId: "",
        apiToken: "",
        balanceDiscount: 0,
        balances: [],
        cardDiscount: 0,
      },
    });
  });
});
