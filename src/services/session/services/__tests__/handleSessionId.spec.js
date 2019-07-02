// @flow strict
import handleSessionId from "../handleSessionId";
import * as session from "../../session";
import { SESSION_ID } from "../../../../consts/session";

const mock = (fn: any) => fn;

jest.mock("../../session");
jest.mock("../../ids");

describe("#handleSessionId", () => {
  test("session", () => {
    mock(session.load).mockReturnValue("lol");

    const res = handleSessionId();

    expect(res).toBe("lol");
    expect(session.load).toBeCalledWith(SESSION_ID);
  });

  test("none", () => {
    mock(session.load).mockReturnValue(null);

    const res = handleSessionId();

    expect(res).toBe("sessionId");
    expect(session.save).toBeCalledWith(SESSION_ID, "sessionId");
  });
});
