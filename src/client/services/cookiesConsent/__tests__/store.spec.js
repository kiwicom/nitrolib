// @flow strict
import jsCookiesMock from "js-cookie";

import * as COOKIES from "client/consts/cookies";
import * as SYSTEM from "client/consts/system";

import * as store from "../store";

const MOCK_COOKIE_CONSENT_KEY = "cookieConsentKeyMock";
const MOCK_COOKIE_CONSENT_VALUE = "cookieConsentValueMock";

describe("#store", () => {
  const ORIG_COOKIE_CONSENT_KEY = COOKIES.COOKIE_CONSENT_KEY;
  const ORIG_COOKIE_CONSENT_VALUE = COOKIES.COOKIE_CONSENT_VALUE;

  beforeAll(() => {
    // $FlowFixMe
    COOKIES.COOKIE_CONSENT_KEY = MOCK_COOKIE_CONSENT_KEY;
    // $FlowFixMe
    COOKIES.COOKIE_CONSENT_VALUE = MOCK_COOKIE_CONSENT_VALUE;
  });

  beforeEach(() => {
    jsCookiesMock.get.mockReset();
    jsCookiesMock.set.mockReset();
  });

  afterAll(() => {
    // $FlowFixMe
    COOKIES.COOKIE_CONSENT_KEY = ORIG_COOKIE_CONSENT_KEY;
    // $FlowFixMe
    COOKIES.COOKIE_CONSENT_VALUE = ORIG_COOKIE_CONSENT_VALUE;
  });

  describe("@client", () => {
    const ORIG_IS_CLIENT = SYSTEM.IS_CLIENT;

    beforeAll(() => {
      // $FlowFixMe
      SYSTEM.IS_CLIENT = true;
    });

    afterAll(() => {
      // $FlowFixMe
      SYSTEM.IS_CLIENT = ORIG_IS_CLIENT;
    });

    test("isAccepted - has cookie", () => {
      jsCookiesMock.get.mockReturnValue(true);

      expect(store.isAccepted()).toBe(true);
      expect(jsCookiesMock.get).toBeCalledWith(MOCK_COOKIE_CONSENT_KEY);
    });

    test("isAccepted - has not cookie", () => {
      jsCookiesMock.get.mockReturnValue(false);

      expect(store.isAccepted()).toBe(false);
      expect(jsCookiesMock.get).toBeCalledWith(MOCK_COOKIE_CONSENT_KEY);
    });

    test("saveAccepted", () => {
      store.saveAccepted();

      expect(jsCookiesMock.set).toBeCalledWith(MOCK_COOKIE_CONSENT_KEY, MOCK_COOKIE_CONSENT_VALUE);
    });
  });

  describe("@server", () => {
    const ORIG_IS_CLIENT = SYSTEM.IS_CLIENT;

    beforeAll(() => {
      // $FlowFixMe
      SYSTEM.IS_CLIENT = false;
    });

    afterAll(() => {
      // $FlowFixMe
      SYSTEM.IS_CLIENT = ORIG_IS_CLIENT;
    });

    test("isAccepted", () => {
      expect(store.isAccepted()).toBe(true);
      expect(jsCookiesMock.get).not.toBeCalled();
    });

    test("saveAccepted", () => {
      store.saveAccepted();

      expect(jsCookiesMock.set).not.toBeCalled();
    });
  });
});
