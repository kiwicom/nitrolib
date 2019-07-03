// @flow strict
import { advanceTo, clear } from "jest-date-mock";

import handleUTMs from "../handleUTMs";
import * as local from "../../local";

jest.mock("../../cookies");
jest.mock("../../local");

const UTMs = {
  utm_source: "utm_source",
  utm_medium: "utm_medium",
  utm_term: "utm_term",
  utm_content: "utm_content",
  utm_campaign: "utm_campaign",
};

const MKTs = {
  mkt_route: "mkt_route",
  mkt_postback: "mkt_postback",
  mkt_origin: "mkt_origin",
  mkt_form: "mkt_form",
  mkt_agency: "mkt_agency",
};

const all = { ...UTMs, ...MKTs };

const query = {
  ...all,
  // extra
  lol: "kek",
};

describe("#handleUTMs", () => {
  beforeEach(() => {
    // $FlowExpected: jest bug
    local.load.mockReset();
    // $FlowExpected: jest bug
    local.save.mockReset();
    // $FlowExpected: jest bug
    local.remove.mockReset();

    advanceTo(new Date(2019, 5, 1, 0, 0, 0)); // 2019-06-01
  });

  afterEach(() => {
    clear();
  });

  test("none", () => {
    const res = handleUTMs({});
    // $FlowExpected: jest bug
    expect(local.load.mock.calls.length).toBe(20); // clear & load
    // $FlowExpected: jest bug
    local.load.mock.calls.forEach(([utm]) => {
      expect(all[utm]).toBe(utm);
    });

    expect(res).toEqual({});
  });

  test("url", () => {
    const res = handleUTMs(query);
    // $FlowExpected: jest bug
    expect(local.load.mock.calls.length).toBe(20); // clear & load
    // $FlowExpected: jest bug
    expect(local.save.mock.calls.length).toBe(10);
    // $FlowExpected: jest bug
    local.save.mock.calls.forEach(([utm]) => {
      expect(all[utm]).toBe(utm);
    });

    expect(res).toEqual(all);
  });

  test("local", () => {
    // $FlowExpected: jest bug
    local.load.mockImplementation(utm =>
      JSON.stringify({
        value: all[utm],
        createdAt: new Date(2019, 4, 15, 0, 0, 0), // cca 15 days before
      }),
    );

    const res = handleUTMs({});
    // $FlowExpected: jest bug
    expect(local.load.mock.calls.length).toBe(20); // clear & load
    // $FlowExpected: jest bug
    expect(local.remove.mock.calls.length).toBe(0);
    // $FlowExpected: jest bug
    expect(local.save.mock.calls.length).toBe(0);

    expect(res).toEqual(all);
  });

  test("both", () => {
    // $FlowExpected: jest bug
    local.load.mockImplementation(utm =>
      UTMs[utm]
        ? JSON.stringify({
            value: UTMs[utm],
            createdAt: new Date(2019, 4, 15, 0, 0, 0), // cca 15 days before
          })
        : null,
    );

    const res = handleUTMs(MKTs);
    // $FlowExpected: jest bug
    expect(local.load.mock.calls.length).toBe(20); // clear & load
    // $FlowExpected: jest bug
    expect(local.remove.mock.calls.length).toBe(0);
    // $FlowExpected: jest bug
    expect(local.save.mock.calls.length).toBe(5);

    expect(res).toEqual(all);
  });

  test("clear old", () => {
    // $FlowExpected: jest bug
    local.load.mockImplementation(utm =>
      JSON.stringify({
        value: all[utm],
        createdAt: new Date(2019, 3, 15, 0, 0, 0), // cca 45 days before
      }),
    );

    const res = handleUTMs({});
    // $FlowExpected: jest bug
    expect(local.load.mock.calls.length).toBe(20); // clear & load
    // $FlowExpected: jest bug
    expect(local.remove.mock.calls.length).toBe(10);
    // $FlowExpected: jest bug
    expect(local.save.mock.calls.length).toBe(0);

    expect(res).toEqual(all);
  });
});
