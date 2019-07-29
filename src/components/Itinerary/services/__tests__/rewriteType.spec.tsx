import rewriteType from "../rewriteType";

describe("#rewriteType", () => {
  it("should return bus", () => {
    expect(rewriteType("BUS")).toEqual("bus");
  });
  it("should return train", () => {
    expect(rewriteType("TRAIN")).toEqual("train");
  });

  it("should return airline", () => {
    expect(rewriteType("FLIGHT")).toEqual("airline");
  });
});
