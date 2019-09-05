// @flow strict
import userMiddleWare from "../userId";
import isUUID from "../../utils/isUUID";

const userId = "6e7e7c6b-1e7f-4ebe-92d8-37c742afd15c";

const query = id => ({
  userId: id,
});

const req = {
  cookies: {
    SKYPICKER_VISITOR_UNIQID: userId,
  },
};

describe("#userId", () => {
  it("should return userId from cookies", () => {
    // $FlowExpected: just for test
    expect(userMiddleWare({ query: {}, req })).toBe(query(userId).userId);
  });

  it("should return userId from query", () => {
    // $FlowExpected: just for test
    expect(userMiddleWare({ query: query(userId), req })).toBe(query(userId).userId);
  });

  it("should generate new userId", () => {
    // $FlowExpected: just for test
    expect(isUUID(userMiddleWare({ query: query("kek"), req }))).toBe(true);
  });
});
