// @flow strict
import getUrlParam from "client/services/utils/getUrlParam";
import * as System from "../System";
import * as Geolocation from "../Geolocation";

jest.mock("client/services/utils/getUrlParam");
jest.mock("../System");

describe("#Geolocation", () => {
  test("getIP - on production", () => {
    // $FlowExpected
    System.isProduction.mockReturnValue(true);

    expect(Geolocation.getIP()).toBe(Geolocation.DEFAULT_IP);
    expect(System.isProduction).toBeCalled();
    expect(getUrlParam).not.toBeCalled();
  });

  test("getIP - on development, with override IP", () => {
    // $FlowExpected
    System.isProduction.mockReturnValue(false);
    // $FlowExpected
    getUrlParam.mockReturnValue("12.34.56.78");

    expect(Geolocation.getIP()).toBe("12.34.56.78");
    expect(System.isProduction).toBeCalled();
    expect(getUrlParam).toBeCalledWith("node_override_ip");
  });

  test("getIP - on development, with empty override IP", () => {
    // $FlowExpected
    System.isProduction.mockReturnValue(false);
    // $FlowExpected
    getUrlParam.mockReturnValue("");

    expect(Geolocation.getIP()).toBe(Geolocation.DEFAULT_IP);
    expect(System.isProduction).toBeCalled();
    expect(getUrlParam).toBeCalledWith("node_override_ip");
  });

  test("getIP - on development, without override IP", () => {
    // $FlowExpected
    System.isProduction.mockReturnValue(false);
    // $FlowExpected
    getUrlParam.mockReturnValue(null);

    expect(Geolocation.getIP()).toBe(Geolocation.DEFAULT_IP);
    expect(System.isProduction).toBeCalled();
    expect(getUrlParam).toBeCalledWith("node_override_ip");
  });
});
