// // @flow strict
import userName from "../userType";

const authConsumerUser = {
  user: {
    id: "ujy9jXLZufUW7g7sbFbdhq",
    email: "ellie@kiwi.com",
    verified: true,
    firstname: "Ellie",
    lastname: "Palo",
    affiliateId: "lanthi",
    balanceDiscount: 0,
    cardDiscount: 0,
    balances: [],
  },
  type: "user",
  token:
    "WyJ1ank5alhMWnVmVVc3ZzdzYkZiZGhxIiwiOGQyYzl1VmMwSXNUeEoubzlrVDBnLjNNRC9yRzd0QUFlZ0RSek9ITFovaGZzcWgwY3lrSXEiLDM2ODM1NDIzNTZd.vC2X8p4uTjL3fWZTs1HvUXPyE6E",
};

const authConsumerEmail = {
  type: "magic",
  email: "ellie@kiwi.com",
  token:
    "WyJ1ank5alhMWnVmVVc3ZzdzYkZiZGhxIiwiOGQyYzl1VmMwSXNUeEoubzlrVDBnLjNNRC9yRzd0QUFlZ0RSek9ITFovaGZzcWgwY3lrSXEiLDM2ODM1NDIzNTZd.vC2X8p4uTjL3fWZTs1HvUXPyE6E",
};

const authConsumerToken = {
  type: "token",
  bid: 123131,
  token:
    "WyJ1ank5alhMWnVmVVc3ZzdzYkZiZGhxIiwiOGQyYzl1VmMwSXNUeEoubzlrVDBnLjNNRC9yRzd0QUFlZ0RSek9ITFovaGZzcWgwY3lrSXEiLDM2ODM1NDIzNTZd.vC2X8p4uTjL3fWZTs1HvUXPyE6E",
};

describe("Name of the group", () => {
  it("should return user's firstName and lastName", () => {
    expect(userName(authConsumerUser)).toBe("Ellie Palo");
  });

  it("should return email", () => {
    expect(userName(authConsumerEmail)).toBe("ellie@kiwi.com");
  });

  it("should return bid", () => {
    expect(userName(authConsumerToken)).toBe("");
  });
});
