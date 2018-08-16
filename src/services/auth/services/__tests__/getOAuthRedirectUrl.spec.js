// @flow strict
import getOAuthRedirectUrl from "../getOAuthRedirectUrl";

describe("#getOAuthRedirectUrl", () => {
  test("adds 'oauth-login' parameter", () => {
    expect(getOAuthRedirectUrl("/test")).toEqual("/test?oauth-login=true");
  });

  test("removes hash", () => {
    expect(getOAuthRedirectUrl("/test#hash")).toEqual("/test?oauth-login=true");
    expect(getOAuthRedirectUrl("/test#?flight=123-ABC")).toEqual("/test?oauth-login=true");
  });

  test("removes tracking parameters", () => {
    expect(getOAuthRedirectUrl("/test?first=1&utm_source=&second=&session_user=test")).toEqual(
      "/test?first=1&second=&oauth-login=true",
    );
  });

  test("escapes special characters", () => {
    expect(
      getOAuthRedirectUrl(
        "/search?multicity=prague-czechia,brno-czechia~london-united-kingdom~2018-08-20_2018-08-23",
      ),
    ).toEqual(
      "/search?multicity=prague-czechia%2Cbrno-czechia%7Elondon-united-kingdom%7E2018-08-20_2018-08-23&oauth-login=true",
    );
  });
});
