// @flow strict
/* global jsdom: true */
import getUrlParam from "../getUrlParam";

describe("#getUrlParam", () => {
  const origUrl = window.location.href;

  afterAll(() => {
    // $FlowExpected
    jsdom.reconfigure({
      url: origUrl,
    });
  });

  test("param exists", () => {
    // $FlowExpected
    jsdom.reconfigure({
      url: "http://www.example.com?test=OK&other=1",
    });

    expect(getUrlParam("test")).toBe("OK");
  });

  test("param doesn't exist", () => {
    // $FlowExpected
    jsdom.reconfigure({
      url: "http://www.example.com?other=1",
    });

    expect(getUrlParam("test")).toBe(null);
  });

  test("no param exists", () => {
    // $FlowExpected
    jsdom.reconfigure({
      url: "http://www.example.com",
    });

    expect(getUrlParam("test")).toBe(null);
  });
});
