// @flow
import minMaxCheck from "../minMaxCheck";

describe("#minMaxCheck", () => {
  const min = new Date(2010, 1, 1);
  const max = new Date(2015, 11, 11);

  it("should be called with min", () => {
    const mockFn = jest.fn();
    const value = new Date(2005, 1, 1);
    minMaxCheck(value, min, max, mockFn);
    expect(mockFn).toBeCalledWith(min);
  });
  it("should be called with max", () => {
    const mockFn = jest.fn();
    const value = new Date(2018, 1, 1);
    minMaxCheck(value, min, max, mockFn);
    expect(mockFn).toBeCalledWith(max);
  });
  it("should not be called", () => {
    const mockFn = jest.fn();
    const value = new Date(2012, 1, 1);
    minMaxCheck(value, min, max, mockFn);
    expect(mockFn).not.toBeCalled();
  });
});
