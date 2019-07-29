import setHours from "../setHours";

describe("#setHours", () => {
  it("should round hours", () => {
    expect(setHours(140)).toEqual("2");
  });
});
