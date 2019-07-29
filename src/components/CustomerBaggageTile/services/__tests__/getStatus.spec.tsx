import getStatus from "../getStatus";

describe("getStatus", () => {
  test("returns proper orderStatus", () => {
    const withoutStatus = getStatus({
      selected: { handBag: 1, holdBag: 2 },
      current: { handBag: 1, holdBag: 2 },
      isProcessing: false,
    });
    const processing = getStatus({ isProcessing: true });
    const unpaid = getStatus({
      selected: { handBag: 2, holdBag: 3 },
      current: { handBag: 1, holdBag: 2 },
      isProcessing: false,
    });
    const notAvailable = getStatus({
      isProcessing: false,
    });
    expect(withoutStatus).toBe(null);
    expect(processing).toBe("processing");
    expect(unpaid).toBe("unpaid");
    expect(notAvailable).toBe("notAvailable");
  });
});
