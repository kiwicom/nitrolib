// @flow strict
import separateList from "../separateList";

describe("#separateList", () => {
  test("even groups", () => {
    expect(separateList(3, [1, 2, 3, 4, 5, 6])).toEqual([[1, 2], [3, 4], [5, 6]]);
  });

  test("uneven groups", () => {
    expect(separateList(3, [1, 2, 3, 4, 5])).toEqual([[1, 2], [3, 4], [5]]);
  });

  test("too few items", () => {
    expect(separateList(5, [1, 2])).toEqual([[1], [2]]);
  });

  test("empty input", () => {
    expect(separateList(5, [])).toEqual([]);
  });
});
