import parseDateFormat from "../parseDateFormat";

describe("#parseDateFormat", () => {
  it("removes invalid characters", () => {
    expect(parseDateFormat("-MI.NI:/~DIS年PLAY~")).toEqual(["M", "D", "Y"]);
  });

  it("handles lowercase characters", () => {
    expect(parseDateFormat("mdy")).toEqual(["M", "D", "Y"]);
  });

  it("handles repeated characters", () => {
    expect(parseDateFormat("MMDDmmddYYyy")).toEqual(["M", "D", "Y"]);
  });
});
