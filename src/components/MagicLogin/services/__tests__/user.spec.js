// @flow

import toUser from "../toUser";

const bookingIdentity = {
  discounts: {
    card: 0,
    credits: 0,
  },
  affiliateId: "lanthi",
  searchApiToken: "b8a5902abe78bc773e7e1abcd65a00b91923451111",
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
        balanceDiscount: 0,
        balances: [],
        cardDiscount: 0,
      },
    });
  });
});
