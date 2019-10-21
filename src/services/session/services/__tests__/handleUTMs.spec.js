// @flow strict
import handleUTMs from "../handleUTMs";
import * as session from "../../session";

jest.mock("../../cookies");
jest.mock("../../session");

const UTMs = {
  utm_source: "utm_source",
  utm_medium: "utm_medium",
  utm_term: "utm_term",
  utm_content: "utm_content",
  utm_campaign: "utm_campaign",
  utm_tm_source: "utm_tm_source",
  utm_tm_medium: "utm_tm_medium",
  utm_tm_component: "utm_tm_component",
  utm_tm_content: "utm_tm_content",
  utm_tm_campaign: "utm_tm_campaign",
  utm_tm_version: "utm_tm_version",
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
    session.load.mockReset();
    // $FlowExpected: jest bug
    session.save.mockReset();
  });

  test("none", () => {
    const res = handleUTMs({});
    // $FlowExpected: jest bug
    session.load.mock.calls.forEach(([utm]) => {
      expect(all[utm]).toBe(utm);
    });

    expect(res).toEqual({});
  });

  test("url", () => {
    const res = handleUTMs(query);
    // $FlowExpected: jest bug
    expect(session.save.mock.calls.length).toBe(16);
    // $FlowExpected: jest bug
    session.save.mock.calls.forEach(([utm]) => {
      expect(all[utm]).toBe(utm);
    });

    expect(res).toEqual(all);
  });

  test("local", () => {
    // $FlowExpected: jest bug
    session.load.mockImplementation(utm => all[utm]);

    const res = handleUTMs({});
    // $FlowExpected: jest bug
    expect(session.remove.mock.calls.length).toBe(0);
    // $FlowExpected: jest bug
    expect(session.save.mock.calls.length).toBe(0);

    expect(res).toEqual(all);
  });

  test("url over local", () => {
    // $FlowExpected: jest bug
    session.load.mockImplementation(utm => all[utm]);

    const res = handleUTMs({ utm_source: "kek" });
    // $FlowExpected: jest bug
    expect(session.remove.mock.calls.length).toBe(0);
    // $FlowExpected: jest bug
    expect(session.save.mock.calls.length).toBe(1);

    expect(res).toEqual({ ...all, utm_source: "kek" });
  });

  test("both", () => {
    // $FlowExpected: jest bug
    session.load.mockImplementation(utm => UTMs[utm] || null);

    const res = handleUTMs(MKTs);
    // $FlowExpected: jest bug
    expect(session.remove.mock.calls.length).toBe(0);
    // $FlowExpected: jest bug
    expect(session.save.mock.calls.length).toBe(5);

    expect(res).toEqual(all);
  });
});
